import { SwiperProps } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Конфигурация Swiper
export const swiperConfig: SwiperProps = {
  modules: [Navigation, Pagination],
  spaceBetween: 10,
  slidesPerView: 1,
  // navigation: true,
  pagination: { clickable: true },
};
