import { featuredSites, heritageSites, tourismSpots } from '@/data/tourismContent'
import { logDiagnostic } from '@/utils/diagnostics'

const normalizeQuery = (query = '') => query.trim().toLowerCase()

const searchSpot = (spot, query) => {
  if (!query) {
    return true
  }

  const value = normalizeQuery(query)
  const haystack = [
    spot.name,
    spot.location,
    spot.category,
    spot.summary,
    ...(spot.tags || []),
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(value)
}

const filterByLocation = (spots, location) => {
  if (!location) {
    return spots
  }

  const normalizedLocation = normalizeQuery(location)
  return spots.filter((spot) => normalizeQuery(spot.location) === normalizedLocation)
}

const filterByCategory = (spots, category) => {
  if (!category) {
    return spots
  }

  const normalizedCategory = normalizeQuery(category)
  return spots.filter((spot) => normalizeQuery(spot.category) === normalizedCategory)
}

const sortByName = (spots) =>
  [...spots].sort((first, second) => first.name.localeCompare(second.name))

const applyFilters = (spots, options = {}) => {
  const { query = '', location = '', category = '' } = options

  const scoped = filterByCategory(filterByLocation(spots, location), category)
  const searched = scoped.filter((spot) => searchSpot(spot, query))

  return sortByName(searched)
}

const withAsyncResult = async (action, resolver, meta = {}) => {
  logDiagnostic({ action, stage: 'start', status: 'pending', meta })

  try {
    const result = await Promise.resolve(resolver())
    logDiagnostic({ action, stage: 'finish', status: 'success', meta: { ...meta, count: result.length } })
    return result
  } catch (error) {
    logDiagnostic({ action, stage: 'finish', status: 'error', meta, error })
    throw new Error(error?.message || 'Unable to load tourism data.', { cause: error })
  }
}

export const tourismService = {
  async getAllSpots(options = {}) {
    return withAsyncResult('tourism:getAllSpots', () => applyFilters(tourismSpots, options), {
      hasQuery: Boolean(options.query),
      hasLocation: Boolean(options.location),
      hasCategory: Boolean(options.category),
    })
  },

  async getFeaturedSpots(options = {}) {
    return withAsyncResult(
      'tourism:getFeaturedSpots',
      () => applyFilters(featuredSites, options),
      {
        hasQuery: Boolean(options.query),
        hasLocation: Boolean(options.location),
        hasCategory: Boolean(options.category),
      },
    )
  },

  async getHeritageSpots(options = {}) {
    return withAsyncResult(
      'tourism:getHeritageSpots',
      () => applyFilters(heritageSites, options),
      {
        hasQuery: Boolean(options.query),
        hasLocation: Boolean(options.location),
        hasCategory: Boolean(options.category),
      },
    )
  },
}
