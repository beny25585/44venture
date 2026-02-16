export const brands = [
  { id: 'failblog', name: 'FailBlog', color: '#231F20' },
  { id: 'memebase', name: 'Memebase', color: '#3B7A4D' },
  { id: 'animalcomedy', name: 'AnimalComedy', color: '#FB8C00' },
  { id: 'cheezburger', name: 'I Can Haz Cheezburger', color: '#B35C3E' },
  { id: 'hottakes', name: 'Hot Takes', color: '#2E2E2E' },
  { id: 'geekuniverse', name: 'Geek Universe', color: '#9039E4' },
  { id: 'ceezcake', name: 'Ceezcake', color: '#D85A6F' },
];

export const interests = [
  'Celebs', 'TV', 'Films', 'Music', 'Sports', 'Harry Potter', 
  'Lord of the Rings', 'Psychology', 'Gaming', 'Technology',
  'Food', 'Travel', 'Fashion', 'Art', 'Science', 'History',
  'Books', 'Photography', 'Fitness', 'Nature', 'Animals', 'Comics'
];

export const liveContent = [
  {
    id: '1',
    title: 'Cats Being Absolute Jerks Compilation',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    category: 'animalcomedy',
    claimed: false,
    claimedBy: null,
    source: 'https://reddit.com/r/CatsAreAssholes',
    trends: 'Rising 45% in last 24h',
    seoKeywords: ['cats', 'funny cats', 'cat fails'],
  },
  {
    id: '2',
    title: 'Epic Wedding Cake Disaster Goes Viral',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e5b0c85a?w=400&h=400&fit=crop',
    category: 'failblog',
    claimed: true,
    claimedBy: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    source: 'https://twitter.com/weddingfails',
    trends: 'Trending #3 on Twitter',
    seoKeywords: ['wedding fails', 'cake disaster', 'viral'],
  },
  {
    id: '3',
    title: 'New Meme Format Takes Over Internet',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop',
    category: 'memebase',
    claimed: false,
    claimedBy: null,
    source: 'https://knowyourmeme.com',
    trends: 'Spiking 200% today',
    seoKeywords: ['meme', 'viral meme', 'new meme format'],
  },
  {
    id: '4',
    title: 'Dog Learns to Open Fridge, Chaos Ensues',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=500&fit=crop',
    category: 'animalcomedy',
    claimed: true,
    claimedBy: { name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    source: 'https://tiktok.com/@doglife',
    trends: 'Going viral on TikTok',
    seoKeywords: ['funny dogs', 'smart dog', 'dog tricks'],
  },
  {
    id: '5',
    title: 'Harry Potter Fans Discover Hidden Detail',
    image: 'https://images.unsplash.com/photo-1546953304-5d96f43c2e94?w=400&h=400&fit=crop',
    category: 'geekuniverse',
    claimed: false,
    claimedBy: null,
    source: 'https://reddit.com/r/harrypotter',
    trends: 'Hot topic in fandom',
    seoKeywords: ['harry potter', 'easter egg', 'fandom'],
  },
  {
    id: '6',
    title: 'Grocery Store Self-Checkout Malfunction',
    image: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=400&h=400&fit=crop',
    category: 'failblog',
    claimed: false,
    claimedBy: null,
    source: 'https://youtube.com/shorts',
    trends: 'Steady growth',
    seoKeywords: ['fail', 'technology fail', 'grocery'],
  },
  {
    id: '7',
    title: 'Cat Photobombs Every Family Picture',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=500&fit=crop',
    category: 'cheezburger',
    claimed: false,
    claimedBy: null,
    source: 'https://instagram.com/catlife',
    trends: 'Instagram trending',
    seoKeywords: ['cat photobomb', 'funny cats', 'family photos'],
  },
  {
    id: '8',
    title: 'Best Lord of the Rings Memes This Week',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop',
    category: 'memebase',
    claimed: false,
    claimedBy: null,
    source: 'https://reddit.com/r/lotrmemes',
    trends: 'Weekly roundup popular',
    seoKeywords: ['lotr', 'memes', 'lord of the rings'],
  },
];

export const weeklyTopics = {
  sunday: [
    {
      id: 'w1',
      title: 'Weekend Pet Fails Roundup',
      image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200&h=200&fit=crop',
      description: 'Compilation of the funniest pet fails from the weekend',
      category: 'animalcomedy',
    },
  ],
  monday: [
    {
      id: 'w2',
      title: 'Monday Motivation Memes',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=200&h=200&fit=crop',
      description: 'Start the week with relatable Monday memes',
      category: 'memebase',
    },
    {
      id: 'w3',
      title: 'Office Fails of the Week',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop',
      description: 'Back to work mishaps and bloopers',
      category: 'failblog',
    },
  ],
  tuesday: [
    {
      id: 'w4',
      title: 'Technology Fails Tuesday',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop',
      description: 'When technology doesn\'t cooperate',
      category: 'failblog',
    },
  ],
  wednesday: [
    {
      id: 'w5',
      title: 'Wholesome Cats Wednesday',
      image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=200&h=200&fit=crop',
      description: 'Midweek dose of adorable cat content',
      category: 'cheezburger',
    },
  ],
  thursday: [
    {
      id: 'w6',
      title: 'Throwback Meme Thursday',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop',
      description: 'Classic memes making a comeback',
      category: 'memebase',
    },
  ],
  friday: [
    {
      id: 'w7',
      title: 'Friday Feeling Compilation',
      image: 'https://images.unsplash.com/photo-1533854775446-95c4609da544?w=200&h=200&fit=crop',
      description: 'Celebrating the end of the work week',
      category: 'memebase',
    },
  ],
  saturday: [
    {
      id: 'w8',
      title: 'Saturday Chill Animal Content',
      image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=200&h=200&fit=crop',
      description: 'Relaxing animal videos for the weekend',
      category: 'animalcomedy',
    },
  ],
};

export const communityEditors = [
  {
    id: 'e1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    claimedTopics: ['Epic Wedding Cake Disaster', 'Technology Fails Tuesday', 'Office Pranks'],
  },
  {
    id: 'e2',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    claimedTopics: ['Dog Learns to Open Fridge', 'Pet Fails Roundup', 'Funny Animal Videos'],
  },
  {
    id: 'e3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    claimedTopics: ['Meme Format Analysis', 'Monday Motivation Memes', 'Viral TikTok Trends'],
  },
  {
    id: 'e4',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    claimedTopics: ['Gaming News Roundup', 'Geek Culture Updates', 'Comic Con Coverage'],
  },
  {
    id: 'e5',
    name: 'Jessica Lee',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    claimedTopics: ['Celebrity Gossip', 'Fashion Fails', 'Red Carpet Moments'],
  },
  {
    id: 'e6',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    claimedTopics: ['Sports Memes', 'Epic Sports Fails', 'Game Day Content'],
  },
];
