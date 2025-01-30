import { MainLayout } from '@/components/layouts/main-layout';
import { SharePromotion } from '@/components/share-promotion';
import { PromotionFeed } from '@/components/promotions/promotion-feed';

export default function Home() {
  return (
    <MainLayout>
      <div className="container mx-auto space-y-8 mt-10">
        <SharePromotion />
        <PromotionFeed />
      </div>
    </MainLayout>
  );
}