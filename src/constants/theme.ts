/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
export const GLASSES_FILTERS = [
  'All',
  'Round',
  'Square',
  'Aviator',
  'Cat Eye',
  'Blue Light',
  'Premium',
  'Sunglasses',
];


export const glassesData = [
  {
    id: '1',
    title: 'Square Frames',
    category: 'Square',
    price: '$120',
    rating: 4.8,
    stock: 14,
    colors: ['Black', 'Silver', 'Transparent'],
    sizes: ['Medium', 'Large'],
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',

    description:
      'Elevate your everyday style with these premium square frame glasses crafted for modern comfort and timeless elegance. Designed with lightweight materials and anti-slip temples, these frames deliver all-day wearability without compromising on sophistication. The structured square silhouette complements most face shapes, making it the perfect choice for office wear, casual outings, and premium fashion styling. Featuring high-definition lenses with blue light protection, scratch resistance, and enhanced clarity, this eyewear blends fashion and functionality seamlessly. Whether you are working long hours, traveling, or styling a luxury streetwear outfit, these frames provide a bold and confident appearance.',

    features: [
      'Blue light protection',
      'Scratch-resistant lens',
      'Lightweight premium frame',
      'Anti-slip nose pads',
      'UV protection coating',
    ],
  },

  {
    id: '2',
    title: 'Classic Eyewear',
    category: 'Premium',
    price: '$150',
    rating: 4.9,
    stock: 8,
    colors: ['Gold', 'Brown', 'Matte Black'],
    sizes: ['Medium'],
    image:
      'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1200&auto=format&fit=crop',

    description:
      'A luxurious blend of minimal design and premium craftsmanship, these classic eyewear frames are made for individuals who appreciate refined details. The elegant metallic finish combined with ultra-clear lenses offers a sophisticated look suitable for both formal and casual environments. Designed with advanced lens technology to reduce eye fatigue and glare, these glasses provide unmatched visual comfort during prolonged screen usage. The timeless aesthetic ensures versatility across every wardrobe, while the durable hinge construction enhances long-term reliability and performance.',

    features: [
      'Premium metal finish',
      'Anti-glare technology',
      'Comfort-fit temples',
      'Flexible hinge support',
      'Luxury designer styling',
    ],
  },

  {
    id: '3',
    title: 'Retro Vision',
    category: 'Round',
    price: '$98',
    rating: 4.7,
    stock: 21,
    colors: ['Tortoise', 'Brown', 'Black'],
    sizes: ['Small', 'Medium'],
    image:
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1200&auto=format&fit=crop',

    description:
      'Inspired by vintage fashion trends, Retro Vision glasses bring iconic round-frame styling into the modern era. These frames feature smooth curved edges, lightweight construction, and enhanced optical clarity for a nostalgic yet premium experience. Ideal for creators, artists, and trendsetters, the timeless design pairs perfectly with streetwear, casual fits, and contemporary fashion collections. The advanced lens coating helps reduce reflections while maintaining sharp visibility in indoor and outdoor environments.',

    features: [
      'Vintage-inspired design',
      'Reflection-resistant lenses',
      'Ultra-lightweight body',
      'Comfort nose support',
      'Fashion-forward styling',
    ],
  },

  {
    id: '4',
    title: 'Urban Frames',
    category: 'Square',
    price: '$140',
    rating: 4.6,
    stock: 12,
    colors: ['Black', 'Gunmetal'],
    sizes: ['Large'],
    image:
      'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1200&auto=format&fit=crop',

    description:
      'Built for urban lifestyles, these contemporary square glasses combine sleek aesthetics with everyday durability. Featuring a reinforced frame structure and premium matte finish, Urban Frames are designed for individuals who prefer bold and confident styling. The ergonomic design minimizes pressure around the ears and nose, making them ideal for extended daily usage. Equipped with blue light filtering technology and UV protection, these glasses offer superior comfort for digital workspaces and outdoor environments alike.',

    features: [
      'Urban luxury design',
      'Matte premium finish',
      'Blue light filtering',
      'Strong durable frame',
      'All-day comfort fit',
    ],
  },

  {
    id: '5',
    title: 'Clear Vision',
    category: 'Blue Light',
    price: '$165',
    rating: 5.0,
    stock: 6,
    colors: ['Transparent', 'Silver'],
    sizes: ['Medium'],
    image:
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1200&auto=format&fit=crop',

    description:
      'Engineered for professionals and digital creators, Clear Vision glasses provide advanced blue light protection with crystal-clear optics for maximum visual comfort. The transparent premium frame delivers a clean and modern appearance while maintaining lightweight flexibility for long working hours. Designed to reduce digital eye strain, headaches, and screen glare, these glasses are ideal for gaming, coding, editing, and office productivity. The elegant finish ensures effortless pairing with minimalist and luxury fashion aesthetics.',

    features: [
      'Advanced blue light filter',
      'Crystal-clear optics',
      'Minimal transparent design',
      'Gaming & work optimized',
      'Ultra-light flexible frame',
    ],
  },

  {
    id: '6',
    title: 'Aviator Elite',
    category: 'Aviator',
    price: '$210',
    rating: 4.9,
    stock: 5,
    colors: ['Gold', 'Silver'],
    sizes: ['Medium', 'Large'],
    image:
      'https://images.unsplash.com/photo-1701252374715-b5d8ab0b5f2c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    description:
      'A timeless aviator silhouette reimagined with luxury materials and modern optical enhancements. Aviator Elite frames feature precision-crafted metallic detailing, lightweight comfort, and premium UV-protected lenses for superior clarity and eye protection. The iconic shape enhances facial structure while delivering a bold and confident presence suitable for luxury styling, travel, and daily fashion wear.',

    features: [
      'Luxury aviator styling',
      'UV400 protection',
      'Premium metallic finish',
      'High-definition optics',
      'Travel-ready comfort',
    ],
  },

  {
    id: '7',
    title: 'Cat Eye Luxe',
    category: 'Cat Eye',
    price: '$175',
    rating: 4.8,
    stock: 9,
    colors: ['Rose Gold', 'Black'],
    sizes: ['Small', 'Medium'],
    image:
      'https://images.unsplash.com/photo-1603578119639-798b8413d8d7?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    description:
      'Designed for elegant styling and premium fashion statements, Cat Eye Luxe frames feature graceful curves with modern luxury detailing. The elevated cat-eye silhouette enhances facial contours while maintaining lightweight comfort and visual clarity. Crafted with durable premium materials, these glasses deliver long-lasting performance alongside sophisticated styling for everyday fashion lovers.',

    features: [
      'Elegant cat-eye silhouette',
      'Luxury polished finish',
      'Comfort lightweight fit',
      'Enhanced facial styling',
      'Premium lens clarity',
    ],
  },

  {
    id: '8',
    title: 'SunGuard Pro',
    category: 'Sunglasses',
    price: '$190',
    rating: 4.7,
    stock: 16,
    colors: ['Black', 'Brown', 'Blue'],
    sizes: ['Medium', 'Large'],
    image:
      'https://images.unsplash.com/photo-1584036553516-bf83210aa16c?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    description:
      'Experience superior outdoor protection with SunGuard Pro sunglasses engineered for maximum comfort and visual clarity. Featuring polarized lenses with advanced UV protection, these sunglasses reduce glare while enhancing color contrast and sharpness. The premium frame construction ensures durability and lightweight comfort, making them ideal for driving, travel, beach outings, and daily outdoor wear.',

    features: [
      'Polarized UV lenses',
      'Outdoor glare reduction',
      'Luxury sporty styling',
      'Durable lightweight frame',
      'Travel & driving optimized',
    ],
  },

  {
    id: '9',
    title: 'Minimal Air',
    category: 'Premium',
    price: '$220',
    rating: 4.9,
    stock: 4,
    colors: ['Silver', 'Transparent'],
    sizes: ['Medium'],
    image:
      'https://images.unsplash.com/photo-1614715838608-dd527c46231d?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    description:
      'Minimal Air glasses redefine modern luxury with an ultra-lightweight frame structure and clean architectural design. Crafted for individuals who appreciate simplicity and premium aesthetics, these glasses deliver exceptional wearing comfort with barely noticeable weight. The refined lens technology offers crystal-clear vision with anti-reflective protection for professional and lifestyle usage.',

    features: [
      'Ultra-light frame design',
      'Minimal luxury aesthetic',
      'Anti-reflective coating',
      'Premium comfort support',
      'Professional modern styling',
    ],
  },

  {
    id: '10',
    title: 'Neo Vision X',
    category: 'Blue Light',
    price: '$145',
    rating: 4.6,
    stock: 18,
    colors: ['Black', 'Blue', 'Grey'],
    sizes: ['Medium', 'Large'],
    image:
      'https://images.unsplash.com/photo-1574065557312-b7cc977d8a89?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    description:
      'Neo Vision X combines futuristic styling with next-generation eye protection technology for modern digital lifestyles. Featuring premium blue light filtering lenses and ergonomic frame construction, these glasses help reduce screen fatigue while maintaining sharp visual performance. The bold contemporary design makes them perfect for gamers, developers, creatives, and fashion enthusiasts looking for both functionality and modern aesthetics.',

    features: [
      'Next-gen blue light filter',
      'Gaming optimized lenses',
      'Modern futuristic styling',
      'Comfort-fit ergonomic design',
      'Enhanced screen clarity',
    ],
  },
];