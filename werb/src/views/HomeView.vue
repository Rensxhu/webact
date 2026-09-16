<script setup>
import HeroBanner from '@/components/HeroBanner.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SiteCard from '@/components/SiteCard.vue'
import { culturalEvents, featuredSites } from '@/data/tourismContent'
</script>

<template>
  <main id="main-content">
    <HeroBanner
      title="Discover Pangasinan Through Culture and Heritage"
      subtitle="Plan mobile-friendly trips to churches, museums, coastlines, and local festivals."
      :primary-action="{ label: 'Explore Destinations', to: '/destinations' }"
      :secondary-action="{ label: 'Browse All Spots', to: '/destinations' }"
    />

    <section class="container page-section py-4 py-md-5" aria-labelledby="featured-sites">
      <SectionTitle
        eyebrow="Top picks"
        title="Featured Sites"
        description="Short-list highlights for first-time visitors and family trips."
      />
      <div class="row g-3 g-md-4 mt-1">
        <div v-for="site in featuredSites" :key="site.id" class="col-12 col-md-6 col-xl-4">
          <SiteCard :site="site" />
        </div>
      </div>
    </section>

    <section class="container page-section pb-5" aria-labelledby="events-heading">
      <SectionTitle
        eyebrow="Calendar"
        title="Cultural Events"
        description="Catch local traditions and seasonal tourism activities."
      />

      <div class="event-grid">
        <article v-for="event in culturalEvents" :key="event.name" class="event-card">
          <p class="event-month">{{ event.month }}</p>
          <h3>{{ event.name }}</h3>
          <p>{{ event.details }}</p>
        </article>
      </div>
    </section>
  </main>
</template>
