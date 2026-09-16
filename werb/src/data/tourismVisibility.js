const nowTag = '2026-09-16T00:00:00.000Z'

const createEntry = ({
  status = 'visible',
  scopes = {},
  hiddenReasons = [],
  metadata = {},
} = {}) => ({
  status,
  scopes: {
    home: Boolean(scopes.home),
    destinations: Boolean(scopes.destinations),
    heritage: Boolean(scopes.heritage),
    search: Boolean(scopes.search),
  },
  hiddenReasons,
  metadata: {
    changedAt: metadata.changedAt || nowTag,
    changedBy: metadata.changedBy || 'seed-data',
    comment: metadata.comment || '',
  },
})

export const visibilityRegistry = {
  'hundred-islands-gateway': createEntry({
    scopes: { home: true, destinations: true, heritage: false, search: true },
  }),
  'minor-basilica-of-our-lady-of-manaoag': createEntry({
    scopes: { home: true, destinations: true, heritage: true, search: true },
  }),
  'patar-beach': createEntry({
    scopes: { home: true, destinations: true, heritage: false, search: true },
  }),
  'cape-bolinao-lighthouse': createEntry({
    scopes: { home: true, destinations: true, heritage: true, search: true },
  }),
  'bolinao-falls': createEntry({
    scopes: { home: true, destinations: true, heritage: false, search: true },
  }),
  'tondol-beach': createEntry({
    scopes: { home: true, destinations: true, heritage: false, search: true },
  }),
  'balingasay-river': createEntry({
    scopes: { home: false, destinations: false, heritage: false, search: true },
  }),
  'lingayen-beach-and-gulf': createEntry({
    scopes: { home: false, destinations: false, heritage: true, search: true },
  }),
  'pangasinan-provincial-capitol-complex': createEntry({
    scopes: { home: false, destinations: false, heritage: true, search: true },
  }),
  'balungao-hilltop-adventure-and-hot-springs': createEntry({
    scopes: { home: false, destinations: false, heritage: false, search: true },
  }),
  'colibra-island': createEntry({
    scopes: { home: true, destinations: true, heritage: false, search: true },
  }),
  'enchanted-cave': createEntry({
    scopes: { home: false, destinations: false, heritage: true, search: true },
  }),
  'pangasinan-provincial-museum': createEntry({
    scopes: { home: false, destinations: false, heritage: true, search: true },
  }),
  'st-john-the-evangelist-cathedral': createEntry({
    scopes: { home: false, destinations: false, heritage: true, search: true },
  }),
}

const defaultEntry = createEntry({
  scopes: { home: false, destinations: false, heritage: false, search: true },
})

export const getVisibility = (spotId) => visibilityRegistry[spotId] || defaultEntry

export const isVisibleInScope = (spotId, scope) => {
  const visibility = getVisibility(spotId)

  if (visibility.status !== 'visible') {
    return false
  }

  return Boolean(visibility.scopes?.[scope])
}

export const validateVisibilityRegistry = (spots = []) => {
  const errors = []

  spots.forEach((spot) => {
    const visibility = visibilityRegistry[spot.id]

    if (!visibility) {
      errors.push(`Missing visibility metadata for ${spot.id}`)
      return
    }

    if (visibility.status !== 'visible' && visibility.hiddenReasons.length === 0) {
      errors.push(`Hidden spot ${spot.id} is missing hidden reasons`)
    }

    if (!visibility.metadata?.changedAt || Number.isNaN(Date.parse(visibility.metadata.changedAt))) {
      errors.push(`Invalid changedAt timestamp for ${spot.id}`)
    }
  })

  return errors
}
