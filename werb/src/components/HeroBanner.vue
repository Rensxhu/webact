<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  primaryAction: {
    type: Object,
    default: null,
  },
  secondaryAction: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <section class="hero-banner" aria-labelledby="hero-title">
    <div class="hero-overlay">
      <p class="hero-kicker">Discover Pangasinan</p>
      <h1 id="hero-title">{{ title }}</h1>
      <p class="hero-subtitle">{{ subtitle }}</p>
      <div class="hero-actions" role="group" aria-label="Primary page actions">
        <RouterLink v-if="primaryAction" class="btn btn-primary btn-lg" :to="primaryAction.to">
          {{ primaryAction.label }}
        </RouterLink>
        <RouterLink v-if="secondaryAction" class="btn btn-outline-light btn-lg" :to="secondaryAction.to">
          {{ secondaryAction.label }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
