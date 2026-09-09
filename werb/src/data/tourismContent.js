export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Heritage Sites', path: '/heritage' },
]

const APP_BASE = import.meta.env.BASE_URL || '/'
const SPOT_IMAGE_BASE = `${APP_BASE.replace(/\/$/, '')}/images/spots`

const placeholderImage = (id) => `${SPOT_IMAGE_BASE}/${id}.jpg`

const RAW_SPOTS = [
  {
    id: 'hundred-islands-gateway',
    name: 'Hundred Islands Gateway',
    location: 'Alaminos',
    category: 'Island Adventure',
    summary: 'Pangasinan\'s best-known island-hopping destination.',
    description:
      'Pangasinan\'s best-known destination, with more than 100 limestone islands for island-hopping, swimming, snorkeling, kayaking, and beach picnics.',
    fee: 'Varies by tour package',
    hours: '6:00 AM - 5:00 PM',
    image: placeholderImage('hundred-islands-gateway'),
    alt: 'Boat tour jump-off point at Hundred Islands Gateway in Alaminos',
    tags: ['nature', 'island-hopping', 'family'],
  },
  {
    id: 'minor-basilica-of-our-lady-of-manaoag',
    name: 'Minor Basilica of Our Lady of Manaoag',
    location: 'Manaoag',
    category: 'Religious Heritage',
    summary: 'Historic Catholic pilgrimage destination in Pangasinan.',
    description:
      'One of the Philippines\' most important Catholic pilgrimage sites, visited for its revered image of the Virgin Mary and its historic religious atmosphere.',
    fee: 'Free entry',
    hours: '5:00 AM - 8:00 PM',
    image: placeholderImage('minor-basilica-of-our-lady-of-manaoag'),
    alt: 'Facade of Minor Basilica of Our Lady of Manaoag in Pangasinan',
    tags: ['pilgrimage', 'church', 'history'],
  },
  {
    id: 'patar-beach',
    name: 'Patar Beach',
    location: 'Bolinao',
    category: 'Beach Escape',
    summary: 'Golden-sand beach known for sunset views.',
    description:
      'A popular white- and golden-sand beach with clear water, dramatic rock formations, and scenic sunsets over the West Philippine Sea.',
    fee: 'Public access with possible local fees',
    hours: 'Open 24 hours',
    image: placeholderImage('patar-beach'),
    alt: 'Golden shoreline and clear waters at Patar Beach in Bolinao',
    tags: ['beach', 'sunset', 'swimming'],
  },
  {
    id: 'cape-bolinao-lighthouse',
    name: 'Cape Bolinao Lighthouse',
    location: 'Bolinao',
    category: 'Coastal Heritage',
    summary: 'Spanish-era lighthouse with panoramic coastal views.',
    description:
      'A Spanish-era lighthouse completed in 1905. It stands on a hill and offers panoramic coastal views, making it a significant heritage landmark.',
    fee: 'Free entry',
    hours: '6:00 AM - 6:00 PM',
    image: placeholderImage('cape-bolinao-lighthouse'),
    alt: 'Cape Bolinao Lighthouse overlooking the coast of Pangasinan',
    tags: ['heritage', 'lighthouse', 'viewpoint'],
  },
  {
    id: 'bolinao-falls',
    name: 'Bolinao Falls',
    location: 'Bolinao',
    category: 'Nature Retreat',
    summary: 'Refreshing waterfalls and natural pools for day trips.',
    description:
      'A group of refreshing waterfalls surrounded by lush vegetation. Visitors can swim in the natural pools and enjoy a relaxing nature trip.',
    fee: 'Paid entry',
    hours: '7:00 AM - 5:00 PM',
    image: placeholderImage('bolinao-falls'),
    alt: 'Natural pool and waterfall setting at Bolinao Falls',
    tags: ['waterfall', 'nature', 'swimming'],
  },
  {
    id: 'tondol-beach',
    name: 'Tondol Beach',
    location: 'Anda',
    category: 'Beach Escape',
    summary: 'Family-friendly beach with calm, shallow waters.',
    description:
      'A family-friendly beach with fine white sand and shallow, calm water. It is ideal for swimming, camping, and sunset viewing.',
    fee: 'Public access with possible local fees',
    hours: 'Open 24 hours',
    image: placeholderImage('tondol-beach'),
    alt: 'Shallow beachfront waters and white sand at Tondol Beach in Anda',
    tags: ['beach', 'family', 'camping'],
  },
  {
    id: 'balingasay-river',
    name: 'Balingasay River',
    location: 'Bolinao',
    category: 'Eco Tourism',
    summary: 'Mangrove-lined river ideal for peaceful nature tours.',
    description:
      'A peaceful mangrove-lined river that can be explored by boat or kayak. It is a good place for nature sightseeing and eco-tourism.',
    fee: 'Varies by boat or kayak rental',
    hours: '6:00 AM - 5:00 PM',
    image: placeholderImage('balingasay-river'),
    alt: 'Mangrove-lined calm waters of Balingasay River in Bolinao',
    tags: ['mangrove', 'kayak', 'eco-tourism'],
  },
  {
    id: 'lingayen-beach-and-gulf',
    name: 'Lingayen Beach and Gulf',
    location: 'Lingayen',
    category: 'Historical Coastline',
    summary: 'Historic coastline linked to World War II landings.',
    description:
      'A wide coastal area connected to the World War II Lingayen Gulf landings. Visitors can enjoy the beach while learning about its historical importance.',
    fee: 'Free entry',
    hours: 'Open 24 hours',
    image: placeholderImage('lingayen-beach-and-gulf'),
    alt: 'Wide beachfront along Lingayen Gulf with open coastal horizon',
    tags: ['history', 'beach', 'wwii'],
  },
  {
    id: 'pangasinan-provincial-capitol-complex',
    name: 'Pangasinan Provincial Capitol Complex',
    location: 'Lingayen',
    category: 'Civic Heritage',
    summary: 'Historic civic grounds near Lingayen Beach.',
    description:
      'A heritage area featuring historic government buildings, monuments, and open grounds near Lingayen Beach.',
    fee: 'Free entry',
    hours: '8:00 AM - 5:00 PM',
    image: placeholderImage('pangasinan-provincial-capitol-complex'),
    alt: 'Historic buildings and monuments at Pangasinan Provincial Capitol Complex',
    tags: ['heritage', 'civic', 'monument'],
  },
  {
    id: 'balungao-hilltop-adventure-and-hot-springs',
    name: 'Balungao Hilltop Adventure and Hot Springs',
    location: 'Balungao',
    category: 'Adventure Park',
    summary: 'Hot springs and outdoor adventure activities in one site.',
    description:
      'A recreation site offering hot spring pools, ziplining, and outdoor activities with views of the surrounding countryside.',
    fee: 'Paid entry',
    hours: '8:00 AM - 5:00 PM',
    image: placeholderImage('balungao-hilltop-adventure-and-hot-springs'),
    alt: 'Hilltop recreation area with hot spring amenities in Balungao',
    tags: ['adventure', 'hotspring', 'zipline'],
  },
  {
    id: 'colibra-island',
    name: 'Colibra Island',
    location: 'Dasol',
    category: 'Island Escape',
    summary: 'Small white-sand island for peaceful beach getaways.',
    description:
      'A small island with white sand, turquoise water, and a quiet beach setting, usually visited through island-hopping tours.',
    fee: 'Varies by tour package',
    hours: 'Day tours only',
    image: placeholderImage('colibra-island'),
    alt: 'Quiet white-sand shoreline and turquoise waters of Colibra Island',
    tags: ['island', 'beach', 'day-trip'],
  },
  {
    id: 'enchanted-cave',
    name: 'Enchanted Cave',
    location: 'Bolinao',
    category: 'Cultural Nature Site',
    summary: 'Natural cave pool tied to local stories and eco-tourism.',
    description:
      'A natural cave pool tied to local stories and eco-tourism, popular for short nature stops and guided visits.',
    fee: 'Paid entry',
    hours: '7:00 AM - 5:00 PM',
    accessibility: 'Short walk from drop-off point, uneven ground in sections.',
    image: placeholderImage('enchanted-cave'),
    alt: 'Natural cave pool setting at Enchanted Cave in Bolinao',
    tags: ['cave', 'nature', 'eco-tourism'],
  },
  {
    id: 'pangasinan-provincial-museum',
    name: 'Pangasinan Provincial Museum',
    location: 'Lingayen',
    category: 'Historical Museum',
    summary: 'Museum collections highlighting Pangasinan history.',
    description:
      'Collections highlighting Pangasinan history and heritage, including local narratives, artifacts, and educational exhibits.',
    fee: 'Minimal or free admission days',
    hours: '8:00 AM - 5:00 PM',
    accessibility: 'Ground-floor exhibits and staff assistance available.',
    image: placeholderImage('pangasinan-provincial-museum'),
    alt: 'Museum gallery space for local historical exhibits in Lingayen',
    tags: ['museum', 'history', 'education'],
  },
  {
    id: 'st-john-the-evangelist-cathedral',
    name: 'St. John the Evangelist Cathedral',
    location: 'Dagupan',
    category: 'Religious Heritage',
    summary: 'Heritage church central to local faith traditions.',
    description:
      'A heritage church central to local faith and annual traditions, known as one of Dagupan\'s notable religious landmarks.',
    fee: 'Free entry',
    hours: '5:30 AM - 7:00 PM',
    accessibility: 'Ramp access at side entrance.',
    image: placeholderImage('st-john-the-evangelist-cathedral'),
    alt: 'Historic facade of St. John the Evangelist Cathedral in Dagupan',
    tags: ['church', 'faith', 'heritage'],
  },
]

