/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import acer from '../images/brands/Acer.png';
import amd from '../images/brands/AMD.png';
import asus from '../images/brands/ASUS.png';
import hp from '../images/brands/HP.png';
import intel from '../images/brands/Intel.png';
import lenovo from '../images/brands/Lenovo.png';
import logitech from '../images/brands/Logitech.png';
import nvidia from '../images/brands/Nvidia.png';

const BrandCarousel = () => {
  const brands = [acer, amd, asus, hp, intel, lenovo, logitech, nvidia];

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: brands.length,
    slidesToScroll: 1,
    centerMode: false,
  };

  return (
    <Slider {...settings} className="flex items-center justify-center bg-space-cadet">
      {brands.map((brand, index) => (
        <div key={brand}>
          <img
            src={brand}
            alt={`brand-${index}`}
            className="w-16 h-16 mx-2"
          />
        </div>
      ))}
    </Slider>
  );
};

export default BrandCarousel;
