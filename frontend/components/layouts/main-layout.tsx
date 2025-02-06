'use client';

import { MainNav } from '@/components/layouts/main-nav';
import { MobileNav } from '@/components/layouts/mobile-nav';
import { Sidebar } from './sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] fixed left-0 top-0">
        <Sidebar />
      </aside>

      {/* Contenido Principal */}
      <div className="ml-64 flex-1 flex flex-col bg-[hsl(var(--background))]">
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full bg-[hsl(var(--card))] shadow-md">
          <div className="container flex h-14 items-center px-4">
            <MainNav />
            <MobileNav />
          </div>
        </header>

        {/* Contenido */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
