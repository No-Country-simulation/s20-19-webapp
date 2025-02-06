"use client";

import React from "react";

import { usePromotionContext } from "../context/PromotionContext";
import { SharePromotion } from "./share-promotion";
import { PromotionFeed } from "./promotions/promotion-feed";
import { CreatePromotionModal } from "./promotions/create-promotion-modal";

export function HomeContent() {
  const { isModalOpen, openModal, closeModal } = usePromotionContext();

  return (
    <div className="container mx-auto space-y-4 mt-10 flex flex-col items-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors">
      <SharePromotion onOpen={() => openModal()} />
      <PromotionFeed />
      <CreatePromotionModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
