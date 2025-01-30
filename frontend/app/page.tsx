import { MainLayout } from '@/components/layouts/main-layout';
import { SharePromotion } from '@/components/share-promotion';
import { PromotionFeed } from '@/components/promotions/promotion-feed';
import { MainNav } from '@/components/layouts/main-nav';
import { MobileNav } from '@/components/layouts/mobile-nav';
import { Sidebar } from '@/components/layouts/sidebar';

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