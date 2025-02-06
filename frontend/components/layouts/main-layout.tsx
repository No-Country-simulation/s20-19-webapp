'use client';

import { MainNav } from '@/components/layouts/main-nav';
import { MobileNav } from '@/components/layouts/mobile-nav';
import { Sidebar } from './sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Sidebar fijo */}
      <aside className="w-64 min-h-screen bg-[hsl(var(--green-700))] dark:bg-[hsl(var(--green-900))] text-white fixed left-0 top-0">
        <Sidebar />
      </aside>

      {/* Contenido principal con margen para evitar solaparse con el Sidebar */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Navbar en la parte superior */}
        <header className="sticky top-0 z-50 w-full bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60 border-b border-[hsl(var(--border))]">
          <div className="container flex h-14 items-center px-4">
            <MainNav />
            <MobileNav />
          </div>
        </header>

        {/* Contenido dinámico */}
        <main className="p-8 bg-[hsl(var(--gray-100))] dark:bg-[hsl(var(--gray-900))]">
          {children}
        </main>
      </div>
    </div>
  );
}
