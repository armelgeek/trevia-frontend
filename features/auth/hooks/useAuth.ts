import { useState, useEffect, useCallback } from 'react';
import { authClient } from '@/shared/lib/config/auth-client';

interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string | null;
  isAnonymous?: boolean | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Système global de gestion d'état auth
const authStateListeners: Array<(state: AuthState) => void> = [];
let currentAuthState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const notifyAuthStateChange = (newState: AuthState) => {
  currentAuthState = newState;
  console.log('🔐 Auth state changed:', newState);
  authStateListeners.forEach(listener => listener(newState));
  
  // Déclencher aussi l'événement pour compatibilité
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('authStateChanged', { 
      detail: newState 
    }));
  }
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(currentAuthState);

  const checkAuth = useCallback(async () => {
    try {
      const { data: session } = await authClient.getSession();
      
      const newState: AuthState = session?.user ? {
        user: session.user,
        isLoading: false,
        isAuthenticated: true,
      } : {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };

      notifyAuthStateChange(newState);
      
    } catch (error) {
      console.error('Auth check failed:', error);
      const errorState: AuthState = {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
      notifyAuthStateChange(errorState);
    }
  }, []);

  useEffect(() => {
    // S'abonner aux changements d'état
    const handleAuthStateChange = (newState: AuthState) => {
      setAuthState(newState);
    };
    
    authStateListeners.push(handleAuthStateChange);
    
    // Vérification initiale seulement si on n'a pas encore d'état
    if (currentAuthState.isLoading) {
      checkAuth();
    } else {
      setAuthState(currentAuthState);
    }

    // Vérification périodique réduite
    const interval = setInterval(checkAuth, 60000); // 1 minute

    // Écouter les événements de stockage pour les changements de session
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes('session') || e.key?.includes('auth')) {
        checkAuth();
      }
    };
    
    // Écouter les événements de focus pour vérifier à nouveau
    const handleFocus = () => {
      checkAuth();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('focus', handleFocus);
    }

    return () => {
      // Supprimer le listener
      const index = authStateListeners.indexOf(handleAuthStateChange);
      if (index > -1) {
        authStateListeners.splice(index, 1);
      }
      
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('focus', handleFocus);
      }
    };
  }, [checkAuth]);

  const signOut = async () => {
    try {
      await authClient.signOut();
      const newState: AuthState = {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
      notifyAuthStateChange(newState);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const refreshAuth = () => {
    checkAuth();
  };

  return {
    ...authState,
    signOut,
    refreshAuth,
  };
}

// Export pour forcer la mise à jour depuis n'importe où
export const forceAuthStateRefresh = () => {
  // Fonction pour forcer une vérification d'auth depuis n'importe où dans l'app
  return authClient.getSession().then(({ data: session }) => {
    const newState: AuthState = session?.user ? {
      user: session.user,
      isLoading: false,
      isAuthenticated: true,
    } : {
      user: null,
      isLoading: false,
      isAuthenticated: false,
    };
    notifyAuthStateChange(newState);
    return newState;
  }).catch((error) => {
    console.error('Force auth refresh failed:', error);
    const errorState: AuthState = {
      user: null,
      isLoading: false,
      isAuthenticated: false,
    };
    notifyAuthStateChange(errorState);
    return errorState;
  });
};
