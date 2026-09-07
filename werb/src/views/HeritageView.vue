<script setup>
import SectionTitle from '@/components/SectionTitle.vue'
import SiteCard from '@/components/SiteCard.vue'
import { heritageSites } from '@/data/tourismContent'
</script>

<template>
  <main id="main-content" class="page-section container py-4 py-md-5">
    <SectionTitle
      eyebrow="Culture"
      title="Heritage Sites"
      description="Learn the stories behind Pangasinan's religious, civic, and historical landmarks."
    />

    <div class="row g-3 g-md-4 mt-1">
      <div v-for="site in heritageSites" :key="site.id" class="col-12 col-lg-6">
        <SiteCard :site="site" :compact="true" />
      </div>
    </div>
  </main>
</template>
