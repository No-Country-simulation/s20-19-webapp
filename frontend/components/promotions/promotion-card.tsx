'use client';

import Image from "next/image"
import { MessageSquare, Share2, ThumbsUp, ThumbsDown, User, MapPin, Send, EllipsisVertical, Flame } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from "../ui/label";

interface PromotionCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  store: {
    name: string;
    logo: string;
  };
  location: string;
  likes: number;
  comments: number;
}

export function PromotionCard({
  title,
  description,
  imageUrl,
  price,
  store,
  location,
  likes,
  comments,
}: PromotionCardProps) {
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
          <Button variant="ghost" size="icon" className="text-green-600 border-solid border-2 border-green-600 h-6 w-6">
            <EllipsisVertical />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 ml-11">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-[hsl(var(--muted-foreground))]">{description}</p>
        <p className="text-sm text-[hsl(var(--muted-foreground))] flex mt-1">
          <MapPin className="w-5 h-5 mr-1"/>
          {location}
        </p>
      </div>

      {/* Image */}
      <div className="mt-4 relative h-[300px] rounded-md overflow-hidden m-3">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Interactions */}
      <div className="p-4 flex items-center justify-between border-t border-[hsl(var(--border))]">
        <div className="flex gap-6">
          <button className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
            <ThumbsUp className="w-5 h-5" />
            <span>{likes}</span>
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
          <span>{comments} comentarios</span>
        </button>
      </div>

      {/* Comments */}
      <div className="p-4 border-t border-[hsl(var(--border))]">
        <Button variant="link" className="text-[hsl(var(--muted-foreground))] text-green-600">
          Ver más comentarios
        </Button>
        <div className="flex gap-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div className="bg-[hsl(var(--muted))] p-2 rounded-md">
            <div className="font-medium">Jane Smith</div>
            <p className="text-[hsl(var(--muted-foreground))]">Great deal! I just got some yesterday.</p>
          </div>
        </div>

        {/* Comment input */}
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Input placeholder="Escribe un comentario" className="flex-1" />
            <Button className="bg-green-400 hover:bg-green-500 text-white">
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
