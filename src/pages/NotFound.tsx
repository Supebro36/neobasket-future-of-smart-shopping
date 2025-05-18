
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="neo-container">
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12">
        <h1 className="text-6xl font-bold text-neo-purple mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">Oops! We couldn't find that page</p>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="bg-neo-purple hover:bg-neo-purple/90">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
