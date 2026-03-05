import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  MapPin,
  Phone,
  Clock,
  User,
  Check,
  Package,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { set, z } from "zod";
import dynamic from "next/dynamic";
const LocationForm = dynamic(() => import("./Location"), { ssr: false });
import { pickupSchema } from "@/app/validate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormPickupProps {
  setCurrentPage?: (page: string) => void;
}

const FormPickup = ({ setCurrentPage }: FormPickupProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPickupPending, setIsPickupPending] = useState(false);



  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [positionRamassage, setPositionRamassage] = useState({
    latitude: 33.589886,
    longitude: -7.603869,
    address: "",
  });

  const [positionLivraison, setPositionLivraison] = useState({
    latitude: 33.589886,
    longitude: -7.603869,
    address: "",
  });

  const [pickupForm, setPickupForm] = useState({
    nameClient: "",
    phone: "",
    dateLivraisonPrevue: "",
    heureRamassage: "",
    heureLivraison: "",
    dateRamassage: "",
    locationLivraison: {
      latitude: 0,
      longitude: 0,
      address: "",
    },
    locationRamassage: {
      latitude: 0,
      longitude: 0,
      address: "",
    },
  });


  useEffect(() => {
    setPickupForm({
      ...pickupForm,
      locationLivraison: {
        latitude: positionLivraison.latitude,
        longitude: positionLivraison.longitude,
        address: positionLivraison.address,
      },
      locationRamassage: {
        latitude: positionRamassage.latitude,
        longitude: positionRamassage.longitude,
        address: positionRamassage.address,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPositionLivraison , setPositionRamassage]);

  const router = useRouter();

  const handlePickupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(pickupForm);
    try {
      pickupSchema.parse(pickupForm);
      setErrors({});
      setIsPickupPending(true);

      const response = await fetch("/api/orders/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameClient: pickupForm.nameClient,
          phone: pickupForm.phone,
          dateLivraisonPrevue: pickupForm.dateLivraisonPrevue,
          dateRamassage: pickupForm.dateRamassage,
          heureRamassage: pickupForm.heureRamassage,
          heureLivraison: pickupForm.heureLivraison,
          addressRamassage: pickupForm.locationRamassage.address,
          addressLivraison: pickupForm.locationLivraison.address,
          locationRamassage: {
            latitude: Number(pickupForm.locationRamassage.latitude),
            longitude: Number(pickupForm.locationRamassage.longitude),
            address: pickupForm.locationRamassage.address,
          },
          locationLivraison: {
            latitude: Number(pickupForm.locationLivraison.latitude),
            longitude: Number(pickupForm.locationLivraison.longitude),
            address: pickupForm.locationLivraison.address,
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      toast.success("Demande de ramassage envoyée avec succès");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.issues.forEach((err) => {
          newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }

      console.log(error);
    } finally {
      setIsPickupPending(false);
    }
  };

  const validateStep1 = () => {
    const newErrors = {} as { [key: string]: string };
    console.log("pickupForm", pickupForm);

    if (!pickupForm.nameClient.trim()) {
      newErrors.nameClient = "Le nom est requis";
    }

    if (!pickupForm.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^[0-9]{10}$/.test(pickupForm.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div>
        <button
          onClick={() => setCurrentPage ? setCurrentPage("home") : router.push("/")}
          className="mb-8  text-primary hover:text-primary/70 font-semibold"
        >
          ← Retour
        </button>
       

        <div className="rounded-2xl md:w-[60%] w-[90%] mx-auto ">
          <h2 className="sm:text-2xl text-xl font-bold text-primary mb-6">
            Formulaire de Ramassage
          </h2>

          <form
            onSubmit={currentStep === 1 ? handleNextStep : handlePickupSubmit}
            className="space-y-6"
          >
            {/* STEP 1: Personal Information */}
            {currentStep === 1 && (
              <>
                <div>
                   <label className="block text-sm font-medium text-foreground mb-2">Nom Complet</label>

                  <input
                    type="text"
                    value={pickupForm.nameClient}
                    onChange={(e) =>
                      setPickupForm({
                        ...pickupForm,
                        nameClient: e.target.value,
                      })
                    }
                    className="input"
                    placeholder="Votre nom complet"
                  />
                  {errors.nameClient && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nameClient}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <Phone className="w-5 h-5" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={pickupForm.phone}
                    onChange={(e) =>
                      setPickupForm({ ...pickupForm, phone: e.target.value })
                    }
                    className="input"
                    placeholder="+212 6XX XXX XXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/70 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-101 flex items-center justify-center gap-2"
                >
                  Suivant
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* STEP 2: Location and Schedule */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <MapPin className="w-5 h-5" />
                    Adresse de Ramassage
                  </label>
                  <p className="text-gray-500 text-sm mb-2">
                    Saisir l'adresse de ramassage manuellement
                  </p>
                  <input
                    type="text"
                    value={pickupForm.locationRamassage.address}
                    onChange={(e) =>
                      setPickupForm({
                        ...pickupForm,
                        locationRamassage: {
                          ...pickupForm.locationRamassage,
                          address: e.target.value,
                        },
                      })
                    }
                    className="input"
                    placeholder="Votre adresse complète"
                  />

                  <LocationForm
                    location="Ramassage"
                    position={positionRamassage}
                    setPosition={setPositionRamassage}
                  />

                  {errors.locationRamassage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.locationRamassage}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Clock className="w-5 h-5" />
                      Date de Ramassage
                    </label>
                    <input
                      type="date"
                      value={pickupForm.dateRamassage || ""}
                      onChange={(e) =>
                        setPickupForm({
                          ...pickupForm,
                          dateRamassage: e.target.value,
                        })
                      }
                      className="input"
                    />
                    {errors.dateRamassage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dateRamassage}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      Heure de Ramassage
                    </label>
                    <select
                      value={pickupForm.heureRamassage || ""}
                      onChange={(e) =>
                        setPickupForm({
                          ...pickupForm,
                          heureRamassage: e.target.value,
                        })
                      }
                      className="input"
                    >
                      <option value="">-- Sélectionner --</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option
                          key={i}
                          value={`${String(i).padStart(2, "0")}:00`}
                        >
                          {`${String(i).padStart(2, "0")}:00`}
                        </option>
                      ))}
                    </select>
                    {errors.heureRamassage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.heureRamassage}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <MapPin className="w-5 h-5" />
                    Adresse de Livraison
                  </label>
                  <p className="text-gray-500 text-sm mb-2">
                    Saisir l'adresse de livraison manuellement
                  </p>
                  <input
                    type="text"
                    value={pickupForm.locationLivraison.address}
                    onChange={(e) =>
                      setPickupForm({
                        ...pickupForm,
                        locationLivraison: {
                          ...pickupForm.locationLivraison,
                          address: e.target.value,
                        },
                      })
                    }
                    className="input"
                    placeholder="Votre adresse complète"
                  />

                  <LocationForm
                    location="Livraison"
                    position={positionLivraison}
                    setPosition={setPositionLivraison}
                  />

                  {errors.locationLivraison && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.locationLivraison}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Clock className="w-5 h-5" />
                      Date de Livraison
                    </label>
                    <input
                      type="date"
                      value={pickupForm.dateLivraisonPrevue || ""}
                      onChange={(e) =>
                        setPickupForm({
                          ...pickupForm,
                          dateLivraisonPrevue: e.target.value,
                        })
                      }
                      className="input"
                    />
                    {errors.dateLivraisonPrevue && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dateLivraisonPrevue}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      Heure de Livraison
                    </label>
                    <select
                      value={pickupForm.heureLivraison || ""}
                      onChange={(e) =>
                        setPickupForm({
                          ...pickupForm,
                          heureLivraison: e.target.value,
                        })
                      }
                      className="input"
                    >
                      <option value="">-- Sélectionner --</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option
                          key={i}
                          value={`${String(i).padStart(2, "0")}:00`}
                        >
                          {`${String(i).padStart(2, "0")}:00`}
                        </option>
                      ))}
                    </select>
                    {errors.heureLivraison && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.heureLivraison}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Retour
                  </button>

                  <button
                    type="submit"
                    disabled={isPickupPending}
                    className="flex-1 bg-primary hover:bg-primary/70 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPickupPending
                      ? "Confirmation en cours..."
                      : "Confirmer le Ramassage"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPickup;
