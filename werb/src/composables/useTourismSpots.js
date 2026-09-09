import { computed, ref, watch } from 'vue'

export const useTourismSpots = (loader, initialFilters = {}) => {
  const spots = ref([])
  const loading = ref(false)
  const error = ref('')
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
    loading.value = true
    error.value = ''

    try {
      const response = await loader(filters.value)
      spots.value = Array.isArray(response) ? response : []
    } catch (err) {
      spots.value = []
      error.value = err instanceof Error ? err.message : 'Unable to load tourism spots.'
    } finally {
      loading.value = false
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
