<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import SiteFooter from '@/components/SiteFooter.vue'
import { navLinks } from '@/data/tourismContent'

const isMenuOpen = ref(false)
const route = useRoute()

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false

    requestAnimationFrame(() => {
      const main = document.getElementById('main-content')
      if (main) {
        main.setAttribute('tabindex', '-1')
        main.focus()
      }
    })
  },
)
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header">
    <nav class="navbar navbar-expand-lg container py-2" aria-label="Primary">
      <RouterLink class="navbar-brand" to="/">
        <span class="brand-title">PangTour</span>
        <span class="brand-tag">A Cultural and Heritage Guide</span>
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        aria-controls="primary-nav"
        aria-label="Toggle navigation"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="primary-nav" class="navbar-collapse" :class="{ show: isMenuOpen }">
        <!-- this is comment -->
        <ul class="navbar-nav ms-auto gap-lg-2">
          <li v-for="link in navLinks" :key="link.path" class="nav-item">
            <RouterLink class="nav-link" :to="link.path">{{ link.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <RouterView />
  <SiteFooter />
</template>
