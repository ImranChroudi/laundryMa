"use client";

import { useState, useMemo } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Search,
  Phone,
  MessageCircle,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
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

// Types
interface Client {
  _id: string;
  name: string;
  phone: string;
  createdAt: string;
}

// Generate dummy clients data
const generateDummyClients = (): Client[] => {
  const names = [
    "Ahmed Benali", "Fatima Zahra", "Mohamed Alami", "Aicha Idrissi", 
    "Omar Bennani", "Khadija Tazi", "Youssef Cherkaoui", "Nadia Benjelloun",
    "Hassan Filali", "Latifa Berrada", "Karim Fassi", "Samira Benjelloun",
    "Rachid Tounsi", "Zineb Alaoui", "Mustapha Hajji", "Nour El Houda",
    "Abdellatif Zerouali", "Malika Benkirane", "Said Boutayeb", "Amina Chakir",
    "Driss Mansouri", "Souad Berrada", "Khalid Lamrani", "Rajae Bennani",
    "Brahim Semlali", "Houria Alami", "Tarek Benomar", "Zahra Idrissi",
    "Nordine Fassi", "Leila Cherkaoui", "Hamid Bennani", "Soraya Tazi",
    "Amine Alaoui", "Ghita Benjelloun", "Yassine Berrada", "Nada Filali",
    "Jamal Bennani", "Amal Cherkaoui", "Othman Idrissi", "Rim Alami",
    "Mehdi Fassi", "Sara Benjelloun", "Adil Tazi", "Leila Benali",
    "Ismail Berrada", "Noura Alaoui", "Kamal Cherkaoui", "Yasmine Idrissi"
  ];
  
  const phoneFormats = [
    "+212 6", "+212 7", "+212 5"
  ];

  return names.map((name, index) => ({
    _id: (index + 1).toString(),
    name,
    phone: `${phoneFormats[index % phoneFormats.length]}${Math.floor(Math.random() * 90000000 + 10000000)}`,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

const dummyClients = generateDummyClients();

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(dummyClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: ''
  });

  const clientsPerPage = 12;

  // Filter clients based on search (name or phone)
  const filteredClients = useMemo(() => {
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
    );
  }, [clients, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const startIndex = (currentPage - 1) * clientsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + clientsPerPage);

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Generate avatar with first letter
  const getAvatar = (name: string) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
      'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;
    
    return (
      <div className={`w-12 h-12 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-lg`}>
        {firstLetter}
      </div>
    );
  };

  // Add new client
  const handleAddClient = () => {
    if (newClient.name.trim() && newClient.phone.trim()) {
      const client: Client = {
        _id: (clients.length + 1).toString(),
        name: newClient.name.trim(),
        phone: newClient.phone.trim(),
        createdAt: new Date().toISOString()
      };

      setClients([client, ...clients]);
      setNewClient({
        name: '',
        phone: ''
      });
      setIsAddDialogOpen(false);
    }
  };

  // Delete client
  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(c => c._id !== id));
  };

  // Send WhatsApp message
  const handleSendWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/\s+/g, '').replace('+', '');
    const message = `Bonjour ${name}, comment puis-je vous aider?`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Pagination component
  const Pagination = () => {
    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); 
           i <= Math.min(totalPages - 1, currentPage + delta); 
           i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else {
        if (totalPages > 1) {
          rangeWithDots.push(totalPages);
        }
      }

      return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>

        <div className="flex items-center space-x-1">
          {getVisiblePages().map((page, index) => (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={typeof page === 'string'}
              className="min-w-[40px]"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="gap-1"
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
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
              placeholder="Chercher par nom ou téléphone..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter Client
        </Button>
      </div>

      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''} trouvé{filteredClients.length !== 1 ? 's' : ''}
        {searchTerm && ` pour "${searchTerm}"`}
      </div>

      {/* Clients Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedClients.map((client: Client) => (
          <Card key={client._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                {getAvatar(client.name)}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{client.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Phone className="h-3 w-3" />
                    <span className="truncate">{client.phone}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="text-xs text-muted-foreground">
                Ajouté le {new Date(client.createdAt).toLocaleDateString('fr-FR')}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendWhatsApp(client.phone, client.name)}
                  className="flex-1 gap-1 text-green-600 border-green-300 hover:bg-green-50"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClient(client._id)}
                  className="gap-1 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results message */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {searchTerm ? 'Aucun client trouvé pour cette recherche.' : 'Aucun client disponible.'}
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredClients.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          <Pagination />
          <div className="text-sm text-muted-foreground">
            Affichage de {startIndex + 1} à {Math.min(startIndex + clientsPerPage, filteredClients.length)} sur {filteredClients.length} clients
          </div>
        </div>
      )}

      {/* Add Client Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter Nouveau Client</DialogTitle>
            <DialogDescription>
              Remplissez les informations du nouveau client.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Client Name */}
            <div className="grid gap-2">
              <Label htmlFor="client-name">Nom du Client</Label>
              <Input
                id="client-name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                placeholder="Entrez le nom complet"
              />
            </div>

            {/* Client Phone */}
            <div className="grid gap-2">
              <Label htmlFor="client-phone">Numéro de Téléphone</Label>
              <Input
                id="client-phone"
                type="tel"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                placeholder="+212 6XX XXX XXX"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleAddClient}
              disabled={!newClient.name.trim() || !newClient.phone.trim()}
            >
              Ajouter Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;