<script setup>
import { computed, reactive, ref } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { contactService } from '@/services/contactService'
import { sanitizeText, validateInquiry } from '@/utils/sanitize'
import { contactDetails, travelTips } from '@/data/tourismContent'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
})

const status = ref('idle')
const feedbackMessage = ref('')

const isSubmitting = computed(() => status.value === 'submitting')

const clearFieldError = (field) => {
  errors[field] = ''
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.message = ''
}

const submitInquiry = async () => {
  status.value = 'idle'
  feedbackMessage.value = ''

  const payload = {
    name: sanitizeText(form.name),
    email: sanitizeText(form.email).toLowerCase(),
    message: sanitizeText(form.message),
  }

  const validationErrors = validateInquiry(payload)

  errors.name = validationErrors.name || ''
  errors.email = validationErrors.email || ''
  errors.message = validationErrors.message || ''

  if (Object.keys(validationErrors).length > 0) {
    status.value = 'error'
    feedbackMessage.value = 'Please correct the highlighted form fields and try again.'
    return
  }

  status.value = 'submitting'

  try {
    const response = await contactService.submitInquiry(payload)
    status.value = 'success'
    feedbackMessage.value = response.message
    resetForm()
  } catch (error) {
    status.value = 'error'
    feedbackMessage.value =
      error instanceof Error ? error.message : 'Unable to send inquiry. Please try again.'
  }
}
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
      <form class="panel-card" aria-describedby="form-note" novalidate @submit.prevent="submitInquiry">
        <p id="form-note" class="text-muted">
          This form uses client-side validation. Configure <code>VITE_CONTACT_ENDPOINT</code> to submit to
          your production backend.
        </p>

        <div v-if="feedbackMessage" class="alert" :class="status === 'success' ? 'alert-success' : 'alert-warning'" role="status" aria-live="polite">
          {{ feedbackMessage }}
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            id="name"
            v-model="form.name"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
            type="text"
            autocomplete="name"
            required
            @input="clearFieldError('name')"
          >
          <p v-if="errors.name" class="invalid-feedback d-block" role="alert">{{ errors.name }}</p>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="form.email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
            type="email"
            autocomplete="email"
            required
            @input="clearFieldError('email')"
          >
          <p v-if="errors.email" class="invalid-feedback d-block" role="alert">{{ errors.email }}</p>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            class="form-control"
            :class="{ 'is-invalid': errors.message }"
            rows="4"
            required
            @input="clearFieldError('message')"
          ></textarea>
          <p v-if="errors.message" class="invalid-feedback d-block" role="alert">{{ errors.message }}</p>
        </div>

        <p class="form-hint">All fields are required. Messages should be at least 10 characters.</p>

        <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Inquiry' }}
        </button>
      </form>
    </section>
  </main>
</template>
