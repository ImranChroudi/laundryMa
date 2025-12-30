"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { Badge } from "@/app/components/ui/badge";
import { Search, Phone, MapPin, Calendar } from "lucide-react";
import type { Demande } from "@/app/types/type.ts";

import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "@/app/hooks/use-order";
import ButtonDelete from "@/app/components/ui/buttonDelete";
import LoaderCommponent from "@/app/components/ui/Loader";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

const Demandes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [clickedOrders, setClickedOrders] = useState<Set<string>>(new Set());

  const { data, isLoading } = useGetOrdersQuery() as {
    data: { orders: Demande[] };
    isLoading: boolean;
  };

  const { mutate: deleteOrderMutation } = useDeleteOrderMutation();

  const handleDeleteClick = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    console.log("orderId", orderId);
    setOrderToDelete(orderId);
    setDeleteDialogOpen(true);
    // Change background color when delete button is clicked
    setClickedOrders((prev) => new Set(prev).add(orderId));
  };

  const handleWhatsAppClick = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    // Change background color when WhatsApp button is clicked
    setClickedOrders((prev) => new Set(prev).add(orderId));
  };

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return;

    try {
      deleteOrderMutation(
        { orderToDelete },
        {
          onSuccess: () => {
            toast.success("Commande supprimée avec succès");
          },
          onError: (error: any) => {
            toast.error(error.message || "Erreur lors de la suppression");
          },
        }
      );
      setDeleteDialogOpen(false);
      setOrderToDelete(null);
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la suppression");
    }
  };

  console.log(data);

  if (isLoading) return <LoaderCommponent />;
  console.log(data);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Chercher Demands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Demands Grid */}
      <div className="grid gap-4 items-start  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {data?.orders.map((demande: Demande, index: number) => {
          const isClicked = clickedOrders.has(demande.orderId);
          return (
            <Card
              key={demande.orderId}
              className={`hover:shadow-md transition-shadow ${
                isClicked ? "bg-green-50" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg">
                        {demande.nameClient}
                       
                      </CardTitle>
                      <CardDescription>
                      {new Date(demande.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {demande.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {/* {demande?.locationRamassage.address && demande.locationRamassage.address}
                    {!demande?.locationRamassage.address && `${demande.locationRamassage?.latitude || 0}, ${demande.locationRamassage?.longitude || 0}`} */}
                    <a
                      href={`https://www.google.com/maps?q=${demande.locationRamassage?.latitude},${demande.locationRamassage?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Location de Ramassage
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {/* {demande?.locationRamassage.address && demande.locationRamassage.address}
                    {!demande?.locationRamassage.address && `${demande.locationRamassage?.latitude || 0}, ${demande.locationRamassage?.longitude || 0}`} */}
                    <a
                      href={`https://www.google.com/maps?q=${demande.locationLivraison?.latitude},${demande.locationLivraison?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Location de Livraison
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Date de Livraison prévue:{" "}
                    {new Date(demande.dateLivraisonPrevue).toLocaleDateString()}
                  </div>
                   <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Heure de Ramassage:{" "}
                    {demande.heureRamassage}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Heure de Livraison:{" "}
                    {demande.heureLivraison}
                </div>

                </div>

                <div className="flex items-center gap-1 justify-between">
                  <Button
                    className="flex-1 bg-green-500"
                    onClick={(e) => handleWhatsAppClick(demande.orderId, e)}
                  >
                    <a 
                      href={`https://wa.me/${demande.phone}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="max-w-6 max-h-6"
                        src={"/images/wathsapIcon.avif"}
                        alt="WhatsApp"
                      />
                    </a>
                  </Button>
                  <ButtonDelete
                    onClick={(e) => handleDeleteClick(demande.orderId, e)}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette commande ? Cette action
              est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              console.log("orderToDelete", orderToDelete);
              setOrderToDelete(null)}}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {handleConfirmDelete()}}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Demandes;
