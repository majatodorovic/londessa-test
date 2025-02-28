"use client"
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import LeftIcon from './svg/LeftIcon';
import RightIcon from './svg/RightIcon';

const SliderHeader = () => {
  const [swiper, setSwiper] = useState(null);
  const banners = ['Besplatna isporuka za iznos preko 5.000 RSD', 'Besplatna isporuka za iznos preko 10.000 RSD']

  return (
    <div className=' max-w-[30%] justify-between flex items-center' >
      <button className='' type='button' onClick={() => swiper.slidePrev()} >
        <LeftIcon />
      </button>
      <Swiper
        className='overflow-hidden max-w-[80%]'
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => setSwiper(swiper)}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        getswiper={setSwiper}
        centeredSlides={true} e
      >
        {
          banners?.map((banner, index) =>
            <SwiperSlide>
              <p className='text-sm font-normal text-black bg-topHeader'>{banner}</p>
            </SwiperSlide>
          )
        }
      </Swiper>
      <button className='' type='button' onClick={() => swiper.slideNext()} >
        <RightIcon />
      </button>
    </div>
  )
}

export default SliderHeader