"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Info, Store, Search } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import Image from "next/image"

export function CreatePromotionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

  const [step, setStep] = useState("category"); // Mantiene la pestaña activa
  const [category, setCategory] = useState("");
  const [previousPrice, setPreviousPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [discount, setDiscount] = useState<number | null>(null);
  const [supermarketQuery, setSupermarketQuery] = useState("");
  const [selectedSupermarket, setSelectedSupermarket] = useState("");
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);

  const supermarkets = [
    { id: 1, name: "Walmart", address: "Tercer anillo periférico #321, 28976 Villa de Álvarez, México" },
    { id: 2, name: "Walmart", address: "Calzada Galván #789, 21843 Colima, México" },
    { id: 3, name: "Walmart", address: "Plaza Sendera, 222751 Villa de Álvarez, México" },
  ];

  // Filtrar supermercados según la búsqueda
  const filteredSupermarkets = supermarkets.filter((s) =>
    s.name.toLowerCase().includes(supermarketQuery.toLowerCase()) ||
    s.address.toLowerCase().includes(supermarketQuery.toLowerCase())
  );

  // Calcular el descuento
  const calculateDiscount = (prev: string, current: string) => {
    const prevNum = parseFloat(prev);
    const currNum = parseFloat(current);
    if (!isNaN(prevNum) && !isNaN(currNum) && prevNum > currNum) {
      return Math.round(((prevNum - currNum) / prevNum) * 100);
    }
    return null;
  };

  // Manejar cambios de precio
  const handlePriceChange = (prev: string, current: string) => {
    setPreviousPrice(prev);
    setCurrentPrice(current);
    const discountValue = calculateDiscount(prev, current);
    setDiscount(discountValue);
  };

  // Habilitar publicación cuando se completen todos los campos
  const validateForm = () => {
    if (category && currentPrice && selectedSupermarket) {
      setIsPublishEnabled(true);
    } else {
      setIsPublishEnabled(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {/* 📌 Encabezado */}
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Crear publicación</DialogTitle>
        </DialogHeader>

        {/* 📌 Primera sección del formulario */}
        <div className="space-y-4">

          {/* Nombre del Producto */}
          <Input placeholder="Nombre del producto" className="w-full" />

          {/* Descripción */}
          <Textarea placeholder="¿Qué descubriste?" className="w-full" />

          {/* 📌 Agregar Foto */}
          <ImageUploader/>

          {/* 📌 Switch con Tooltip */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-gray-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  Completa la información para publicar
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-sm font-medium">Incluye en tu publicación:</span>
          </div>
        </div>

        {/* Tabs para la navegación entre secciones */}
        <Tabs value={step} onValueChange={setStep} className="w-full">
          <TabsList className="flex gap-2 bg-gray-100 p-1 rounded-md float-left">
            <TabsTrigger 
              value="category" 
              className={`px-4 py-2 rounded-md transition-all ${step === "category" ? "bg-green-500 text-white shadow-md" : "bg-transparent text-gray-600 hover:bg-gray-200"}`}
            >
              Categoría
            </TabsTrigger>
            <TabsTrigger 
              value="price" 
              className={`px-4 py-2 rounded-md transition-all ${step === "price" ? "bg-green-500 text-white shadow-md" : "bg-transparent text-gray-600 hover:bg-gray-200"}`}
              disabled={!category}
            >
              Precio
            </TabsTrigger>
            <TabsTrigger 
              value="supermarket" 
              className={`px-4 py-2 rounded-md transition-all ${step === "supermarket" ? "bg-green-500 text-white shadow-md" : "bg-transparent text-gray-600 hover:bg-gray-200"}`}
              disabled={!currentPrice}
            >
              Supermercado
            </TabsTrigger>
          </TabsList>

          {/* Sección Categoría */}
          <TabsContent value="category">
            <div className="mt-12 p-4 border rounded-md">
              <p className="text-sm text-gray-400 mb-2">Selecciona una categoría de oferta para poder publicar</p>
              <select 
                className="w-full p-2 border rounded-md"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  validateForm();
                }}
              >
                <option value="">Selecciona una opción</option>
                <option value="Frutas y Verduras">Frutas y Verduras</option>
                <option value="Lácteos">Lácteos</option>
                <option value="Carnes">Carnes</option>
              </select>
            </div>
          </TabsContent>

          {/* Sección Precio */}
          <TabsContent value="price">
            <div className="mt-12 p-4 border rounded-md">
              <p className="text-sm text-gray-600 mb-2">
                Incluye por lo menos el precio actual. Si proporcionas también el precio anterior, se calculará el descuento.
              </p>
              {/* Campo de Precio Anterior */}
              <div className="mb-3">
                <label className="text-sm text-gray-700 font-medium mb-1 block">Precio anterior</label>
                <Input
                  type="number"
                  placeholder="$"
                  value={previousPrice}
                  onChange={(e) => handlePriceChange(e.target.value, currentPrice)}
                  className="bg-white border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Campo de Precio Actual */}
              <div className="mb-3">
                <label className="text-sm text-gray-700 font-medium mb-1 block">Precio actual</label>
                <Input
                  type="number"
                  placeholder="$"
                  value={currentPrice}
                  onChange={(e) => {
                    handlePriceChange(previousPrice, e.target.value);
                    validateForm();
                  }}
                  className="bg-white border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Muestra el Descuento Solo Si Se Ingresan Ambos Precios */}
              
                <div className="mt-3 bg-orange-100 text-gray-800 px-4 py-3 rounded-md flex items-center justify-center gap-2 text-lg font-semibold">
                <Image src="/icons/onsale.svg" alt="Descuento" width={15} height={15} /> 
                {discount}%
                </div>
            </div>
          </TabsContent>

          {/* Sección Supermercado */}
          <TabsContent value="supermarket">
            <div className="mt-12 p-4 border rounded-md">
              <p className="text-sm text-gray-600 mb-2">Selecciona el supermercado donde encontraste la oferta</p>

              {/* Campo de Búsqueda */}
              <div className="relative">
                <Input
                  placeholder="Buscar supermercado..."
                  value={supermarketQuery}
                  onChange={(e) => setSupermarketQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              </div>

              {/* Resultados de la Búsqueda */}
              {supermarketQuery && (
                <div className="mt-2 border rounded-md bg-white shadow-md max-h-40 overflow-y-auto">
                  {filteredSupermarkets.length > 0 ? (
                    filteredSupermarkets.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelectedSupermarket(s.name);
                          setSupermarketQuery(s.name);
                          setStep("supermarket"); // Mantiene la pestaña activa
                          setIsPublishEnabled(true); // Habilita el botón de publicar
                        }}
                        className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 transition"
                      >
                        <Store className="text-green-500 w-5 h-5" />
                        <div>
                          <p className="text-sm font-medium">{s.name}</p>
                          <p className="text-xs text-gray-500">{s.address}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="p-3 text-sm text-gray-500">No se encontraron supermercados</p>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Botones */}
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button disabled={!isPublishEnabled} className={`${!isPublishEnabled ? "bg-gray-400 cursor-not-allowed" : ""}`}>
            Publicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
