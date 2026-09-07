<script setup>
import SectionTitle from '@/components/SectionTitle.vue'
import { contactDetails, travelTips } from '@/data/tourismContent'
</script>

<template>
  <main id="main-content" class="page-section container py-4 py-md-5">
    <SectionTitle
      eyebrow="Plan your visit"
      title="Contact and Travel Essentials"
      description="Send inquiries and prepare for a smooth heritage trip across Pangasinan."
    />

    <div class="row g-4 mt-1">
      <section class="col-12 col-lg-6" aria-labelledby="contact-info">
        <h3 id="contact-info">Tourism Contact</h3>
        <div class="panel-card">
          <p><strong>Email:</strong> <a :href="`mailto:${contactDetails.email}`">{{ contactDetails.email }}</a></p>
          <p><strong>Phone:</strong> <a :href="`tel:${contactDetails.phone}`">{{ contactDetails.phone }}</a></p>
          <p><strong>Office Hours:</strong> {{ contactDetails.officeHours }}</p>
          <p class="mb-0"><strong>Address:</strong> {{ contactDetails.address }}</p>
        </div>
      </section>

      <section class="col-12 col-lg-6" aria-labelledby="travel-tips">
        <h3 id="travel-tips">Travel Tips</h3>
        <ul class="panel-card tip-list">
          <li v-for="tip in travelTips" :key="tip">{{ tip }}</li>
        </ul>
      </section>
    </div>

    <section class="mt-4" aria-labelledby="contact-form-heading">
      <h3 id="contact-form-heading">Quick Inquiry</h3>
      <form class="panel-card" aria-describedby="form-note" @submit.prevent>
        <p id="form-note" class="text-muted">
          Demo-only form for static deployment. Connect to a form endpoint later if needed.
        </p>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input id="name" class="form-control" type="text" autocomplete="name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input id="email" class="form-control" type="email" autocomplete="email" required>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea id="message" class="form-control" rows="4" required></textarea>
        </div>
        <button class="btn btn-primary" type="submit">Send Inquiry</button>
      </form>
    </section>
  </main>
</template>
