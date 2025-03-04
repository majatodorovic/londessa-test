"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const IndexSlider = ({ banners, mobileBanners }) => {
  const [activeBanners, setActiveBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchMoved = useRef(false);

  useEffect(() => {
    const updateBanners = () => {
      const newBanners =
        window.innerWidth <= 768
          ? mobileBanners.length > 0
            ? mobileBanners
            : []
          : banners;
      setActiveBanners(newBanners);
      setCurrentSlide(0);
      setWindowWidth(window.innerWidth);
    };

    updateBanners();
    window.addEventListener("resize", updateBanners);

    return () => {
      window.removeEventListener("resize", updateBanners);
    };
  }, [banners, mobileBanners]);

  useEffect(() => {
    if (activeBanners.length === 0) return;
    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, [activeBanners]);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
  };

  const handleSlideChange = (index) => {
    clearInterval(intervalRef.current);
    setCurrentSlide(index);
    startAutoSlide();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchMoved.current = false;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchMoved.current = true;
  };

  const handleTouchEnd = () => {
    if (!touchMoved.current) return;

    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 50) {
      handleSlideChange((currentSlide + 1) % activeBanners.length);
    } else if (deltaX < -50) {
      handleSlideChange((currentSlide - 1 + activeBanners.length) % activeBanners.length);
    }
  };

  if (activeBanners.length === 0) return null;

  return (
    <div
      className="absolute w-screen block max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[700px] 2xl:h-[750px] 3xl:h-[800px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-full overflow-hidden">
        <div className="items-center max-sm:h-[400px] justify-between h-full w-full">
          {activeBanners.map((banner, index) => {
            const isActive = currentSlide === index;

            return (
              <div
                key={index}
                className={`absolute w-full h-full overflow-hidden duration-[1000ms] transition-all ease-linear ${isActive ? "opacity-100 relative" : "opacity-0"}`}
              >
                <div className="relative max-sm:h-[400px] sm:h-full">
                  <Image
                    src={banner?.image}
                    alt={banner?.title}
                    width={1920}
                    height={1080}
                    className="bg-fixed w-full h-full object-cover"
                  />
                  <Link
                    href={banner?.url ?? "/stranica-u-izradi"}
                    target={banner?.target ?? "_self"}
                    className="absolute z-[49] top-0 left-0 w-full h-full bg-black transition-all duration-500 bg-opacity-40"
                  >
                    <div className="absolute flex flex-col items-center md:items-start justify-center md:justify-start max-sm:gap-[20px] gap-[33px] max-sm:top-[50%] top-[50%] text-center left-[8%] transform -translate-y-1/2">
                      {banner?.title && (
                        <h1 className="text-white max-sm:text-base text-xl font-bold">{banner?.title}</h1>
                      )}
                      {banner?.subtitle && (
                        <h2 className="text-white max-sm:text-xl text-4xl font-bold uppercase">{banner?.subtitle}</h2>
                      )}
                      {banner?.text && (
                        <p className="text-white text-left sm:max-w-[60%] max-sm:text-[0.925rem] text-base font-normal">{banner?.text}</p>
                      )}
                      {banner?.button && (
                        <button className="bg-transparent hover:bg-white hover:text-black transition-all duration-300 text-white text-sm font-bold uppercase py-4 px-12 max-sm:px-2 max-sm:py-2 max-sm:flex max-sm:items-center max-sm:justify-center border border-white max-sm:w-[250px]">
                          {banner?.button}
                        </button>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative">
        <div className="absolute max-sm:-top-[1rem] md:-top-[2rem] xl:-top-[2rem] 2xl:-top-20 w-full flex items-center justify-center z-[50]">
          {activeBanners?.map((banner, index) => (
            <div
              key={index}
              className={`${currentSlide === index ? "bganimate" : "bg-gray-500"} w-32 h-[3.5px] mx-1 cursor-pointer`}
              onClick={() => handleSlideChange(index)}
            ></div>
          ))}
          <div className="absolute flex gap-10 items-center bottom-6">
            <i
              className="cursor-pointer fas fa-chevron-left text-white text-sm"
              onClick={() => handleSlideChange((currentSlide - 1 + activeBanners.length) % activeBanners.length)}
            ></i>
            <div>
              <h1 className="text-white">{`${currentSlide + 1} / ${activeBanners.length}`}</h1>
            </div>
            <i
              className="fas cursor-pointer fa-chevron-right text-white text-sm"
              onClick={() => handleSlideChange((currentSlide + 1) % activeBanners.length)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexSlider;
