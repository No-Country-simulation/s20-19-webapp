"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function SharePromotion() {
  return (
    <Card className="pb-3 border-0 bg-transparent">
      <CardHeader className="pb-3 flex justify-center">
        <div className="flex items-center w-full bg-white rounded-lg px-4 py-2 shadow-sm">
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
          >
            Crear publicación
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
