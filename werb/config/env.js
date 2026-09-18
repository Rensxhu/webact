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

// Reads Nuxt public runtime config (populated from NUXT_PUBLIC_* env vars).
// Must be called lazily from within a Nuxt request/app context (composables,
// component setup, etc.) rather than at module top-level, since calling
// useRuntimeConfig() eagerly during SSR module evaluation throws
// "[nuxt] instance unavailable".
export const getAppConfig = () => {
  const publicConfig =
    typeof useRuntimeConfig === 'function' ? useRuntimeConfig().public : {}

  return {
    apiBaseUrl: publicConfig.apiBaseUrl || '',
    contactEndpoint: publicConfig.contactEndpoint || '',
    requestTimeoutMs: parseTimeout(publicConfig.requestTimeoutMs, 8000),
    enableVisibilityMetadata: parseBoolean(publicConfig.enableVisibilityMetadata, false),
  }
}
