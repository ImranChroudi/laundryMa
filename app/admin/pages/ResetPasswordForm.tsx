import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
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
import { useResetPasswordMutation } from "@/hooks/use-forgotPassword.tsx";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "@/validate";
import z from "zod";

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const { mutate, isPending } = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      resetPasswordSchema.parse({email,  password, confirmPassword });
      // ✅ Si c’est valide → tu continues ici (mutation, etc.)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
        return; // ❌ Stoppe l’exécution si erreur
      }
    }

    mutate(
      { email, newPassword: password, confirmPassword },
      {
        onSuccess: () => {
          toast.success("Mot de passe réinitialisé avec succès !");
          navigate("/admin/");
        },
        onError: (error: any) => {
          setError(error.response?.data?.message || "Une erreur est survenue");
        },
      }
    );
  };

  const handleBack = () => {
    navigate("/verify-code");
  };

  return (
    <Card className="border-border bg-card absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">
          Nouveau mot de passe
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Créez votre nouveau mot de passe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nouveau mot de passe */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Nouveau mot de passe
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {/* Confirmation */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmer le mot de passe
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? "Réinitialisation..."
              : "Réinitialiser le mot de passe"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
