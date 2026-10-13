export type FoodItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: string;
  time: string;
  image: string;
};

export type CartItems = Record<string, number>;

export const slides = [
  {
    eyebrow: 'GOOD FOOD, GOOD MOOD',
    title: 'A little joy,',
    accent: 'delivered.',
    description: 'Meet your new favorite way to find something delicious.',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
    imageLabel: 'A colorful, freshly prepared salad bowl',
  },
  {
    eyebrow: 'MADE FRESH, ALWAYS',
    title: 'Fresh picks,',
    accent: 'made for you.',
    description: 'From cozy comfort food to bright, feel-good favorites.',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85',
    imageLabel: 'A fresh salad with colorful seasonal ingredients',
  },
  {
    eyebrow: 'YOUR NEXT BITE AWAITS',
    title: 'Find your',
    accent: 'kind of yum.',
    description: 'Explore the menu at your own pace. No sign-up needed.',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85',
    imageLabel: 'A freshly baked pizza ready to share',
  },
];

export const foodItems: FoodItem[] = [
  {
    id: 'sunshine-bowl',
    name: 'Sunshine grain bowl',
    description: 'Avocado, greens & lemon tahini',
    category: 'Bowls',
    price: 12.5,
    rating: '4.9',
    time: '15–20 min',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'margherita-pizza',
    name: 'Garden Margherita',
    description: 'Basil, creamy mozzarella & tomato',
    category: 'Pizza',
    price: 16,
    rating: '4.8',
    time: '20–25 min',
    image:
      'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'berry-pancakes',
    name: 'Berry cloud pancakes',
    description: 'Fluffy stacks with maple & berries',
    category: 'Brunch',
    price: 11,
    rating: '4.9',
    time: '15–20 min',
    image:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'summer-pasta',
    name: 'Summer pesto pasta',
    description: 'Basil pesto, parmesan & cherry tomato',
    category: 'Pasta',
    price: 14.5,
    rating: '4.7',
    time: '20–25 min',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85',
  },
];

export const categories = ['All', 'Bowls', 'Pizza', 'Brunch', 'Pasta'];
