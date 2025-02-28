import Image from 'next/image';
import React from 'react'

const getInstagramPost = async () => {
    const resData = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_KEY}`
    );

    const data = await resData.json();

    return data
};

const InstagramSection = async () => {
    const instagramImages = await getInstagramPost();

    return (
        <div>
            <h2 className='text-[29px] font-bold text-black mb-8'>#instagram posts</h2>
            <div className='grid grid-cols-3 gap-3'>
                {instagramImages?.data?.slice(0, 6)?.map((image, index) => (
                    <div className='w-full aspect-square relative' key={index}>
                        <Image src={image?.media_url} fill alt={image?.caption} priority={true} />
                    </div>))}
            </div>

        </div>
    )
}

export default InstagramSection