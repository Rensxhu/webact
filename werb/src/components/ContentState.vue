<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
  emptyMessage: {
    type: String,
    default: 'No items found.',
  },
})

defineEmits(['retry'])
</script>

<template>
  <div v-if="loading" class="panel-card text-center" role="status" aria-live="polite">
    <div class="spinner-border text-primary" aria-hidden="true"></div>
    <p class="mt-3 mb-0">Loading tourism data...</p>
  </div>

  <div v-else-if="error" class="alert alert-danger" role="alert" aria-live="assertive">
    <p class="mb-2">{{ error }}</p>
    <button class="btn btn-sm btn-outline-danger" type="button" @click="$emit('retry')">
      Try again
    </button>
  </div>

  <div v-else-if="isEmpty" class="alert alert-info" role="status" aria-live="polite">
    {{ emptyMessage }}
  </div>
</template>
