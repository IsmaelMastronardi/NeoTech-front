import { useState } from 'react';
import BrandCarousel from '../components/brandsCarousel';
import instagramIcon from '../images/socialMedia/instagram_icon.png';
import instagramIcon2 from '../images/socialMedia/instagram_icon2.png';
import facebookIcon from '../images/socialMedia/facebook_icon.png';
import facebookIcon2 from '../images/socialMedia/facebook_icon2.png';
import twitterIcon from '../images/socialMedia/twitter_icon.png';
import twitterIcon2 from '../images/socialMedia/twitter_icon2.png';

const Footer = () => {
  const [isfacebookhovered, setIsfacebookhovered] = useState(false);
  const [istwitterHovered, setIsTwitterHovered] = useState(false);
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  return (
    <footer className="flex flex-col gap-8 pt-8 text-center text-white bg-black-1">
      <BrandCarousel />
      <p className="text-2xl lg:text-3xl 2xl:text-4xl">NeoTech</p>
      <div className="flex justify-center gap-20">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setIsfacebookhovered(true)}
          onMouseLeave={() => setIsfacebookhovered(false)}
        >
          <img
            src={isfacebookhovered ? facebookIcon2 : facebookIcon}
            alt="instagram"
            className="socialMediaIcon"
          />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setIsInstagramHovered(true)}
          onMouseLeave={() => setIsInstagramHovered(false)}
        >
          <img
            src={isInstagramHovered ? instagramIcon2 : instagramIcon}
            alt="instagram"
            className="socialMediaIcon"
          />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setIsTwitterHovered(true)}
          onMouseLeave={() => setIsTwitterHovered(false)}
        >
          <img
            src={istwitterHovered ? twitterIcon2 : twitterIcon}
            alt="instagram"
            className="socialMediaIcon"
          />
        </a>
      </div>
      <p className="pb-4 text-md lg:text-lg">
        &copy; 2024 All rigths reserved,
        <span className="text-custom-red"> Neotech inc.</span>
      </p>
    </footer>
  );
};

export default Footer;
