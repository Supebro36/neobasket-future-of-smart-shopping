
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="neo-container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neo-dark-purple mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                NeoBasket ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or make purchases from us.
              </p>
              <p>
                By using our website and services, you consent to the collection and use of your information as outlined in this Privacy Policy. If you do not agree with this policy, please do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">2. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <p className="text-sm text-gray-600 mb-2">We may collect personal information that you provide directly to us, including:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Name, email address, and contact information</li>
                    <li>• Billing and shipping addresses</li>
                    <li>• Payment information (processed securely through third-party providers)</li>
                    <li>• Account credentials and preferences</li>
                    <li>• Purchase history and product reviews</li>
                    <li>• Customer service communications</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                  <p className="text-sm text-gray-600 mb-2">When you use our website, we automatically collect:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• IP address and location data</li>
                    <li>• Browser type and version</li>
                    <li>• Device information and operating system</li>
                    <li>• Pages visited and time spent on our site</li>
                    <li>• Referring website information</li>
                    <li>• Search queries and interaction data</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Cookies and Tracking Technologies</h4>
                  <p className="text-sm text-gray-600">
                    We use cookies, web beacons, and similar technologies to enhance your experience, remember your preferences, and analyze website usage. You can control cookie settings through your browser preferences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">3. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">We use the information we collect for the following purposes:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Service Provision</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Process and fulfill orders</li>
                      <li>• Manage your account and preferences</li>
                      <li>• Provide customer support</li>
                      <li>• Send order confirmations and updates</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Communication</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Send promotional emails and newsletters</li>
                      <li>• Notify you of sales and special offers</li>
                      <li>• Provide product recommendations</li>
                      <li>• Request feedback and reviews</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Business Operations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Analyze website usage and performance</li>
                      <li>• Improve our products and services</li>
                      <li>• Prevent fraud and ensure security</li>
                      <li>• Comply with legal obligations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Personalization</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Customize your shopping experience</li>
                      <li>• Display relevant product suggestions</li>
                      <li>• Remember your preferences</li>
                      <li>• Provide AI-powered assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">4. Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Service Providers</h4>
                    <p className="text-sm text-gray-600">We work with trusted third-party service providers who help us operate our business, including payment processors, shipping companies, email service providers, and analytics services.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Legal Requirements</h4>
                    <p className="text-sm text-gray-600">We may disclose your information if required by law, court order, or to protect our rights, property, or safety, or that of our users or the public.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Business Transfers</h4>
                    <p className="text-sm text-gray-600">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">With Your Consent</h4>
                    <p className="text-sm text-gray-600">We may share your information with third parties when you give us explicit consent to do so.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">5. Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">We implement appropriate security measures to protect your personal information:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Safeguards</h4>
                    <ul className="text-sm space-y-1">
                      <li>• SSL encryption for data transmission</li>
                      <li>• Secure server infrastructure</li>
                      <li>• Regular security assessments</li>
                      <li>• Access controls and authentication</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Operational Safeguards</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Employee training on data protection</li>
                      <li>• Limited access to personal information</li>
                      <li>• Regular backup and recovery procedures</li>
                      <li>• Incident response protocols</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> While we strive to protect your information, no method of transmission or storage is 100% secure. We cannot guarantee absolute security of your data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">6. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">You have several rights regarding your personal information:</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Access and Portability</h4>
                    <p className="text-sm text-gray-600">You can request a copy of the personal information we hold about you and, in some cases, receive it in a portable format.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Correction and Updates</h4>
                    <p className="text-sm text-gray-600">You can update your account information at any time or request corrections to inaccurate data.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Deletion</h4>
                    <p className="text-sm text-gray-600">You can request deletion of your personal information, subject to certain legal and business requirements.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Marketing Communications</h4>
                    <p className="text-sm text-gray-600">You can opt out of marketing emails at any time by using the unsubscribe link or contacting us directly.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Cookie Preferences</h4>
                    <p className="text-sm text-gray-600">You can manage cookie settings through your browser or our cookie preference center.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">7. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">8. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">9. Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-neo-light-purple/10 border-neo-purple">
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@neobasket.com</p>
                <p><strong>Phone:</strong> 1-800-NEO-PRIVACY</p>
                <p><strong>Mail:</strong> NeoBasket Privacy Department<br />
                123 Commerce Street<br />
                Tech City, TC 12345</p>
                <p><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 30 days.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
