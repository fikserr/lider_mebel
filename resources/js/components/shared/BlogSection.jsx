import * as React from "react";
import { Blog1, Blog2, Blog3 } from "../../images";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const blogs = [Blog1, Blog2, Blog3];

export default function BlogSection() {
  return (
    <div className="px-5 xl:px-20 my-5 lg:my-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-oswald">Bizning blog</h1>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-5"
      >
        <CarouselContent>
          {blogs.map((blogImg, i) => (
            <CarouselItem
              key={i}
              className="sm:basis-full md:basis-1/2 lg:basis-1/3 "
            >
              <div className="p-2">
                <Card className="rounded-2xl shadow-md">
                  <CardContent className="flex flex-col gap-3 p-4">
                    {/* Image */}
                    <div className="w-full">
                      <img
                        src={blogImg}
                        alt={`Img_Blog_${i}`}
                        className="w-full h-48 object-cover rounded-xl"
                        loading="lazy"
                      />
                    </div>

                    {/* Title & Text */}
                    <div>
                      <h3 className="font-oswald text-sm md:text-base font-normal">
                        Kuz mavsumi uchun barcha ayollar kiyimlariga chegirmalarni
                        taqdim etamiz
                      </h3>
                      <p className="font-oswald text-sm md:text-base text-slate-600">
                        Biz aksiyani boshlaymiz. Yozdan boshlab kuzga tayyorlaning.
                        Yoz davomida ayollar kuzgi kiyimlarini chegirmali narxlarda
                        xarid qiling.
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <h6 className="text-xs md:text-sm font-oswald text-slate-400">
                        Batafsil ma'lumot oling
                      </h6>
                      <p className="text-xs md:text-sm font-oswald text-slate-400">
                        16 июня 2023
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
