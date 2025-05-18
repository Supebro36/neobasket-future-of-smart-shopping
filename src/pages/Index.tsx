
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductGrid from "../components/ProductGrid";
import products, { getTopRatedProducts } from "../data/products";
import { MessageSquare } from "lucide-react";
import { useAIAssistant } from "../contexts/AIAssistantContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Index() {
  const [featuredProducts, setFeaturedProducts] = useState(getTopRatedProducts(4));
  const { toggleChatWindow } = useAIAssistant();

  // Categories for the featured categories section
  const categories = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1592664858542-4c702c9f245b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      path: "/category/electronics"
    },
    {
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      path: "/category/clothing"
    },
    {
      name: "Home Decor",
      image: "https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      path: "/category/home-decor"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      path: "/category/accessories"
    }
  ];

  // Hero carousel items
  const heroItems = [
    {
      title: "Smart Tech for Modern Life",
      description: "Discover cutting-edge electronics that simplify and enhance your everyday experience.",
      image: "https://images.unsplash.com/photo-1546868871-0f936769675e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
      buttonText: "Shop Electronics",
      buttonLink: "/category/electronics"
    },
    {
      title: "Transform Your Space",
      description: "Elevate your home with our curated selection of stylish and functional decor items.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
      buttonText: "Shop Home Decor",
      buttonLink: "/category/home-decor"
    },
    {
      title: "Style That Speaks",
      description: "Express yourself with our collection of trending fashion and accessories.",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
      buttonText: "Shop Fashion",
      buttonLink: "/category/clothing"
    }
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {heroItems.map((item, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                    <div className="neo-container">
                      <div className="max-w-lg text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
                        <p className="text-lg mb-6">{item.description}</p>
                        <Link to={item.buttonLink}>
                          <Button className="bg-neo-purple hover:bg-neo-purple/90 text-white">{item.buttonText}</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* AI Assistant Promo */}
      <section className="bg-gradient-to-r from-neo-purple/20 to-neo-soft-purple py-12 my-12">
        <div className="neo-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Meet Your Shopping Assistant
            </h2>
            <p className="text-lg mb-6">
              Get personalized product recommendations, answers to your questions, and shopping guidance from our AI assistant.
            </p>
            <Button 
              onClick={toggleChatWindow}
              size="lg"
              className="bg-neo-purple hover:bg-neo-purple/90"
            >
              <MessageSquare className="mr-2" size={18} /> Chat with Assistant
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="neo-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link to={category.path} key={category.name} className="group">
                <div className="relative rounded-lg overflow-hidden h-48">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <h3 className="text-white font-bold p-4 w-full text-center">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="neo-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="bg-gray-50 py-12">
        <div className="neo-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Shop with NeoBasket</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neo-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Shopping</h3>
              <p className="text-gray-600">Get personalized recommendations and assistance from our intelligent shopping assistant.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neo-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Sellers</h3>
              <p className="text-gray-600">Shop with confidence from our network of trusted and verified sellers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-neo-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neo-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Price Drop Alerts</h3>
              <p className="text-gray-600">Never miss a deal with our price tracking and alerts for your favorite products.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
