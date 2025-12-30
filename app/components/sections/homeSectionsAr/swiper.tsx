
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSection() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1522204501920-5e3a2ab60b95?auto=format&fit=crop&w=1920&q=80",
      title: "Simplify Your Laundry Experience",
      subtitle: "Fast, clean, and eco-friendly service at your doorstep.",
      button: "Order Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1920&q=80",
      title: "Your Clothes Deserve the Best Care",
      subtitle: "We handle every fabric with attention and love.",
      button: "Learn More",
    },
    {
      image:
        "https://images.unsplash.com/photo-1604335399105-eda6c860ca32?auto=format&fit=crop&w=1920&q=80",
      title: "Laundry Made Effortless",
      subtitle: "Save time, stay fresh, and let us do the hard work.",
      button: "Get Started",
    },
  ];

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-center bg-cover flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 text-center px-4 md:px-8 max-w-3xl">
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-white text-lg md:text-xl mb-6 opacity-90">
                  {slide.subtitle}
                </p>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
