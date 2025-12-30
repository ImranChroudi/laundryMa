import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { KeyRound, ArrowLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card.tsx";
import { Input } from "@/app/components/ui/input.tsx";
import { Label } from "@/app/components/ui/label.tsx";
import { Alert, AlertDescription } from "@/app/components/ui/alert.tsx";
import { Button } from "@/app/components/ui/button.tsx";
import { useVerifyCodeMutation } from "@/hooks/use-forgotPassword.tsx";
import toast from "react-hot-toast";

const VerifyCodeForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Hook mutation
  const { mutate, isPending } = useVerifyCodeMutation();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code || code.length < 4) {
      setError("Veuillez entrer un code valide");
      return;
    }

    try {
      mutate(
        { email, code },
        {
          onSuccess: () => {
            console.log("Code verified successfully!");
            toast.success("Code vérifié avec succès !");
            navigate(`/admin/reset-password?email=${encodeURIComponent(email)}`); // redirection vers reset password
          },
          onError(error: any) {
            toast.error(error.response?.data.message);
          },
        }
      );
    } catch (err: any) {
      setError(err.message || "Code invalide ou expiré");
    }
  };

  const handleResend = () => {
    // Ici tu peux rappeler sendVerificationCodeMutation si nécessaire
    alert("Fonction de renvoi du code à implémenter");
  };

  const handleBack = () => {
    navigate("/admin"); // retourne à la page login
  };

  return (
    <Card className="border-border bg-card absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">
          Vérifier le code
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Entrez le code envoyé à {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-sm font-medium">
              Code de vérification
            </Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="code"
                type="text"
                placeholder="Entrez le code à 6 chiffres"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="pl-10 text-center tracking-widest text-lg"
                maxLength={6}
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Vérification..." : "Vérifier le code"}
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={handleBack}
            >
             <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleResend}
            >
              Renvoyer le code
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyCodeForm;
