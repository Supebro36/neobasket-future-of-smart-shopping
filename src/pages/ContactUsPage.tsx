
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactUsPage() {
  return (
    <div className="neo-container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neo-dark-purple mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg">
            We're here to help! Reach out to us through any of the channels below
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Get in Touch</CardTitle>
              <CardDescription>Multiple ways to reach our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-xl">📧</span> Email
                </h4>
                <p className="text-gray-700">support@neobasket.com</p>
                <p className="text-sm text-gray-600">We typically respond within 24 hours</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-xl">📞</span> Phone
                </h4>
                <p className="text-gray-700">+91-9876543210</p>
                <p className="text-sm text-gray-600">Mon-Fri, 9 AM - 6 PM IST</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-xl">📍</span> Address
                </h4>
                <p className="text-gray-700">
                  NeoBasket Technologies Pvt. Ltd.<br />
                  123 Innovation Park<br />
                  Salt Lake, Kolkata - 700091<br />
                  West Bengal, India
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Follow Us</CardTitle>
              <CardDescription>Stay connected on social media</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">f</span>
                </div>
                <div>
                  <p className="font-semibold">Facebook</p>
                  <p className="text-sm text-gray-600">@neobasketofficial</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">📷</span>
                </div>
                <div>
                  <p className="font-semibold">Instagram</p>
                  <p className="text-sm text-gray-600">@neobasket_official</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">🐦</span>
                </div>
                <div>
                  <p className="font-semibold">Twitter</p>
                  <p className="text-sm text-gray-600">@neobasket</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">in</span>
                </div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-sm text-gray-600">@neobasket-technologies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department-specific Contacts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">Department Contacts</CardTitle>
            <CardDescription>Reach the right team for your specific needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Customer Support</h4>
                <p className="text-sm text-gray-600 mb-2">General inquiries and order support</p>
                <p className="text-neo-purple font-semibold">support@neobasket.com</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Seller Support</h4>
                <p className="text-sm text-gray-600 mb-2">Help for sellers and partners</p>
                <p className="text-neo-purple font-semibold">sellers@neobasket.com</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Business Inquiries</h4>
                <p className="text-sm text-gray-600 mb-2">Partnerships and collaborations</p>
                <p className="text-neo-purple font-semibold">business@neobasket.com</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Press & Media</h4>
                <p className="text-sm text-gray-600 mb-2">Media inquiries and press releases</p>
                <p className="text-neo-purple font-semibold">press@neobasket.com</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Careers</h4>
                <p className="text-sm text-gray-600 mb-2">Job applications and HR queries</p>
                <p className="text-neo-purple font-semibold">careers@neobasket.com</p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Technical Support</h4>
                <p className="text-sm text-gray-600 mb-2">Website issues and technical help</p>
                <p className="text-neo-purple font-semibold">tech@neobasket.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Information */}
        <Card className="bg-neo-light-purple/10 border-neo-purple">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">Response Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <h4 className="font-semibold text-neo-purple">Email</h4>
                <p className="text-sm text-gray-600">Within 24 hours</p>
              </div>
              <div>
                <h4 className="font-semibold text-neo-purple">Phone</h4>
                <p className="text-sm text-gray-600">Immediate assistance</p>
              </div>
              <div>
                <h4 className="font-semibold text-neo-purple">Social Media</h4>
                <p className="text-sm text-gray-600">Within 4-6 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
