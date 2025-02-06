"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layouts/main-layout";
import { SharePromotion } from "@/components/share-promotion";
import { PromotionFeed } from "@/components/promotions/promotion-feed";
import { CreatePromotionModal } from "@/components/promotions/create-promotion-modal"; // Importa el modal

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="container mx-auto space-y-4 mt-10 flex flex-col items-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors">
        <SharePromotion onOpen={() => setIsModalOpen(true)} />
        <PromotionFeed />
      </div>
      
      <CreatePromotionModal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </MainLayout>
  );
}
