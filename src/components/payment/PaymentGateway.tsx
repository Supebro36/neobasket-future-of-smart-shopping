
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Wallet, Smartphone, DollarSign, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export default function PaymentGateway({ isOpen, onClose, onPaymentSuccess }: PaymentGatewayProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [upiId, setUpiId] = useState("");
  const { subtotal, clearCart } = useCart();

  const paymentMethods = [
    { id: "upi", name: "UPI", icon: Smartphone, description: "Pay using UPI apps like GPay, PhonePe, Paytm" },
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, Rupay" },
    { id: "wallet", name: "Digital Wallet", icon: Wallet, description: "Paytm, PhonePe, Amazon Pay" },
    { id: "netbanking", name: "Net Banking", icon: DollarSign, description: "All major banks supported" },
    { id: "cod", name: "Cash on Delivery", icon: Truck, description: "Pay when you receive your order" }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (paymentMethod === "cod") {
        toast.success("Order placed successfully! You can pay when the order arrives.");
      } else {
        toast.success("Payment successful! Your order has been placed.");
      }
      
      clearCart();
      onPaymentSuccess();
      onClose();
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>
        );
      
      case "upi":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-600">
              Or scan QR code with any UPI app
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 mx-auto flex items-center justify-center">
                QR Code
              </div>
            </div>
          </div>
        );
      
      case "wallet":
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              You will be redirected to your wallet app to complete the payment
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Paytm", "PhonePe", "Amazon Pay"].map((wallet) => (
                <Button key={wallet} variant="outline" className="h-16">
                  {wallet}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case "netbanking":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bank">Select Your Bank</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Select Bank</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Punjab National Bank</option>
                <option>Bank of Baroda</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              You will be redirected to your bank's website to complete the payment
            </div>
          </div>
        );
      
      case "cod":
        return (
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Truck className="text-orange-600" size={20} />
                <span className="font-medium text-orange-800">Cash on Delivery</span>
              </div>
              <p className="text-sm text-orange-700 mt-2">
                You can pay in cash when your order is delivered to your doorstep.
              </p>
              <p className="text-sm text-orange-600 mt-1">
                Additional COD charges: ₹40
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Please note:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Keep exact change ready</li>
                <li>COD is available for orders up to ₹50,000</li>
                <li>Order will be cancelled if payment is refused</li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getTotalAmount = () => {
    const codCharge = paymentMethod === "cod" ? 40 : 0;
    return subtotal + codCharge;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {paymentMethod === "cod" && (
                <div className="flex justify-between text-orange-600">
                  <span>COD Charges</span>
                  <span>₹40.00</span>
                </div>
              )}
              <div className="border-t pt-1 flex justify-between font-medium">
                <span>Total Amount</span>
                <span>₹{getTotalAmount().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="font-medium mb-4">Select Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Icon size={20} className="text-gray-600" />
                      <div className="flex-1">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Payment Form */}
          <div>
            <h3 className="font-medium mb-4">Payment Details</h3>
            {renderPaymentForm()}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={isProcessing}
              className="flex-1 bg-neo-purple hover:bg-neo-purple/90"
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  {paymentMethod === "cod" ? "Place Order" : `Pay ₹${getTotalAmount().toFixed(2)}`}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
