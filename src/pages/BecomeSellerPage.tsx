
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BecomeSellerPage() {
  return (
    <div className="neo-container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neo-dark-purple mb-4">
            Become a Seller
          </h1>
          <p className="text-gray-600 text-lg">
            Join thousands of successful sellers on NeoBasket and grow your business
          </p>
        </div>

        {/* Why Sell with Us */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">Why Sell with NeoBasket?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">Reach Millions</h3>
                <p className="text-sm text-gray-600">Access to over 1 million active customers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold mb-2">Low Fees</h3>
                <p className="text-sm text-gray-600">Competitive commission rates starting at 3%</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold mb-2">Easy Setup</h3>
                <p className="text-sm text-gray-600">Get started in minutes with our simple onboarding</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps to Get Started */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">How to Get Started</CardTitle>
            <CardDescription>Follow these simple steps to start selling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-neo-purple text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold">Create Your Account</h3>
                  <p className="text-sm text-gray-600">Sign up with your business information and verify your identity</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-neo-purple text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold">Set Up Your Store</h3>
                  <p className="text-sm text-gray-600">Customize your seller profile and upload your business documents</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-neo-purple text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold">Add Your Products</h3>
                  <p className="text-sm text-gray-600">Upload product photos, descriptions, and set competitive prices</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-neo-purple text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold">Start Selling</h3>
                  <p className="text-sm text-gray-600">Go live and start receiving orders from customers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">Seller Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Basic Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Valid business license or registration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Bank account for payments
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Product liability insurance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Commitment to quality customer service
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Recommended</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Professional product photography
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Inventory management system
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Customer service team
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Social media presence
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">Seller Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold">Starter</h3>
                  <div className="text-2xl font-bold text-neo-purple">3%</div>
                  <div className="text-sm text-gray-600">commission per sale</div>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Up to 100 products</li>
                  <li>• Basic analytics</li>
                  <li>• Email support</li>
                  <li>• Standard listing features</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4 border-neo-purple bg-neo-light-purple/10">
                <div className="text-center mb-4">
                  <Badge className="mb-2">Most Popular</Badge>
                  <h3 className="font-semibold">Professional</h3>
                  <div className="text-2xl font-bold text-neo-purple">5%</div>
                  <div className="text-sm text-gray-600">commission per sale</div>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Unlimited products</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                  <li>• Premium listing features</li>
                  <li>• Marketing tools</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold">Enterprise</h3>
                  <div className="text-2xl font-bold text-neo-purple">Custom</div>
                  <div className="text-sm text-gray-600">pricing available</div>
                </div>
                <ul className="text-sm space-y-2">
                  <li>• Everything in Professional</li>
                  <li>• Dedicated account manager</li>
                  <li>• Custom integrations</li>
                  <li>• Bulk upload tools</li>
                  <li>• API access</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" className="bg-neo-purple hover:bg-neo-purple/90">
            Start Selling Today
          </Button>
          <p className="text-sm text-gray-600 mt-4">
            Questions? Contact our seller support team at <span className="font-semibold">sellers@neobasket.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
