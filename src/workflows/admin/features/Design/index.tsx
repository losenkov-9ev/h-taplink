import React from 'react';
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
import { getDesignTypes } from '../../widgets/Appearance/model/slice/thunks';
import { selectDesignStatus } from '../../widgets/Appearance/model/selectors/selectIsLoading';
import { LoadingStatus } from '../../shared/lib/types/loading';
import { useFormData } from '../../shared/lib';

export const Design: React.FC = () => {
  const formData = useFormData();

  const dispatch = useAppDispatch();

  const currentItem = useSelector(selectCurrentDesign);

  const designItems = useSelector(selectAllDesigns);
  const designStatus = useSelector(selectDesignStatus);

  const [selectedItem, setSelectedItem] = React.useState<string>('');
  const sliderRef = React.useRef<null | SwiperRef>(null);

  const handlePrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleSelectItem = (id: string) => {
    setSelectedItem(id);
  };

  React.useEffect(() => {
    dispatch(getDesignTypes());
  }, [dispatch]);

  React.useEffect(() => {
    setSelectedItem(currentItem);
  }, [currentItem]);

  React.useEffect(() => {
    formData.set('design', selectedItem);
  }, [selectedItem, formData]);

  return (
    <div className={cls.design}>
      <div className={cls.design_head}>
        <div className={clsx(cls.design_title, 's-1')}>Оформление</div>
        <div className={cls.design_navigation}>
          <span className={cls.design_navigation_prev} onClick={handlePrev}>
            <ArrowLeft />
          </span>
          <span className={cls.design_navigation_next} onClick={handleNext}>
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
