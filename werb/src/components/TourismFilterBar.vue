<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  locations: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const filters = computed(() => props.modelValue)

const updateField = (field, value) => {
  emit('update:modelValue', {
    ...filters.value,
    [field]: value,
  })
}

const clearFilters = () => {
  emit('update:modelValue', {
    query: '',
    location: '',
    category: '',
  })
}
</script>

<template>
  <form class="panel-card mb-4" aria-label="Filter tourist spots" @submit.prevent>
    <div class="row g-3 align-items-end">
      <div class="col-12 col-lg-5">
        <label for="spot-search" class="form-label">Search</label>
        <input
          id="spot-search"
          class="form-control"
          type="search"
          :value="filters.query"
          placeholder="Search by name, location, or keyword"
          @input="updateField('query', $event.target.value)"
        >
      </div>

      <div class="col-12 col-sm-6 col-lg-3">
        <label for="spot-location" class="form-label">Location</label>
        <select
          id="spot-location"
          class="form-select"
          :value="filters.location"
          @change="updateField('location', $event.target.value)"
        >
          <option value="">All locations</option>
          <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
        </select>
      </div>

      <div class="col-12 col-sm-6 col-lg-3">
        <label for="spot-category" class="form-label">Category</label>
        <select
          id="spot-category"
          class="form-select"
          :value="filters.category"
          @change="updateField('category', $event.target.value)"
        >
          <option value="">All categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <div class="col-12 col-lg-1 d-grid">
        <button class="btn btn-outline-secondary" type="button" @click="clearFilters">Reset</button>
      </div>
    </div>
  </form>
</template>
