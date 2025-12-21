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
    <div className="px-5 xl:px-20 my-5 lg:my-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-oswald">Bizning blog</h1>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ align: "start" }}
        className="w-full mt-5"
      >
        <CarouselContent>
          {blogs.map((blog, i) => (
            <CarouselItem
              key={i}
              className="sm:basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-2">
                <Card className="rounded-2xl shadow-md">
                  <CardContent className="flex flex-col gap-3 p-4">
                    
                    {/* Image */}
                    <img
                      src={blog.img}
                      alt={`Blog_${i}`}
                      className="w-full h-48 object-cover rounded-xl"
                      loading="lazy"
                    />

                    {/* Title & Text */}
                    <div>
                      <h3 className="font-oswald text-sm md:text-base">
                        {blog.title}
                      </h3>
                      <p className="font-oswald text-sm md:text-base text-slate-600">
                        {blog.text}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-oswald text-slate-400">
                        Batafsil ma'lumot oling
                      </span>
                      <span className="text-xs md:text-sm font-oswald text-slate-400">
                        {blog.date}
                      </span>
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
