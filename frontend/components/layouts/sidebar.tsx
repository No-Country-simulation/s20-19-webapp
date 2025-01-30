import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-green-700 p-4">
      <div className="space-y-4">
      <div className="flex flex-col space-y-[24px]">
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

  <div>
    <Button 
      variant="ghost" 
      className="w-full flex items-center justify-start gap-2 px-4 py-2 text-white hover:bg-green-900 rounded-lg transition-all duration-300"
    >
      <img src="https://github.com/shadcn.png" alt="Usuario" className="w-6 h-6 rounded-full object-cover" />
      <span className="text-lg">John Doe</span>
    </Button>

    <Button 
      variant="ghost" 
      className="w-full flex items-center justify-start gap-2 px-4 py-2 text-white hover:bg-green-900 rounded-lg transition-all duration-300 mt-[13px]"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2H2V12L11.29 21.29C12.23 22.23 13.77 22.23 14.71 21.29L21.29 14.71C22.23 13.77 22.23 12.23 21.29 11.29L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 7H7.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
      </svg>
      <span className="text-lg">Ofertas</span>
    </Button>
  </div>
</div>



      </div>
    </div>
  )
}
