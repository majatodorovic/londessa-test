import React from 'react'
import Slider from './Slider';
import { get } from '@/app/api/api';



const getBanners = async () => {
	return await new Promise((resolve) => {
		setTimeout(() => resolve(get("/banners/index_slider").then((res) => res?.payload)), 10000);
	});
};

const Banners = async () => {
	let banners = await getBanners();

	return (
		<div
			className="relative max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[860px] 2xl:h-[1000px] 3xl:h-[1057px] block"
			id="slider"
		>
			<Slider banners={banners} />
		</div>

	)
}

export default Banners