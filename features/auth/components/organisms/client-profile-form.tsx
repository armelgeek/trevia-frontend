"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EditIcon, CheckIcon, XIcon, Loader2 } from 'lucide-react';
import { useUpdateProfile } from '@/features/auth/hooks/useUpdateProfile';
import { authClient } from '@/shared/lib/config/auth-client';
import { cn } from '@/shared/lib/utils';

interface EditableFieldProps {
  label: string;
  value?: string;
  onUpdate: (value: string) => Promise<boolean>;
  type?: 'text' | 'email';
  placeholder?: string;
  disabled?: boolean;
}

function EditableField({ 
  label, 
  value = '', 
  onUpdate, 
  type = 'text',
  placeholder = '---',
  disabled = false 
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (inputValue === value) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    const success = await onUpdate(inputValue);
    setIsLoading(false);

    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (!disabled) {
      setInputValue(value);
      setIsEditing(true);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground text-sm leading-none">
        {label}
      </Label>
      
      <div 
        className={cn(
          "flex flex-row justify-between items-center min-h-[32px] cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={handleEdit}
      >
        {isEditing ? (
          <div className="flex items-center gap-2 w-full">
            <Input
              type={type}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckIcon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              disabled={isLoading}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <span className={cn(
              "flex-1",
              !value && "text-muted-foreground text-sm"
            )}>
              {value || placeholder}
            </span>
            {!disabled && (
              <EditIcon className="h-4 w-4 text-muted-foreground" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface ClientProfileFormProps {
  user: {
    name?: string;
    email?: string;
    image?: string | null;
    isAnonymous?: boolean | null;
  };
  onUserUpdate?: (updatedUser: {
    name?: string;
    email?: string;
    image?: string | null;
    isAnonymous?: boolean | null;
  }) => void;
}

export function ClientProfileForm({ user, onUserUpdate }: ClientProfileFormProps) {
  const { updateName, updateEmail } = useUpdateProfile();
  const [currentUser, setCurrentUser] = useState(user);

  // Met à jour l'état local quand les props changent
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleUpdateName = async (name: string) => {
    const success = await updateName(name);
    if (success) {
      // Rafraîchir les données utilisateur
      try {
        const { data: session } = await authClient.getSession();
        if (session?.user) {
          const updatedUser = { ...currentUser, name: session.user.name };
          setCurrentUser(updatedUser);
          onUserUpdate?.(updatedUser);
        }
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    }
    return success;
  };

  const handleUpdateEmail = async (email: string) => {
    const success = await updateEmail(email);
    if (success) {
      // Rafraîchir les données utilisateur
      try {
        const { data: session } = await authClient.getSession();
        if (session?.user) {
          const updatedUser = { ...currentUser, email: session.user.email };
          setCurrentUser(updatedUser);
          onUserUpdate?.(updatedUser);
        }
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    }
    return success;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <EditableField
          label="Nom"
          value={currentUser.name}
          onUpdate={handleUpdateName}
          placeholder="Votre nom"
          disabled={currentUser.isAnonymous === true}
        />
        
        <EditableField
          label="Email"
          value={currentUser.email}
          onUpdate={handleUpdateEmail}
          type="email"
          placeholder="votre@email.com"
          disabled={currentUser.isAnonymous === true}
        />
      </CardContent>
    </Card>
  );
}
