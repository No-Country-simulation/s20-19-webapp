'use client';

import { PromotionCard } from './promotion-card';
import { usePromotionContext } from "@/context/PromotionContext";


export function PromotionFeed() {
  const { promotions } = usePromotionContext();

  return (
    <div className="space-y-8 w-full max-w-4xl">
      {promotions.map((promotion) => (
        <PromotionCard key={promotion.id} promotion={promotion} />
      ))}
    </div>
  );
}