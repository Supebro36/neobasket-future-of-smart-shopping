
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useAIAssistant } from "../../contexts/AIAssistantContext";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, User, MessageSquare, Search, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import SmartSearch from "../SmartSearch";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const { toggleChatWindow } = useAIAssistant();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownLocked, setIsDropdownLocked] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Navbar logout clicked');
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleRegularSearch = () => {
    if (searchQuery.trim().length >= 2) {
      console.log('Navbar search:', searchQuery.trim());
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRegularSearch();
    }
  };

  const handleUserDropdownDoubleClick = () => {
    setIsDropdownLocked(!isDropdownLocked);
  };

  return (
    <div className="border-b sticky top-0 bg-white z-30">
      <div className="neo-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBasket className="h-6 w-6 text-neo-purple" />
            <span className="text-xl font-bold text-neo-dark-purple">
              Neo<span className="text-neo-purple">Basket</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/category/electronics" className="nav-link">Electronics</Link>
            <Link to="/category/clothing" className="nav-link">Clothing</Link>
            <Link to="/category/home-decor" className="nav-link">Home Decor</Link>
            <Link to="/category/accessories" className="nav-link">Accessories</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Smart Search */}
            <SmartSearch />
            
            {/* Regular Search button */}
            <button 
              className="text-gray-600 hover:text-neo-purple"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* AI Assistant */}
            <button 
              className="text-gray-600 hover:text-neo-purple relative"
              onClick={toggleChatWindow}
              aria-label="AI Shopping Assistant"
            >
              <MessageSquare size={20} />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-3 w-3"></span>
            </button>

            {/* Shopping cart */}
            <Link to="/cart" className="text-gray-600 hover:text-neo-purple relative">
              <ShoppingBasket size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neo-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            {isAuthenticated ? (
              <div className={`relative ${isDropdownLocked ? 'block' : 'group'}`}>
                <button 
                  className="flex items-center space-x-1 text-sm"
                  onDoubleClick={handleUserDropdownDoubleClick}
                >
                  <User size={20} />
                  <span className="hidden md:block">{user?.name}</span>
                </button>
                <div className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 transition-all duration-200 ${
                  isDropdownLocked 
                    ? 'opacity-100 visible transform translate-y-0' 
                    : 'opacity-0 invisible transform -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                }`}>
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link to="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">My Account</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">My Orders</Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                  {isDropdownLocked && (
                    <div className="px-4 py-2 text-xs text-gray-500 border-t">
                      Double-click user icon to close
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" state={{ isRegister: false }}>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    Sign In
                  </Button>
                </Link>
                <Link to="/login" state={{ isRegister: true }}>
                  <Button variant="default" size="sm" className="hidden md:flex bg-neo-purple hover:bg-neo-purple/90">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login" className="md:hidden">
                  <User size={20} />
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Search bar */}
        {showSearch && (
          <div className="pb-3 pt-1 animate-fade-in">
            <div className="flex gap-2">
              <Input 
                placeholder="Search products in our database..." 
                className="input-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                autoFocus
              />
              <Button 
                variant="default" 
                className="bg-neo-purple hover:bg-neo-purple/90"
                onClick={handleRegularSearch}
                disabled={searchQuery.trim().length < 2}
              >
                Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
