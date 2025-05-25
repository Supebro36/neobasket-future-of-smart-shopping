
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Atanu Roy",
    role: "Chief Executive Officer",
    description: "Visionary leader with over 10 years of experience in e-commerce and technology innovation."
  },
  {
    name: "Parthib Basak",
    role: "Chief Technology Officer",
    description: "Tech enthusiast focused on building scalable platforms and AI-driven shopping experiences."
  },
  {
    name: "Adarsha Ghosh",
    role: "Head of Operations",
    description: "Operations expert ensuring seamless logistics and customer satisfaction across all channels."
  },
  {
    name: "Rudreswar Pal",
    role: "Head of Marketing",
    description: "Creative strategist driving brand growth and customer engagement through innovative campaigns."
  },
  {
    name: "Supratik Paul",
    role: "Head of Product",
    description: "Product visionary crafting user-centric features that revolutionize online shopping."
  }
];

export default function AboutUsPage() {
  return (
    <div className="neo-container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neo-dark-purple mb-4">
            About NeoBasket
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We're on a mission to revolutionize online shopping through AI-powered experiences, 
            connecting customers with the products they love while supporting sellers worldwide.
          </p>
        </div>

        {/* Company Story */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded with the vision of creating a more intelligent and personalized shopping experience, 
              NeoBasket combines cutting-edge AI technology with a deep understanding of customer needs. 
              Our platform connects millions of shoppers with trusted sellers, offering everything from 
              everyday essentials to unique finds.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that shopping should be effortless, enjoyable, and tailored to each individual. 
              That's why we've built an AI assistant that learns from your preferences and helps you 
              discover products that truly match your lifestyle and needs.
            </p>
          </CardContent>
        </Card>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To create the world's most intelligent and user-friendly e-commerce platform, 
                where technology enhances human connection and makes shopping a delightful experience for everyone.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-neo-dark-purple">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>Innovation:</strong> Pushing boundaries in AI and e-commerce</li>
                <li>• <strong>Trust:</strong> Building lasting relationships with transparency</li>
                <li>• <strong>Quality:</strong> Ensuring excellence in products and service</li>
                <li>• <strong>Community:</strong> Supporting sellers and delighting customers</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neo-dark-purple mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-neo-purple">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-neo-purple font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-neo-light-purple/10 border-neo-purple">
          <CardHeader>
            <CardTitle className="text-center text-neo-dark-purple">NeoBasket by the Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-neo-purple">1M+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neo-purple">10K+</div>
                <div className="text-sm text-gray-600">Trusted Sellers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neo-purple">50K+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neo-purple">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
