
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function SellersPage() {
  // Mock seller data - in a real app this would come from the database
  const featuredSellers = [
    {
      id: "1",
      name: "TechWorld Electronics",
      rating: 4.8,
      verified: true,
      products: 156,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "2", 
      name: "Fashion Forward",
      rating: 4.6,
      verified: true,
      products: 89,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "3",
      name: "Home & Garden Plus",
      rating: 4.7,
      verified: true,
      products: 234,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="neo-container py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neo-dark-purple mb-4">
            Our Verified Sellers
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Shop with confidence from our network of trusted and verified sellers
          </p>
        </div>

        {/* CTA for becoming a seller */}
        <div className="bg-neo-light-purple/10 border border-neo-purple rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-neo-dark-purple mb-2">
                Want to sell on NeoBasket?
              </h3>
              <p className="text-gray-600">
                Join thousands of successful sellers and grow your business with us
              </p>
            </div>
            <Link to="/become-seller">
              <Button className="bg-neo-purple hover:bg-neo-purple/90 mt-4 md:mt-0">
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Sellers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Sellers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSellers.map((seller) => (
              <Card key={seller.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={seller.image} 
                    alt={seller.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{seller.name}</CardTitle>
                    {seller.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    ⭐ {seller.rating} • {seller.products} products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    View Store
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Seller Benefits */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Why Our Sellers Choose Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-neo-purple rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Low Commission Rates</h4>
                  <p className="text-sm text-gray-600">Competitive rates starting at just 3%</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-neo-purple rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Large Customer Base</h4>
                  <p className="text-sm text-gray-600">Access to over 1 million active customers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-neo-purple rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Marketing Support</h4>
                  <p className="text-sm text-gray-600">Promotional tools and advertising options</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Seller Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Business Registration</h4>
                  <p className="text-sm text-gray-600">Valid business license required</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Quality Products</h4>
                  <p className="text-sm text-gray-600">High-quality products and descriptions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Customer Service</h4>
                  <p className="text-sm text-gray-600">Commitment to excellent customer service</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
