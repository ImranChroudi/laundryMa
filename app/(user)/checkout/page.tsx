"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, MapPin, Clock, AlertCircle, Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import LocationForm from "@/app/components/common/Location";
import toast from "react-hot-toast";
import { z } from "zod";
import Image from "next/image";
import { useAuth } from "@/app/context/AdminProvider";

type CheckoutStep = 1 | 2 | 3;

// Simple validation schema
const pickupSchema = z.object({
  nameClient: z.string().min(1, "Le nom est requis"),
  phone: z.string().min(1, "Le téléphone est requis"),
  dateRamassage: z.string().min(1, "La date de ramassage est requise"),
  heureRamassage: z.string().min(1, "L'heure de ramassage est requise"),
  dateLivraisonPrevue: z.string().min(1, "La date de livraison est requise"),
  heureLivraison: z.string().min(1, "L'heure de livraison est requise"),
  locationRamassage: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  locationLivraison: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

const CheckoutPage = () => {
  const router = useRouter();
  const { clearCart } = useAuth();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cartLaundryMa");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }

    // Load saved user info from localStorage
    const savedUserInfo = localStorage.getItem("checkoutUserInfo");
    if (savedUserInfo) {
      try {
        const userInfo = JSON.parse(savedUserInfo);
        setPickupForm((prev) => ({
          ...prev,
          nameClient: userInfo.nameClient || "",
          phone: userInfo.phone || "",
        }));
        setSaveUserInfo(true);
      } catch (error) {
        console.error("Failed to parse saved user info:", error);
      }
    }
  }, []);


  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [saveUserInfo, setSaveUserInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [pickupForm, setPickupForm] = useState({
    nameClient: "",
    phone: "",
    dateLivraisonPrevue: "",
    heureRamassage: "",
    heureLivraison: "",
    dateRamassage: "",
    addressRamassage: "",
    addressLivraison: "",
    locationLivraison: {
      latitude: 0,
      longitude: 0,
    },
    locationRamassage: {
      latitude: 0,
      longitude: 0,
    },
  });
  const [positionRamassage, setPositionRamassage] = useState({
    latitude: 35.74804478729811,
    longitude: -5.818333625793458,
  });

  const [positionLivraison, setPositionLivraison] = useState({
    latitude: 35.74804478729811,
    longitude: -5.818333625793458,
  });

  const [locationSetRamassage, setLocationSetRamassage] = useState(false);
  const [locationSetLivraison, setLocationSetLivraison] = useState(false);

  useEffect(() => {
    setPickupForm((prev) => ({
      ...prev,
      locationLivraison: {
        latitude: positionLivraison.latitude,
        longitude: positionLivraison.longitude,
      },
      locationRamassage: {
        latitude: positionRamassage.latitude,
        longitude: positionRamassage.longitude,
      },
    }));
  }, [
    positionLivraison.latitude,
    positionLivraison.longitude,
    positionRamassage.latitude,
    positionRamassage.longitude,
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPickupForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: CheckoutStep): boolean => {
    const newErrors: { [key: string]: string } = {};
    switch (step) {
      case 1:
        if (!pickupForm.nameClient.trim()) {
          newErrors.nameClient = "Le nom est requis";
        }
        if (!/^[0-9]{10,13}$/.test(pickupForm.phone.replace(/\s/g, ""))) {
          newErrors.phone = "Le numéro de téléphone doit contenir entre 10 et 13 chiffres";
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return false;
        }
        setErrors({});
        return true;
      case 2:
        if (!pickupForm.addressRamassage.trim() && !locationSetRamassage) {
          newErrors.addressRamassage = "Entrez une adresse ou choisissez votre position sur la carte";
        }
        if (!pickupForm.dateRamassage) {
          newErrors.dateRamassage = "La date de ramassage est requise";
        }
        if (!pickupForm.heureRamassage) {
          newErrors.heureRamassage = "L'heure de ramassage est requise";
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return false;
        }
        setErrors({});
        return true;
      case 3:
        if (!pickupForm.addressLivraison.trim() && !locationSetLivraison) {
          newErrors.addressLivraison = "Entrez une adresse ou choisissez votre position sur la carte";
        }
        if (!pickupForm.dateLivraisonPrevue) {
          newErrors.dateLivraisonPrevue = "La date de livraison est requise";
        }
        if (!pickupForm.heureLivraison) {
          newErrors.heureLivraison = "L'heure de livraison est requise";
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return false;
        }
        setErrors({});
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep((prev) => (prev + 1) as CheckoutStep);
      }
    } else {
      toast.error("Veuillez corriger les erreurs ci-dessous");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as CheckoutStep);
    }
  };

  // Generate WhatsApp message with Google Maps links
  const generateWhatsAppMessage = () => {
    const cartItemsText = cart.map(item => `• ${item.name} x${item.quantity}`).join('\n');
    const ramassageMapLink = `https://www.google.com/maps?q=${pickupForm.locationRamassage?.latitude},${pickupForm.locationRamassage?.longitude}`;
    const livraisonMapLink = `https://www.google.com/maps?q=${pickupForm.locationLivraison?.latitude},${pickupForm.locationLivraison?.longitude}`;
    
    return `Bonjour, je souhaite passer une commande :

👤 *Informations client :*
• Nom : ${pickupForm.nameClient}
• Téléphone : ${pickupForm.phone}


📅 *Dates :*
• Ramassage : ${pickupForm.dateRamassage} à ${pickupForm.heureRamassage}
• Livraison prévue : ${pickupForm.dateLivraisonPrevue} à ${pickupForm.heureLivraison}

📍 *Adresse de ramassage :*
${pickupForm.addressRamassage}
${ramassageMapLink}

📍 *Adresse de livraison :*
${pickupForm.addressLivraison}
${livraisonMapLink}

Merci !`;
  };

  const handleWhatsAppSubmit = () => {
    // Validate form before sending WhatsApp
    const validationResult = pickupSchema.safeParse(pickupForm);
    if (!validationResult.success) {
      const newErrors: { [key: string]: string } = {};
      validationResult.error.issues.forEach((err) => {
        const path =
          Array.isArray(err.path) && err.path.length > 0
            ? String(err.path[0])
            : "unknown";
        newErrors[path] = err.message;
      });
      setErrors(newErrors);
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappNumber = "212687910242"; // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePickupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(3)) {
      toast.error("Veuillez corriger les erreurs ci-dessous");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameClient: pickupForm.nameClient,
          phone: pickupForm.phone,
          dateRamassage: pickupForm.dateRamassage,
          heureRamassage: pickupForm.heureRamassage,
          dateLivraisonPrevue: pickupForm.dateLivraisonPrevue,
          heureLivraison: pickupForm.heureLivraison,
          addressRamassage: pickupForm.addressRamassage,
          addressLivraison: pickupForm.addressLivraison,
          locationRamassage: pickupForm.locationRamassage,
          locationLivraison: pickupForm.locationLivraison,
          cartItems: cart,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      if (saveUserInfo) {
        localStorage.setItem("checkoutUserInfo", JSON.stringify({
          nameClient: pickupForm.nameClient,
          phone: pickupForm.phone,
        }));
      } else {
        localStorage.removeItem("checkoutUserInfo");
      }

      // Clear cart after successful order
      clearCart();
      setCart([]);

      toast.success("Commande envoyée avec succès !");
      router.push("/checkout/success");
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la commande. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["Vos infos", "Ramassage", "Livraison"];

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                step < currentStep
                  ? "bg-primary text-white"
                  : step === currentStep
                  ? "bg-primary text-white ring-2 ring-primary ring-offset-2"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step < currentStep ? <Check size={20} /> : step}
            </div>
            <span className={`text-xs mt-1 ${step <= currentStep ? 'text-primary font-semibold' : 'text-gray-400'}`}>
              {stepLabels[step - 1]}
            </span>
          </div>
          {step < 3 && (
            <div
              className={`flex-1 h-1 mx-2 transition ${
                step < currentStep ? "bg-primary" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const ErrorMessage = ({ field }: { field: string }) => {
    if (!errors[field]) return null;
    return (
      <div className="flex items-center gap-1.5 mt-1.5">
        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
        <p className="text-red-500 text-sm">{errors[field]}</p>
      </div>
    );
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? "border-red-400 focus:ring-red-300 bg-red-50"
        : "border-gray-300 focus:ring-primary"
    }`;

  return (
    <SectionWrapper className="my-[50px] min-h-screen">
      <SectionMargin>
        <Link
          href="/"
          className="flex items-center gap-2 text-primary hover:opacity-80 transition mb-6"
        >
          <ArrowLeft size={20} />
          Retour
        </Link>

        <h1 className="text-4xl font-bold text-tertiary mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StepIndicator />

            <form className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-tertiary mb-2">
                    Informations personnelles
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">Renseignez vos coordonnées pour que nous puissions vous contacter.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-tertiary mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="nameClient"
                        value={pickupForm.nameClient}
                        onChange={(e) => { handleChange(e); if (errors.nameClient) setErrors(prev => ({...prev, nameClient: ''})); }}
                        placeholder="Ex: Ahmed Benali"
                        className={inputClass('nameClient')}
                      />
                      <ErrorMessage field="nameClient" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-tertiary mb-2">
                        Numéro de téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={pickupForm.phone}
                        onChange={(e) => { handleChange(e); if (errors.phone) setErrors(prev => ({...prev, phone: ''})); }}
                        placeholder="Ex: 0612345678"
                        className={inputClass('phone')}
                      />
                      <p className="text-gray-400 text-xs mt-1">Format : 10 à 13 chiffres sans espaces ni indicatif</p>
                      <ErrorMessage field="phone" />
                    </div>

                    {/* Checkbox to save user info */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="saveUserInfo"
                        checked={saveUserInfo}
                        onChange={(e) => setSaveUserInfo(e.target.checked)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label htmlFor="saveUserInfo" className="text-sm text-gray-700 cursor-pointer">
                        Enregistrer mes informations pour la prochaine fois
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 bg-primary w-full hover:bg-primary/70 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Pickup Details */}
              {currentStep === 2 && (
                <>
                  <h2 className="text-2xl font-bold text-tertiary mb-2">
                    Détails de ramassage
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">Où et quand devons-nous venir récupérer votre linge ?</p>

                  <div>
                    <LocationForm
                      location="Ramassage"
                      position={positionRamassage}
                      setPosition={setPositionRamassage}
                      address={pickupForm.addressRamassage}
                      onAddressChange={(addr) => {
                        setPickupForm(prev => ({ ...prev, addressRamassage: addr }));
                        if (errors.addressRamassage) setErrors(prev => ({...prev, addressRamassage: ''}));
                      }}
                      onLocationSet={(set) => {
                        setLocationSetRamassage(set);
                        if (set && errors.addressRamassage) setErrors(prev => ({...prev, addressRamassage: ''}));
                      }}
                    />
                    <ErrorMessage field="addressRamassage" />
                  </div>

                  <div className="sm:flex space-y-4 sm:space-y-0 gap-4 mt-4">
                    <div className="flex-1">
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <Clock className="w-5 h-5" />
                        Date de Ramassage *
                      </label>
                      <input
                        type="date"
                        value={pickupForm.dateRamassage || ""}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          setPickupForm({
                            ...pickupForm,
                            dateRamassage: e.target.value,
                            heureRamassage: e.target.value === new Date().toISOString().split('T')[0] ? "" : pickupForm.heureRamassage,
                            dateLivraisonPrevue: pickupForm.dateLivraisonPrevue && e.target.value > pickupForm.dateLivraisonPrevue ? "" : pickupForm.dateLivraisonPrevue,
                          });
                          if (errors.dateRamassage) setErrors(prev => ({...prev, dateRamassage: ''}));
                        }}
                        className={inputClass('dateRamassage')}
                        name="dateRamassage"
                      />
                      <ErrorMessage field="dateRamassage" />
                    </div>

                    <div className="flex-1">
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        Heure de Ramassage *
                      </label>
                      <select
                        value={pickupForm.heureRamassage || ""}
                        onChange={(e) => {
                          setPickupForm({
                            ...pickupForm,
                            heureRamassage: e.target.value,
                          });
                          if (errors.heureRamassage) setErrors(prev => ({...prev, heureRamassage: ''}));
                        }}
                        className={inputClass('heureRamassage')}
                      >
                        <option value="">-- Sélectionner --</option>
                        {Array.from({ length: 24 }, (_, i) => {
                          const currentHour = new Date().getHours();
                          const selectedDate = pickupForm.dateRamassage;
                          const today = new Date().toISOString().split('T')[0];
                          const isToday = selectedDate === today;
                          const isPastHour = isToday && i < currentHour;
                          
                          if (isPastHour) return null;
                          
                          return (
                            <option
                              key={i}
                              value={`${String(i).padStart(2, "0")}:00`}
                            >
                              {`${String(i).padStart(2, "0")}:00`}
                            </option>
                          );
                        })}
                      </select>
                      <ErrorMessage field="heureRamassage" />
                    </div>
                  </div>

                  <div className="flex mt-6 gap-4">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 bg-primary hover:bg-primary/70 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
                    >
                      Suivant
                    </button>

                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="flex-1 bg-gray-200 sm:w-auto w-full hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Retour
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Delivery Details */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-tertiary mb-2">
                    Détails de livraison
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">Où et quand souhaitez-vous recevoir votre linge propre ?</p>

                  <div className="space-y-6">
                    <div>
                      <LocationForm
                        location="Livraison"
                        position={positionLivraison}
                        setPosition={setPositionLivraison}
                        address={pickupForm.addressLivraison}
                        onAddressChange={(addr) => {
                          setPickupForm(prev => ({ ...prev, addressLivraison: addr }));
                          if (errors.addressLivraison) setErrors(prev => ({...prev, addressLivraison: ''}));
                        }}
                        onLocationSet={(set) => {
                          setLocationSetLivraison(set);
                          if (set && errors.addressLivraison) setErrors(prev => ({...prev, addressLivraison: ''}));
                        }}
                      />
                      <ErrorMessage field="addressLivraison" />
                    </div>

                    <div className="sm:flex space-y-4 sm:space-y-0 gap-4">
                      <div className="flex-1">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <Clock className="w-5 h-5" />
                          Date de Livraison *
                        </label>
                        <input
                          type="date"
                          value={pickupForm.dateLivraisonPrevue}
                          name="dateLivraisonPrevue"
                          min={
                            pickupForm.dateRamassage 
                              ? (() => {
                                  const ramassageDate = new Date(pickupForm.dateRamassage);
                                  ramassageDate.setDate(ramassageDate.getDate() + 1);
                                  return ramassageDate.toISOString().split('T')[0];
                                })()
                              : new Date().toISOString().split('T')[0]
                          }
                          onChange={(e) => {
                            setPickupForm({
                              ...pickupForm,
                              dateLivraisonPrevue: e.target.value,
                            });
                            if (errors.dateLivraisonPrevue) setErrors(prev => ({...prev, dateLivraisonPrevue: ''}));
                          }}
                          className={inputClass('dateLivraisonPrevue')}
                        />
                        <ErrorMessage field="dateLivraisonPrevue" />
                      </div>

                      <div className="flex-1">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          Heure de Livraison *
                        </label>
                        <select
                          value={pickupForm.heureLivraison || ""}
                          onChange={(e) => {
                            setPickupForm({
                              ...pickupForm,
                              heureLivraison: e.target.value,
                            });
                            if (errors.heureLivraison) setErrors(prev => ({...prev, heureLivraison: ''}));
                          }}
                          className={inputClass('heureLivraison')}
                        >
                          <option value="">-- Sélectionner --</option>
                          {Array.from({ length: 24 }, (_, i) => {
                            const currentHour = new Date().getHours();
                            const selectedDate = pickupForm.dateLivraisonPrevue;
                            const today = new Date().toISOString().split('T')[0];
                            const isToday = selectedDate === today;
                            const isSameDayAsRamassage = selectedDate === pickupForm.dateRamassage;
                            const ramassageHour = pickupForm.heureRamassage ? parseInt(pickupForm.heureRamassage.split(':')[0]) : -1;
                            
                            if (isToday && i < currentHour) return null;
                            if (isSameDayAsRamassage && ramassageHour >= 0 && i <= ramassageHour) return null;
                            
                            return (
                              <option
                                key={i}
                                value={`${String(i).padStart(2, "0")}:00`}
                              >
                                {`${String(i).padStart(2, "0")}:00`}
                              </option>
                            );
                          })}
                        </select>
                        <ErrorMessage field="heureLivraison" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:flex space-y-4 sm:space-y-0 gap-4 mt-8">
                    <button
                      onClick={handlePickupSubmit}
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary sm:w-auto w-full text-white py-4 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Envoi en cours..." : "Passer la commande"}
                    </button>
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="flex-1 bg-gray-200 sm:w-auto w-full hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Retour
                    </button>
                  </div>
                  
                  <div className="lg:hidden mt-4">
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                    >
                      <Image
                        src="/images/wathsapIcon.png"
                        alt="WhatsApp"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      Envoyer via WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-tertiary mb-4">
                Résumé de la commande
              </h2>
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 max-h-80 overflow-y-auto">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-2 py-2 border-b border-gray-100 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.price} DH</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            if (item.quantity <= 1) {
                              setCart(prev => {
                                const newCart = prev.filter(c => c.id !== item.id);
                                localStorage.setItem("cartLaundryMa", JSON.stringify(newCart));
                                return newCart;
                              });
                            } else {
                              setCart(prev => {
                                const newCart = prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity - 1 } : c);
                                localStorage.setItem("cartLaundryMa", JSON.stringify(newCart));
                                return newCart;
                              });
                            }
                          }}
                          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setCart(prev => {
                              const newCart = prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
                              localStorage.setItem("cartLaundryMa", JSON.stringify(newCart));
                              return newCart;
                            });
                          }}
                          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCart(prev => {
                              const newCart = prev.filter(c => c.id !== item.id);
                              localStorage.setItem("cartLaundryMa", JSON.stringify(newCart));
                              return newCart;
                            });
                          }}
                          className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">Aucun article dans le panier</p>
                    <p className="text-gray-400 text-xs mt-1">Vous pouvez quand même demander un ramassage</p>
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className="flex justify-between items-center mb-4 font-bold text-tertiary">
                  <span>Total estimé</span>
                  <span>{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} DH</span>
                </div>
              )}
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold text-lg">i</span>
                    <span className="text-blue-700 font-semibold">
                      Info livraison
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Si le prix du ramassage est supérieur à 100 DH, la livraison sera gratuite
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default CheckoutPage;