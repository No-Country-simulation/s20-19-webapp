'use client';

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Sidebar() {
  const [openCategories, setOpenCategories] = useState(false);
  const [openSupermarkets, setOpenSupermarkets] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[hsl(var(--green-700))] dark:bg-[hsl(var(--green-900))] p-4 text-white">
      <div className="space-y-4">
        <div className="flex flex-col space-y-[24px]">
          {/* Logo */}
          <Button 
            variant="ghost"
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-none hover:bg-transparent"
          >
            <img 
              src="/images/AYA2.webp" 
              alt="Ahorra YA!" 
              className="w-40 h-auto object-contain"
            />
          </Button>

          {/* Usuario */}
          <div>
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-start gap-2 px-4 py-2 text-white hover:bg-[hsl(var(--green-900))] dark:hover:bg-[hsl(var(--green-700))] rounded-lg transition-all duration-300"
            >
              <img src="https://github.com/shadcn.png" alt="Usuario" className="w-6 h-6 rounded-full object-cover" />
              <span className="text-lg">John Doe</span>
            </Button>

            {/* Sección de Ofertas */}
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-start gap-2 px-4 py-2 text-white hover:bg-[hsl(var(--green-900))] dark:hover:bg-[hsl(var(--green-700))] rounded-lg transition-all duration-300 mt-[13px]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2H2V12L11.29 21.29C12.23 22.23 13.77 22.23 14.71 21.29L21.29 14.71C22.23 13.77 22.23 12.23 21.29 11.29L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7H7.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
              </svg>
              <span className="text-lg">Ofertas</span>
            </Button>
          </div>

          {/* Filtros */}
          <div className="mt-4">
            {/* Categorías */}
            <button 
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-[hsl(var(--green-900))] dark:hover:bg-[hsl(var(--green-700))] rounded-lg transition-all duration-300"
              onClick={() => setOpenCategories(!openCategories)}
            >
              Categorías
              <ChevronDown className={`w-4 h-4 transition-transform ${openCategories ? "rotate-180" : ""}`} />
            </button>
            {openCategories && (
              <div className="pl-6 mt-2 space-y-2 text-[hsl(var(--gray-200))] dark:text-[hsl(var(--gray-400))] text-sm">
                <button className="w-full text-left hover:text-[hsl(var(--gray-900))] dark:hover:text-[hsl(var(--white))]">Todas</button>
              </div>
            )}

            {/* Precio */}
            <button 
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-[hsl(var(--green-900))] dark:hover:bg-[hsl(var(--green-700))] rounded-lg transition-all duration-300"
              onClick={() => setOpenPrice(!openPrice)}
            >
              Precio
              <ChevronDown className={`w-4 h-4 transition-transform ${openPrice ? "rotate-180" : ""}`} />
            </button>
            {openPrice && (
              <div className="pl-6 mt-2 space-y-2 text-[hsl(var(--gray-200))] dark:text-[hsl(var(--gray-400))] text-sm">
                <button className="w-full text-left hover:text-[hsl(var(--gray-900))] dark:hover:text-[hsl(var(--white))]">Todos</button>
              </div>
            )}

            {/* Supermercados */}
            <button 
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-[hsl(var(--green-900))] dark:hover:bg-[hsl(var(--green-700))] rounded-lg transition-all duration-300"
              onClick={() => setOpenSupermarkets(!openSupermarkets)}
            >
              Supermercados
              <ChevronDown className={`w-4 h-4 transition-transform ${openSupermarkets ? "rotate-180" : ""}`} />
            </button>
            {openSupermarkets && (
              <div className="pl-6 mt-2 space-y-2 text-[hsl(var(--gray-200))] dark:text-[hsl(var(--gray-400))] text-sm">
                <button className="w-full text-left hover:text-[hsl(var(--gray-900))] dark:hover:text-[hsl(var(--white))]">Todos</button>
              </div>
            )}

            {/* Ubicación */}
            <button 
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-[hsl(var(--green-900))] dark:hover:bg-[hsl(var(--green-700))] rounded-lg transition-all duration-300"
              onClick={() => setOpenLocation(!openLocation)}
            >
              Ubicación
              <ChevronDown className={`w-4 h-4 transition-transform ${openLocation ? "rotate-180" : ""}`} />
            </button>
            {openLocation && (
              <div className="pl-6 mt-2 space-y-2 text-[hsl(var(--gray-200))] dark:text-[hsl(var(--gray-400))] text-sm">
                <button className="w-full text-left hover:text-[hsl(var(--gray-900))] dark:hover:text-[hsl(var(--white))] flex gap-1">
                  <Image src="/icons/ubication.svg" alt="Ubicación" width={15} height={15} />
                  Ubicación
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
