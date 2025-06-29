"use client";

import { LabeledSection } from "./ui-section";
import { Button } from "@/shared/components/atoms/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/atoms/ui/alert";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  X,
  Bell,
  Clock
} from "lucide-react";
import { useState } from "react";

interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

interface NotificationProps {
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp?: string;
  isRead?: boolean;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
}

function Toast({ type, title, message, onClose }: ToastProps) {
  const iconMap = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const colorMap = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
  };

  const iconColorMap = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600"
  };

  const Icon = iconMap[type];

  return (
    <div className={`flex items-start space-x-3 p-4 border rounded-lg shadow-lg ${colorMap[type]} animate-in slide-in-from-right-full duration-300`}>
      <Icon className={`w-5 h-5 mt-0.5 ${iconColorMap[type]}`} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-sm opacity-90 mt-1">{message}</p>
      </div>
      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 h-auto text-current hover:bg-black/10"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

function NotificationItem({ type, title, message, timestamp, isRead = false, onMarkAsRead, onDelete }: NotificationProps) {
  const iconMap = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle
  };

  const colorMap = {
    info: "text-blue-600 bg-blue-100",
    success: "text-green-600 bg-green-100",
    warning: "text-yellow-600 bg-yellow-100",
    error: "text-red-600 bg-red-100"
  };

  const Icon = iconMap[type];

  return (
    <div className={`p-4 border rounded-lg transition-colors ${isRead ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 shadow-sm'}`}>
      <div className="flex items-start space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorMap[type]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={`text-sm font-medium ${isRead ? 'text-gray-600' : 'text-gray-900'}`}>
              {title}
            </h4>
            {!isRead && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
          </div>
          <p className={`text-sm mt-1 ${isRead ? 'text-gray-500' : 'text-gray-700'}`}>
            {message}
          </p>
          {timestamp && (
            <div className="flex items-center space-x-2 mt-2">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">{timestamp}</span>
            </div>
          )}
        </div>
        <div className="flex space-x-1">
          {!isRead && onMarkAsRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkAsRead}
              className="text-xs p-1 h-auto"
            >
              Marquer lu
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-xs p-1 h-auto text-red-600 hover:text-red-700"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "success" as const,
      title: "Réservation confirmée",
      message: "Votre voyage Paris → Lyon du 25 juin est confirmé",
      timestamp: "Il y a 5 minutes",
      isRead: false
    },
    {
      id: "2", 
      type: "info" as const,
      title: "Rappel de voyage",
      message: "Votre départ est prévu demain à 8h00",
      timestamp: "Il y a 2 heures",
      isRead: false
    },
    {
      id: "3",
      type: "warning" as const,
      title: "Retard annoncé",
      message: "Le voyage de 14h30 aura 15 minutes de retard",
      timestamp: "Il y a 1 jour",
      isRead: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Card className="w-full max-w-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-primary text-white">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Aucune notification
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  type={notification.type}
                  title={notification.title}
                  message={notification.message}
                  timestamp={notification.timestamp}
                  isRead={notification.isRead}
                  onMarkAsRead={() => markAsRead(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function NotificationsSample() {
  const [toasts, setToasts] = useState<Array<{ id: string; type: "success" | "error" | "warning" | "info"; title: string; message: string }>>([]);

  const showToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8">
      <LabeledSection label="Alerts Système">
        <div className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Information</AlertTitle>
            <AlertDescription className="text-blue-700">
              Votre compte a été mis à jour avec succès.
            </AlertDescription>
          </Alert>

          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Succès</AlertTitle>
            <AlertDescription className="text-green-700">
              Votre réservation a été confirmée et un email de confirmation vous a été envoyé.
            </AlertDescription>
          </Alert>

          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Attention</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Votre voyage est prévu dans moins de 24 heures. Pensez à vérifier les horaires.
            </AlertDescription>
          </Alert>

          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Erreur</AlertTitle>
            <AlertDescription className="text-red-700">
              Impossible de traiter votre demande. Veuillez réessayer plus tard.
            </AlertDescription>
          </Alert>
        </div>
      </LabeledSection>

      <LabeledSection label="Toasts Dynamiques">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => showToast("success", "Succès", "Opération terminée avec succès")}
              className="bg-green-600 hover:bg-green-700"
            >
              Toast Succès
            </Button>
            <Button 
              onClick={() => showToast("error", "Erreur", "Une erreur s'est produite")}
              variant="destructive"
            >
              Toast Erreur
            </Button>
            <Button 
              onClick={() => showToast("warning", "Attention", "Vérifiez vos informations")}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Toast Warning
            </Button>
            <Button 
              onClick={() => showToast("info", "Information", "Nouvelle mise à jour disponible")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Toast Info
            </Button>
          </div>

          {/* Toast container */}
          <div className="fixed top-4 right-4 space-y-2 z-50">
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                type={toast.type}
                title={toast.title}
                message={toast.message}
                onClose={() => removeToast(toast.id)}
              />
            ))}
          </div>
        </div>
      </LabeledSection>

      <LabeledSection label="Centre de Notifications">
        <NotificationCenter />
      </LabeledSection>
    </div>
  );
}
