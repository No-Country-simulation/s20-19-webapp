'use client';

import { MainNav } from '@/components/layouts/main-nav';
import { MobileNav } from '@/components/layouts/mobile-nav';
import { Sidebar } from './sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar fijo */}
      <aside className="w-64 min-h-screen bg-green-600 text-white fixed left-0 top-0">
        <Sidebar />
      </aside>

      {/* Contenido principal con margen para evitar solaparse con el Sidebar */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Navbar en la parte superior */}
        <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center px-4">
            <MainNav />
            <MobileNav />
          </div>
        </header>

        {/* Contenido dinámico */}
        <main className="p-8 bg-slate-100">{children}</main>
      </div>
    </div>
  );
}