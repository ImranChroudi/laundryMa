// context/UserContext.tsx
"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type adminContextType = {
  login: (data: any) => void;
  logout: (type: string) => Promise<void>;
  isAuthenticated: boolean;
  user: any;
  token: string;
  isLoading: boolean;
  navigate: any;
  addToCart: (
    product: { id: number | string; name: string; price: number; image: string },
    quantity?: number
  ) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  cartCount : number;
  createOrder: (
    customerName: string,
    customerPhone: string,
    customerEmail: string,
    pickupAddress: string,
    pickupDate: string,
    deliveryAddress: string,
    deliveryDate: string
  ) => string;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cart: CartItem[];
  orders: Order[];
  lastOrderCode: string;
  setLastOrderCode: (code: string) => void;
  lastOrder: Order;
  setLastOrder: (order: Order) => void;
  lastPickupCode: string;
  setLastPickupCode: (code: string) => void;
  lastPickup: Order;
  setLastPickup: (pickup: Order) => void;
};

type Page = "products" | "cart" | "checkout" | "tracking" | "success";

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  code: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupAddress: string;
  pickupDate: string;
  deliveryAddress: string;
  deliveryDate: string;
  createdAt: Date;
}
// إنشاء الـ Context
const AdminContext = createContext<adminContextType | undefined>(undefined);

// إنشاء Provider
export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("products");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastOrderCode, setLastOrderCode] = useState<string>("");
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [lastPickupCode, setLastPickupCode] = useState<string>("");
  const [lastPickup, setLastPickup] = useState<Order | null>(null);

  const navigate = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("tokenLaundryMa");
    const user = JSON.parse(localStorage.getItem("userLaundryMa") || "{}");
    const savedCart = localStorage.getItem("cartLaundryMa");
    
    if (token && user) {
      setIsAuthenticated(true);
      setToken(token);
      setUser(user);
    } else {
      setIsAuthenticated(false);
      setToken("");
      setUser(null);
      
    }
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setCart([]);
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (data: any) => {
    localStorage.setItem("tokenLaundryMa", data.token);
    localStorage.setItem("userLaundryMa", JSON.stringify(data.user));
    setIsAuthenticated(true);
    setToken(data.token);
    setUser(data.user);
    console.log("data login", data);

    toast.success("vous etes connecte!");

  };

  const logout = async (type: string) => {
    localStorage.removeItem("tokenLaundryMa");
    localStorage.removeItem("userLaundryMa");
    setUser(null);
    setIsAuthenticated(false);
    setToken("");
    toast.success("deconnecter avec success");
    if (type === "user") {
      navigate.push("/");
      return;
    }
    navigate.push("/admin");
  };

  // Handle Add to carte
  const addToCart = (
    product: { id: number | string; name: string; price: number; image: string },
    quantity = 1
  ) => {
    console.log("Adding to cart:", product, "Quantity:", quantity);
    setCart((prevCart) => {
      // Convert IDs to strings for consistent comparison
      const productId = String(product.id);
      const existingItem = prevCart.find((item) => String(item.id) === productId);
      
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          String(item.id) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`${quantity} ${quantity > 1 ? 'articles ajoutés' : 'article ajouté'} au panier`);
      } else {
        newCart = [...prevCart, { ...product, quantity }];
        toast.success(`${product.name} ajouté au panier`);
      }
      
      localStorage.setItem("cartLaundryMa", JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) => {
        const newCart = prevCart.map((item) => 
          String(item.id) === String(id) ? { ...item, quantity } : item
        );
        localStorage.setItem("cartLaundryMa", JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const removeFromCart = (id: number | string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => String(item.id) !== String(id));
      localStorage.setItem("cartLaundryMa", JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cartLaundryMa");
  };

  const createOrder = (
    customerName: string,
    customerPhone: string,
    customerEmail: string,
    pickupAddress: string,
    pickupDate: string,
    deliveryAddress: string,
    deliveryDate: string
  ) => {
    const orderCode = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder: Order = {
      code: orderCode,
      items: [...cart],
      total,
      customerName,
      customerPhone,
      customerEmail,
      pickupAddress,
      pickupDate,
      deliveryAddress,
      deliveryDate,
      createdAt: new Date(),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    clearCart();
    return orderCode;
  };

  const value = {
    login,
    logout,
    isAuthenticated,
    user,
    token,
    isLoading,
    navigate,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    currentPage,
    setCurrentPage,
    cart,
    cartCount : cart.length,
    orders,
    lastOrderCode,
    setLastOrderCode,
    lastOrder: lastOrder || {} as Order,
    setLastOrder,
    lastPickupCode,
    setLastPickupCode,
    lastPickup: lastPickup || {} as Order,
    setLastPickup,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

// Hook لاستخدام هذا الـ Context
export const useAuth = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAuth must be used within an AdminProvider");
  }
  return context;
};
