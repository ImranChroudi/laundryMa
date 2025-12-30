export interface Produit {
  _id: string;
  nameProduct: string;
  prix?: number;
  type: "normal" | "special";
  image: File | null;
  statut: "active" | "inactive";
}

export type ProduitDemande = {
  produitId: number ;
  nameProduct: string;
  prix: string;
  quantity: number;
};

export type Location = {
  latitude: number;
  longitude: number;
  address?: string;
};

export type Demande = {
  _id: string;
  orderId: string;
  nameClient: string;
  phone: string;
  statut: "En cours" | "Livrée" | "Annulée";
  dateLivraisonPrevue: string;
  dateLivraisonEffective: string | null;
  dateRamassage : string | null;
  locationRamassage :Location;
  locationLivraison : Location;
  heureRamassage : string;
  heureLivraison : string;
  date: string;
};

export type Employee = {
  _id: string;
  name: string;
  email: string;
  role : string;
  isActive : boolean;
  state : string
};



