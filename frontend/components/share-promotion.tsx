"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function SharePromotion({ onOpen }: { onOpen: () => void }) {
  return (
    <Card className=" border-0 bg-transparent w-full flex max-w-4xl justify-center">

        <div className="flex items-center w-full max-w-4xl bg-white rounded-lg px-4 py-3 shadow-sm">
          {/* Avatar del usuario */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>

          {/* Botón para abrir el modal */}
          <Button
            className="flex-1 text-gray-400 font-normal bg-transparent hover:bg-gray-100 border-0 shadow-none text-left"
            variant="ghost"
            onClick={onOpen}
          >
            Crear publicación
          </Button>
        </div>
    </Card> 
  );
}
