import { Navigation, Pagination } from 'swiper/modules';
import { DEFAULT_WINDOW_WIDTH } from '@/app/global';
import { SwiperProps } from 'swiper/react';

import cls from './Design.module.scss';

export const config: SwiperProps = {
  modules: [Pagination, Navigation],
  spaceBetween: 16,
  slidesPerView: 3,
  pagination: { clickable: true },
  navigation: {
    prevEl: cls.design_navigation_prev,
    nextEl: cls.design_navigation_next,
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
