'use client';

import { PromotionCard } from './promotion-card';

const MOCK_PROMOTIONS = [
  {
    id: 1,
    title: 'Pan de barra',
    description: 'Encontré esta súper oferta en Walmart de Ciletes',
    imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=2832',
    price: 20,
    store: {
      name: 'Walmart',
      logo: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=100',
    },
    location: '123 Market Street, Downtown',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: 'Leche',
    description: 'Encontré esta súper oferta en Walmart de Ciletes',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=2832',
    price: 30,
    store: {
      name: 'Walmart',
      logo: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=100',
    },
    location: '123 Market Street, Downtown',
    likes: 15,
    comments: 5,
  },
];

export function PromotionFeed() {
  return (
    <div className="space-y-8">
      {MOCK_PROMOTIONS.map((promotion) => (
        <PromotionCard key={promotion.id} {...promotion} />
      ))}
    </div>
  );
}