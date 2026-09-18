import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SiteCard from '@/components/SiteCard.vue'

const makeSite = (overrides = {}) => ({
  id: 'sample-site',
  name: 'Sample Site',
  town: 'Bolinao',
  category: 'Beach Escape',
  summary: 'Short summary.',
  description: 'Long description.',
  hours: '8:00 AM - 5:00 PM',
  fee: 'Free entry',
  alt: 'Sample alt text',
  image: '/images/spots/sample-site.jpg',
  ...overrides,
})

describe('SiteCard', () => {
  it('shows fallback when image fails to load', async () => {
    const wrapper = mount(SiteCard, {
      props: {
        site: makeSite(),
      },
    })

    await wrapper.find('img.site-image').trigger('error')
    await wrapper.find('img.site-image').trigger('error')

    expect(wrapper.text()).toContain('Image coming soon')
    expect(wrapper.find('img.site-image').exists()).toBe(false)
  })

  it('tries name-based path on first image error', async () => {
    const wrapper = mount(SiteCard, {
      props: {
        site: makeSite({
          id: 'cape-bolinao-lighthouse',
          name: 'Cape Bolinao Lighthouse',
          image: '/webact/images/spots/cape-bolinao-lighthouse.jpg',
        }),
      },
    })

    await wrapper.find('img.site-image').trigger('error')

    expect(wrapper.find('img.site-image').attributes('src')).toBe(
      '/webact/images/spots/Cape%20Bolinao%20Lighthouse.jpg',
    )
  })

  it('resets image error state when src changes', async () => {
    const wrapper = mount(SiteCard, {
      props: {
        site: makeSite({ image: '/images/spots/first.jpg' }),
      },
    })

    await wrapper.find('img.site-image').trigger('error')
    await wrapper.find('img.site-image').trigger('error')
    expect(wrapper.find('img.site-image').exists()).toBe(false)

    await wrapper.setProps({
      site: makeSite({ image: '/images/spots/second.jpg' }),
    })

    expect(wrapper.find('img.site-image').exists()).toBe(true)
  })
})
