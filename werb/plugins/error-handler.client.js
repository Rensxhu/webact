import { logDiagnostic } from '@/utils/diagnostics'

// Client-only: mirrors the Vue error handler + unhandled rejection listener
// that previously lived in src/main.js.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    logDiagnostic({
      action: 'app:vueError',
      stage: 'runtime',
      status: 'error',
      meta: {
        component: instance?.$options?.name || 'anonymous-component',
        info,
      },
      error,
    })
  }

  window.addEventListener('unhandledrejection', (event) => {
    logDiagnostic({
      action: 'app:unhandledRejection',
      stage: 'runtime',
      status: 'error',
      error: event.reason,
    })
  })
})
