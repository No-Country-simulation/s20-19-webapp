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
import { useEffect } from "react";
import { usePromotionContext } from "@/context/PromotionContext";
import { supermarkets } from "@/data/supermarkets";
import { Supermarket } from "@/types";


export function CreatePromotionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void })  {

  const { addPromotion, editPromotion, editingPromotion } = usePromotionContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [previousPrice, setPreviousPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [supermarket, setSupermarket] = useState<Supermarket | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const [selectedSupermarket, setSelectedSupermarket] = useState<number | null>(null);

  const [step, setStep] = useState("category"); // Mantiene la pestaña activa
  const [supermarketQuery, setSupermarketQuery] = useState("");
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);
  const [discount, setDiscount] = useState<number | null>(null);
  
  
  // Cargar datos si se está editando una publicación
  useEffect(() => {
    if (editingPromotion) {
      setTitle(editingPromotion.title);
      setDescription(editingPromotion.description);
      setCategory(editingPromotion.category);
      setPreviousPrice(editingPromotion.previousPrice);
      setCurrentPrice(editingPromotion.currentPrice);
      setImageUrl(editingPromotion.imageUrl);

      // Buscar el supermercado basado en su ID
      const foundSupermarket = supermarkets.find(s => s.id === editingPromotion.supermarket.id) || null;
      setSupermarket(foundSupermarket);
      setSelectedSupermarket(foundSupermarket ? foundSupermarket.id : null);
    } else {
      // Limpiar valores si es una nueva publicación
      setTitle("");
      setDescription("");
      setCategory("");
      setPreviousPrice("");
      setCurrentPrice("");
      setImageUrl("");
      setSupermarket(null);
      setSelectedSupermarket(null);
    }
  }, [editingPromotion]);

  // Manejar la selección del supermercado correctamente
  const handleSupermarketSelection = (id: number) => {
    const foundSupermarket = supermarkets.find((s) => s.id === id) || null;
    if (foundSupermarket) {
      setSupermarket(foundSupermarket); // Se guarda el objeto completo
      setSelectedSupermarket(foundSupermarket.id);
      setSupermarketQuery(foundSupermarket.name);
    }
  };

   // Guardar la publicación en el contexto
   const handleSubmit = () => {
    if (!title || !description || !category || !currentPrice) {
      alert("Por favor completa todos los campos.");
      return;
    }
  
    const newPromotion = {
      id: editingPromotion ? editingPromotion.id : Date.now().toString(),
      title,
      description,
      category,
      previousPrice,
      currentPrice,
      discount: discount || 0,
      supermarket,
      imageUrl,
    };
  
    if (editingPromotion) {
      editPromotion(newPromotion);
    } else {
      addPromotion(newPromotion);
    }
  
    // Cerrar modal después de guardar
    onClose();
  };

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
    if (title && description && category && currentPrice && supermarket && imageUrl) {
      setIsPublishEnabled(true);
    } else {
      setIsPublishEnabled(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {editingPromotion ? "Editar publicación" : "Crear publicación"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nombre del producto" className="w-full" />
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="¿Qué descubriste?" className="w-full" />
          <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />

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
              className="px-4 py-2 rounded-md transition-all 
                data-[state=active]:bg-[hsl(var(--green-700))] 
                data-[state=active]:dark:bg-[hsl(var(--green-900))] 
                data-[state=active]:text-white 
                data-[state=active]:shadow-md 
                bg-transparent text-[hsl(var(--green-700))] hover:bg-gray-200"
                >
              Categoría
            </TabsTrigger>
            <TabsTrigger 
              value="price" 
              className="px-4 py-2 rounded-md transition-all 
                data-[state=active]:bg-[hsl(var(--green-700))] 
                data-[state=active]:dark:bg-[hsl(var(--green-900))] 
                data-[state=active]:text-white 
                data-[state=active]:shadow-md 
                bg-transparent text-[hsl(var(--green-700))] hover:bg-gray-200"
              disabled={!category}
            >
              Precio
            </TabsTrigger>
            <TabsTrigger 
              value="supermarket" 
              className="px-4 py-2 rounded-md transition-all 
                data-[state=active]:bg-[hsl(var(--green-700))] 
                data-[state=active]:dark:bg-[hsl(var(--green-900))] 
                data-[state=active]:text-white 
                data-[state=active]:shadow-md 
                bg-transparent text-[hsl(var(--green-700))] hover:bg-gray-200"
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
                          setSelectedSupermarket(s.id);
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
        <Button
          variant="outline"
          onClick={onClose}
          className="text-[hsl(var(--green-700))] dark:text-[hsl(var(--green-900))] border-[hsl(var(--green-700))] dark:border-[hsl(var(--green-900))]"
        >
            Cancelar
          </Button>
          <Button 
            disabled={!isPublishEnabled} 
            onClick={handleSubmit} // ✅ Ahora ejecuta handleSubmit correctamente
            className={`${!isPublishEnabled ? "bg-[hsl(var(--green-700))]/80 dark:bg-[hsl(var(--green-900))] text-white cursor-not-allowed" : "bg-[hsl(var(--green-700))] dark:bg-[hsl(var(--green-900))] text-white hover:bg-[hsl(var(--green-900))]"}`}
          >
            {editingPromotion ? "Actualizar" : "Publicar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
