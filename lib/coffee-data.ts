"use client";

// ENRICHED DATA with Quality, Flavor Emojis
export const COFFEE_DATA = [
  // -- ROASTED COFFEE --
  {
    id: 'guatemala-el-socorro',
    name: 'Guatemala El Socorro',
    origin: 'Guatemala',
    producer: 'Juan Diego de la Cerda',
    variety: 'Maracaturra Yellow',
    process: 'Washed',
    altitude: '1850m',
    price_250g: 18.00,
    aroma: 8, body: 6, acidity: 7, sweetness: 9, aftertaste: 7,
    tags: ['Orange 🍊', 'Honey 🍯', 'Apple 🍎'],
    type: 'Single Origin',
    quality: 'Exceptional', // New Field
    flavorEmoji: '🍯'
  },
  {
    id: 'colombia-el-paraiso-rose',
    name: 'Colombia El Paraiso (Rose Te)',
    origin: 'Colombia',
    producer: 'Diego Bermudez',
    variety: 'Castillo',
    process: 'Double Anaerobic',
    altitude: '1930m',
    price_250g: 22.00,
    aroma: 10, body: 5, acidity: 8, sweetness: 10, aftertaste: 9,
    tags: ['Rose 🌹', 'Berry 🍓', 'Clean ✨'],
    type: 'Single Origin',
    quality: 'Competition',
    flavorEmoji: '🌹'
  },
  {
    id: 'ethiopia-sidamo',
    name: 'Ethiopia Sidamo (Taferi Kela)',
    origin: 'Ethiopia',
    producer: 'Taferi Kela',
    variety: '74112',
    process: 'Washed',
    altitude: '2100m',
    price_250g: 16.00,
    aroma: 9, body: 5, acidity: 9, sweetness: 8, aftertaste: 8,
    tags: ['Peach 🍑', 'Mint 🌿', 'Floral 🌸'],
    type: 'Blend Component',
    quality: 'Specialty',
    flavorEmoji: '🍑'
  },
  {
    id: 'brazil-sul-de-minas',
    name: 'Brazil Sul de Minas',
    origin: 'Brazil',
    producer: 'Cocatrel',
    variety: 'Mixed',
    process: 'Natural',
    altitude: '1100m',
    price_250g: 12.00,
    aroma: 5, body: 9, acidity: 4, sweetness: 8, aftertaste: 6,
    tags: ['Chocolate 🍫', 'Hazelnut 🌰', 'Creamy 🥛'],
    type: 'Blend Component',
    quality: 'Premium Commercial',
    flavorEmoji: '🍫'
  },
  {
    id: 'el-salvador-santa-ana',
    name: 'El Salvador Santa Ana',
    origin: 'El Salvador',
    producer: 'El Borbollon',
    variety: 'Red Bourbon',
    process: 'Natural',
    altitude: '1400m',
    price_250g: 14.50,
    aroma: 6, body: 8, acidity: 5, sweetness: 9, aftertaste: 7,
    tags: ['Orange 🍊', 'Chocolate 🍫', 'Snickers 🥜'],
    type: 'Blend Component',
    quality: 'Specialty',
    flavorEmoji: '🥜'
  }
];
