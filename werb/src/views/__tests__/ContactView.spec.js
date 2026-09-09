import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ContactView from '@/views/ContactView.vue'

describe('ContactView', () => {
  it('shows validation errors for invalid submission', async () => {
    const wrapper = mount(ContactView)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Please correct the highlighted form fields and try again.')
    expect(wrapper.text()).toContain('Please enter at least 2 characters for your name.')
    expect(wrapper.text()).toContain('Please provide a valid email address.')
    expect(wrapper.text()).toContain('Please enter a message with at least 10 characters.')
  })

  it('submits valid data and shows success message', async () => {
    const wrapper = mount(ContactView)

    await wrapper.find('#name').setValue('Maria Santos')
    await wrapper.find('#email').setValue('maria@example.com')
    await wrapper.find('#message').setValue('I would like to know about best times to visit Bolinao Falls.')

    await wrapper.find('form').trigger('submit.prevent')
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(wrapper.text()).toContain('Inquiry captured locally. Add VITE_CONTACT_ENDPOINT to enable API delivery.')
    expect(wrapper.find('#name').element.value).toBe('')
  })
})
