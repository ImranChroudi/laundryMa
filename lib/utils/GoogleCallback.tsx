import { useAuth } from "@/context/AdminProvider";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {login} = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      // Get the authorization code from URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      const error = urlParams.get("error");

      console.log("Code:", code);
      console.log("State:", state);
      console.log("Error:", error);

      // Check for errors
      if (error) {
        setError(`Authentication failed: ${error}`);
        setTimeout(() => navigate("/auth"), 3000);
        return;
      }

      // Verify state to prevent CSRF attacks
      const savedState = sessionStorage.getItem("google_auth_state");
      if (state !== savedState) {
        setError("Invalid state parameter. Possible security issue.");
        setTimeout(() => navigate("/auth"), 3000);
        return;
      }

      if (code) {
        try {
          // Send the code to your backend
          const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          if (data.success) {
            // Store user data and token
            console.log(data)
            login(data);
            sessionStorage.removeItem("google_auth_state");

            // Redirect to home
            navigate("/form-pickup");
          } else {
            setError(data.message || "Authentication failed");
            setTimeout(() => navigate("/authentication"), 3000);
          }
        } catch (err) {
          console.error("Error during Google authentication:", err);
          setError("An error occurred during authentication");
          setTimeout(() => navigate("/authentication"), 3000);
        }
      } else {
        setError("No authorization code received");
        setTimeout(() => navigate("/auth"), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {error ? (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Erreur d'authentification
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <p className="text-sm text-gray-500">Redirection en cours...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentification en cours...
            </h2>
            <p className="text-gray-600">
              Veuillez patienter pendant que nous vérifions vos informations
            </p>
            <div className="mt-6">
              <div className="flex justify-center gap-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;