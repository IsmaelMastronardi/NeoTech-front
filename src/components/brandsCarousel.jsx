/* eslint-disable no-unused-vars */
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
    <div className="flex items-center justify-between w-full bg-white h-28">
      {brands.map((brand) => (
        <img
          key={brand}
          src={brand}
          alt="brand"
          className="w-16 h-16 mx-2"
        />
      ))}
    </div>
  );
};

export default BrandCarousel;
