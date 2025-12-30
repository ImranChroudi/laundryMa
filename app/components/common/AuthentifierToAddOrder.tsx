import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  User,
  Lock,
  ArrowRight,
  MessageCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/context/AdminProvider";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpClientMutation } from "@/hooks/use-auth-client";
import toast from "react-hot-toast";
import { signUpSchemaClient } from "@/validate";
import SectionWrapper from "@/app/SectionWrapper";
import SectionMargin from "@/app/SectionMargin";

// Google OAuth Configuration
// IMPORTANT: Replace this with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  import.meta.env.REACT_APP_GOOGLE_CLIENT_ID ||
  "YOUR_GOOGLE_CLIENT_ID_HERE";

const AuthenticationPage = () => {
  const [currentPage, setCurrentPage1] = useState("home");
  const [authMethod, setAuthMethod] = useState(null);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/form-pickup");
    }
  }, []);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const { mutate: signupClientMutate, isPending: isSignupClientPending } =
    useSignUpClientMutation();
  const handleSubmitSignUpClient = () => {
    const result = signUpSchemaClient.safeParse(formData);

    if (!result.success) {
      // Extract field errors from Zod
      const fieldErrors = result.error.flatten().fieldErrors;

      // Set them in your state (if using `setErrors`)
      setErrors(fieldErrors);

      return;
    }

    // Clear errors if valid
    setErrors({});

    signupClientMutate(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      },
      {
        onSuccess: (data: any) => {
          toast.success(data.message);
          login(data);
          navigate("/form-pickup");
        },
        onError: (error: any) => {
          console.log(error.response?.data.message);
          toast.error(error.response?.data.message);
        },
      }
    );
  };

  // Generate random nonce for security
  const generateNonce = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const handleCreatePickupGuest = () => {
    navigate("/form-pickup");
  };
  // Initialize Google OAuth with code flow (more secure)
  const initializeGoogleAuth = () => {
    const redirectUri = window.location.origin + "/auth/google/callback";
    const scope = "email profile";
    const responseType = "code"; // Using authorization code flow
    const state = generateNonce(); // For security

    // Store state in sessionStorage to verify later
    sessionStorage.setItem("google_auth_state", state);

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(
      scope
    )}&state=${state}&access_type=online&prompt=select_account`;

    // Redirect to Google OAuth
    window.location.href = googleAuthUrl;
  };

  // Handle Google Authentication with popup (Alternative method)
  const handleGoogleAuthPopup = () => {
    setIsLoading(true);

    const redirectUri = window.location.origin + "/auth/google/callback";
    const scope = "email profile";
    const responseType = "code";
    const state = generateNonce();

    sessionStorage.setItem("google_auth_state", state);

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(
      scope
    )}&state=${state}&access_type=online&prompt=select_account`;

    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      googleAuthUrl,
      "Google Sign In",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Listen for the popup to close or send message
    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
        setIsLoading(false);
      }
    }, 1000);

    // Listen for messages from popup
    window.addEventListener("message", (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
        clearInterval(checkPopup);
        popup.close();
        handleGoogleSuccess(event.data.user);
      }
    });
  };

  // Handle successful Google authentication
  const handleGoogleSuccess = (userData: any) => {
    console.log("Google user data:", userData);

    // Store user data in localStorage or send to your backend
    const user = {
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
      googleId: userData.sub,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert(`Bienvenue ${user.name}!`);
    setIsLoading(false);
    setCurrentPage("home");
  };

  // Handle WhatsApp redirect
  const handleWhatsAppOrder = () => {
    const phoneNumber = "212600000000"; // Replace with your WhatsApp business number
    const message = encodeURIComponent(
      "Bonjour, je voudrais passer une commande"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // Main selection view
  // if (!authMethod) {
  //   return (
  //     <div className="min-h-screen bg-amber-700">
  //       <div className="w-full h-full bg flex md:flex-row flex-col">
  //         <div className="flex justify-center items-center ">
  //           <div className="lg:w-[70%] w-[90%]  bg-amber-400  mx-auto">
  //             <div className="text-center mb-4">
  //               <h1 className="text-1xl md:text-3xl font-bold text-gray-900 mb-1">
  //                 Bienvenue!
  //               </h1>
  //               <p className="text-lg text-gray-600">
  //                 Choisissez votre méthode préférée pour continuer
  //               </p>
  //             </div>

  //             <div>
  //               {/* Email Authentication */}
  //               <div className="space-y-4">
  //                 <div>
  //                   <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
  //                     <User className="w-5 h-5" />
  //                     Nom Complet
  //                   </label>
  //                   <input
  //                     type="text"
  //                     value={formData.name}
  //                     onChange={(e) =>
  //                       setFormData({ ...formData, name: e.target.value })
  //                     }
  //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  //                     placeholder="Votre nom complet"
  //                   />
  //                   {errors.name && (
  //                     <p className="text-red-500 text-sm mt-1">{errors.name}</p>
  //                   )}
  //                 </div>

  //                 <div>
  //                   <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
  //                     <Mail className="w-5 h-5" />
  //                     Email
  //                   </label>
  //                   <input
  //                     type="email"
  //                     value={formData.email}
  //                     onChange={(e) =>
  //                       setFormData({ ...formData, email: e.target.value })
  //                     }
  //                     className="w-full px-4  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  //                     placeholder="votre@email.com"
  //                   />
  //                   {errors.email && (
  //                     <p className="text-red-500 text-sm mt-1">
  //                       {errors.email}
  //                     </p>
  //                   )}
  //                 </div>

  //                 <div>
  //                   <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
  //                     <Phone className="w-5 h-5" />
  //                     Téléphone
  //                   </label>
  //                   <input
  //                     type="tel"
  //                     value={formData.phone}
  //                     onChange={(e) =>
  //                       setFormData({ ...formData, phone: e.target.value })
  //                     }
  //                     className="w-full px-4  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  //                     placeholder="+212 6XX XXX XXX"
  //                   />
  //                   {errors.phone && (
  //                     <p className="text-red-500 text-sm mt-1">
  //                       {errors.phone}
  //                     </p>
  //                   )}
  //                 </div>

  //                 <div>
  //                   <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
  //                     <Lock className="w-5 h-5" />
  //                     Mot de passe
  //                   </label>

  //                   <div className="relative">
  //                     <input
  //                       type={showPassword ? "text" : "password"}
  //                       value={formData.password}
  //                       onChange={(e) =>
  //                         setFormData({ ...formData, password: e.target.value })
  //                       }
  //                       className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  //                       placeholder="*********"
  //                     />

  //                     <button
  //                       type="button"
  //                       onClick={() => setShowPassword(!showPassword)}
  //                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
  //                     >
  //                       {showPassword ? (
  //                         <EyeOff className="w-5 h-5" />
  //                       ) : (
  //                         <Eye className="w-5 h-5" />
  //                       )}
  //                     </button>
  //                   </div>

  //                   {errors.password && (
  //                     <p className="text-red-500 text-sm mt-1">
  //                       {errors.password}
  //                     </p>
  //                   )}
  //                 </div>

  //                 <button
  //                   onClick={handleSubmitSignUpClient}
  //                   disabled={isSignupClientPending}
  //                   className="w-full bg-gradient-to-r from-primary to-primary/60 hover:from-primary/70 hover:to-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  //                 >
  //                   {isLoading ? (
  //                     "Envoi en cours..."
  //                   ) : (
  //                     <>
  //                       Envoyer le code de vérification
  //                       <ArrowRight className="w-5 h-5" />
  //                     </>
  //                   )}
  //                 </button>
  //               </div>

  //               {/* Google Authentication */}
  //               <button
  //                 onClick={() => setAuthMethod("google")}
  //                 className="w-full flex items-center mt-4 justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
  //               >
  //                 <svg className="w-5 h-5" viewBox="0 0 24 24">
  //                   <path
  //                     fill="#4285F4"
  //                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
  //                   />
  //                   <path
  //                     fill="#34A853"
  //                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
  //                   />
  //                   <path
  //                     fill="#FBBC05"
  //                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
  //                   />
  //                   <path
  //                     fill="#EA4335"
  //                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
  //                   />
  //                 </svg>
  //                 Continue with Google
  //               </button>

  //               {/* WhatsApp */}
  //               <button
  //                 onClick={handleCreatePickupGuest}
  //                 className="w-full flex items-center mt-4 justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
  //               >
  //                  <MessageCircle className="w-5 h-5 text-green-500" />
  //                  Commander directement via WhatsApp
  //               </button>
  //             </div>

  //             <div className="text-center mt-8">
  //               <button
  //                 onClick={() => setCurrentPage("home")}
  //                 className="text-gray-500 hover:text-gray-700 font-medium"
  //               >
  //                 ← Retour à l'accueil
  //               </button>
  //             </div>

  //             <div className="text-center">
  //               <p>
  //                 Vous avez déjà un compte ?{" "}
  //                 <a href="/login" className="text-primary hover:underline">
  //                   Se connecter
  //                 </a>
  //               </p>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="flex-1 max-h-full relative">
  //           <img className="absolute w-full h-full left-0 top-0" src="https://plus.unsplash.com/premium_photo-1664372899525-d99a419fd21a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=994" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }


    return(
      <div className="grid  h-screen md:grid-cols-2 grid-cols-1">
           <div className="flex col-span-1 justify-center items-center ">
            <div className="lg:w-[70%] w-[90%]    mx-auto">
              <div className="text-center mb-4">
                <h1 className="text-1xl md:text-3xl font-bold text-gray-900 mb-1">
                   Bienvenue !
                </h1>
                <p className="text-lg text-gray-600">
                  Connectez-vous pour suivre et gérer facilement votre commande.
                </p>
              </div>

              <div>
                {/* Email Authentication */}
                <div className="space-y-4">
                  <div >
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <User className="w-5 h-5" />
                      Nom Complet
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Votre nom complet"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                      <Mail className="w-5 h-5" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
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
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4  py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      <Lock className="w-5 h-5" />
                      Mot de passe
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="*********"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleSubmitSignUpClient}
                    disabled={isSignupClientPending}
                    className="w-full bg-gradient-to-r from-primary to-primary/60 hover:from-primary/70 hover:to-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer le code de vérification
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Google Authentication */}
                <button
                  onClick={initializeGoogleAuth}
                  className="w-full flex  items-center mt-6 justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* WhatsApp */}
                <button
                  onClick={handleCreatePickupGuest}
                  className="w-full flex items-center mt-4 justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
                >
                   <MessageCircle className="w-5 h-5 text-green-500" />
                   Commander directement via WhatsApp
                </button>
              </div>

              <div className="text-center absolute top-0 left-10 mt-8">
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  ← Retour à l'accueil
                </button>
              </div>

              <div className="text-center mt-4">
                <p>
                  Vous avez déjà un compte ?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </div>
          </div>

          
          <div className="col-span-1 relative">
             <img className="absolute w-full h-full left-0 top-0" src="https://plus.unsplash.com/premium_photo-1664372899525-d99a419fd21a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=994" />
           </div>
      </div>
    )


  // // Google Authentication View
  // if (authMethod === "google") {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center px-4 py-12">
  //       <div className="max-w-6xl w-full">
  //         <button
  //           onClick={() => setAuthMethod(null)}
  //           className="text-gray-500 hover:text-gray-700 mb-6 font-semibold"
  //         >
  //           ← Retour
  //         </button>

  //         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
  //           <div className="grid md:grid-cols-2">
  //             {/* Left Column - Auth Options */}
  //             <div className="p-12 flex flex-col justify-center">
  //               <div className="mb-8">
  //                 <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-4">
  //                   <svg className="w-10 h-10 text-white" viewBox="0 0 24 24">
  //                     <path
  //                       fill="currentColor"
  //                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
  //                     />
  //                     <path
  //                       fill="currentColor"
  //                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
  //                     />
  //                     <path
  //                       fill="currentColor"
  //                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
  //                     />
  //                     <path
  //                       fill="currentColor"
  //                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
  //                     />
  //                   </svg>
  //                 </div>

  //                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
  //                   Connexion avec Google
  //                 </h2>
  //                 <p className="text-gray-600 text-lg">
  //                   Authentifiez-vous rapidement et en toute sécurité avec votre
  //                   compte Google
  //                 </p>
  //               </div>

  //               {GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE" ? (
  //                 <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
  //                   <p className="text-red-800 text-sm font-semibold">
  //                     ⚠️ Configuration manquante
  //                   </p>
  //                   <p className="text-red-700 text-xs mt-1">
  //                     Veuillez configurer votre GOOGLE_CLIENT_ID
  //                   </p>
  //                 </div>
  //               ) : null}

  //               <div className="space-y-4">
  //                 <button
  //                   onClick={initializeGoogleAuth}
  //                   disabled={
  //                     isLoading ||
  //                     GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE"
  //                   }
  //                   className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  //                 >
  //                   {isLoading ? (
  //                     "Connexion en cours..."
  //                   ) : (
  //                     <>
  //                       Continuer avec Google
  //                       <ArrowRight className="w-5 h-5" />
  //                     </>
  //                   )}
  //                 </button>

  //                 <button
  //                   onClick={handleGoogleAuthPopup}
  //                   disabled={
  //                     isLoading ||
  //                     GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE"
  //                   }
  //                   className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-lg border-2 border-gray-300 transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  //                 >
  //                   Ouvrir dans une popup
  //                 </button>
  //               </div>

  //               <div className="mt-8 pt-6 border-t border-gray-200">
  //                 <div className="flex items-start gap-3 text-sm text-gray-600">
  //                   <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
  //                     <svg
  //                       className="w-3 h-3 text-green-600"
  //                       fill="currentColor"
  //                       viewBox="0 0 20 20"
  //                     >
  //                       <path
  //                         fillRule="evenodd"
  //                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  //                         clipRule="evenodd"
  //                       />
  //                     </svg>
  //                   </div>
  //                   <p>Connexion sécurisée avec Google OAuth 2.0</p>
  //                 </div>
  //                 <div className="flex items-start gap-3 text-sm text-gray-600 mt-3">
  //                   <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
  //                     <svg
  //                       className="w-3 h-3 text-green-600"
  //                       fill="currentColor"
  //                       viewBox="0 0 20 20"
  //                     >
  //                       <path
  //                         fillRule="evenodd"
  //                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  //                         clipRule="evenodd"
  //                       />
  //                     </svg>
  //                   </div>
  //                   <p>Vos données sont protégées et jamais partagées</p>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Right Column - Image */}
  //             <div className="hidden md:block bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 relative overflow-hidden">
  //               <div className="absolute inset-0 flex items-center justify-center p-12">
  //                 <div className="text-white text-center">
  //                   <div className="mb-8">
  //                     <svg
  //                       className="w-32 h-32 mx-auto opacity-90"
  //                       viewBox="0 0 24 24"
  //                       fill="currentColor"
  //                     >
  //                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  //                     </svg>
  //                   </div>
  //                   <h3 className="text-3xl font-bold mb-4">
  //                     Connexion rapide et sécurisée
  //                   </h3>
  //                   <p className="text-lg opacity-90">
  //                     Accédez à votre compte en quelques secondes avec Google
  //                   </p>
  //                 </div>
  //               </div>

  //               {/* Decorative elements */}
  //               <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
  //               <div className="absolute bottom-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
  //               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-5 rounded-full"></div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // // Email Authentication View (same as before)
  // if (authMethod === "email") {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-primary to-white py-12 px-4">
  //       <div className="max-w-md mx-auto">
  //         <button
  //           onClick={() => {
  //             setAuthMethod(null);
  //             setStep(1);
  //             setFormData({ name: "", email: "", phone: "", code: "" });
  //             setErrors({});
  //           }}
  //           className="text-white hover:text-gray-200 mb-6 font-semibold"
  //         >
  //           ← Retour
  //         </button>

  //         <div className="bg-white rounded-2xl shadow-2xl p-8">
  //           <div className="text-center mb-8">
  //             <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto mb-4">
  //               <Mail className="w-8 h-8 text-white" />
  //             </div>
  //             <h2 className="text-3xl font-bold text-gray-900 mb-2">
  //               Créer un compte
  //             </h2>
  //             <p className="text-gray-600">
  //               Remplissez vos informations pour continuer
  //             </p>
  //           </div>

  //           <div className="space-y-4">
  //             <div>
  //               <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
  //                 <User className="w-5 h-5" />
  //                 Nom Complet
  //               </label>
  //               <input
  //                 type="text"
  //                 value={formData.name}
  //                 onChange={(e) =>
  //                   setFormData({ ...formData, name: e.target.value })
  //                 }
  //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  //                 placeholder="Votre nom complet"
  //               />
  //               {errors.name && (
  //                 <p className="text-red-500 text-sm mt-1">{errors.name}</p>
  //               )}
  //             </div>

  //             <div>
  //               <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
  //                 <Mail className="w-5 h-5" />
  //                 Email
  //               </label>
  //               <input
  //                 type="email"
  //                 value={formData.email}
  //                 onChange={(e) =>
  //                   setFormData({ ...formData, email: e.target.value })
  //                 }
  //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  //                 placeholder="votre@email.com"
  //               />
  //               {errors.email && (
  //                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
  //               )}
  //             </div>

  //             <div>
  //               <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
  //                 <Phone className="w-5 h-5" />
  //                 Téléphone
  //               </label>
  //               <input
  //                 type="tel"
  //                 value={formData.phone}
  //                 onChange={(e) =>
  //                   setFormData({ ...formData, phone: e.target.value })
  //                 }
  //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  //                 placeholder="+212 6XX XXX XXX"
  //               />
  //               {errors.phone && (
  //                 <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
  //               )}
  //             </div>

  //             <div>
  //               <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
  //                 <Lock className="w-5 h-5" />
  //                 Mot de passe
  //               </label>

  //               <div className="relative">
  //                 <input
  //                   type={showPassword ? "text" : "password"}
  //                   value={formData.password}
  //                   onChange={(e) =>
  //                     setFormData({ ...formData, password: e.target.value })
  //                   }
  //                   className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
  //                   placeholder="*********"
  //                 />

  //                 <button
  //                   type="button"
  //                   onClick={() => setShowPassword(!showPassword)}
  //                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
  //                 >
  //                   {showPassword ? (
  //                     <EyeOff className="w-5 h-5" />
  //                   ) : (
  //                     <Eye className="w-5 h-5" />
  //                   )}
  //                 </button>
  //               </div>

  //               {errors.password && (
  //                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
  //               )}
  //             </div>

  //             <button
  //               onClick={handleSubmitSignUpClient}
  //               disabled={isSignupClientPending}
  //               className="w-full bg-gradient-to-r from-primary to-primary/60 hover:from-primary/70 hover:to-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  //             >
  //               {isLoading ? (
  //                 "Envoi en cours..."
  //               ) : (
  //                 <>
  //                   Envoyer le code de vérification
  //                   <ArrowRight className="w-5 h-5" />
  //                 </>
  //               )}
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

};

export default AuthenticationPage;
