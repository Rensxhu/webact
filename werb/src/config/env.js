const parseTimeout = (value, fallback) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  requestTimeoutMs: parseTimeout(import.meta.env.VITE_REQUEST_TIMEOUT_MS, 8000),
}
