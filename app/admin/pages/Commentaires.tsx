import { Avatar } from "@/app/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
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
import { Textarea } from "@/app/components/ui/textarea";
import { Check, X, Eye, Trash2, Plus, Star } from "lucide-react";
import ButtonDelete from "@/app/components/ui/buttonDelete";
import {
  useGetCommants,
  useUpdateCommentsMutation,
  useAcceptCommentMutation,
  useDeleteCommentsMutation,
  useAddCommantsMutation,
} from "@/hooks/use-comments";
import LoaderCommponent from "@/app/components/ui/Loader";
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmationDialog from "@/app/components/ui/ConfirmationDialog";
import { addCommentSchema } from "@/validate";
import ErrorFormulaire from "@/app/components/ui/errorFormulaire";

export function DialogAddComment() {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [error , setError] = useState<string | null>(null)

  const {mutate , isPending } = useAddCommantsMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newComment = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      comment: formData.get('comment') as string,
      rating: selectedRating,
    };

    console.log(newComment)
    const result = addCommentSchema.safeParse(newComment)
    if(!result.success){
      setError(result.error.issues[0].message)
      return
    }
    
   
    
    mutate(newComment, {
      onSuccess: (data) => {
        
        toast.success("Commentaire ajouter avec success")
      },
      onError: (error : any) => {
        toast.error(error.response?.data.message)
      }

    } , 
    )
    
    
    // Reset form and rating
    e.currentTarget.reset();
    setSelectedRating(0);
    setHoveredRating(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter Commentaire
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau commentaire</DialogTitle>
            <DialogDescription>
              Remplissez les informations pour ajouter un nouveau commentaire.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nom complet"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email (optionnel)</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="exemple@email.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">Note *</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`p-1 transition-colors ${
                      star <= (hoveredRating || selectedRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setSelectedRating(star)}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {selectedRating > 0 ? `${selectedRating}/5` : "Sélectionnez une note"}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment">Commentaire *</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Écrivez votre commentaire ici..."
                rows={4}
                required
              />
            </div>
          </div>

          {
            error && <ErrorFormulaire error={error} />
          }
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Annuler
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" disabled={selectedRating === 0}>
                Ajouter
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DialogViewComment({ comment }: { comment: typeof comments[0] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-1" />
          Voir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Détails du commentaire</DialogTitle>
          <DialogDescription>
            Commentaire de {comment.name} - {comment.createdAt}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="font-semibold">Nom</Label>
            <p className="text-sm text-gray-700">{comment.name}</p>
          </div>
          <div className="grid gap-2">
            <Label className="font-semibold">Téléphone</Label>
            <p className="text-sm text-gray-700">{comment.phone}</p>
          </div>
          {comment.email && (
            <div className="grid gap-2">
              <Label className="font-semibold">Email</Label>
              <p className="text-sm text-gray-700">{comment.email}</p>
            </div>
          )}
          <div className="grid gap-2">
            <Label className="font-semibold">Note</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= comment.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {comment.rating}/5
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="font-semibold">Commentaire</Label>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-700">{comment.comment}</p>
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="font-semibold">Statut</Label>
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                comment.isPublished
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {comment.isPublished ? "Publié" : "En attente"}
            </span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


const Comments = () => {

  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [commentId , setCommentId] = useState<number | string | null>(null);
  const { data, isLoading } = useGetCommants() as {
    data: { comments: any };
    isLoading: boolean;
  };

  const { mutate, isPending } = useUpdateCommentsMutation();
  const { mutate: acceptCommentMutate , isPending : isAcceptedPending } = useAcceptCommentMutation();
  const { mutate: deleteCommentMutate } = useDeleteCommentsMutation();

  if (isLoading) return <LoaderCommponent />;

 

  const updateComment = (commentId: number | string, state: boolean) => {
    mutate(
      {
        commentId,
        state,
      },
      {
        onError: (error: any) => {
          toast.error(error.responce?.data.message);
        },
      }
    );
  };

  const acceptComment = (commentId: number | string) => {
    acceptCommentMutate(
      { commentId },
      {
        onSuccess: () => toast.success("Commentaire accepté"),
        onError: () => toast.error("Erreur lors de l’acceptation"),
      }
    );
  };

  const deleteComment = () => {
    deleteCommentMutate(
      { commentId },
      {
        onSuccess: () => toast.success("Commentaire supprimé"),
        onError: () => toast.error("Erreur lors de la suppression"),
      }
    );
  };

  

  return (
    <div className="mx-auto px-4">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-gray-800 text-xl font-semibold">
            Gestion des commentaires
          </h4>
          <p className="mt-2 text-gray-600 text-base sm:text-sm">
            Gérez les commentaires de vos clients et contrôlez leur publication.
          </p>
        </div>
        <div className="flex sm:flex-row flex-col gap-2 mt-4 sm:mt-0">
          <div className="flex gap-2 w-auto">
            <span className="inline-flex sm:flex flex-1 items-center px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
              Total: {data?.comments.length}
            </span>
            <span className="inline-flex sm:flex flex-1 items-center px-3 min-w-max py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
              Publiés: {data?.comments.filter((c: any) => c.isPublished).length}
            </span>
          </div>
          <DialogAddComment />
        </div>
      </div>

      <div className="mt-12 divide-y w-full">
        {data?.comments.map((item: any, idx: number) => (
          <div
            key={item.id}
            className={`${!item.isAccepted && "bg-green-500/65"} py-5 flex sm:flex-row px-3 rounded-xl flex-col items-start justify-between`}
          >
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={""} alt={item.name} />
                <AvatarFallback className="bg-primary w-full flex items-center justify-center text-white font-bold">
                  {item.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <span className="block text-sm text-gray-700 font-semibold">
                  {item.name}
                </span>
                <span className="block text-sm text-gray-600">
                  {item.phone}
                </span>
                {item.email && (
                  <span className="block text-sm text-gray-600">
                    {item.email}
                  </span>
                )}
                <div className="mt-2 max-w-md">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {item.comment.length > 80
                      ? `${item.comment.substring(0, 80)}...`
                      : item.comment}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="block text-xs text-gray-500">
                    {item.createdAt}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.isPublished ? "Publié" : "En attente"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex sm:mt-0 sm:w-auto w-full mt-3 gap-2 flex-wrap flex-row">
              <div className="flex-1">
                <DialogViewComment comment={item} />
              </div>

            {item.isAccepted && (
             <>  
              {!item.isPublished ? (
                <Button
                  onClick={() => updateComment(item._id, true)}
                  className="bg-primary text-white hover:bg-primary/90 flex-1 text-sm px-3 py-2"
                  size="sm"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Activer
                </Button>
              ) : (
                <Button
                  onClick={() => updateComment(item._id, false)}
                  className="bg-destructive text-white hover:bg-destructive/45 flex-1 text-sm px-3 py-2"
                  size="sm"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Desactiver
                </Button>
              )}
              </>
            )}
            
             
              {!item.isAccepted && (
                <Button
                  onClick={() => acceptComment(item._id)}
                  className="bg-green-500 text-white hover:bg-primary/90 flex-1 text-sm px-3 py-2"
                  size="sm"
                >
                  <Check className="w-4 h-4 mr-1" />
                  {isAcceptedPending ? "Accepter..." : "Accepter"}
                </Button>
              )}

              <ButtonDelete onClick={() => {
                setDialogDeleteOpen(true)
                setCommentId(item._id)
              }} />
            </div>
          </div>
        ))}
      </div>

      {data?.comments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            Aucun commentaire pour le moment
          </p>
        </div>
      )}

      <ConfirmationDialog 
        isOpen = {dialogDeleteOpen}
        message="Voulez-vous vraiment supprimer ce commentaire ?"
        onConfirm={deleteComment}
        onCancel={() => setDialogDeleteOpen(false)}
        
      />
    </div>
  );
};

export default Comments;
