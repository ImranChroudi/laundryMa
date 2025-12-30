import { Trash2 } from "lucide-react"
import { Button } from "./button"
import React from "react"

interface ButtonDeleteProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonDelete =({onClick} : ButtonDeleteProps )=>{
    return (
         <Button
                onClick={onClick}
                variant="outline"
                className="gap-1 text-red-600 flex-1 border-red-300 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
        </Button>
    )
}

export default ButtonDelete