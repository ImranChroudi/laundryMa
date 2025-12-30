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
import { Search, Phone, Mail, MapPin, Building, User, Calendar, Trash2 } from "lucide-react";
import {
  useGetProfessionalContactsQuery,
  useDeleteProfessionalContactMutation,
} from "@/app/hooks/use-professional-contacts";
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

interface ProfessionalContact {
  _id: number;
  companyName: string;
  responsibleName?: string;
  email: string;
  phone?: string;
  address?: string;
  activityType?: string;
  services?: string;
  frequency?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

const ProfessionalContacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);

  const { data, isLoading } = useGetProfessionalContactsQuery() as {
    data: { contacts: ProfessionalContact[] };
    isLoading: boolean;
  };

  const { mutate: deleteContactMutation } = useDeleteProfessionalContactMutation();

  const handleDeleteClick = (contactId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setContactToDelete(contactId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;

    try {
      deleteContactMutation(
        { contactId: contactToDelete },
        {
          onSuccess: () => {
            toast.success("Contact professionnel supprimé avec succès");
            setDeleteDialogOpen(false);
            setContactToDelete(null);
          },
          onError: (error: any) => {
            toast.error(error.response?.data?.message || "Erreur lors de la suppression");
          },
        }
      );
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la suppression");
    }
  };

  const handleEmailClick = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  // Filter contacts based on search term
  const filteredContacts = data?.contacts?.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.companyName?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.phone?.includes(searchTerm) ||
      contact.responsibleName?.toLowerCase().includes(searchLower)
    );
  }) || [];

  if (isLoading) return <LoaderCommponent />;

  // Map activity types
  const activityTypeMap: { [key: string]: string } = {
    'hotel': 'Hôtel',
    'restaurant': 'Restaurant',
    'bureau': 'Bureau',
    'salon-beaute': 'Salon de beauté',
    'autre': 'Autre'
  };

  // Map frequencies
  const frequencyMap: { [key: string]: string } = {
    'quotidienne': 'Quotidienne',
    'hebdomadaire': 'Hebdomadaire',
    'mensuelle': 'Mensuelle',
    'ponctuelle': 'Ponctuelle'
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Total: {data?.contacts?.length || 0}
          </Badge>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid gap-4 items-start md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredContacts.map((contact: ProfessionalContact) => {
          // Parse services if it's a JSON string
          let servicesList: string[] = [];
          if (contact.services) {
            try {
              servicesList = JSON.parse(contact.services);
            } catch {
              servicesList = [contact.services];
            }
          }

          return (
            <Card
              key={contact._id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">
                        {contact.companyName}
                      </CardTitle>
                      <CardDescription>
                        {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  {contact.responsibleName && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="truncate">{contact.responsibleName}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <a
                      href={`mailto:${contact.email}`}
                      onClick={(e) => handleEmailClick(contact.email, e)}
                      className="text-blue-500 hover:text-blue-700 truncate flex-1"
                    >
                      {contact.email}
                    </a>
                  </div>

                  {contact.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <a
                        href={`tel:${contact.phone}`}
                        onClick={(e) => handlePhoneClick(contact.phone!, e)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  )}

                  {contact.address && (
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-xs line-clamp-2">{contact.address}</span>
                    </div>
                  )}

                  {contact.activityType && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {activityTypeMap[contact.activityType] || contact.activityType}
                      </Badge>
                    </div>
                  )}

                  {contact.frequency && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {frequencyMap[contact.frequency] || contact.frequency}
                      </span>
                    </div>
                  )}

                  {servicesList.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {servicesList.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {servicesList.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{servicesList.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {contact.message && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-muted-foreground line-clamp-2">
                      {contact.message}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 justify-between pt-2 border-t">
                  <div className="flex gap-2 flex-1">
                    {contact.email && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handleEmailClick(contact.email, e)}
                        className="flex-1"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    )}
                    {contact.phone && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handlePhoneClick(contact.phone!, e)}
                        className="flex-1"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Appeler
                      </Button>
                    )}
                  </div>
                  <ButtonDelete
                    onClick={(e) => handleDeleteClick(contact._id, e)}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            {searchTerm ? "Aucun contact trouvé" : "Aucun contact professionnel pour le moment"}
          </p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce contact professionnel ? Cette action
              est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setContactToDelete(null)}>
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

export default ProfessionalContacts;

