<script setup>
import SectionTitle from '@/components/SectionTitle.vue'
</script>

<template>
  <main id="main-content" class="page-section container py-4 py-md-5">
    <SectionTitle
      eyebrow="About"
      title="Why This Pangasinan Tourism Guide"
      description="This website helps mobile users discover cultural and heritage destinations with practical travel details."
    />

    <div class="row g-4 mt-1">
      <section class="col-12 col-lg-6" aria-labelledby="mission-heading">
        <h3 id="mission-heading">Mission</h3>
        <div class="panel-card">
          <p>
            Promote responsible and inclusive tourism by making destination details easy to access,
            especially for visitors on slower mobile data.
          </p>
          <p class="mb-0">
            Showcase local identity by balancing natural attractions with historical and religious
            heritage landmarks.
          </p>
        </div>
      </section>

      <section class="col-12 col-lg-6" aria-labelledby="values-heading">
        <h3 id="values-heading">What We Prioritize</h3>
        <ul class="panel-card tip-list">
          <li>Mobile-first experiences for 3G and 4G conditions.</li>
          <li>Accessible navigation and readable content aligned with WCAG 2.1 AA.</li>
          <li>Maintainable components and reusable content structure.</li>
          <li>Static-friendly architecture for low-cost deployment.</li>
        </ul>
      </section>
    </div>
  </main>
</template>
