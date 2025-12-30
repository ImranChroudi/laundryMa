"use client";

import { useState, useEffect } from "react";

export interface Produit {
  _id: number | string;
  nameProduct: string;
  prix: number | null;
  image: string;
  type: "normal" | "special";
  statut?: "active" | "inactive";
}

interface UseGetProduitsResult {
  data: {
    success: boolean;
    produits: Produit[];
  } | null;
  isLoading: boolean;
  error: Error | null;
}

export const useGetProduits = (): UseGetProduitsResult => {
  const [data, setData] = useState<{ success: boolean; produits: Produit[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/produits/tarifs");
        const result = await response.json();
        
        if (result.success) {
          setData({
            success: true,
            produits: result.produits || [],
          });
        } else {
          setError(new Error(result.message || "Failed to fetch produits"));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduits();
  }, []);

  return { data, isLoading, error };
};
