
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductImageProps {
  image: string;
  name: string;
  loading?: boolean;
}

export default function ProductImageDisplay({ image, name, loading }: ProductImageProps) {
  if (loading) {
    return <Skeleton className="aspect-square w-full" />;
  }

  return (
    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
  );
}
