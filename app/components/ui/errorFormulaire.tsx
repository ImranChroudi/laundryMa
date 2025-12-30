import { Alert, AlertDescription } from "./alert"

const ErrorFormulaire = (error : string)=>{
    return (
         <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
        </Alert>
    )
}
export default ErrorFormulaire