import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Image } from "antd";
import "./styles.css";

interface Props {
  preview?: boolean;
  image: string;
  title: string;
  size?: {
    width: string;
    height: string;
  };
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function ImageWithLoader({
  image,
  title,
  size = { width: "300px", height: "225px" },
  preview = true,
}: Props) {
  const [loadingImage, setLoadingImage] = React.useState(true);

  return (
    <>
      {loadingImage && (
        <div
          className="image-loader"
          style={{
            width: size.width,
            height: size.height,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin indicator={antIcon} size="large" />
        </div>
      )}
      <Image
        style={{
          display: loadingImage ? "none" : "block",
          maxWidth: size.width,
          maxHeight: size.height,
          width: "100%",
          height: "100%",
        }}
        preview={preview}
        src={image}
        alt={title}
        onLoad={() => setLoadingImage(false)}
      />
    </>
  );
}
