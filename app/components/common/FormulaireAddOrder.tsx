import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  MapPin,
  Phone,
  Clock,
  User,
  Check,
  Package,
} from "lucide-react";
import { set, z } from "zod";
import { pickupSchema } from "@/app/validate";
import toast from "react-hot-toast";
import FormulaireRamassage from "./FormulaireRamassage";
import SectionWrapper from "@/app/SectionWrapper";
import SectionMargin from "@/app/SectionMargin";

// Types
interface Product {
  id: number;
  nameProduct: string;
  price: number | null;
  hasPrice: boolean;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Zod Schemas

const orderSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  location: z.string().min(5, "Adresse requise"),
  whatsapp: z.string().optional(),
});

// Products data
const products = [
  { id: 1, nameProduct: "Chemise", price: 25, hasPrice: true, image: "👔" },
  { id: 2, nameProduct: "Pantalon", price: 30, hasPrice: true, image: "👖" },
  { id: 3, nameProduct: "Robe", price: 45, hasPrice: true, image: "👗" },
  { id: 4, nameProduct: "Costume", price: 80, hasPrice: true, image: "🤵" },
  { id: 5, nameProduct: "Manteau", price: 60, hasPrice: true, image: "🧥" },
  { id: 6, nameProduct: "Pull", price: 35, hasPrice: true, image: "🧶" },
  { id: 7, nameProduct: "Couverture", price: null, hasPrice: false, image: "🛏️" },
  { id: 8, nameProduct: "Tapis", price: null, hasPrice: false, image: "🗺️" },
  { id: 9, nameProduct: "Rideau", price: null, hasPrice: false, image: "🪟" },
];

