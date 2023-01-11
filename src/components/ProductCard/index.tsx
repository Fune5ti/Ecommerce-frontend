import React from "react";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Card, Image, Skeleton, Spin, Tag } from "antd";
import { LoadingOutlined, CheckOutlined } from "@ant-design/icons";
import "./styles.css";
import ImageWithLoader from "../ImageWithLoader";
import { formatter } from "../../utils/currencyFormatter";

interface Props {
  title: string;
  description: string;
  image: string;
  loading: boolean;
  price: string;
  keyword: string;
  isInCart: boolean;
  discount?: number;
  onClick: () => void;
  onDetailsClick: () => void;
}
export default function ProductCard({
  title,
  description,
  image,
  loading,
  price,
  keyword,
  isInCart,
  discount,
  onClick,
  onDetailsClick,
}: Props) {
  return (
    <Card
      style={{ width: 300 }}
      loading={loading}
      cover={
        loading ? (
          <Skeleton.Image active />
        ) : (
          <ImageWithLoader image={image} title={title} />
        )
      }
      actions={[
        isInCart ? (
          <CheckOutlined />
        ) : (
          <PlusOutlined key="add" onClick={onClick} />
        ),
        <ArrowRightOutlined key="see-more" onClick={onDetailsClick} />,
      ]}
    >
      <div className="card-body-wrapper" onClick={onDetailsClick}>
        <h3 className="text-limiter card-body-title">{title}</h3>
        <p className="text-limiter card-body-title">{description}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <Tag color="geekblue">{keyword}</Tag>
          <p style={{ alignSelf: "end", margin: 0, opacity: "70%" }}>
            {formatter.format(parseFloat(price))}
          </p>
          {discount && <Tag color="red">{discount}% OFF</Tag>}
        </div>
      </div>
    </Card>
  );
}
