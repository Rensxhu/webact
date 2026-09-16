import { describe, expect, it } from 'vitest'
import { tourismSpots } from '@/data/tourismContent'
import { getVisibility, isVisibleInScope, validateVisibilityRegistry } from '@/data/tourismVisibility'

describe('tourismVisibility', () => {
  it('contains visibility metadata for all known tourism spots', () => {
    expect(validateVisibilityRegistry(tourismSpots)).toEqual([])
  })

  it('falls back to default visibility for unknown ids', () => {
    const visibility = getVisibility('unknown-id')

    expect(visibility.status).toBe('visible')
    expect(visibility.scopes.search).toBe(true)
  })

  it('marks destinations scope only for featured entries', () => {
    expect(isVisibleInScope('cape-bolinao-lighthouse', 'destinations')).toBe(true)
    expect(isVisibleInScope('pangasinan-provincial-capitol-complex', 'destinations')).toBe(false)
  })
})
