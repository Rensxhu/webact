import { appConfig } from '@/config/env'
import { logDiagnostic } from '@/utils/diagnostics'

const withTimeout = async (promise, timeoutMs) => {
  let timeoutId

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('Request timed out. Please try again.'))
    }, timeoutMs)
  })

  try {
    return await Promise.race([promise, timeoutPromise])
  } finally {
    clearTimeout(timeoutId)
  }
}

export const contactService = {
  async submitInquiry(payload) {
    logDiagnostic({ action: 'contact:submitInquiry', stage: 'start', status: 'pending' })

    const body = JSON.stringify(payload)

    if (!appConfig.contactEndpoint) {
      logDiagnostic({
        action: 'contact:submitInquiry',
        stage: 'finish',
        status: 'success',
        meta: { mode: 'local' },
      })

      return {
        ok: true,
        mode: 'local',
        message:
          'Inquiry captured locally. Add VITE_CONTACT_ENDPOINT to enable API delivery.',
      }
    }

    const request = fetch(appConfig.contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    try {
      const response = await withTimeout(request, appConfig.requestTimeoutMs)

      if (!response.ok) {
        throw new Error('Unable to submit inquiry right now. Please try again later.')
      }

      logDiagnostic({
        action: 'contact:submitInquiry',
        stage: 'finish',
        status: 'success',
        meta: { mode: 'remote', responseStatus: response.status },
      })

      return {
        ok: true,
        mode: 'remote',
        message: 'Inquiry sent successfully. We will get back to you soon.',
      }
    } catch (error) {
      logDiagnostic({
        action: 'contact:submitInquiry',
        stage: 'finish',
        status: 'error',
        error,
      })
      throw error
    }
  },
}
