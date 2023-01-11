import { Carousel } from "antd";
import ImageWithLoader from "../ImageWithLoader";
import { Image } from "../../app/api/interfaces";

interface Props {
  images: Image[];
  size?: {
    width: string;
    height: string;
  };
}

export default function ImageCarousel({
  images,
  size = { width: "500px", height: "500px" },
}: Props) {
  return (
    <Carousel
      autoplay
      style={{
        maxWidth: size.width,
        maxHeight: size.height,
        width: "100%",
        height: "100%",
      }}
    >
      {images.map((image) => (
        <ImageWithLoader
          size={size}
          image={image.path}
          title=""
          preview={false}
        />
      ))}
    </Carousel>
  );
}
