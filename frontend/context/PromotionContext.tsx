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
          supermarket: {
            id: 1,
            name: "Walmart",
            logo: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=100",
            address: "123 Market Street, Downtown"
          },
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
        {
          id: "2",
          title: "Leche deslactosada",
          description: "Oferta especial en leche deslactosada en Walmart",
          category: "Lácteos",
          previousPrice: "35",
          currentPrice: "28",
          discount: 20,
          supermarket: {
            id: 1,
            name: "Walmart",
            logo: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=100",
            address: "456 Main Street, Uptown"
          },
          location: "456 Main Street, Uptown",
          imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=2832",
          likes: 15,
          dislikes: 1,
          reports: 0,
          comments: [
            {
              id: "c3",
              user: { name: "Carlos López", avatar: "/avatars/carlos.png" },
              text: "Justo lo que necesitaba, gracias!",
              date: "Hace 15 minutos",
            }
          ],
        },
        {
          id: "3",
          title: "Manzanas Fuji",
          description: "Descuento en manzanas Fuji frescas en Walmart",
          category: "Frutas y Verduras",
          previousPrice: "50",
          currentPrice: "38",
          discount: 24,
          supermarket: {
            id: 1,
            name: "Walmart",
            logo: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=100",
            address: "789 Green Avenue, Suburbs"
          },
          location: "789 Green Avenue, Suburbs",
          imageUrl: "https://res.cloudinary.com/dworm9bnx/image/upload/v1738868750/xskzvwmd2nrgwpunwswo.jpg",
          likes: 30,
          dislikes: 0,
          reports: 0,
          comments: [],
        },
        {
          id: "4",
          title: "Pechuga de Pollo",
          description: "Oferta en pechuga de pollo deshuesada",
          category: "Carnes",
          previousPrice: "80",
          currentPrice: "65",
          discount: 19,
          supermarket: {
            id: 1,
            name: "Walmart",
            logo: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=100",
            address: "101 Food Court, Central"
          },
          location: "101 Food Court, Central",
          imageUrl: "https://res.cloudinary.com/dworm9bnx/image/upload/v1738868588/rvfykquocoriyf7epoes.jpg",
          likes: 40,
          dislikes: 3,
          reports: 1,
          comments: [
            {
              id: "c4",
              user: { name: "Ana Martínez", avatar: "/avatars/ana.png" },
              text: "Se ve muy bien, compraré algunas.",
              date: "Hace 30 minutos",
            },
            {
              id: "c5",
              user: { name: "Luis Gómez", avatar: "/avatars/luis.png" },
              text: "El precio está excelente!",
              date: "Hace 45 minutos",
            }
          ],
        },
        {
          id: "5",
          title: "Aceite de oliva extra virgen",
          description: "Gran oferta en aceite de oliva extra virgen",
          category: "Abarrotes",
          previousPrice: "120",
          currentPrice: "95",
          discount: 21,
          supermarket: {
            id: 1,
            name: "Walmart",
            logo: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=100",
            address: "202 Gourmet Street, Downtown"
          },
          location: "202 Gourmet Street, Downtown",
          imageUrl: "https://res.cloudinary.com/dworm9bnx/image/upload/v1738868446/g3w0fbi13astghdgldgo.webp",
          likes: 50,
          dislikes: 5,
          reports: 2,
          comments: [
            {
              id: "c6",
              user: { name: "Marta Ruiz", avatar: "/avatars/marta.png" },
              text: "Excelente calidad, lo recomiendo.",
              date: "Hace 1 hora",
            }
          ],
        }
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
