import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";


const FormulaireRamassage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  
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

  const [isPickupPending, setIsPickupPending] = useState(false);

  // Validate Step 1
  const validateStep1 = () => {
    const newErrors = {};
    
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

  // Validate Step 2
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!pickupForm.locationRamassage.address.trim()) {
      newErrors.locationRamassage = "L'adresse de ramassage est requise";
    }
    
    if (!pickupForm.dateRamassage) {
      newErrors.dateRamassage = "La date de ramassage est requise";
    }
    
    if (!pickupForm.heureRamassage) {
      newErrors.heureRamassage = "L'heure de ramassage est requise";
    }
    
    if (!pickupForm.locationLivraison.address.trim()) {
      newErrors.locationLivraison = "L'adresse de livraison est requise";
    }
    
    if (!pickupForm.dateLivraisonPrevue) {
      newErrors.dateLivraisonPrevue = "La date de livraison est requise";
    }
    
    if (!pickupForm.heureLivraison) {
      newErrors.heureLivraison = "L'heure de livraison est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e : any) => {
    e.preventDefault();
    
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePickupSubmit = (e: any) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setIsPickupPending(true);
    
    // Simulate API call - replace with your actual mutation
    setTimeout(() => {
      console.log("Form submitted:", pickupForm);
      alert("Pickup créé avec succès!");
      setIsPickupPending(false);
      // Reset form or redirect
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          ← Retour
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="ml-2 font-semibold">Informations personnelles</span>
              </div>
              
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              
              <div className={`flex items-center ${currentStep >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="ml-2 font-semibold">Détails du ramassage</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-indigo-900 mb-6">
            {currentStep === 1 ? "Vos informations" : "Détails du ramassage"}
          </h2>

          <form onSubmit={currentStep === 1 ? handleNextStep : handlePickupSubmit} className="space-y-6">
            {/* STEP 1: Personal Information */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                    <User className="w-5 h-5" />
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    value={pickupForm.nameClient}
                    onChange={(e) =>
                      setPickupForm({ ...pickupForm, nameClient: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Votre nom complet"
                  />
                  {errors.nameClient && (
                    <p className="text-red-500 text-sm mt-1">{errors.nameClient}</p>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="+212 6XX XXX XXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
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
                      setPickupForm((prev) => ({
                        ...prev,
                        locationRamassage: {
                          ...prev.locationRamassage,
                          address: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Votre adresse complète"
                  />

                  <LocationForm
                    location="Ramassage"
                    position={positionRamassage}
                    setPosition={setPositionRamassage}
                  />

                  {errors.locationRamassage && (
                    <p className="text-red-500 text-sm mt-1">{errors.locationRamassage}</p>
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
                        setPickupForm((prev) => ({
                          ...prev,
                          dateRamassage: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.dateRamassage && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateRamassage}</p>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">-- Sélectionner --</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={`${String(i).padStart(2, "0")}:00`}>
                          {`${String(i).padStart(2, "0")}:00`}
                        </option>
                      ))}
                    </select>
                    {errors.heureRamassage && (
                      <p className="text-red-500 text-sm mt-1">{errors.heureRamassage}</p>
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
                      setPickupForm(prev => ({
                        ...prev,
                        locationLivraison: {
                          ...prev.locationLivraison,
                          address: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Votre adresse complète"
                  />

                  <LocationForm
                    location="Livraison"
                    position={positionLivraison}
                    setPosition={setPositionLivraison}
                  />

                  {errors.locationLivraison && (
                    <p className="text-red-500 text-sm mt-1">{errors.locationLivraison}</p>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.dateLivraisonPrevue && (
                      <p className="text-red-500 text-sm mt-1">{errors.dateLivraisonPrevue}</p>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">-- Sélectionner --</option>
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={`${String(i).padStart(2, "0")}:00`}>
                          {`${String(i).padStart(2, "0")}:00`}
                        </option>
                      ))}
                    </select>
                    {errors.heureLivraison && (
                      <p className="text-red-500 text-sm mt-1">{errors.heureLivraison}</p>
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
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPickupPending ? "Confirmation en cours..." : "Confirmer le Ramassage"}
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

export default FormulaireRamassage;