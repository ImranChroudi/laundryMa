"use client"
import type React from "react"

import {  useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { Eye, EyeOff, Loader, Lock, LogOut, Mail } from "lucide-react"
import { useSignInMutation } from "@/app/hooks/use-auth"
import { signInSchema } from "@/app/validate"
import { useAuth } from "@/app/context/AdminProvider"
import toast from "react-hot-toast"

const  LoginForm =()=>{
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [role , setRole] = useState("admin")
  const {login  , isLoading }  = useAuth()

  const {mutate , isPending} = useSignInMutation()

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    const resutl = signInSchema.safeParse({
      email,
      password
    })

    if(!resutl.success) {
      setError(resutl.error.issues[0].message)
      return
    }

    mutate({
      email,
      password,
      role : role as "admin" | "employe"
    } , {
      onSuccess: (data) => {
        login(data)
        toast.success("Login successful")
      },
      onError: (error : any) => {
       console.log(error.response.data.message)
       toast.error(error.response.data.message)
      }
    })
  }

  return (
    <Card className="border-border bg-card absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Enter your credentials to access the dashboard
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
                placeholder="admin@educenter.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button> 
          {/* <div className="flex gap-2 w-full">
            <Button 
              onClick={()=>setRole("admin")}
              className={`${role === "admin" ? "bg-primary text-white" : "bg-transparent text-primary hover:text-white border border-primary" }  flex-1`}>
              Admin
            </Button >
            <Button 
              onClick={()=>setRole("employe")}
              className={`${role === "employe" ? "bg-primary text-white" : "bg-transparent text-primary hover:text-white border border-primary" }  flex-1`}>
              Employe
            </Button>
          </div> */}

          <div className="text-center text-sm text-muted-foreground underline">
            <a href="/admin/forgot-password">Mot de passe oublie?</a>
          </div>
        </form>
        
      </CardContent>
    </Card>
  )
}


export default LoginForm
