import { appConfig } from '@/config/env'

const withTimeout = async (promise, timeoutMs) => {
  const timeoutPromise = new Promise((_, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request timed out. Please try again.'))
    }, timeoutMs)

    promise.finally(() => clearTimeout(timeoutId))
  })

  return Promise.race([promise, timeoutPromise])
}

export const contactService = {
  async submitInquiry(payload) {
    const body = JSON.stringify(payload)

    if (!appConfig.contactEndpoint) {
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

    const response = await withTimeout(request, appConfig.requestTimeoutMs)

    if (!response.ok) {
      throw new Error('Unable to submit inquiry right now. Please try again later.')
    }

    return {
      ok: true,
      mode: 'remote',
      message: 'Inquiry sent successfully. We will get back to you soon.',
    }
  },
}
