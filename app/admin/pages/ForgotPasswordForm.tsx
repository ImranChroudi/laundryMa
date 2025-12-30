import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, KeyRound } from "lucide-react";
// Step 1: Request Password Reset (Enter Email)
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,

} from "@/app/components/ui/card.tsx"; // adapte selon ton projet
import { Input } from "@/app/components/ui/input.tsx";
import { Label } from "@/app/components/ui/label.tsx";
import { Alert, AlertDescription } from "@/app/components/ui/alert.tsx";
import { Button } from "@/app/components/ui/button.tsx";
import { useSendVerificationCodeMutation } from "@/hooks/use-forgotPassword.tsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<"admin" | "employe">("admin");

  const navigate = useNavigate();

  // hook mutation
  const {mutate , isPending} = useSendVerificationCodeMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer une adresse email valide");
      return;
    }

   mutate({
    email,
    role
   } ,{
    onSuccess: () => {
        navigate(`/admin/verify-code?email=${encodeURIComponent(email)}`);
    },
    onError(error: any) {
      toast.error(error.response?.data.message);
    },
   })
  };

  return (
    <Card className="border-border bg-card absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">
          Mot de passe oublié
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Entrez votre email pour recevoir un code de réinitialisation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              type="button"
              onClick={() => setRole("admin")}
              className={`${
                role === "admin"
                  ? "bg-primary text-white"
                  : "bg-transparent text-primary hover:text-white border border-primary"
              } flex-1`}
            >
              Admin
            </Button>
            <Button
              type="button"
              onClick={() => setRole("employe")}
              className={`${
                role === "employe"
                  ? "bg-primary text-white"
                  : "bg-transparent text-primary hover:text-white border border-primary"
              } flex-1`}
            >
              Employé
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Envoi en cours..." : "Envoyer le code"}
          </Button>

          <Button onClick={() => navigate("/admin/")} type="button" variant="ghost" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la connexion
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};



// // Step 2: Verify Code
// export const VerifyCodeForm = ({ email, onCodeVerify, onResendCode, onBack }: {
//   email: string
//   onCodeVerify: (code: string) => void
//   onResendCode: () => void
//   onBack: () => void
// }) => {
//   const [code, setCode] = useState("")
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (!code || code.length < 4) {
//       setError("Veuillez entrer un code valide")
//       return
//     }

//     setIsLoading(true)
//     try {
//       await onCodeVerify(code)
//     } catch (err: any) {
//       setError(err.message || "Code invalide")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="border-border bg-card absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-semibold text-center">Vérifier le code</CardTitle>
//         <CardDescription className="text-center text-muted-foreground">
//           Entrez le code envoyé à {email}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="code" className="text-sm font-medium">
//               Code de vérification
//             </Label>
//             <div className="relative">
//               <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="code"
//                 type="text"
//                 placeholder="Entrez le code à 6 chiffres"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 className="pl-10 text-center tracking-widest text-lg"
//                 maxLength={6}
//                 required
//               />
//             </div>
//           </div>

//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? "Vérification..." : "Vérifier le code"}
//           </Button>

//           <div className="flex gap-2">
//             <Button
//               type="button"
//               variant="ghost"
//               className="flex-1"
//               onClick={onBack}
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Retour
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               className="flex-1"
//               onClick={onResendCode}
//             >
//               Renvoyer le code
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// // Step 3: Reset Password
// export const ResetPasswordForm = ({ onPasswordReset, onBack }: {
//   onPasswordReset: (password: string, confirmPassword: string) => void
//   onBack: () => void
// }) => {
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")

//     if (!password || password.length < 8) {
//       setError("Le mot de passe doit contenir au moins 8 caractères")
//       return
//     }

//     if (password !== confirmPassword) {
//       setError("Les mots de passe ne correspondent pas")
//       return
//     }

//     setIsLoading(true)
//     try {
//       await onPasswordReset(password, confirmPassword)
//     } catch (err: any) {
//       setError(err.message || "Une erreur est survenue")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="border-border bg-card absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-semibold text-center">
//           Nouveau mot de passe
//         </CardTitle>
//         <CardDescription className="text-center text-muted-foreground">
//           Créez votre nouveau mot de passe
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="password" className="text-sm font-medium">
//               Nouveau mot de passe
//             </Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Minimum 8 caractères"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-10 pr-10"
//                 required
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-4 w-4 text-muted-foreground" />
//                 ) : (
//                   <Eye className="h-4 w-4 text-muted-foreground" />
//                 )}
//               </Button>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="confirmPassword" className="text-sm font-medium">
//               Confirmer le mot de passe
//             </Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirmer le mot de passe"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="pl-10 pr-10"
//                 required
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="h-4 w-4 text-muted-foreground" />
//                 ) : (
//                   <Eye className="h-4 w-4 text-muted-foreground" />
//                 )}
//               </Button>
//             </div>
//           </div>

//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
//           </Button>

//           <Button
//             type="button"
//             variant="ghost"
//             className="w-full"
//             onClick={onBack}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Retour
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// // Main Container to manage the flow
// export const ForgotPasswordFlow = () => {
//   const [step, setStep] = useState<"email" | "code" | "reset">("email")
//   const [email, setEmail] = useState("")

//   const handleEmailSubmit = async (submittedEmail: string) => {
//     // TODO: Call your API to send reset code
//     console.log("Sending reset code to:", submittedEmail)
//     setEmail(submittedEmail)
//     setStep("code")
//   }

//   const handleCodeVerify = async (code: string) => {
//     // TODO: Call your API to verify code
//     console.log("Verifying code:", code)
//     setStep("reset")
//   }

//   const handlePasswordReset = async (password: string, confirmPassword: string) => {
//     // TODO: Call your API to reset password
//     console.log("Resetting password")
//     // Redirect to login after success
//     window.location.href = "/login"
//   }

//   const handleResendCode = () => {
//     // TODO: Call your API to resend code
//     console.log("Resending code to:", email)
//   }

//   const handleBackToLogin = () => {
//     window.location.href = "/login"
//   }

//   return (
//     <>
//       {step === "email" && (
//         <ForgotPasswordForm
//           onEmailSubmit={handleEmailSubmit}
//           onBackToLogin={handleBackToLogin}
//         />
//       )}
//       {step === "code" && (
//         <VerifyCodeForm
//           email={email}
//           onCodeVerify={handleCodeVerify}
//           onResendCode={handleResendCode}
//           onBack={() => setStep("email")}
//         />
//       )}
//       {step === "reset" && (
//         <ResetPasswordForm
//           onPasswordReset={handlePasswordReset}
//           onBack={() => setStep("code")}
//         />
//       )}
//     </>
//   )
// }

export default ForgotPasswordForm;
