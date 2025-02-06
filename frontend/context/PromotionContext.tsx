"use client";

import { createContext, useContext, useState } from "react";
import {Promotion, Comment} from "@/types"


// tipo de los valores del contexto
interface PromotionContextType {
  promotions: Promotion[];
  addPromotion: (promotion: Promotion) => void;
  editPromotion: (updatedPromotion: Promotion) => void;
  deletePromotion: (id: string) => void;
  openModal: (promotion?: Promotion) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  editingPromotion: Promotion | null;
  addComment: (promotionId: string, comment: Comment) => void;
}

// Crear el contexto con valores iniciales vacíos
const PromotionContext = createContext<PromotionContextType | undefined>(undefined);

// **Hook para acceder al contexto y evitar error por undefined**
export const usePromotionContext = () => {
  const context = useContext(PromotionContext);
  if (!context) {
    throw new Error("usePromotionContext debe estar dentro de un PromotionProvider");
  }
  return context;
};

// **Proveedor del contexto**
export function PromotionProvider({ children }: { children: React.ReactNode }) {
    const [promotions, setPromotions] = useState<Promotion[]>([
        {
          id: "1",
          title: "Pan de barra",
          description: "Encontré esta súper oferta en Walmart",
          category: "Panadería",
          previousPrice: "25",
          currentPrice: "20",
          discount: 20,
          supermarket: { id: 1, name: "Walmart", logo:"https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=100", address: "123 Market Street, Downtown" },
          location: "123 Market Street, Downtown",
          imageUrl: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=2832",
          likes: 24,
          dislikes: 2,
          reports: 0,
          comments: [
            {
              id: "c1",
              user: { name: "Jane Smith", avatar: "/avatars/jane.png" },
              text: "¡Qué buena oferta!",
              date: "Hace 5 minutos",
            },
            {
              id: "c2",
              user: { name: "John Doe", avatar: "/avatars/john.png" },
              text: "Voy a comprarla hoy mismo.",
              date: "Hace 10 minutos",
            },
          ],
        },
      ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  // Agregar una nueva publicación
  const addPromotion = (promotion: Promotion) => {
    setPromotions((prev) => [...prev, promotion]);
  };

  // Editar una publicación existente
  const editPromotion = (updatedPromotion: Promotion) => {
    setPromotions((prev) =>
      prev.map((promotion) =>
        promotion.id === updatedPromotion.id ? updatedPromotion : promotion
      )
    );
  };

  // Eliminar una publicación
  const deletePromotion = (id: string) => {
    setPromotions((prev) => prev.filter((promotion) => promotion.id !== id));
  };

  // Agregar un comentario a una promoción
  const addComment = (promotionId: string, comment: Comment) => {
    setPromotions((prev) =>
      prev.map((promotion) =>
        promotion.id === promotionId
          ? { ...promotion, comments: [...promotion.comments, comment] }
          : promotion
      )
    );
  };

  // Abrir el modal para crear o editar
  const openModal = (promotion?: Promotion) => {
    setEditingPromotion(promotion || null);
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPromotion(null);
  };

  return (
    <PromotionContext.Provider
      value={{
        promotions,
        addPromotion,
        editPromotion,
        deletePromotion,
        openModal,
        closeModal,
        isModalOpen,
        editingPromotion,
        addComment
      }}
    >
      {children}
    </PromotionContext.Provider>
  );
}
