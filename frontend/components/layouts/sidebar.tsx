import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-emerald-500 p-4">
      <div className="space-y-4">
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-emerald-600">
          <span className="text-lg">💰 Ahorra YA!</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-emerald-600">
          <span className="text-lg">👤 John Doe</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-emerald-600">
          <span className="text-lg">📱 Géneros</span>
        </Button>
      </div>
    </div>
  )
}
