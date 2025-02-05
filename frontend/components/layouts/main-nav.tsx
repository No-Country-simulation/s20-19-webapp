'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Home, Tag, Store } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchBar } from '../search/search-bar';

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

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex flex-1"> 
      <SearchBar/> 
      <p className=' w-10'>Jhon Doe</p>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback><User className="h-40 w-4" /></AvatarFallback>
      </Avatar>   
      <ThemeToggle />    
    </div>
  );
}