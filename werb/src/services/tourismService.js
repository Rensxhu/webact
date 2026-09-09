import { featuredSites, heritageSites, tourismSpots } from '@/data/tourismContent'

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

const withAsyncResult = async (resolver) => {
  try {
    return await Promise.resolve(resolver())
  } catch (error) {
    throw new Error(error?.message || 'Unable to load tourism data.', { cause: error })
  }
}

export const tourismService = {
  async getAllSpots(options = {}) {
    return withAsyncResult(() => applyFilters(tourismSpots, options))
  },

  async getFeaturedSpots(options = {}) {
    return withAsyncResult(() => applyFilters(featuredSites, options))
  },

  async getHeritageSpots(options = {}) {
    return withAsyncResult(() => applyFilters(heritageSites, options))
  },
}
