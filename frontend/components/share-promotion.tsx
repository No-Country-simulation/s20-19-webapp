"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function SharePromotion() {
  return (
    <div className="flex justify-center w-full">
    <Card className="w-[917px] bg-white border-none shadow-none p-0">
      <CardHeader className="p-0">
        <div className="flex items-center space-x-3 w-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <Input
            placeholder="Crear publicación"
            className="w-full h-[42px] bg-white border-gray-300 rounded-lg"
          />
        </div>
      </CardHeader>
    </Card>
  </div>
  

  );
}
