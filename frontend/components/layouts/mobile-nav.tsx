'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, Menu, Tag, Store } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const items = [
  {
    title: 'Inicio',
    href: '/',
    icon: Home
  },
  {
    title: 'Promociones',
    href: '/promotions',
    icon: Tag
  },
  {
    title: 'Tiendas',
    href: '/stores',
    icon: Store
  },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex md:hidden flex-1 items-center">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <Link href="/" className="flex items-center space-x-2">
          <Tag className="h-6 w-6" />
          <span className="font-bold">Ahorra YA</span>
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <SheetContent side="left" className="pr-0">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={() => setOpen(false)}
        >
          <Tag className="h-6 w-6" />
          <span className="font-bold">Ahorra YA</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-2 py-1 text-sm transition-colors hover:text-foreground/80',
                  pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}