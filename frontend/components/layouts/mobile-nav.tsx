'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
      {/* MobileNav solo aparece en pantallas pequeñas */}
      <div className="flex md:hidden flex-1 items-center">
      <SheetTrigger asChild>
    <Button variant="ghost" className="p-0 flex items-center gap-2">
      <Menu className="h-6 w-6 text-white" />
      <span className="sr-only">Toggle Menu</span>
      <img src="/images/AYA-logo.webp" alt="Ahorra YA!" className="w-10 h-auto object-contain" />
    </Button>

</SheetTrigger>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <SheetContent side="left" className="pr-0 bg-green-700 text-white">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={() => setOpen(false)}
        >
          <img 
            src="/images/AYA2.webp" 
            alt="Ahorra YA!" 
            className="w-40 h-auto object-contain"
          />
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 text-lg rounded-lg transition-all duration-300 hover:bg-green-900 ${
                  pathname === item.href ? 'bg-green-900' : 'bg-transparent'
                }`}
              >
                <item.icon className="h-6 w-6 text-white" />
                {item.title}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
