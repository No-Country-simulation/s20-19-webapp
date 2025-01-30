'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';

export function SharePromotion() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <Input
            placeholder="Comparte una oferta..."
            className="flex-1"
          />
        </div>
      </CardHeader>
    </Card>
  );
}