
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ShippingPage() {
  return (
    <div className="neo-container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neo-dark-purple mb-4">
            Shipping Information
          </h1>
          <p className="text-gray-600 text-lg">
            Everything you need to know about our shipping policies and delivery options
          </p>
        </div>

        <div className="grid gap-6">
          {/* Shipping Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Shipping Options</CardTitle>
              <CardDescription>Choose the delivery speed that works best for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Standard Shipping</h3>
                    <Badge variant="secondary">FREE</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">5-7 business days</p>
                  <p className="text-sm">Free on orders over $50</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Express Shipping</h3>
                    <Badge variant="outline">$9.99</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">2-3 business days</p>
                  <p className="text-sm">Available for most locations</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Overnight Shipping</h3>
                    <Badge>$24.99</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">1 business day</p>
                  <p className="text-sm">Order by 2 PM EST</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p><strong>Standard Items:</strong> 1-2 business days processing</p>
                <p><strong>Custom/Personalized Items:</strong> 3-5 business days processing</p>
                <p><strong>Pre-order Items:</strong> Ships according to estimated availability date</p>
                <p className="text-sm text-gray-600 mt-4">
                  <em>Processing time is in addition to shipping time. Orders placed after 2 PM EST will be processed the next business day.</em>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* International Shipping */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">International Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Available Countries</h4>
                  <p className="text-sm text-gray-600 mb-3">We ship to over 50 countries including:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Canada (5-10 business days)</li>
                    <li>• United Kingdom (7-14 business days)</li>
                    <li>• European Union (10-15 business days)</li>
                    <li>• Australia (10-20 business days)</li>
                    <li>• Japan (7-14 business days)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Important Notes</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Customs duties and taxes may apply</li>
                    <li>• Customer is responsible for additional fees</li>
                    <li>• Delivery times may vary due to customs</li>
                    <li>• Some items may have shipping restrictions</li>
                    <li>• International orders cannot be expedited</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p>Once your order ships, you'll receive an email with tracking information.</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Tracking Steps:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Order confirmation email sent immediately</li>
                    <li>Processing notification when order is being prepared</li>
                    <li>Shipping confirmation with tracking number</li>
                    <li>Delivery confirmation when package arrives</li>
                  </ol>
                </div>
                <p className="text-sm text-gray-600">
                  <em>Tracking information typically updates within 24 hours of shipment.</em>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Special Circumstances */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Special Circumstances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Holiday Shipping</h4>
                  <p className="text-sm text-gray-600">During peak seasons, processing and delivery times may be extended. We recommend ordering early for holiday delivery.</p>
                </div>
                <div>
                  <h4 className="font-semibold">Weather Delays</h4>
                  <p className="text-sm text-gray-600">Severe weather conditions may cause shipping delays. We'll notify you of any significant delays affecting your order.</p>
                </div>
                <div>
                  <h4 className="font-semibold">Address Changes</h4>
                  <p className="text-sm text-gray-600">Address changes can only be made within 1 hour of placing your order. Contact customer service immediately if needed.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Card className="bg-neo-light-purple/10 border-neo-purple">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-neo-dark-purple mb-2">Need Help with Shipping?</h3>
              <p className="text-sm text-gray-600">
                Contact our shipping department at <span className="font-semibold">shipping@neobasket.com</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
