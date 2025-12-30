import type React from "react"
import { useState, useEffect, use } from "react"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { SignUpemployeeSchema } from "@/validate"
import { useAddEmployeeMutation, useSignUpEmployeeMutation } from "@/hooks/use-emplyee"
import toast from "react-hot-toast"
import { useAuth } from "@/context/AdminProvider"

const SignUpEmployee = () => {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login , navigate} = useAuth()

  const {mutate , isPending} = useSignUpEmployeeMutation() 


  // Autofill email from link
  useEffect(() => {
    const emailFromLink = searchParams.get("email")
    if (emailFromLink) {
      setEmail(emailFromLink)
    }
  }, [searchParams])

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    const result = SignUpemployeeSchema.safeParse({
      email,
      name,
      password,
      confirmPassword,
    })
    if (!result.success) {
      setError(result.error.issues[0].message)
      setIsLoading(false)
      return
    }

    mutate({
      name , 
      email ,
      password 
    } , {
      onSuccess: (data) => {
        toast.success("Employer ajouter avec success")
        login(data)
        navigate("/admin/demandes")
      } , 
      onError: (error : any) => {
        setError(error.response?.data.message)
      }
    }
    )


  }

  return (
    <Card className="border-border bg-card absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">Créer un compte</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Remplissez vos informations pour rejoindre l’équipe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Nom</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Votre nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                disabled // email locked from link
                className="pl-10 bg-gray-100 cursor-not-allowed"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
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

          {/* Error */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Création..." : "Créer un compte"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignUpEmployee
