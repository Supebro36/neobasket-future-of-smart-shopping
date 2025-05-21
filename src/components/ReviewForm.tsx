
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Camera, X, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";

interface ReviewFormProps {
  product: Product;
  onSubmit: () => void;
}

interface ReviewFormValues {
  rating: number;
  comment: string;
}

export default function ReviewForm({ product, onSubmit }: ReviewFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<ReviewFormValues>({
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });
  
  const handleSubmit = async (values: ReviewFormValues) => {
    try {
      // Here we would normally send the review data to the backend
      // For now, we'll just show a success toast
      console.log({
        productId: product.id,
        rating: values.rating,
        comment: values.comment,
        image: photoPreview,
      });
      
      toast.success("Review submitted successfully!");
      setPhotoPreview(null);
      form.reset();
      onSubmit();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };
  
  const removePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };
  
  return (
    <div className="border rounded-lg p-4 mt-6">
      <h3 className="text-lg font-medium mb-4">Write a Review</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => field.onChange(star)}
                        className={`w-8 h-8 ${
                          star <= field.value
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your experience with this product..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <p className="text-sm font-medium mb-2">Add Photos</p>
            <div className="flex flex-wrap gap-2">
              {photoPreview ? (
                <div className="relative">
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    className="w-20 h-20 object-cover rounded-md border" 
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={triggerCameraInput}
                    className="w-20 h-20 flex flex-col items-center justify-center border rounded-md hover:bg-gray-50"
                  >
                    <Camera size={24} className="mb-1" />
                    <span className="text-xs">Camera</span>
                  </button>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="w-20 h-20 flex flex-col items-center justify-center border rounded-md hover:bg-gray-50"
                  >
                    <Image size={24} className="mb-1" />
                    <span className="text-xs">Gallery</span>
                  </button>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                type="file"
                ref={cameraInputRef}
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          
          <Button type="submit" className="bg-neo-purple hover:bg-neo-purple/90 w-full">
            Submit Review
          </Button>
        </form>
      </Form>
    </div>
  );
}
