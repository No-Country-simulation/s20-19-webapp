"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function SharePromotion() {
  return (
    
    <Card className="w-[917px] bg-white border-none shadow-none p-0">
      <CardHeader className="p-0">
        <div className="flex items-center space-x-3 w-full">
          {/* Avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>

          {/* Botón que parece Input con texto alineado a la izquierda */}
          <Button 
            variant="outline"
            className="w-full h-[42px] bg-white text-gray-500 border-gray-300 rounded-lg text-left px-4 justify-start"
          >
            Crear publicación
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
