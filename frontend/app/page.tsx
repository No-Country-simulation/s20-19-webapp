import { MainLayout } from '@/components/layouts/main-layout';
import { SharePromotion } from '@/components/share-promotion';
import { PromotionFeed } from '@/components/promotions/promotion-feed';

export default function Home() {
  return (
    <MainLayout>
    <div className="container mx-auto space-y-4 mt-10 flex flex-col items-center">
      <SharePromotion />
      <PromotionFeed />
    </div>
  </MainLayout>
  );
}