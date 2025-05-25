
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    question: "How do I place an order?",
    answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallets like Apple Pay and Google Pay."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
  },
  {
    question: "Can I modify or cancel my order?",
    answer: "You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team for assistance."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some restrictions apply for certain categories."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-7 business days within the US. Express shipping is available for 1-2 day delivery. International shipping varies by location."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never store your credit card details on our servers."
  },
  {
    question: "How do I use a promo code?",
    answer: "Enter your promo code in the designated field at checkout. The discount will be applied automatically to eligible items in your cart."
  },
  {
    question: "What if I receive a damaged item?",
    answer: "If you receive a damaged item, please contact us within 48 hours with photos. We'll arrange for a replacement or full refund immediately."
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="neo-container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neo-dark-purple mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about shopping with NeoBasket
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm">
              <Collapsible 
                open={openItems.includes(index)}
                onOpenChange={() => toggleItem(index)}
              >
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between py-4 hover:bg-gray-50 transition-colors">
                    <CardTitle className="text-left text-lg font-semibold text-neo-dark-purple">
                      {faq.question}
                    </CardTitle>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`}
                    />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-neo-light-purple/10 border-neo-purple">
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Still have questions?</CardTitle>
              <CardDescription>
                Can't find what you're looking for? Our customer service team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Email us at <span className="font-semibold text-neo-purple">support@neobasket.com</span> or 
                call us at <span className="font-semibold text-neo-purple">1-800-NEO-SHOP</span>
              </p>
              <p className="text-sm text-gray-600">
                Customer service hours: Monday - Friday, 9 AM - 6 PM EST
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
