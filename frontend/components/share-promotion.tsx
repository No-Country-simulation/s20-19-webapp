'use client';

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function SharePromotion({ onOpen }: { onOpen: () => void }) {
  return (
    <Card className="border-0 bg-transparent w-full flex max-w-4xl justify-center">
      <div className="flex items-center w-full max-w-4xl bg-[hsl(var(--card))] text-[hsl(var(--foreground))] rounded-lg px-4 py-3 shadow-md dark:shadow-none border border-[hsl(var(--border))] transition-colors">
        {/* Avatar del usuario */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>

        {/* Botón para abrir el modal */}
        <Button
          className="flex-1 text-[hsl(var(--muted-foreground))] font-normal bg-transparent hover:bg-[hsl(var(--muted))] border-0 shadow-none text-left transition-colors"
          variant="ghost"
          onClick={onOpen}
        >
          Crear publicación
        </Button>
      </div>
    </Card>
  );
}
