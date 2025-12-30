"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardDescription, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Power,
  Upload,
  X,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { set, z } from "zod";

import {
  useAddProduitMutation,
  useGetProduits,
  useUpdateProduitMutation,
  useDeleteProduitMutation,
  useToggleStatutProduitMutation,
} from "@/app/hooks/use-produit";

import toast from "react-hot-toast";
import { produitSchema } from "@/app/validate";
import type { Produit } from "@/app/types/type.ts";
import ConfirmationDialog from "@/app/components/ui/ConfirmationDialog";
import { BASE_URL } from "@/app/config";

// Types

const Produits = () => {
  // React Query hooks
  const { data, isLoading } = useGetProduits() as {
    data: {
      success: boolean;
      produits: Produit[];
    };
    isLoading: boolean;
  };

  const addProduitMutation = useAddProduitMutation();
  const updateProduitMutation = useUpdateProduitMutation();
  const deleteProduitMutation = useDeleteProduitMutation();
  const toggleStatutMutation = useToggleStatutProduitMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produit | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [dialogDelete, setDialogDelete] = useState<boolean>(false);
  const [produitId, setProduitId] = useState<string | number>("");
  const [newProduct, setNewProduct] = useState<{
    nameProduct: string;
    prix: string;
    type: "normal" | "special";
    image: File | null;
  }>({
    nameProduct: "",
    prix: "",
    type: "normal" as "normal" | "special",
    image: null,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Filter products based on search
  const filteredProduits = data?.produits;

  // Validate form
  const validateForm = (data: any) => {
    console.log(data);

    try {
      produitSchema.parse(data);
      setFormErrors({});
      console.log(data);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        console.log(errors);
        setFormErrors(errors);
      }
      return false;
    }
  };

  // Handle image upload
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    isEdit = false
  ) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      if (isEdit && editingProduct) {
        setEditingProduct({
          ...editingProduct,
          image: file, // store the File itself
        });
        setPreviewImage(URL.createObjectURL(file));
      } else {
        setNewProduct({
          ...newProduct,
          image: file, // store the File itself
        });
        setPreviewImage(URL.createObjectURL(file));
      }
    }
  };

  // Add new product
  const handleAddProduct = async () => {
    const productData = {
      nameProduct: newProduct.nameProduct,
      prix: newProduct.type === "normal" ? newProduct.prix : null,
      type: newProduct.type,
      image: newProduct.image,
      statut: "active" as "active",
    };

    console.log(productData);

    if (!validateForm(productData)) {
      return;
    }

    console.log("image file is : ", productData.image);

    const formdata = new FormData() as any;
    formdata.append("name", productData.nameProduct as string);
    formdata.append("prix", productData.prix || ("" as string));
    formdata.append("type", productData.type as "normal" | "special");
    formdata.append("image", productData.image as File);

    try {
      await addProduitMutation.mutateAsync(formdata);

      toast.success("Produit ajouté avec succès");

      setNewProduct({
        nameProduct: "",
        prix: "",
        type: "normal",
        image: null,
      });
      setFormErrors({});
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error("Impossible d'ajouter le produit");
    }
  };

  // Edit product
  const handleEditProduct = async () => {
    if (!editingProduct) return;

    console.log(editingProduct);

    const productData = {
      _id: editingProduct._id,
      nameProduct: editingProduct.nameProduct,
      prix: editingProduct.type === "normal" ? editingProduct.prix : "",
      type: editingProduct.type,
      image: editingProduct.image,
      statut: editingProduct.statut,
    };

    if (!validateForm(productData)) {
      return;
    }

    const formdata = new FormData() as any;
    formdata.append("_id", productData._id as string);
    formdata.append("nameProduct", productData.nameProduct as string);
    formdata.append("prix", productData.prix || ("" as string));
    formdata.append("type", productData.type as "normal" | "special");
    formdata.append("image", productData.image as File);

    try {
      await updateProduitMutation.mutateAsync(formdata);

      toast.success("Produit modifié avec succès");
      setEditingProduct(null);
      setFormErrors({});
      setIsEditDialogOpen(false);
      setPreviewImage(null);
    } catch (error) {
      toast.error("Impossible de modifier le produit");
    }
  };

  // Delete product
  const handleDeleteProduct = async () => {
    try {
      await deleteProduitMutation.mutateAsync({ _id: produitId });
      setDialogDelete(false);

      toast.success("Produit supprimé avec succès");
    } catch (error) {
      toast.error("Impossible de supprimer le produit");
    }
  };

  // Toggle product status
  const handleToggleStatus = async (
    id: string,
    currentStatus: "active" | "inactive"
  ) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      await toggleStatutMutation.mutateAsync({ _id: id, statut: newStatus });

      toast.success(
        `Produit ${newStatus === "active" ? "activé" : "désactivé"} avec succès`
      );
    } catch (error) {
      toast.error("Impossible de changer le statut");
    }
  };

  // Open edit dialog
  const openEditDialog = (product: Produit) => {
    setEditingProduct({ ...product });
    setFormErrors({});
    setIsEditDialogOpen(true);
  };

  // Custom Select Component
  const CustomSelect = ({
    value,
    onValueChange,
    options,
    placeholder,
  }: {
    value: string;
    onValueChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
  }) => {
    return (
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Chercher produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter Produit
        </Button>
      </div>

      {filteredProduits.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          Aucun produit trouvé
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-1">
          {filteredProduits?.map((produit: Produit) => (
            <Card
              key={produit._id}
              className="hover:shadow-lg py-2 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row px-3">
                {/* Product Image */}
                <div className="md:w-20 md:mb-0 mb-3 lg:w-20">
                  <div className="aspect-video md:aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={`${BASE_URL}/uploads/${produit.image}`}
                      alt={produit.nameProduct}
                      className="w-full h-full rounded object-cover"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 md:pl-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="gap-3 mb-2 flex-wrap">
                        <CardTitle className="text-lg">
                          {produit.nameProduct}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              produit.type === "special"
                                ? "secondary"
                                : "default"
                            }
                            className={
                              produit.type === "special"
                                ? "bg-purple-100 text-purple-800"
                                : ""
                            }
                          >
                            {produit.type === "special" ? "Spécial" : "Normal"}
                          </Badge>
                          <Badge
                            variant={
                              produit.statut === "active"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {produit.statut === "active" ? "Actif" : "Inactif"}
                          </Badge>
                        </div>
                      </div>

                      {/* Show price only for normal products */}
                      {produit.prix &&
                        produit.type === "normal" &&
                        produit.prix > 0 && (
                          <CardDescription className="text-xl font-bold text-green-600">
                            Dh{produit.prix}
                          </CardDescription>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 md:w-auto w-full flex-wrap">
                      <Button
                        variant="outline"
                        onClick={() => openEditDialog(produit)}
                        className="gap-1 flex-1"
                        disabled={updateProduitMutation.isPending}
                      >
                        <Edit className="h-4 w-4" />
                        Modifier
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() =>
                          handleToggleStatus(produit._id, produit.statut)
                        }
                        className={`gap-1 flex-1 ${
                          produit.statut === "active"
                            ? "text-orange-600 border-orange-300 hover:bg-orange-50"
                            : "text-green-600 border-green-300 hover:bg-green-50"
                        }`}
                        disabled={toggleStatutMutation.isPending}
                      >
                        {toggleStatutMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Power className="h-4 w-4" />
                        )}
                        {produit.statut === "active" ? "Désactiver" : "Activer"}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          setProduitId(produit._id);
                          setDialogDelete(true);
                        }}
                        className="gap-1 flex-1 text-red-600 border-red-300 hover:bg-red-50"
                        disabled={deleteProduitMutation.isPending}
                      >
                        {deleteProduitMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter Nouveau Produit</DialogTitle>
            <DialogDescription>
              Remplissez les informations du nouveau produit.
            </DialogDescription>
          </DialogHeader>

          <form encType="multipart/form-data">
            <div className="grid gap-4 py-4">
              {/* Image Upload */}
              <div className="grid gap-2">
                <Label htmlFor="add-image">Image du Produit</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="add-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="flex-1"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                {formErrors.image && (
                  <p className="text-sm text-red-500">{formErrors.image}</p>
                )}
                {newProduct.image && (
                  <div className="relative w-20 rounded h-20">
                    <img
                      src={
                        previewImage || URL.createObjectURL(newProduct.image)
                      }
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0"
                      onClick={() =>
                        setNewProduct({ ...newProduct, image: null })
                      }
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Product Name */}
              <div className="grid gap-2">
                <Label htmlFor="add-name">Nom du Produit</Label>
                <Input
                  id="add-name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="Entrez le nom du produit"
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              {/* Product Type */}
              <div className="grid gap-2">
                <Label htmlFor="add-type">Type de Produit</Label>
                <CustomSelect
                  value={newProduct.type}
                  onValueChange={(value: string) =>
                    setNewProduct({
                      ...newProduct,
                      type: value as "normal" | "special",
                      prix: value === "special" ? "" : newProduct.prix,
                    })
                  }
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "special", label: "Spécial" },
                  ]}
                  placeholder="Sélectionnez le type"
                />
                {formErrors.type && (
                  <p className="text-sm text-red-500">{formErrors.type}</p>
                )}
              </div>

              {/* Price (only for normal products) */}
              {newProduct.type === "normal" && (
                <div className="grid gap-2">
                  <Label htmlFor="add-prix">Prix (Dh)</Label>
                  <Input
                    id="add-prix"
                    type="number"
                    value={newProduct.prix}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, prix: e.target.value })
                    }
                    placeholder="Entrez le prix"
                  />
                  {formErrors.prix && (
                    <p className="text-sm text-red-500">{formErrors.prix}</p>
                  )}
                </div>
              )}
            </div>
          </form>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleAddProduct}
              disabled={addProduitMutation.isPending}
            >
              {addProduitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ajout...
                </>
              ) : (
                "Ajouter Produit"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier Produit</DialogTitle>
            <DialogDescription>
              Modifiez les informations du produit.
            </DialogDescription>
          </DialogHeader>

          {editingProduct && (
            <div className="grid gap-4 py-4">
              {/* Image Upload */}
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image du Produit</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="flex-1"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                {formErrors.image && (
                  <p className="text-sm text-red-500">{formErrors.image}</p>
                )}
                {editingProduct.image && (
                  <div className="w-20 relative h-20">
                    <img
                      src={
                        previewImage|| `${BASE_URL}/uploads/${editingProduct.image}`
                      }
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                    {
                     previewImage && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() =>
                          setPreviewImage(null)
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Product Name */}
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nom du Produit</Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Entrez le nom du produit"
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              {/* Product Type */}
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Type de Produit</Label>
                <CustomSelect
                  value={editingProduct.type}
                  onValueChange={(value: string) =>
                    setEditingProduct({
                      ...editingProduct,
                      type: value as "normal" | "special",
                      prix:
                        value === "special" ? undefined : editingProduct.prix,
                    })
                  }
                  options={[
                    { value: "normal", label: "Normal" },
                    { value: "special", label: "Spécial" },
                  ]}
                  placeholder="Sélectionnez le type"
                />
                {formErrors.type && (
                  <p className="text-sm text-red-500">{formErrors.type}</p>
                )}
              </div>

              {/* Price (only for normal products) */}
              {editingProduct.type === "normal" && (
                <div className="grid gap-2">
                  <Label htmlFor="edit-prix">Prix (Dh)</Label>
                  <Input
                    id="edit-prix"
                    type="number"
                    value={editingProduct.prix || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        prix: parseFloat(e.target.value) || undefined,
                      })
                    }
                    placeholder="Entrez le prix"
                  />
                  {formErrors.prix && (
                    <p className="text-sm text-red-500">{formErrors.prix}</p>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleEditProduct}
              disabled={updateProduitMutation.isPending}
            >
              {updateProduitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                "Sauvegarder"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        message="Voulez-vous vraiment supprimer ce produit ?"
        isOpen={dialogDelete}
        onCancel={() => {
          setDialogDelete(false);
        }}
        onConfirm={() => handleDeleteProduct()}
      />
    </div>
  );
};

export default Produits;
