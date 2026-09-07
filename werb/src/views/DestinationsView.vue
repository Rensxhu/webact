<script setup>
import SectionTitle from '@/components/SectionTitle.vue'
import SiteCard from '@/components/SiteCard.vue'
import { featuredSites } from '@/data/tourismContent'
</script>

<template>
  <main id="main-content" class="page-section container py-4 py-md-5">
    <SectionTitle
      eyebrow="Explore"
      title="Top Destinations"
      description="Find scenic and cultural highlights across Pangasinan."
    />

    <div class="row g-3 g-md-4 mt-1">
      <div v-for="site in featuredSites" :key="site.id" class="col-12 col-md-6">
        <SiteCard :site="site" />
      </div>
    </div>
  </main>
</template>
