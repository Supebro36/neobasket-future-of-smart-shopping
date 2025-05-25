
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const jobOpenings = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / Kolkata",
    type: "Full-time",
    description: "Join our frontend team to build the next generation of e-commerce experiences using React, TypeScript, and modern web technologies."
  },
  {
    title: "AI/ML Engineer",
    department: "Data Science",
    location: "Remote / Bangalore",
    type: "Full-time",
    description: "Help improve our recommendation system and build intelligent features that enhance the shopping experience for millions of users."
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Mumbai / Remote",
    type: "Full-time",
    description: "Drive product strategy and work with cross-functional teams to deliver features that delight customers and empower sellers."
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Delhi / Hybrid",
    type: "Full-time",
    description: "Help our seller community succeed by providing support, training, and strategic guidance to grow their businesses."
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    description: "Create compelling campaigns and content that showcase our products and drive customer engagement across multiple channels."
  }
];

const benefits = [
  {
    title: "Competitive Salary",
    description: "Industry-leading compensation packages with equity options"
  },
  {
    title: "Health Benefits",
    description: "Comprehensive medical, dental, and vision coverage"
  },
  {
    title: "Flexible Work",
    description: "Remote-first culture with flexible working hours"
  },
  {
    title: "Learning & Development",
    description: "Annual learning budget and conference attendance"
  },
  {
    title: "Unlimited PTO",
    description: "Take the time you need to recharge and stay productive"
  },
  {
    title: "Team Events",
    description: "Regular team building activities and company retreats"
  }
];

export default function CareersPage() {
  return (
    <div className="neo-container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neo-dark-purple mb-4">
            Join Our Team
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Help us revolutionize e-commerce and build the future of intelligent shopping. 
            We're looking for passionate individuals who want to make a difference.
          </p>
        </div>

        {/* Company Culture */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">Our Culture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold mb-2">Innovation First</h3>
                <p className="text-sm text-gray-600">We encourage bold ideas and creative problem-solving</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold mb-2">Collaboration</h3>
                <p className="text-sm text-gray-600">We believe the best results come from working together</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="font-semibold mb-2">Growth Mindset</h3>
                <p className="text-sm text-gray-600">Continuous learning and development for everyone</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">Benefits & Perks</CardTitle>
            <CardDescription>We take care of our team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neo-dark-purple mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="outline">{job.location}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{job.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Don't See Your Role */}
        <Card className="bg-neo-light-purple/10 border-neo-purple text-center">
          <CardHeader>
            <CardTitle className="text-neo-dark-purple">Don't See Your Role?</CardTitle>
            <CardDescription>
              We're always looking for talented individuals to join our team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Send us your resume and tell us how you'd like to contribute to NeoBasket's mission.
            </p>
            <Button className="bg-neo-purple hover:bg-neo-purple/90">
              Send General Application
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              Email us at <span className="font-semibold">careers@neobasket.com</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
