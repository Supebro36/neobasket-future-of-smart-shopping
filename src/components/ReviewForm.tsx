
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
import { Camera, X, Image, Flag, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Product } from "@/types";
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/sonner";

interface ReviewFormProps {
  product: Product;
  onSubmit: () => void;
}

interface ReviewFormValues {
  rating: number;
  comment: string;
  verificationCode?: string;
}

export default function ReviewForm({ product, onSubmit }: ReviewFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<ReviewFormValues>({
    defaultValues: {
      rating: 5,
      comment: "",
      verificationCode: "",
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
        verified: showVerification && values.verificationCode === "123456", // Simple validation for demo
      });
      
      if (showVerification && values.verificationCode === "123456") {
        toast.success("Verified review submitted successfully!");
      } else if (showVerification) {
        toast.error("Invalid verification code. Review submitted as unverified.");
      } else {
        toast.success("Review submitted successfully!");
      }
      
      setIsReviewSubmitted(true);
      setPhotoPreview(null);
      form.reset();
      setTimeout(() => {
        onSubmit();
      }, 2000);
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

  const toggleVerification = () => {
    setShowVerification(!showVerification);
  };
  
  return (
    <div className="border rounded-lg p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Write a Review</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleVerification}
            className={showVerification ? "bg-green-50 border-green-200" : ""}
          >
            <ShieldCheck className={`mr-1 h-4 w-4 ${showVerification ? "text-green-600" : ""}`} />
            {showVerification ? "Verified" : "Verify Purchase"}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Flag className="mr-1 h-4 w-4 text-red-500" />
                Report Fake Review
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Report a suspicious review</AlertDialogTitle>
                <AlertDialogDescription>
                  Help us maintain the integrity of our review system by reporting reviews that seem fake or misleading.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 py-4">
                <FormItem className="space-y-2">
                  <FormLabel>Review ID or description</FormLabel>
                  <FormControl>
                    <Input placeholder="Example: 5-star review from 'user123' posted on May 20" />
                  </FormControl>
                </FormItem>
                <FormItem className="space-y-2">
                  <FormLabel>Reason for reporting</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Why do you think this review is fake or misleading?" />
                  </FormControl>
                </FormItem>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => toast.success("Thank you for your report. We'll review it shortly.")}>
                  Submit Report
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {isReviewSubmitted ? (
        <div className="text-center py-8">
          <ShieldCheck className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h4 className="text-xl font-semibold text-green-700 mb-2">Thank You!</h4>
          <p className="text-gray-600">Your review has been submitted and will be visible soon.</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {showVerification && (
              <div className="bg-green-50 border border-green-200 p-3 rounded-md mb-4">
                <FormField
                  control={form.control}
                  name="verificationCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                        Purchase Verification Code
                      </FormLabel>
                      <FormDescription>
                        Enter the 6-digit code from your receipt or confirmation email
                      </FormDescription>
                      <FormControl>
                        <Input 
                          placeholder="Enter 6-digit code (e.g. 123456)" 
                          {...field}
                          maxLength={6} 
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="text-xs text-gray-500 mt-1">
                        For demo purposes, use code: 123456
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
          
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

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="terms" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I confirm this is my honest opinion about this product
                </label>
                <p className="text-xs text-gray-500">
                  Fake reviews violate our terms of service and may result in account suspension.
                </p>
              </div>
            </div>
            
            <Button type="submit" className="bg-neo-purple hover:bg-neo-purple/90 w-full">
              Submit Review
            </Button>
          </form>
        </Form>
      )}
      <Toaster />
    </div>
  );
}

interface FormDescriptionProps {
  children: React.ReactNode;
}

function FormDescription({ children }: FormDescriptionProps) {
  return <p className="text-xs text-gray-500 mb-1">{children}</p>;
}
