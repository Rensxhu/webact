<script setup>
import { computed, onMounted } from 'vue'
import ContentState from '@/components/ContentState.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SiteCard from '@/components/SiteCard.vue'
import TourismFilterBar from '@/components/TourismFilterBar.vue'
import { useTourismSpots } from '@/composables/useTourismSpots'
import { tourismSpots } from '@/data/tourismContent'
import { tourismService } from '@/services/tourismService'

const {
  spots,
  loading,
  error,
  hasResults,
  filters,
  loadSpots,
  updateFilter,
} = useTourismSpots(tourismService.getAllSpots)

const filterModel = computed({
  get: () => filters.value,
  set: (nextValue) => {
    Object.entries(nextValue).forEach(([field, value]) => {
      updateFilter(field, value)
    })
  },
})

const locations = computed(() =>
  [...new Set(tourismSpots.map((spot) => spot.location))].sort((first, second) =>
    first.localeCompare(second),
  ),
)

const categories = computed(() =>
  [...new Set(tourismSpots.map((spot) => spot.category))].sort((first, second) =>
    first.localeCompare(second),
  ),
)

onMounted(() => {
  loadSpots()
})
</script>

<template>
  <main id="main-content" class="page-section container py-4 py-md-5">
    <SectionTitle
      eyebrow="Explore"
      title="Destinations"
      description="Find scenic, cultural, and historical highlights across Pangasinan."
    />

    <TourismFilterBar v-model="filterModel" :locations="locations" :categories="categories" />

    <ContentState
      :loading="loading"
      :error="error"
      :is-empty="!loading && !error && !hasResults"
      empty-message="No destination matched your filters."
      @retry="loadSpots"
    />

    <div v-if="!loading && !error && hasResults" class="row g-3 g-md-4 mt-1">
      <div v-for="site in spots" :key="site.id" class="col-12 col-md-6 col-xl-4">
        <SiteCard :site="site" />
      </div>
    </div>
  </main>
</template>
