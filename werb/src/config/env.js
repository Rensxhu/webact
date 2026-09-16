const parseTimeout = (value, fallback) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const parseBoolean = (value, fallback = false) => {
  if (value == null || value === '') {
    return fallback
  }

  return String(value).toLowerCase() === 'true'
}

export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  requestTimeoutMs: parseTimeout(import.meta.env.VITE_REQUEST_TIMEOUT_MS, 8000),
  enableVisibilityMetadata: parseBoolean(import.meta.env.VITE_ENABLE_VISIBILITY_METADATA, false),
}
