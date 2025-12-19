import { useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import { FaTrashCan } from "react-icons/fa6";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ProductsUI({ banners }) {
  const { toast } = useToast();
  const carouselRef = useRef(null);

  const handleDelete = (id) => {
    router.delete(`/banners/${id}`, {
      onSuccess: () =>
        toast({
          title: "Banner o‘chirildi!",
          description: "Amaliyot muvaffaqiyatli yakunlandi ✅",
        }),
      onError: () =>
        toast({
          title: "Xatolik yuz berdi!",
          description: "Bannerni o‘chirishda muammo yuz berdi ❌",
          variant: "destructive",
        }),
    });
  };

  useEffect(() => {
    if (!carouselRef.current || banners.length <= 1) return;

    const interval = setInterval(() => {
      carouselRef.current.next(); // Shadcn Carouselda keyingi slaydga o‘tish
    }, 5000); // 5 sekundda o‘tadi

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="p-6 min-h-screen font-sans mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Products</h2>
        <Link
          href={"/admin-banner"}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          aria-label="Add Banner Link"
        >
          Add Banner
        </Link>
      </div>

      <div className="relative h-[700px] w-[1200px] text-white rounded-xl p-8 mb-8 overflow-hidden">
        <div className="border h-[500px] rounded-xl overflow-hidden">
          <Carousel ref={carouselRef}>
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem key={index} className="w-full">
                  <Card>
                    <CardContent className="flex items-center justify-center p-0 relative">
                      <img
                        src={`/storage/${banner.image}`}
                        loading="lazy"
                        alt={banner.name}
                        className="w-full h-[500px] object-cover rounded-xl"
                      />
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="absolute top-5 right-5 text-white bg-red-600 hover:bg-red-700 p-2 rounded-full text-xl z-30"
                      >
                        <FaTrashCan />
                      </button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