const normalizeSpot = (spot) => ({
  ...spot,
  town: spot.location,
  type: spot.category,
})

const dedupeById = (spots) => {
  const seen = new Set()
  return spots.filter((spot) => {
    if (seen.has(spot.id)) {
      return false
    }

    seen.add(spot.id)
    return true
  })
}

export const tourismSpots = dedupeById(RAW_SPOTS.map(normalizeSpot))

export const featuredSites = tourismSpots.filter((spot) =>
  [
    'hundred-islands-gateway',
    'minor-basilica-of-our-lady-of-manaoag',
    'patar-beach',
    'cape-bolinao-lighthouse',
    'bolinao-falls',
    'tondol-beach',
    'colibra-island',
  ].includes(spot.id),
)

export const culturalEvents = [
  {
    name: 'Pista’y Dayat',
    month: 'April',
    details: 'A festival celebrating Pangasinan coastal life, music, and food.',
  },
  {
    name: 'Bagoong Festival',
    month: 'January',
    details: 'Highlights local cuisine, crafts, and family-friendly activities.',
  },
  {
    name: 'Town Fiesta Weekends',
    month: 'Year-round',
    details: 'Community heritage events across municipalities and barangays.',
  },
]

export const travelTips = [
  'Travel early to avoid midday heat and crowd peaks.',
  'Carry water, sun protection, and cash for local entrances.',
  'Respect local customs in heritage and religious areas.',
  'Use accredited local guides where available.',
]

export const heritageSites = tourismSpots.filter((spot) =>
    [
      'minor-basilica-of-our-lady-of-manaoag',
      'cape-bolinao-lighthouse',
      'lingayen-beach-and-gulf',
      'pangasinan-provincial-capitol-complex',
      'enchanted-cave',
      'pangasinan-provincial-museum',
      'st-john-the-evangelist-cathedral',
    ].includes(spot.id),
  )

export const contactDetails = {
  email: 'visitpangasinan@example.com',
  phone: '+63 900 123 4567',
  officeHours: 'Monday to Friday, 8:00 AM - 5:00 PM',
  address: 'Tourism Information Desk, Lingayen, Pangasinan',
}
