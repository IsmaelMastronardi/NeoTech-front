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

  return (
    <Slider
      infinite
      autoplay
      speed={2000}
      slidesToShow={brands.length}
      slidesToScroll={1}
      centerMode
      arrows={false}
      className="flex items-center justify-center w-full py-4 bg-white"
    >
      {brands.map((brand, index) => (
        <div key={brand}>
          <img
            src={brand}
            alt={`brand-${index}`}
            className="mx-2 w-9 h-9 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16"
          />
        </div>
      ))}
    </Slider>
  );
};

export default BrandCarousel;
