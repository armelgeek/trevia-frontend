import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Calendar, CheckCircle, CreditCard } from "lucide-react";

export function BookingStats({
    totalTrips,
    confirmedTrips,
    completedTrips,
    totalSpent,
}:{
    totalTrips: number;
    confirmedTrips: number;
    completedTrips: number;
    totalSpent: number;
}) {

  return (
    <div className="grid grid-cols-1 w-full md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total voyages</p>
              <p className="text-2xl font-bold text-gray-900">{totalTrips}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Payés</p>
              <p className="text-2xl font-bold text-gray-900">{completedTrips}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-900">{confirmedTrips}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total dépensé</p>
              <p className="text-2xl font-bold text-gray-900">{totalSpent}€</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}