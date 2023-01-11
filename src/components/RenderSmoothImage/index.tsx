import { useState } from "react";
import "./styles.css";

interface Props {
  src: string;
  alt: string;
}
export default function RenderSmoothImage({ src, alt }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="smooth-image-wrapper">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`smooth-image image-＄{
            imageLoaded ? 'visible' :  'hidden'
          }`}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <div className="smooth-preloader">
          <span className="loader" />
        </div>
      )}
    </div>
  );
}
