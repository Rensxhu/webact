import { describe, expect, it } from 'vitest'
import { tourismService } from '@/services/tourismService'

describe('tourismService', () => {
  it('returns normalized featured spots sorted by name', async () => {
    const results = await tourismService.getFeaturedSpots()

    expect(results.length).toBeGreaterThan(0)
    expect(results[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      location: expect.any(String),
      category: expect.any(String),
      image: expect.stringContaining('/images/spots/'),
    })

    const sortedCopy = [...results].sort((first, second) => first.name.localeCompare(second.name))
    expect(results).toEqual(sortedCopy)
  })

  it('filters by location and query', async () => {
    const results = await tourismService.getFeaturedSpots({
      location: 'Bolinao',
      query: 'lighthouse',
    })

    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('cape-bolinao-lighthouse')
  })

  it('returns both featured spots for Dagupan City location', async () => {
    const results = await tourismService.getFeaturedSpots({
      location: 'Dagupan City',
    })

    expect(results).toHaveLength(2)
    expect(results.map((spot) => spot.id)).toEqual([
      'st-john-the-evangelist-cathedral',
      'tondol-beach',
    ])
  })

  it('provides visibility audit output with no registry errors', () => {
    const audit = tourismService.getVisibilityAudit()

    expect(audit).toMatchObject({
      visibilityEnabled: expect.any(Boolean),
      errors: expect.any(Array),
      hidden: expect.any(Array),
    })

    expect(audit.errors).toEqual([])
  })
})
