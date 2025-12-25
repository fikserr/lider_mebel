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

const blogs = [
  {
    img: Blog1,
    title: "Kuz mavsumiga maxsus chegirmalar! 🍂",
    text: "Uy uchun barcha turdagi mebellarga katta chegirmalar boshlandi. Yoz davomida xarid qiling, kuzni esa yangilangan interyer bilan kutib oling.",
    date: "16 Sentyabr 2023",
  },
  {
    img: Blog2,
    title: "Yozda tanlang — kuzda rohatlaning! 🍁",
    text: "Kuz mavsumi uchun mo‘ljallangan mebellar chegirmali narxlarda. Sifat, qulaylik va zamonaviy dizayn — barchasi bir joyda.",
    date: "18 iyul 2023",
  },
  {
    img: Blog3,
    title: "Yangi mavsum — yangi interyer! 🏡",
    text: "Kuz uchun mebel aksiyasi boshlandi. Bugun buyurtma bering, kuzni chiroyli va qulay uy bilan qarshi oling.",
    date: "20 iyun 2023",
  },
];

export default function BlogSection() {
  return (
    <section className="px-4 sm:px-6 xl:px-20 my-6 lg:my-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg sm:text-xl font-oswald">
          Bizning blog
        </h1>
      </div>

      {/* Carousel */}
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="-ml-2 sm:-ml-4">
          {blogs.map((blog, i) => (
            <CarouselItem
              key={i}
              className="pl-2 sm:pl-4
                         basis-full
                         sm:basis-1/2
                         lg:basis-1/3"
            >
              <Card className="h-full rounded-2xl shadow-md hover:shadow-lg transition">
                <CardContent className="flex flex-col gap-3 p-4 h-full">
                  
                  {/* Image */}
                  <img
                    src={blog.img}
                    alt={`Blog_${i}`}
                    loading="lazy"
                    className="
                      w-full
                      h-40
                      sm:h-44
                      md:h-48
                      object-cover
                      rounded-xl
                    "
                  />

                  {/* Title & Text */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-oswald text-sm sm:text-base line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="font-oswald text-xs sm:text-sm text-slate-600 line-clamp-3">
                      {blog.text}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs font-oswald text-slate-400 hover:underline cursor-pointer">
                      Batafsil
                    </span>
                    <span className="text-xs font-oswald text-slate-400">
                      {blog.date}
                    </span>
                  </div>

                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls (mobile’da yo‘q) */}
        <div className="hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}
