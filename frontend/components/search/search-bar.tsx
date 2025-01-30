import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Utilizando un componente Input de Shadcn
import { Search } from "lucide-react"; // Ícono de búsqueda


type SearchFormValues = {
  query: string;
};

export const SearchBar = () => {
  const { register, handleSubmit } = useForm<SearchFormValues>();

  const onSubmit = (data: SearchFormValues) => {
    console.log("Search Query:", data.query);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center border rounded-lg shadow-sm p-2 w-full ">
      <Search className="text-gray-500 mr-2" />
      <Input
        type="text"
        placeholder="Buscar"
        {...register("query")}
        className="flex-1 border-none focus:ring-0 focus:outline-none"
      />
    </form>
  );
};
