import { computed, ref, watch } from 'vue'
import { logDiagnostic } from '@/utils/diagnostics'

export const useTourismSpots = (loader, initialFilters = {}) => {
  const spots = ref([])
  const loading = ref(false)
  const error = ref('')
  const requestId = ref(0)
  const filters = ref({
    query: initialFilters.query || '',
    location: initialFilters.location || '',
    category: initialFilters.category || '',
  })

  const hasResults = computed(() => spots.value.length > 0)

  const updateFilter = (name, value) => {
    filters.value = {
      ...filters.value,
      [name]: value,
    }
  }

  const loadSpots = async () => {
    const activeRequestId = requestId.value + 1
    requestId.value = activeRequestId
    loading.value = true
    error.value = ''

    logDiagnostic({
      action: 'tourism:loadSpots',
      stage: 'start',
      status: 'pending',
      meta: {
        requestId: activeRequestId,
      },
    })

    try {
      const response = await loader(filters.value)

      if (activeRequestId !== requestId.value) {
        return
      }

      spots.value = Array.isArray(response) ? response : []
      logDiagnostic({
        action: 'tourism:loadSpots',
        stage: 'finish',
        status: 'success',
        meta: {
          requestId: activeRequestId,
          resultCount: spots.value.length,
        },
      })
    } catch (err) {
      if (activeRequestId !== requestId.value) {
        return
      }

      spots.value = []
      error.value = err instanceof Error ? err.message : 'Unable to load tourism spots.'
      logDiagnostic({
        action: 'tourism:loadSpots',
        stage: 'finish',
        status: 'error',
        meta: {
          requestId: activeRequestId,
        },
        error: err,
      })
    } finally {
      if (activeRequestId === requestId.value) {
        loading.value = false
      }
    }
  }

  watch(filters, loadSpots, { deep: true })

  return {
    spots,
    loading,
    error,
    hasResults,
    filters,
    loadSpots,
    updateFilter,
  }
}
