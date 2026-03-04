import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: "صيغة الإيميل غير صحيحة" }),
  password: z
    .string()
    .min(8, { message: "كلمة المرور قصيرة؛ على الأقل 8 أحرف" }),
  role: z.enum(['admin', 'employe']).optional(),
});

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "L'email est requis" })
    .email({ message: "L'email doit être valide" }),
});

export const SignUpemployeeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(50, { message: "Le nom ne doit pas dépasser 50 caractères" }),
  email: z
    .string()
    .email({ message: "Format de l'email invalide" }),
  password: z
    .string()
    .min(8, { message: "Mot de passe trop court ; au moins 8 caractères" }),
});

export const addCommentSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  email: z.string().email("Email invalide"),
  rating: z
    .number()
    .min(1, "La note minimale est 1")
    .max(5, "La note maximale est 5"),
  comment: z.string().min(1, "Le commentaire est obligatoire"),
});

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .email("L'email est invalide")
      .min(1, "L'email est requis"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const produitSchema = z.object({
  nameProduct: z
    .string()
    .min(1, { message: "Le nom est requis" })
    .max(255, { message: "Le nom est trop long" }),
  prix: z
    .union([
      z.string().transform((val) => (val === "" ? null : parseFloat(val))),
      z.number(),
      z.null(),
    ])
    .refine(
      (val) => val === null || (!isNaN(val) && val >= 0),
      "Le prix doit être un nombre positif"
    )
    .optional(),
  type: z.enum(["normal", "special"], {
    message: "Le type doit être 'normal' ou 'special'",
  }),
  image: z
    .union([
      z.object({}),
      z.string().min(1),
    ])
    .optional(),
  statut: z.enum(["active", "inactive"]).optional(),
});

export const locationSchema = z
  .object({
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    address: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.address && data.address.trim() !== "") ||
      (data.latitude !== undefined && data.longitude !== undefined),
    {
      message:
        "Veuillez fournir soit une adresse, soit une position sur la carte / votre localisation actuelle",
      path: ["address"],
    }
  );

export const pickupSchema = z.object({
  nameClient: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  dateLivraisonPrevue: z.string().min(1, "Date de livraison requise"),
  dateRamassage: z.string().min(1, "Date de ramassage requise"),
  heureRamassage: z.string().min(1, "Heure de ramassage requise"),
  heureLivraison: z.string().min(1, "Heure de livraison requise"),
  locationRamassage: locationSchema,
  locationLivraison: locationSchema,
});

export const pickupWithCartSchema = z.object({
  nameClient: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  dateLivraisonPrevue: z.string().min(1, "Date de livraison requise"),
  dateRamassage: z.string().min(1, "Date de ramassage requise"),
  heureRamassage: z.string().min(1, "Heure de ramassage requise"),
  heureLivraison: z.string().min(1, "Heure de livraison requise"),
  locationRamassage: locationSchema,
  locationLivraison: locationSchema,
  cartItems: z
    .array(
      z.object({
        produitId: z.number().int().positive("L'ID du produit doit être un entier positif"),
        quantity: z.number().int().min(1, "La quantité doit être au moins 1"),
      })
    )
    .optional(),
});

export const signUpSchemaClient = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(255, 'Le nom doit contenir moins de 255 caractères'),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Format de numéro de téléphone invalide'),
  email: z.string().email('Adresse e-mail invalide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .max(100, 'Le mot de passe doit contenir moins de 100 caractères'),
});













