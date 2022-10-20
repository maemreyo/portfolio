import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Logo from '../Logo';
import { banners } from './dataBanners';

export const Hero = () => {
  return (
    <section id="hero" className="grid grid-cols-2 gap-4">
      <div className="flex justify-end">
        <p>Content</p>
      </div>
      <div className="flex justify-start">
        <div className="p-[70px]">
          <Logo image={`${process.env.PUBLIC_URL}/${banners[0].image}`} />
        </div>
      </div>
    </section>
  );
};
