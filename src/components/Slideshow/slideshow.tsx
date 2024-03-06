import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "@/../sanity/lib/client";

interface SlideshowProps {
  images: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  // Ensure the images array has at least one image and at most three images
  const limitedImages = images.slice(0, 3);

  function urlFor(source: string) {
    return createImageUrlBuilder(client).image(source);
  }

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "300px",
  };

  const heights = {
    height: "300px",
  };

  return (
    <Slide cssClass="height">
      {limitedImages.map((image, index) => (
        <div style={{ ...heights }} key={index} className="each-slide-effect">
          <div style={{ ...divStyle, backgroundImage: `url(${image})` }}>
            <img
              key={index}
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
              src={urlFor(image).url()}
              alt={`Product ${index + 1}`}
            />
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default Slideshow;