function FormulaireAddOrder() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [orderConfirmed , setOrderConfirmed] = useState(false)
  const [positionRamassage, setPositionRamassage] = useState({
    latitude: 33.589886,
    longitude: -7.603869,
    address: "",
  });
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    location: "",
    whatsapp: "",
  })

  const [positionLivraison, setPositionLivraison] = useState({
    latitude: 33.589886,
    longitude: -7.603869,
    address: "",
  });

  const [pickupForm, setPickupForm] = useState({
    nameClient: "Imran",
    phone: "0687910242",
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


  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setPickupForm({
      ...pickupForm,
      locationRamassage: positionRamassage,
      locationLivraison: positionLivraison,
    });

    console.log(pickupForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionRamassage, positionLivraison]);

  //Add to cart
    const addToCart = (product: Product, quantity: number) => {
      if (quantity <= 0) return;

      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity }]);
      }
    };

  //Remove from cart
    const removeFromCart = (productId: number) => {
      setCart(cart.filter((item) => item.id !== productId));
    };

    // Calculate total
    const calculateTotal = () => {
      return cart.reduce((total, item) => {
        return total + (item.hasPrice && item.price ? item.price * item.quantity : 0);
      }, 0);
    };

  // Handle pickup form submission

  

  // Handle order submission
    const handleOrderSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      try {
        orderSchema.parse(orderForm);
        setErrors({});
        setOrderConfirmed(true);
        setCart([]);
        setOrderForm({ name: "", phone: "", location: "", whatsapp: "" });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: { [key: string]: string } = {};
          error.issues.forEach((err) => {
            newErrors[err.path[0] as string] = err.message;
          });
          setErrors(newErrors);
        }
      }
    };

  // Home Page
  if (currentPage === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-indigo-900 mb-4">
              🧺 Pressing Express
            </h1>
            <p className="text-xl text-gray-700">
              Service de nettoyage professionnel à domicile
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <button
              onClick={() => setCurrentPage("pickup")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 px-8 rounded-2xl shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-3 text-xl"
            >
              <Package className="w-8 h-8" />
              Ramassage Maintenant
            </button>

            <button
              onClick={() => setCurrentPage("products")}
              className="w-full bg-primary hover:bg-primary/70 text-white font-bold py-6 px-8 rounded-2xl shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-3 text-xl"
            >
              <ShoppingCart className="w-8 h-8" />
              Commander des Services
            </button>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-bold text-lg mb-2">Ramassage Gratuit</h3>
              <p className="text-gray-600 text-sm">
                Nous venons chercher vos vêtements
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold text-lg mb-2">Nettoyage Pro</h3>
              <p className="text-gray-600 text-sm">
                Qualité professionnelle garantie
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-bold text-lg mb-2">Notification</h3>
              <p className="text-gray-600 text-sm">Suivi par SMS ou WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pickup Form Page
  if (currentPage === "pickup") {
    return (
      <FormulaireRamassage setCurrentPage={setCurrentPage}  />
    )
  }

  if (currentPage === "products") {
      return (
        <SectionWrapper>
          <SectionMargin>
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => setCurrentPage("home")}
                className="text-green-600 hover:text-green-800 font-semibold"
              >
                ← Retour
              </button>
              <button
                onClick={() => setCurrentPage("cart")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                Panier ({cart.length})
              </button>
            </div>

            <h2 className="text-4xl font-bold text-green-900 mb-8 text-center">
              Nos Services
            </h2>

            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </SectionMargin>
        </SectionWrapper>
      );
    }

    if (currentPage === "cart") {
      if (orderConfirmed) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-3xl font-bold text-green-900 mb-4">
                Commande Confirmée!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Votre demande a été envoyée avec succès. Vous recevrez une
                notification ici ou sur WhatsApp après que l'administrateur ait
                accepté votre commande.
              </p>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  📱 Vous serez notifié par notification push et WhatsApp dès que
                  votre commande sera validée.
                </p>
              </div>
              <button
                onClick={() => {
                  setOrderConfirmed(false);
                  setCurrentPage("home");
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Retour à l'Accueil
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setCurrentPage("products")}
              className="mb-6 text-green-600 hover:text-green-800 font-semibold"
            >
              ← Continuer les Achats
            </button>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-green-900 mb-6">
                Votre Panier
              </h2>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Votre panier est vide
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{item.image}</span>
                          <div>
                            <h3 className="font-semibold">{item.nameProduct}</h3>
                            <p className="text-sm text-gray-600">
                              Quantité: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {item.hasPrice ? (
                            <p className="font-bold text-lg">
                              {(item.price as number) * item.quantity} DH
                            </p>
                          ) : (
                            <p className="text-sm text-orange-600 font-semibold">
                              Prix à déterminer
                            </p>
                          )}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-sm hover:text-red-700 mt-1"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-6 mb-6">
                    <div className="flex justify-between text-xl font-bold mb-2">
                      <span>Total:</span>
                      <span>{calculateTotal()} DH</span>
                    </div>
                    {cart.some((item) => !item.hasPrice) && (
                      <p className="text-sm text-orange-600 text-right">
                        + Prix à déterminer par l'employeur
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleOrderSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Informations de Livraison
                    </h3>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <User className="w-5 h-5" />
                        Nom Complet
                      </label>
                      <input
                        type="text"
                        value={orderForm.name}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Votre nom"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <Phone className="w-5 h-5" />
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={orderForm.phone}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+212 6XX XXX XXX"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                        <MapPin className="w-5 h-5" />
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={orderForm.location}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, location: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Votre adresse complète"
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-gray-700 font-semibold mb-2 block">
                        WhatsApp (Optionnel)
                      </label>
                      <input
                        type="tel"
                        value={orderForm.whatsapp}
                        onChange={(e) =>
                          setOrderForm({ ...orderForm, whatsapp: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Numéro WhatsApp pour notifications"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
                    >
                      Confirmer la Demande
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

  return null;
}

function ProductCard({ product, addToCart }: { product: Product; addToCart: (product: Product, quantity: number) => void }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="text-6xl text-center mb-4">{product.image}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{product.nameProduct}</h3>
      
      {product.hasPrice ? (
        <p className="text-2xl font-bold text-primary mb-4 text-center">{product.price} DH</p>
      ) : (
        <p className="text-sm text-orange-600 font-semibold mb-4 text-center">
          Prix à déterminer par l'employeur
        </p>
      )}

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm font-semibold text-gray-700">Quantité:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 px-3 flex-1 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-primary hover:bg-primary/70 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        Ajouter au Panier
      </button>
    </div>
  );
}


export default FormulaireAddOrder;
