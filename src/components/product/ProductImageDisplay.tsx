
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react";

interface ProductImageProps {
  image: string;
  name: string;
  loading?: boolean;
}

export default function ProductImageDisplay({ image, name, loading }: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  if (loading) {
    return <Skeleton className="aspect-square w-full" />;
  }

  return (
    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      {imageError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <ImageIcon className="h-16 w-16 text-gray-400" />
          <span className="sr-only">{name}</span>
        </div>
      ) : (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
