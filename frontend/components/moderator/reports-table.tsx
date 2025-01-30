"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Flag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";

const initialReports = [
  {
    id: 1,
    title: "Manzana",
    description: "Encontré esta súper oferta en Walmart de Cibeles",
    image: "https://res.cloudinary.com/dworm9bnx/image/upload/v1738203133/pan_xplxdn.png",
    location: "📍 123 Market Street, Downtown",
    user: { name: "Nombre de usuario", avatar: "https://i.pravatar.cc/40?u=user1" },
    date: "DD/MM/AAAA",
    reports: 25,
  },
  {
    id: 2,
    title: "Pan Bimbo",
    description: "Gran descuento en Walmart",
    image: "https://res.cloudinary.com/dworm9bnx/image/upload/v1738203133/pan_xplxdn.png",
    location: "📍 Av. Principal 456",
    user: { name: "Nombre de usuario", avatar: "https://i.pravatar.cc/40?u=user2" },
    date: "DD/MM/AAAA",
    reports: 18,
  },
  {
    id: 3,
    title: "Descuento en Café",
    description: "50% de descuento en tienda local",
    image: "https://res.cloudinary.com/dworm9bnx/image/upload/v1738203133/pan_xplxdn.png",
    location: "📍 Plaza Mayor, C.C.",
    user: { name: "Nombre de usuario", avatar: "https://i.pravatar.cc/40?u=user3" },
    date: "DD/MM/AAAA",
    reports: 30,
  },
];

export const ReportsTable = () => {
  const [reports, setReports] = useState(initialReports);
  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"delete" | "removeReport">("delete");
  const [pendingDelete, setPendingDelete] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedReports((prev) =>
      prev.includes(id) ? prev.filter((reportId) => reportId !== id) : [...prev, id]
    );
  };

  // 📌 Función para abrir el diálogo con selección múltiple o individual
  const confirmAction = (type: "delete" | "removeReport", reportIds?: number[]) => {
    setDialogType(type);
    setPendingDelete(reportIds || selectedReports);
    setDialogOpen(true);
  };

  // 📌 Función para confirmar eliminación
  const handleConfirm = () => {
    setReports((prev) => prev.filter((report) => !pendingDelete.includes(report.id)));
    toast.success(
      dialogType === "delete"
        ? "Publicaciones eliminadas correctamente"
        : "Reportes eliminados correctamente"
    );
    setSelectedReports([]); // Limpiar selección
    setDialogOpen(false);
  };

  return (
    <div className="bg-white shadow-md overflow-hidden">
      {/* 📌 Mensaje dinámico cuando hay selecciones */}
      {selectedReports.length > 0 && (
        <div className="bg-green-100 text-green-700 px-4 py-2 flex items-center">
          <span className="font-medium">{selectedReports.length} publicaciones seleccionadas</span>
          <div className="flex gap-1 ml-2">
            <Button variant="outline" size="icon" className="text-green-600" onClick={() => confirmAction("delete")}>
              <Trash2 className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="text-green-600" onClick={() => confirmAction("removeReport")}>
              <Flag className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* 📌 Mostrar mensaje si no hay reportes */}
      {reports.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          <p className="text-lg font-semibold">No hay productos reportados en este momento</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="p-3 text-left w-10"></th>
              <th className="p-3 text-left">Publicaciones</th>
              <th className="p-3">Usuario</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Reportes</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className={`border-t ${selectedReports.includes(report.id) ? "bg-green-50" : ""}`}>
                <td className="p-3 text-center">
                  <Checkbox checked={selectedReports.includes(report.id)} onCheckedChange={() => toggleSelect(report.id)} className="accent-green-500" />
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={report.image} alt={report.title} className="w-12 h-12 rounded-md object-cover" />
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-gray-500">{report.description}</p>
                      <p className="text-xs text-gray-400">{report.location}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 flex items-center gap-2">
                  <img src={report.user.avatar} alt={report.user.name} className="w-8 h-8 rounded-full" />
                  {report.user.name}
                </td>
                <td className="p-3 text-center">{report.date}</td>
                <td className="p-3 text-center">{report.reports}</td>
                <td className="p-3 flex justify-center gap-2">
                  <Button variant="outline" size="icon" className="text-gray-800" onClick={() => confirmAction("delete", [report.id])}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-gray-800" onClick={() => confirmAction("removeReport", [report.id])}>
                    <Flag className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 📌 Modal de Confirmación */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogType === "delete" ? "Eliminar publicaciones" : "Eliminar reportes"}</DialogTitle>
            <p className="text-gray-500 text-sm">
              {dialogType === "delete"
                ? "¿Estás seguro de que quieres eliminar estas publicaciones?"
                : "¿Estás seguro de que quieres eliminar los reportes de estas publicaciones?"}
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleConfirm}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
