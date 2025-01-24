import React, { useRef, useEffect, useState, useCallback } from 'react';
import cls from './Design.module.scss';
import clsx from 'clsx';

import { DesignItem, DesignItemSkeleton } from '../../shared/ui/DesignItem';

import ArrowRight from '@images/arrow-right.svg';
import ArrowLeft from '@images/arrow-left.svg';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useSelector } from 'react-redux';
import { selectCurrentDesign } from '../../widgets/Appearance';
import { selectAllDesigns } from '../../widgets/Appearance/model/selectors/selectDesign';
import { config } from './config';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/StateSchema';
import { getConfig, getDesignTypes } from '../../widgets/Appearance/model/slice/thunks';
import { selectDesignStatus } from '../../widgets/Appearance/model/selectors/selectIsLoading';
import { LoadingStatus } from '../../shared/lib/types/loading';
import { useFormData } from '../../shared/lib';

export const Design: React.FC = () => {
  const formData = useFormData();
  const dispatch = useAppDispatch();
  const currentItem = useSelector(selectCurrentDesign);

  const designItems = useSelector(selectAllDesigns);
  const designStatus = useSelector(selectDesignStatus);

  const [selectedItem, setSelectedItem] = useState<string>('');
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleSelectItem = (id: string) => {
    setSelectedItem(id);
    dispatch(getConfig(id));
  };

  useEffect(() => {
    dispatch(getDesignTypes());
  }, [dispatch]);

  useEffect(() => {
    setSelectedItem(currentItem);
  }, [currentItem]);

  useEffect(() => {
    formData.set('design', selectedItem);
  }, [selectedItem, formData]);

  useEffect(() => {
    if (designStatus === LoadingStatus.FULFILLED && sliderRef.current && designItems.length > 0) {
      const activeIndex = designItems.findIndex((item) => item.name_id === currentItem);
      if (activeIndex !== -1) {
        sliderRef.current.swiper.slideTo(activeIndex, 500, false);
      }
    }
  }, [designStatus, currentItem, designItems]);

  return (
    <div className={cls.design}>
      <div className={cls.design_head}>
        <div className={clsx(cls.design_title, 's-1')}>Оформление</div>
        <div className="default_slider_navigation">
          <span className="default_slider_navigation_prev" onClick={handlePrev}>
            <ArrowLeft />
          </span>
          <span className="default_slider_navigation_next" onClick={handleNext}>
            <ArrowRight />
          </span>
        </div>
      </div>
      <div className={cls.design_inner}>
        <Swiper ref={sliderRef} {...config}>
          {designStatus === LoadingStatus.FULFILLED
            ? designItems.map((item, idx) => (
                <SwiperSlide key={`${item.name}_${idx}`}>
                  <DesignItem
                    onClick={() => handleSelectItem(item.name_id)}
                    isChecked={selectedItem === item.name_id}
                    {...item}
                    imageHeight={414}
                  />
                </SwiperSlide>
              ))
            : new Array(6).fill('').map((_, idx) => (
                <SwiperSlide key={idx}>
                  <DesignItemSkeleton />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};
