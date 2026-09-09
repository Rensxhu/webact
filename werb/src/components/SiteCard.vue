<script setup>
import { computed, ref, watch } from 'vue'
import { logDiagnostic } from '@/utils/diagnostics'

const props = defineProps({
  site: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const imageLoadFailed = ref(false)
const imageSrc = ref('')
const hasTriedNameBasedPath = ref(false)

const buildNameBasedImagePath = () => {
  const currentSrc = props.site?.image || ''
  const basePath = currentSrc.replace(/[^/]*$/, '')
  const encodedName = encodeURIComponent(`${props.site?.name || ''}.jpg`)
  return `${basePath}${encodedName}`
}

const onImageError = () => {
  if (!hasTriedNameBasedPath.value) {
    hasTriedNameBasedPath.value = true
    imageSrc.value = buildNameBasedImagePath()
    logDiagnostic({
      action: 'siteCard:imageLoad',
      stage: 'retry',
      status: 'pending',
      meta: {
        siteId: props.site?.id,
        retrySrc: imageSrc.value,
      },
    })
    return
  }

  imageLoadFailed.value = true
  logDiagnostic({
    action: 'siteCard:imageLoad',
    stage: 'finish',
    status: 'error',
    meta: {
      siteId: props.site?.id,
      imageSrc: imageSrc.value,
    },
  })
}

watch(
  () => [props.site?.image, props.site?.name],
  () => {
    imageSrc.value = props.site?.image || ''
    hasTriedNameBasedPath.value = false
    imageLoadFailed.value = false
  },
  { immediate: true },
)

const cardImageAlt = computed(() =>
  imageLoadFailed.value ? 'Image placeholder for tourist spot' : '',
)
</script>

<template>
  <article class="site-card" :class="{ compact }">
    <img
      v-if="!imageLoadFailed"
      class="site-image"
      :src="imageSrc"
      :alt="site.alt"
      width="800"
      height="450"
      loading="lazy"
      decoding="async"
      @error="onImageError"
    >
    <div v-else class="site-image site-image-placeholder" role="img" :aria-label="cardImageAlt">
      <p class="mb-0">Image coming soon</p>
    </div>
    <div class="site-content">
      <p class="site-meta">{{ site.category || site.type }} • {{ site.town }}</p>
      <h3>{{ site.name }}</h3>
      <p>{{ site.summary }}</p>
      <p v-if="site.description" class="site-description">{{ site.description }}</p>
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
