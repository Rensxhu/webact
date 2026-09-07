<script setup>
defineProps({
  site: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <article class="site-card" :class="{ compact }">
    <img
      class="site-image"
      :src="site.image"
      :alt="site.alt"
      width="800"
      height="450"
      loading="lazy"
      decoding="async"
    >
    <div class="site-content">
      <p class="site-meta">{{ site.category || site.type }} • {{ site.town }}</p>
      <h3>{{ site.name }}</h3>
      <p>{{ site.summary }}</p>
      <ul class="site-info" aria-label="Visitor details">
        <li><strong>Hours:</strong> {{ site.hours }}</li>
        <li><strong>Fee:</strong> {{ site.fee }}</li>
      </ul>
      <p v-if="site.accessibility" class="site-accessibility">
        <strong>Accessibility:</strong> {{ site.accessibility }}
      </p>
    </div>
  </article>
</template>
