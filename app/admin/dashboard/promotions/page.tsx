"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Search, Plus, Edit, Trash2, Power, Loader2, Percent } from "lucide-react";
import {
  useGetPromotionsQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} from "@/app/hooks/use-promotions";
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

interface Promotion {
  _id: number;
  code?: string;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonTextAr?: string;
  buttonLink?: string;
  createdAt: string;
  updatedAt: string;
}

const Promotions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState<number | null>(null);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  const { data, isLoading } = useGetPromotionsQuery() as {
    data: { promotions: Promotion[] };
    isLoading: boolean;
  };


  const createPromotionMutation = useCreatePromotionMutation();
  const updatePromotionMutation = useUpdatePromotionMutation();
  const deletePromotionMutation = useDeletePromotionMutation();

  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    discountType: "percentage",
    discountValue: 0,
    isActive: false,
    startDate: "",
    endDate: "",
    imageUrl: "",
    buttonText: "Voir l'offre",
    buttonTextAr: "شاهد العرض",
    buttonLink: "",
  });

  const handleAddPromotion = () => {
    if (!newPromotion.title || !newPromotion.discountValue) {
      toast.error("Titre et valeur de réduction sont requis");
      return;
    }

    createPromotionMutation.mutate(newPromotion, {
      onSuccess: () => {
        toast.success("Promotion créée avec succès");
        setIsAddDialogOpen(false);
        setNewPromotion({
          title: "",
          titleAr: "",
          description: "",
          descriptionAr: "",
          discountType: "percentage",
          discountValue: 0,
          isActive: false,
          startDate: "",
          endDate: "",
          imageUrl: "",
          buttonText: "Voir l'offre",
          buttonTextAr: "شاهد العرض",
          buttonLink: "",
        });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Erreur lors de la création");
      },
    });
  };

  const handleEditPromotion = () => {
    if (!editingPromotion) return;

    if (!editingPromotion.title || !editingPromotion.discountValue) {
      toast.error("Titre et valeur de réduction sont requis");
      return;
    }

    updatePromotionMutation.mutate(
      { id: editingPromotion._id, data: editingPromotion },
      {
        onSuccess: () => {
          toast.success("Promotion mise à jour avec succès");
          setIsEditDialogOpen(false);
          setEditingPromotion(null);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Erreur lors de la mise à jour");
        },
      }
    );
  };

  const handleDeleteClick = (promotionId: number) => {
    setPromotionToDelete(promotionId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!promotionToDelete) return;

    deletePromotionMutation.mutate(promotionToDelete, {
      onSuccess: () => {
        toast.success("Promotion supprimée avec succès");
        setDeleteDialogOpen(false);
        setPromotionToDelete(null);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Erreur lors de la suppression");
      },
    });
  };

  const handleToggleActive = (promotion: Promotion) => {
    const updatedPromotion = { ...promotion, isActive: !promotion.isActive };
    updatePromotionMutation.mutate(
      { id: promotion._id, data: updatedPromotion },
      {
        onSuccess: () => {
          toast.success(
            updatedPromotion.isActive
              ? "Promotion activée"
              : "Promotion désactivée"
          );
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Erreur lors de la mise à jour");
        },
      }
    );
  };

  const handleEditClick = (promotion: Promotion) => {
    setEditingPromotion({ ...promotion });
    setIsEditDialogOpen(true);
  };

  if (isLoading) return <LoaderCommponent />;

  const filteredPromotions = data?.promotions?.filter((promotion) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      promotion.title?.toLowerCase().includes(searchLower) ||
      promotion.titleAr?.toLowerCase().includes(searchLower) ||
      promotion.description?.toLowerCase().includes(searchLower) ||
      promotion.descriptionAr?.toLowerCase().includes(searchLower)
    );
  }) || [];

  return (
    <div className="space-y-6 ">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des promotions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-primary text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter Promotion
          </Button>
          <Badge variant="outline" className="text-sm">
            Total: {data?.promotions?.length || 0}
          </Badge>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPromotions.map((promotion: Promotion) => (
          <Card key={promotion._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Percent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">
                      {promotion.title}
                    </CardTitle>
                    {promotion.description && (
                      <CardDescription className="line-clamp-1">
                        {promotion.description}
                      </CardDescription>
                    )}
                  </div>
                </div>
                <Badge
                  variant={promotion.isActive ? "default" : "secondary"}
                  className="ml-2"
                >
                  {promotion.isActive ? "Actif" : "Inactif"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Réduction:</span>
                  <span className="font-bold text-primary">
                    {promotion.discountType === "percentage"
                      ? `${promotion.discountValue}%`
                      : `${promotion.discountValue} DH`}
                  </span>
                </div>
                {promotion.description && (
                  <p className="text-muted-foreground line-clamp-2">
                    {promotion.description}
                  </p>
                )}
                {promotion.startDate && (
                  <div className="text-xs text-muted-foreground">
                    Début: {new Date(promotion.startDate).toLocaleDateString("fr-FR")}
                  </div>
                )}
                {promotion.endDate && (
                  <div className="text-xs text-muted-foreground">
                    Fin: {new Date(promotion.endDate).toLocaleDateString("fr-FR")}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleActive(promotion)}
                  className="flex-1"
                >
                  <Power className="w-4 h-4 mr-1" />
                  {promotion.isActive ? "Désactiver" : "Activer"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(promotion)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <ButtonDelete onClick={() => handleDeleteClick(promotion._id)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPromotions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            {searchTerm
              ? "Aucune promotion trouvée"
              : "Aucune promotion pour le moment"}
          </p>
        </div>
      )}

      {/* Add Promotion Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle promotion</DialogTitle>
            <DialogDescription>
              Remplissez les informations de la promotion.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="discountType">Type de réduction *</Label>
              <Select
                value={newPromotion.discountType}
                onValueChange={(value: "percentage" | "fixed") =>
                  setNewPromotion({ ...newPromotion, discountType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                  <SelectItem value="fixed">Montant fixe (DH)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="discountValue">Valeur de réduction *</Label>
              <Input
                id="discountValue"
                type="number"
                value={newPromotion.discountValue || ""}
                onChange={(e) =>
                  setNewPromotion({
                    ...newPromotion,
                    discountValue: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="10"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titre (FR) *</Label>
                <Input
                  id="title"
                  value={newPromotion.title}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, title: e.target.value })
                  }
                  placeholder="Promotion spéciale"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="titleAr">Titre (AR)</Label>
                <Input
                  id="titleAr"
                  value={newPromotion.titleAr}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, titleAr: e.target.value })
                  }
                  placeholder="عرض خاص"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Description (FR)</Label>
                <Textarea
                  id="description"
                  value={newPromotion.description}
                  onChange={(e) =>
                    setNewPromotion({
                      ...newPromotion,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description de la promotion"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descriptionAr">Description (AR)</Label>
                <Textarea
                  id="descriptionAr"
                  value={newPromotion.descriptionAr}
                  onChange={(e) =>
                    setNewPromotion({
                      ...newPromotion,
                      descriptionAr: e.target.value,
                    })
                  }
                  placeholder="وصف العرض"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Date de début</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={newPromotion.startDate}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, startDate: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">Date de fin</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={newPromotion.endDate}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="imageUrl">URL de l'image</Label>
              <Input
                id="imageUrl"
                value={newPromotion.imageUrl}
                onChange={(e) =>
                  setNewPromotion({ ...newPromotion, imageUrl: e.target.value })
                }
                placeholder="/images/promotion.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="buttonText">Texte du bouton (FR)</Label>
                <Input
                  id="buttonText"
                  value={newPromotion.buttonText}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, buttonText: e.target.value })
                  }
                  placeholder="Voir l'offre"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="buttonTextAr">Texte du bouton (AR)</Label>
                <Input
                  id="buttonTextAr"
                  value={newPromotion.buttonTextAr}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, buttonTextAr: e.target.value })
                  }
                  placeholder="شاهد العرض"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="buttonLink">Lien du bouton</Label>
              <Input
                id="buttonLink"
                value={newPromotion.buttonLink}
                onChange={(e) =>
                  setNewPromotion({ ...newPromotion, buttonLink: e.target.value })
                }
                placeholder="/services"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={newPromotion.isActive || false}
                onChange={(e) =>
                  setNewPromotion({ ...newPromotion, isActive: e.target.checked })
                }
                className="w-4 h-4"
              />
              <Label htmlFor="isActive">Activer la promotion</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={handleAddPromotion} className="bg-primary text-white">
              {createPromotionMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Promotion Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la promotion</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la promotion.
            </DialogDescription>
          </DialogHeader>

          {editingPromotion && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-discountType">Type de réduction *</Label>
                  <Select
                    value={editingPromotion.discountType}
                    onValueChange={(value: "percentage" | "fixed") =>
                      setEditingPromotion({
                        ...editingPromotion,
                        discountType: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                      <SelectItem value="fixed">Montant fixe (DH)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-discountValue">Valeur de réduction *</Label>
                  <Input
                    id="edit-discountValue"
                    type="number"
                    value={editingPromotion.discountValue || ""}
                    onChange={(e) =>
                      setEditingPromotion({
                        ...editingPromotion,
                        discountValue: parseFloat(e.target.value) || 0,
                      })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-title">Titre (FR) *</Label>
                    <Input
                      id="edit-title"
                      value={editingPromotion.title}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-titleAr">Titre (AR)</Label>
                    <Input
                      id="edit-titleAr"
                      value={editingPromotion.titleAr || ""}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          titleAr: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description">Description (FR)</Label>
                    <Textarea
                      id="edit-description"
                      value={editingPromotion.description || ""}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-descriptionAr">Description (AR)</Label>
                    <Textarea
                      id="edit-descriptionAr"
                      value={editingPromotion.descriptionAr || ""}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          descriptionAr: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-startDate">Date de début</Label>
                    <Input
                      id="edit-startDate"
                      type="datetime-local"
                      value={
                        editingPromotion.startDate
                          ? new Date(editingPromotion.startDate)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-endDate">Date de fin</Label>
                    <Input
                      id="edit-endDate"
                      type="datetime-local"
                      value={
                        editingPromotion.endDate
                          ? new Date(editingPromotion.endDate)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          endDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-imageUrl">URL de l'image</Label>
                  <Input
                    id="edit-imageUrl"
                    value={editingPromotion.imageUrl || ""}
                    onChange={(e) =>
                      setEditingPromotion({
                        ...editingPromotion,
                        imageUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-buttonText">Texte du bouton (FR)</Label>
                    <Input
                      id="edit-buttonText"
                      value={editingPromotion.buttonText || ""}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          buttonText: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-buttonTextAr">Texte du bouton (AR)</Label>
                    <Input
                      id="edit-buttonTextAr"
                      value={editingPromotion.buttonTextAr || ""}
                      onChange={(e) =>
                        setEditingPromotion({
                          ...editingPromotion,
                          buttonTextAr: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-buttonLink">Lien du bouton</Label>
                  <Input
                    id="edit-buttonLink"
                    value={editingPromotion.buttonLink || ""}
                    onChange={(e) =>
                      setEditingPromotion({
                        ...editingPromotion,
                        buttonLink: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-isActive"
                    checked={editingPromotion.isActive || false}
                    onChange={(e) =>
                      setEditingPromotion({
                        ...editingPromotion,
                        isActive: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <Label htmlFor="edit-isActive">Activer la promotion</Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleEditPromotion}
                  className="bg-primary text-white"
                >
                  {updatePromotionMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mise à jour...
                    </>
                  ) : (
                    "Mettre à jour"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette promotion ? Cette action
              est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPromotionToDelete(null)}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
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

export default Promotions;

