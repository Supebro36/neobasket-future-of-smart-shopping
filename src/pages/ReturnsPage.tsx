
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ReturnsPage() {
  return (
    <div className="neo-container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neo-dark-purple mb-4">
            Returns & Refunds
          </h1>
          <p className="text-gray-600 text-lg">
            Easy returns and hassle-free refunds for your peace of mind
          </p>
        </div>

        <div className="grid gap-6">
          {/* Return Policy Overview */}
          <Card className="border-2 border-neo-purple">
            <CardHeader>
              <CardTitle className="text-neo-dark-purple flex items-center gap-2">
                30-Day Return Policy
                <Badge className="bg-neo-purple">No Questions Asked</Badge>
              </CardTitle>
              <CardDescription>
                We want you to be completely satisfied with your purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">✓ What You Can Return</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Items in original condition with tags</li>
                    <li>• Unopened electronics in original packaging</li>
                    <li>• Unworn clothing and accessories</li>
                    <li>• Home decor items without damage</li>
                    <li>• Items purchased within the last 30 days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">✗ What Cannot Be Returned</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Personalized or custom items</li>
                    <li>• Intimate apparel and swimwear</li>
                    <li>• Perishable goods</li>
                    <li>• Digital downloads</li>
                    <li>• Items damaged by misuse</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Process */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">How to Return an Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-neo-purple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Start Your Return</h4>
                    <p className="text-sm text-gray-600">Log into your account and select the order you want to return. Click "Return Items" and select the products.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-neo-purple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Print Return Label</h4>
                    <p className="text-sm text-gray-600">We'll email you a prepaid return shipping label. Print it and attach it to the original packaging.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-neo-purple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Ship It Back</h4>
                    <p className="text-sm text-gray-600">Drop off your package at any authorized shipping location or schedule a pickup.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-neo-purple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold">Get Your Refund</h4>
                    <p className="text-sm text-gray-600">Once we receive and process your return, we'll issue a refund to your original payment method.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Refund Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Processing Times</h4>
                  <ul className="text-sm space-y-2">
                    <li><strong>Credit Cards:</strong> 3-5 business days</li>
                    <li><strong>PayPal:</strong> 1-2 business days</li>
                    <li><strong>Store Credit:</strong> Immediate</li>
                    <li><strong>Original Payment Method:</strong> Up to 10 business days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Refund Options</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Full refund to original payment method</li>
                    <li>• Store credit with 10% bonus value</li>
                    <li>• Exchange for different size/color</li>
                    <li>• Partial refund for damaged items</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exchanges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Exchanges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Want to exchange for a different size, color, or style? We make it easy!</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Exchange Benefits:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Free return shipping on exchanges</li>
                    <li>• Priority processing (2-3 business days)</li>
                    <li>• No restocking fees</li>
                    <li>• Hold your preferred item while we process</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  <em>Price differences will be charged or refunded accordingly.</em>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* International Returns */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">International Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p>International customers can return items within 30 days of delivery.</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Customer responsible for return shipping costs</li>
                    <li>• Items must clear customs for processing</li>
                    <li>• Original shipping charges are non-refundable</li>
                    <li>• Refunds processed in original currency</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact for Returns */}
          <Card className="bg-neo-light-purple/10 border-neo-purple">
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Need Help with Your Return?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p>Our returns team is here to assist you every step of the way.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-neo-purple hover:bg-neo-dark-purple">
                    Start a Return Online
                  </Button>
                  <Button variant="outline" className="border-neo-purple text-neo-purple">
                    Contact Returns Team
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Email: <span className="font-semibold">returns@neobasket.com</span></p>
                  <p>Phone: <span className="font-semibold">1-800-NEO-RETURN</span></p>
                  <p>Hours: Monday - Friday, 8 AM - 8 PM EST</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
