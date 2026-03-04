"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, MapPin, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import LocationForm from "@/app/components/common/Location";
import toast from "react-hot-toast";
import { z } from "zod";
import { useCreatePickupMutation } from "@/app/hooks/use-order";
import Image from "next/image";

type CheckoutStep = 1 | 2 | 3;

// Simple validation schema
const pickupSchema = z.object({
  nameClient: z.string().min(1, "الاسم مطلوب"),
  phone: z.string().min(1, "رقم الهاتف مطلوب"),
  dateRamassage: z.string().min(1, "تاريخ الاستلام مطلوب"),
  heureRamassage: z.string().min(1, "ساعة الاستلام مطلوبة"),
  dateLivraisonPrevue: z.string().min(1, "تاريخ التسليم مطلوب"),
  heureLivraison: z.string().min(1, "ساعة التسليم مطلوبة"),
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
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
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

  const { mutate: mutatePickup, isPending: isPickupPending } =
    useCreatePickupMutation();
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
    switch (step) {
      case 1:
        if (!pickupForm.nameClient.trim()) {
          setErrors({ nameClient: "الاسم مطلوب" });
          return false;
        } else if (!/^[0-9]{10,13}$/.test(pickupForm.phone.replace(/\s/g, ""))) {
          setErrors({ nameClient: "", phone: "يجب أن يحتوي رقم الهاتف على 10 أرقام" });
          return false;
        }
        return true;
      case 2:
        if (!pickupForm.addressRamassage.trim()) {
          setErrors({ addressRamassage: "عنوان الاستلام مطلوب" });
          return false;
        } else if (!pickupForm.dateRamassage) {
          setErrors({ dateRamassage: "تاريخ الاستلام مطلوب" });
          return false;
        } else if (!pickupForm.heureRamassage) {
          setErrors({ heureRamassage: "ساعة الاستلام مطلوبة" });
          return false;
        }
        return true;
      case 3:
        if (!pickupForm.addressLivraison.trim()) {
          setErrors({ addressLivraison: "عنوان التسليم مطلوب" });
          return false;
        } else if (!pickupForm.dateLivraisonPrevue) {
          setErrors({ dateLivraisonPrevue: "تاريخ التسليم مطلوب" });
          return false;
        } else if (!pickupForm.heureLivraison) {
          setErrors({ heureLivraison: "ساعة التسليم مطلوبة" });
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1 as CheckoutStep);
      }
    } else {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
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
    
    return `مرحباً، أود تقديم طلب:

👤 *معلومات العميل:*
• الاسم: ${pickupForm.nameClient}
• الهاتف: ${pickupForm.phone}

📅 *التواريخ:*
• الاستلام: ${pickupForm.dateRamassage} في ${pickupForm.heureRamassage}
• التسليم المخطط: ${pickupForm.dateLivraisonPrevue} في ${pickupForm.heureLivraison}

📍 *عنوان الاستلام:*
${pickupForm.addressRamassage}
${ramassageMapLink}

📍 *عنوان التسليم:*
${pickupForm.addressLivraison}
${livraisonMapLink}

شكراً!`;
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
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappNumber = "212687910242";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePickupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form
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
        return;
      }

      mutatePickup({
        ...pickupForm,
        locationRamassage: {
          ...pickupForm.locationRamassage,
          address: pickupForm.addressRamassage,
        },
        locationLivraison: {
          ...pickupForm.locationLivraison,
          address: pickupForm.addressLivraison,
        },
      },
      {
        onSuccess: (data: any) => {
          console.log(data);
          
          // Save user info to localStorage if checkbox is checked
          if (saveUserInfo) {
            localStorage.setItem("checkoutUserInfo", JSON.stringify({
              nameClient: pickupForm.nameClient,
              phone: pickupForm.phone,
            }));
          } else {
            // Remove saved info if checkbox is unchecked
            localStorage.removeItem("checkoutUserInfo");
          }
          
          toast.success("تم إضافة الطلب بنجاح");
          router.push("/ar/checkout/success");
        },
        onError: (error) => {
          console.log(error);
          toast.error("حدث خطأ أثناء إنشاء الطلب");
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.issues.forEach((err) => {
          const path =
            Array.isArray(err.path) && err.path.length > 0
              ? String(err.path[0])
              : "unknown";
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      console.log(error);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center flex-1">
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

  return (
    <SectionWrapper className="my-[50px] min-h-screen">
      <SectionMargin>
        <Link
          href="/ar"
          className="flex items-center gap-2 text-primary hover:opacity-80 transition mb-6"
        >
          <ArrowLeft size={20} />
          رجوع
        </Link>

        <h1 className="text-4xl font-bold text-tertiary mb-8">الدفع</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StepIndicator />

            <form className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-tertiary mb-6">
                    المعلومات الشخصية
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-tertiary mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        name="nameClient"
                        value={pickupForm.nameClient}
                        onChange={handleChange}
                        placeholder="محمد أحمد"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.nameClient && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nameClient}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-tertiary mb-2">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={pickupForm.phone}
                        onChange={handleChange}
                        placeholder="+212 6 XX XX XX XX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
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
                        حفظ معلوماتي للمرة القادمة
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 bg-primary w-full hover:bg-primary/70 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
                    >
                      التالي
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Pickup Details */}
              {currentStep === 2 && (
                <>
                  <h2 className="text-2xl font-bold text-tertiary mb-6">
                    تفاصيل الاستلام
                  </h2>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <MapPin className="w-5 h-5" />
                      عنوان الاستلام
                    </label>
                    <p className="text-gray-500 text-sm mb-2">
                      أدخل عنوان الاستلام يدوياً
                    </p>
                    <input
                      type="text"
                      value={pickupForm.addressRamassage}
                      name="addressRamassage"
                      onChange={(e) => handleChange(e)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                      placeholder="عنوانك الكامل"
                    />
                    {errors.addressRamassage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.addressRamassage}
                      </p>
                    )}

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

                  <div className="sm:flex space-y-4 sm:space-y-0 gap-4 mt-4">
                    <div className="flex-1">
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <Clock className="w-5 h-5" />
                        تاريخ الاستلام
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
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        name="dateRamassage"
                      />
                      {errors.dateRamassage && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dateRamassage}
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        ساعة الاستلام
                      </label>
                      <select
                        value={pickupForm.heureRamassage || ""}
                        onChange={(e) =>
                          setPickupForm({
                            ...pickupForm,
                            heureRamassage: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">-- اختر --</option>
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
                      {errors.heureRamassage && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.heureRamassage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex mt-6 gap-4">
                   

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 bg-primary hover:bg-primary/70 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
                    >
                      التالي
                    </button>
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      رجوع
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Delivery Details */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-tertiary mb-6">
                    تفاصيل التسليم
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <MapPin className="w-5 h-5" />
                        عنوان التسليم
                      </label>
                      <p className="text-gray-500 text-sm mb-2">
                        أدخل عنوان التسليم يدوياً
                      </p>
                      <input
                        type="text"
                        name="addressLivraison"
                        value={pickupForm.addressLivraison}
                        onChange={(e) => handleChange(e)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                        placeholder="عنوانك الكامل"
                      />
                      {errors.addressLivraison && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.addressLivraison}
                        </p>
                      )}

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

                    <div className="sm:flex space-y-4 sm:space-y-0 gap-4">
                      <div className="flex-1">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          <Clock className="w-5 h-5" />
                          تاريخ التسليم
                        </label>
                        <input
                          type="date"
                          value={pickupForm.dateLivraisonPrevue || ""}
                          min={
                            pickupForm.dateRamassage 
                              ? (() => {
                                  const ramassageDate = new Date(pickupForm.dateRamassage);
                                  ramassageDate.setDate(ramassageDate.getDate() + 1);
                                  return ramassageDate.toISOString().split('T')[0];
                                })()
                              : new Date().toISOString().split('T')[0]
                          }
                          onChange={(e) =>
                            setPickupForm({
                              ...pickupForm,
                              dateLivraisonPrevue: e.target.value,
                              heureLivraison: e.target.value === new Date().toISOString().split('T')[0] || e.target.value === pickupForm.dateRamassage ? "" : pickupForm.heureLivraison,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          name="dateLivraison"
                        />
                        {errors.dateLivraisonPrevue && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.dateLivraisonPrevue}
                          </p>
                        )}
                      </div>

                      <div className="flex-1">
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                          ساعة التسليم
                        </label>
                        <select
                          value={pickupForm.heureLivraison || ""}
                          onChange={(e) =>
                            setPickupForm({
                              ...pickupForm,
                              heureLivraison: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">-- اختر --</option>
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
                        {errors.heureLivraison && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.heureLivraison}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="sm:flex space-y-4 sm:space-y-0 gap-4 mt-8">
                    <button
                      onClick={handlePickupSubmit}
                      type="submit"
                      className="flex-1 bg-primary sm:w-auto w-full text-white py-4 rounded-lg font-bold hover:opacity-90 transition"
                    >
                      تأكيد الطلب
                    </button>
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="flex-1 bg-gray-200 sm:w-auto w-full hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      رجوع
                    </button>
                  </div>
                  
                  {/* WhatsApp Button for Mobile */}
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
                      إرسال عبر واتساب
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
                ملخص الطلب
              </h2>
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 max-h-64 overflow-y-auto">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        {(item.price * item.quantity).toFixed(2)} درهم
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm"></p>
                )}
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold text-lg">!</span>
                    <span className="text-green-700 font-semibold">
                      التسليم مدفوع
                    </span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    إذا كان سعر الاستلام أكثر من 100 درهم، فسيكون التسليم مجاناً
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

