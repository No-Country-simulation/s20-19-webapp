'use client';

import Image from "next/image"
import { MessageCircle, Share2, ThumbsUp } from "lucide-react"
import { Input } from "@/components/ui/input"

import { Store, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-muted-foreground">Hace 2 minutos</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Panadería</span>
          <span className="text-sm text-muted-foreground">Walmart</span>
          <span className="text-sm">Precio final: $20</span>
          <Badge variant="secondary" className="bg-orange-500 text-white hover:bg-orange-600">
            80%
          </Badge>
          <Button variant="ghost" size="icon" className="text-blue-500">
            <span className="sr-only">Info</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        <h2 className="text-xl font-semibold">Pan de barra</h2>
        <p className="text-muted-foreground">Encontré esta super promoción en Walmart</p>
        <p className="text-sm text-muted-foreground">
          CP 34582, Av. Ignacio Sandoval 1784, Col. Villahermosa, Colima, Colima
        </p>
      </div>

      {/* Image */}
      <div className="mt-4 relative h-[300px]">
        <Image
          src="https://res.cloudinary.com/dworm9bnx/image/upload/v1738203133/pan_xplxdn.png"
          alt="Sara Lee bread promotion"
          fill
          className="object-cover"
        />
      </div>

      {/* Interactions */}
      <div className="p-4 flex items-center justify-between border-t">
        <div className="flex gap-6">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ThumbsUp className="w-5 h-5" />
            <span>24</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Share2 className="w-5 h-5" />
            <span>24</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <MessageCircle className="w-5 h-5" />
            <span>8 comentarios</span>
          </button>
        </div>
        <Button variant="link" className="text-muted-foreground">
          Ver más comentarios
        </Button>
      </div>

      {/* Comments */}
      <div className="p-4 border-t">
        <div className="flex gap-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Jane Smith</div>
            <p className="text-muted-foreground">Great deal! I just got some yesterday.</p>
          </div>
        </div>

        {/* Comment input */}
        <div className="flex gap-3 items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Input placeholder="Escribe un comentario" className="flex-1" />
            <Button className="bg-green-400 hover:bg-green-500 text-white">Enviar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}