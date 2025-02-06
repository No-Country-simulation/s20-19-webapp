'use client';

import Image from "next/image"
import { MessageSquare, Share2, ThumbsUp, ThumbsDown, User, MapPin, Send, EllipsisVertical, Flame, Pencil, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from "../ui/label";
import { usePromotionContext } from "@/context/PromotionContext";
import {Promotion} from "@/types"
import { useState } from "react";

interface PromotionCardProps {
  promotion: Promotion;
}

export function PromotionCard({ promotion }: PromotionCardProps)  {

  const { openModal, deletePromotion } = usePromotionContext();
  const { addComment } = usePromotionContext();
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Manejar el envío del comentario
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      user: { name: "Usuario Actual", avatar: "/avatars/default.png" },
      text: newComment,
      date: "Hace un momento",
    };

    addComment(promotion.id, comment);
    setNewComment("");
  };

  return (
    <div className="mx-auto bg-[hsl(var(--card))] text-[hsl(var(--foreground))] rounded-lg shadow-md border border-[hsl(var(--border))]">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-[hsl(var(--muted))] rounded-t-lg">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Hace 2 minutos</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-[hsl(var(--accent))] p-1 rounded-sm">Panadería</span>
          <span className="text-sm bg-[hsl(var(--accent))] p-1 rounded-sm">Walmart</span>
          <span className="text-sm bg-[hsl(var(--accent))] p-1 rounded-sm">Precio final: $20</span>
          <span className="text-sm bg-[hsl(var(--accent))] p-1 rounded-sm flex gap-1">
            <Image src="/icons/onsale.svg" alt="Descuento" width={15} height={15} />
            %80
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label className="bg-orange-500 text-white hover:bg-orange-600 rounded-sm py-1 px-2">
                  <Flame className="h-4 w-4" />
                </Label>
              </TooltipTrigger>
              <TooltipContent>Oferta destacada</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Menú de opciones */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-green-600 border-solid border-2 border-green-600 h-6 w-6">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <div className="px-2 py-1 text-sm font-medium text-[hsl(var(--foreground))]">Acciones</div>
              <DropdownMenuItem
                className="flex items-center gap-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                onClick={() => openModal(promotion)} // Envía la promoción actual
              >
                <Pencil className="w-4 h-4" />
                Editar
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="flex items-center gap-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                onClick={() => deletePromotion(promotion.id)}
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 ml-11">
        <h2 className="text-xl font-semibold">{promotion.title}</h2>
        <p className="text-[hsl(var(--muted-foreground))]">{promotion.description}</p>
        <p className="text-sm text-[hsl(var(--muted-foreground))] flex mt-1">
          <MapPin className="w-5 h-5 mr-1"/>
          {promotion.location}
        </p>
      </div>

      {/* Image */}
      <div className="mt-4 relative h-[300px] rounded-md overflow-hidden m-3">
        <Image
          src={promotion.imageUrl}
          alt={promotion.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Interactions */}
      <div className="p-4 flex items-center justify-between border-t border-[hsl(var(--border))]">
        <div className="flex gap-6">
          <button className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
            <ThumbsUp className="w-5 h-5" />
            <span>{promotion.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
            <ThumbsDown />
            <span>24</span>
          </button>
          <button className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <button className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
  <MessageSquare className="w-5 h-5" />
  <span>{promotion.comments?.length ?? 0} comentarios</span>
</button>
</div>

{/* Comentarios */}
<div className="p-4 border-t border-[hsl(var(--border))]">
  {(promotion.comments ?? []).length > 0 && (
    <div>
      <div className="flex gap-3 mb-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src={promotion.comments?.[0]?.user?.avatar ?? "/placeholder.svg"} />
          <AvatarFallback>{promotion.comments?.[0]?.user?.name?.charAt(0) ?? "U"}</AvatarFallback>
        </Avatar>
        <div className="bg-[hsl(var(--muted))] p-2 rounded-md">
          <div className="font-medium">{promotion.comments?.[0]?.user?.name ?? "Usuario desconocido"}</div>
          <p className="text-[hsl(var(--muted-foreground))]">{promotion.comments?.[0]?.text ?? "Comentario no disponible"}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">{promotion.comments?.[0]?.date ?? "Fecha desconocida"}</p>
        </div>
      </div>

      {(promotion.comments ?? []).length > 1 && !showAllComments && (
        <Button
          variant="link"
          className="text-[hsl(var(--muted-foreground))] text-green-600"
          onClick={() => setShowAllComments(true)}
        >
          Ver más comentarios
        </Button>
      )}

      {showAllComments &&
        (promotion.comments?.slice(1) ?? []).map((comment) => (
          <div key={comment.id} className="flex gap-3 mb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.user?.avatar ?? "/placeholder.svg"} />
              <AvatarFallback>{comment.user?.name?.charAt(0) ?? "U"}</AvatarFallback>
            </Avatar>
            <div className="bg-[hsl(var(--muted))] p-2 rounded-md">
              <div className="font-medium">{comment.user?.name ?? "Usuario desconocido"}</div>
              <p className="text-[hsl(var(--muted-foreground))]">{comment.text ?? "Comentario no disponible"}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{comment.date ?? "Fecha desconocida"}</p>
            </div>
          </div>
        ))}
          </div>
        )}

        {/* Agregar Comentario */}
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="/avatars/default.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Escribe un comentario"
              className="flex-1"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment} className="bg-green-400 hover:bg-green-500 text-white">
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
