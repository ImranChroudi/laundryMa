# Migration du serveur Express vers Next.js API Routes

Ce document explique la conversion du serveur Express en API Routes Next.js.

## Structure convertie

### Configuration
- ✅ `lib/db.ts` - Configuration MySQL avec connection pool
- ✅ `lib/jwt.ts` - Utilitaires JWT (generateToken, verifyToken)
- ✅ `lib/validations.ts` - Schémas de validation Zod
- ✅ `lib/middleware/auth.ts` - Middlewares d'authentification

### Routes API converties

#### Authentification Admin
- ✅ `POST /api/auth/signin` - Connexion admin/employé

#### Authentification Client
- ✅ `POST /api/auth/client/signin` - Connexion client
- ✅ `POST /api/auth/client/signup` - Inscription client

## Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=gestion_entreprise
JWT_SECRET=your-secret-key-here
```

## Utilisation

### Exemple: Connexion Admin

```typescript
const response = await fetch('/api/auth/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin', // ou 'employe'
  }),
});

const data = await response.json();
```

### Exemple: Inscription Client

```typescript
const response = await fetch('/api/auth/client/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    phone: '+212612345678',
    email: 'client@example.com',
    password: 'password123',
  }),
});

const data = await response.json();
```

### Exemple: Utilisation du middleware d'authentification

```typescript
import { getAdminFromToken } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  const admin = await getAdminFromToken(request);
  
  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Non autorisé' },
      { status: 401 }
    );
  }
  
  // Votre logique ici avec admin disponible
}
```

## Routes restantes à convertir

Les routes suivantes du serveur Express doivent encore être converties:

- `/api/orders` - Routes de commandes
- `/api/employee` - Routes d'employés
- `/api/comments` - Routes de commentaires
- `/api/forgot-password` - Réinitialisation de mot de passe
- `/api/produits` - Routes de produits
- `/api/auth/google` - Authentification Google

## Différences importantes

1. **Request/Response**: Next.js utilise `NextRequest` et `NextResponse` au lieu de `req` et `res` d'Express
2. **Async/Await**: Toutes les requêtes de base de données utilisent maintenant async/await avec `mysql2/promise`
3. **Validation**: Utilisation de `safeParse` de Zod au lieu de `validateRequest` middleware
4. **Middleware**: Les middlewares doivent être appelés manuellement dans chaque route

## Installation des dépendances

Assurez-vous d'avoir installé:

```bash
npm install mysql2 bcrypt jsonwebtoken zod
npm install -D @types/bcrypt @types/jsonwebtoken
```






