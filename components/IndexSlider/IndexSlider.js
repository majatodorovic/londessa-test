"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const IndexSlider = ({ banners, mobileBanners }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentSlide, setCurrentSlide] = useState({
    index: 0,
    banner: null,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsInitialized(true); // Postavljamo nakon što proverimo veličinu ekrana
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isInitialized) return; // Ne pokrećemo ovu logiku dok `isMobile` nije podešen

    const selectedBanners = isMobile ? mobileBanners : banners;
    setCurrentSlide({
      index: 0,
      banner: selectedBanners[0]?.image,
    });
  }, [isMobile, isInitialized, banners, mobileBanners]);

  const handleSlideChange = (index) => {
    const selectedBanners = isMobile ? mobileBanners : banners;
    setCurrentSlide({
      index: index,
      banner: selectedBanners[index]?.image,
    });
  };

  useEffect(() => {
    if (!isInitialized) return;

    const nextSlide = () => {
      setCurrentSlide((prevState) => {
        const selectedBanners = isMobile ? mobileBanners : banners;
        const nextIndex = (prevState.index + 1) % selectedBanners.length;
        return {
          index: nextIndex,
          banner: selectedBanners[nextIndex]?.image,
        };
      });
    };

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isMobile, isInitialized, banners, mobileBanners]);

  const selectedBanners = isMobile ? mobileBanners : banners;

  // Sprečava prikazivanje bilo čega dok se ne završi inicijalna provera `isMobile`
  if (!isInitialized) return null;

  return (
    <div className="absolute w-screen block max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[700px] 2xl:h-[750px] 3xl:h-[800px]">
      <div className="relative h-full overflow-hidden">
        <div className="items-center max-sm:h-[400px] justify-between h-full w-full">
          {selectedBanners.map((banner, index) => {
            const isActive = currentSlide?.index === index;

            return (
              <div
                key={index}
                className={isActive ? "relative w-full overflow-hidden h-full opacity-100 duration-[1000ms] transition-all ease-linear"
                  : "absolute w-full h-full overflow-hidden opacity-0 duration-[1000ms] transition-all ease-linear"}
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
                    href={`${banner?.url ?? `/stranica-u-izradi`}`}
                    target={banner?.target ?? "_self"}
                    className="absolute z-[49] top-0 left-0 w-full h-full bg-black transition-all duration-500 bg-opacity-40"
                  >
                    <div className="absolute flex flex-col items-center md:items-start justify-center md:justify-start max-sm:gap-[20px] gap-[33px] max-sm:top-[50%] top-[40%] text-center left-[4%] transform -translate-y-1/2">
                      {banner?.title && (
                        <h1 className="text-white max-sm:text-base text-xl font-bold ">
                          {banner?.title}
                        </h1>
                      )}
                      {banner?.subtitle && (
                        <h2 className="text-white max-sm:text-xl text-4xl font-bold uppercase">
                          {banner?.subtitle}
                        </h2>
                      )}
                      {banner?.text && (
                        <p className="text-white text-left sm:max-w-[60%] max-sm:text-[0.925rem] text-base font-normal">
                          {banner?.text}
                        </p>
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
    </div>
  );
};

export default IndexSlider;
