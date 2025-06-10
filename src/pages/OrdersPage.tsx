
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Calendar, CreditCard, Truck } from "lucide-react";

// Mock order data for demonstration
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 299.99,
    items: [
      { name: "Wireless Headphones Pro", quantity: 1, price: 199.99 },
      { name: "Phone Case", quantity: 2, price: 50.00 }
    ]
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 89.99,
    items: [
      { name: "Bluetooth Speaker", quantity: 1, price: 89.99 }
    ]
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Processing",
    total: 159.99,
    items: [
      { name: "Smart Watch", quantity: 1, price: 159.99 }
    ]
  }
];

export default function OrdersPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="neo-container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your orders</h1>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Package className="h-4 w-4" />;
      case "Shipped":
        return <Truck className="h-4 w-4" />;
      case "Processing":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="neo-container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your order history</p>
        </div>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order #{order.id}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium">Order Items:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₹{item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {order.status === "Delivered" && (
                    <Button variant="outline" size="sm">
                      Write Review
                    </Button>
                  )}
                  {order.status === "Shipped" && (
                    <Button variant="outline" size="sm">
                      Track Package
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Button className="bg-neo-purple hover:bg-neo-purple/90">
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
