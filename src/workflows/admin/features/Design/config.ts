import { Navigation, Pagination } from 'swiper/modules';
import { DEFAULT_WINDOW_WIDTH } from '@/app/global';
import { SwiperProps } from 'swiper/react';

export const config: SwiperProps = {
  modules: [Pagination, Navigation],
  spaceBetween: 16,
  slidesPerView: 3,
  pagination: { clickable: true },
  navigation: {
    prevEl: 'default_slider_navigation_prev',
    nextEl: 'default_slider_navigation_next',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    [DEFAULT_WINDOW_WIDTH.mobile]: {
      slidesPerView: 2,
    },
    [DEFAULT_WINDOW_WIDTH.laptop]: {
      slidesPerView: 3,
    },
  },
};
