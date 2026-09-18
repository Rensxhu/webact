const safeString = (value) => {
  if (value == null) {
    return ''
  }

  return String(value).slice(0, 300)
}

const safeError = (error) => {
  if (!(error instanceof Error)) {
    return {
      message: safeString(error),
    }
  }

  return {
    name: error.name,
    message: safeString(error.message),
  }
}

export const logDiagnostic = (payload) => {
  if (!import.meta.env.DEV || import.meta.env.MODE === 'test') {
    return
  }

  const { action = 'unknown-action', stage = 'unknown-stage', status = 'unknown-status' } = payload
  const details = {
    action,
    stage,
    status,
    meta: payload.meta || {},
    error: safeError(payload.error),
    timestamp: new Date().toISOString(),
  }

  console.groupCollapsed(`[diag] ${action} :: ${stage} :: ${status}`)
  console.table(details.meta)
  if (details.error.message || details.error.name) {
    console.warn(details.error)
  }
  console.log('timestamp', details.timestamp)
  console.groupEnd()
}
