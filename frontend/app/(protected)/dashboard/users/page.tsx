import { UsersTable } from "@/components/moderator/users-table";

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Administración de Usuarios</h1>
      <UsersTable />
    </div>
  );
}
