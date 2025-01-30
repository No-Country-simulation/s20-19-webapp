"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const users = [
    { id: 1, name: "Jane Smith", email: "jane.smith@email.com", posts: 126, role: "Usuario", moderator: "Moderador" },
    { id: 2, name: "John Doe", email: "john.doe@email.com", posts: 98, role: "Usuario", moderator: "Moderador" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@email.com", posts: 85, role: "Usuario", moderator: "Administrador" },
    { id: 4, name: "Michael Brown", email: "michael.brown@email.com", posts: 152, role: "Usuario", moderator: "Moderador" },
    { id: 5, name: "Emily Davis", email: "emily.davis@email.com", posts: 200, role: "Usuario", moderator: "Usuario" },
    { id: 6, name: "Chris Wilson", email: "chris.wilson@email.com", posts: 44, role: "Usuario", moderator: "Moderador" },
    { id: 7, name: "Olivia Martinez", email: "olivia.martinez@email.com", posts: 67, role: "Usuario", moderator: "Administrador" },
    { id: 8, name: "Daniel White", email: "daniel.white@email.com", posts: 112, role: "Usuario", moderator: "Usuario" },
    { id: 9, name: "Sophia Anderson", email: "sophia.anderson@email.com", posts: 93, role: "Usuario", moderator: "Moderador" },
    { id: 10, name: "James Taylor", email: "james.taylor@email.com", posts: 77, role: "Usuario", moderator: "Moderador" },
  ];

export const UsersTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  
  const openModal = (user: typeof users[0]) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3">Bloqueo</th>
            <th className="p-3"># Publicaciones</th>
            <th className="p-3">Email</th>
            <th className="p-3">Permisos</th>
            <th className="p-3">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3 flex items-center gap-2">
                <img src={`https://i.pravatar.cc/40?u=${user.email}`} alt={user.name} className="w-8 h-8 rounded-full" />
                {user.name}
              </td>
              <td className="p-3 text-center">
                <Switch />
              </td>
              <td className="p-3 text-center">{user.posts}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 text-center">
                <button 
                  onClick={() => openModal(user)} 
                  className="text-blue-600 hover:underline"
                >
                  Ver
                </button>
              </td>
              <td className="p-3">
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded">{user.moderator}</span>{" "}
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">{user.role}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📌 Modal de permisos */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Permisos</DialogTitle>
            <p className="text-gray-500 text-sm">Configura los permisos de este usuario</p>
          </DialogHeader>

          {/* Si hay un usuario seleccionado, mostrar su información */}
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={`https://i.pravatar.cc/40?u=${selectedUser.email}`} alt={selectedUser.name} className="w-10 h-10 rounded-full" />
                <span className="font-medium">{selectedUser.name}</span>
              </div>

              {/* Lista de permisos con switches */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Crear publicaciones</span>
                  <Switch />
                </div>
                <div className="flex justify-between items-center">
                  <span>Editar sus publicaciones</span>
                  <Switch />
                </div>
                <div className="flex justify-between items-center">
                  <span>Eliminar sus publicaciones</span>
                  <Switch />
                </div>
                <div className="flex justify-between items-center">
                  <span>Comentar publicaciones</span>
                  <Switch />
                </div>
                <div className="flex justify-between items-center">
                  <span>Reaccionar a publicaciones</span>
                  <Switch />
                </div>
                <div className="flex justify-between items-center">
                  <span>Denunciar publicaciones</span>
                  <Switch />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
