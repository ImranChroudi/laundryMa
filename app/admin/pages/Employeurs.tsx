import { Avatar } from "@/app/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {  
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import ButtonDelete from "@/app/components/ui/buttonDelete";
import { useState } from "react";
import { emailSchema } from "@/app/validate";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { useAddEmployeeMutation, useDeleteEmployeeMutation, useGetEmployees , useUpdateEmployeeMutation } from "@/hooks/use-emplyee";
import toast from "react-hot-toast";
import type { Employee } from "@/app/types/type";
import LoaderCommponent from "@/app/components/ui/Loader";
import ConfirmationDialog from "@/app/components/ui/ConfirmationDialog";



export function DialogInviteEmployeur() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { mutate, isPending } = useAddEmployeeMutation();
  const handleInvite = () => {
    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
    }
    setError("");

    mutate(
      {
        email,
      },
      {
        onSuccess: (data) => {
          toast.success("Employer ajouter avec success");
        },
        onError: (error: any) => {
          setError(error.response?.data.message);
        },
      }
    );
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="bg-primary sm:w-auto w-full text-white"
            variant="outline"
          >
            Ajouter Employer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Envoyer une invitation</DialogTitle>
            <DialogDescription>
              Saisissez l'email de l'employé que vous souhaitez inviter. Un
              email contenant un lien pour rejoindre le site lui sera envoyé.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="username-1"
                name="username"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button className="bg-primary text-white" onClick={handleInvite}>
              {isPending ? "Inviting..." : "Inviter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

const Employeurs = () => {

  const [isDialogOpen , setIsDialogOpen] = useState(false)
  const [employeeId , setEmployeeId] = useState<string | number | null>(null)
  const { data, isLoading } = useGetEmployees() as {
    data: { employees: Employee[] };
    isLoading: boolean;
  };

  console.log(data)

  const {mutate , isPending : isEditPending} = useUpdateEmployeeMutation()
  const {mutate : deleteEmployee , isPending : isDeletePending} = useDeleteEmployeeMutation()


  if (isLoading) return <LoaderCommponent />;

  const handleUpdateEmployee = (id : string | number , email : string)=>{
    console.log("handleUpdateEmployee")
    mutate({
      email , id
    } , 
  {
    onSuccess : (data)=> {
      return 
    }, onError : (error : any) =>{
      toast.error(error.response?.data.message)
    }
  })
  }

  const handleDeleteEmployee = ()=>{
    
    deleteEmployee({
      employeeId 
    },{
      onSuccess : (data)=>{
        toast.success("Employe Supprimé avec success")
        setIsDialogOpen(false)
      },
      onError : (error : any)=>{
        toast.error(error.response?.data.message)
      }
    })
  }

  return (
    <div className="mx-auto px-4">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-gray-800 text-xl font-semibold">
            Membres de l'équipe
          </h4>
          <p className="mt-2 text-gray-600 text-base sm:text-sm">
            Donnez à vos membres d'équipe l'accès pour gérer le système.
          </p>
        </div>
        <DialogInviteEmployeur />
      </div>

      <ul className="mt-12 divide-y w-full">
        {data?.employees?.map((item: Employee, idx) => (
          <li key={idx} className="py-5 flex items-start justify-between">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={""} alt={item.name} />
                <AvatarFallback className="bg-primary w-full flex items-center justify-center text-white font-bold">
                  {item.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <span className="block text-sm text-gray-700 font-semibold">
                  {item.name}
                </span>
                <span className="block text-sm text-gray-600">
                  {item.email}
                </span>
                <span className="block text-sm mt-1">
                  Statut:{" "}
                  <span
                    className={
                      item.isActive ? "text-green-600" : "text-red-600"
                    }
                  >
                    {item.isActive ? "Actif" : "Inactif"}
                  </span>
                </span>
                <p className={`${item.state == "employé" ? "bg-emerald-400" : "bg-fuchsia-500/75"} py-1 px-4 max-w-max text-white text-[12px] rounded-2xl`}>
                  {item.state}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={()=>handleUpdateEmployee(item._id , item.email)}
                className={`text-sm border rounded-lg px-3 py-2 duration-150 ${
                  item.isActive
                    ? "bg-destructive text-white hover:bg-destructive-hover"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {item.isActive ? "Désactiver" : "Activer"}
              </button>

              <ButtonDelete onClick={()=>{
                setEmployeeId(item._id)
                setIsDialogOpen(true)
              }}/>
            </div>
          </li>
        ))}
      </ul>
     <ConfirmationDialog
        isOpen={isDialogOpen}
        message="Voulez-vous vraiment vous deconnecter ?"
        onConfirm={handleDeleteEmployee}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Employeurs;
