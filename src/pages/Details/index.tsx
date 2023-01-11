import { UilShoppingCart } from "@iconscout/react-unicons";
import { Button, Card, Divider, Skeleton, Space, Tag, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useGetproductbyidQuery } from "../../app/api/Product";
import { addToCart } from "../../app/features/cart/cartSlice";
import { getIsItemInCart } from "../../app/features/cart/selectors";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ImageCarousel from "../../components/ImageCarousel";
import { formatter } from "../../utils/currencyFormatter";

import "./styles.css";

const { Title } = Typography;
export default function Details() {
  const dispatch = useAppDispatch();

  let { productId } = useParams();
  const { data: product, isLoading } = useGetproductbyidQuery(
    productId as string
  );
  const isItemInCart = useAppSelector((state) =>
    getIsItemInCart(state, parseInt(productId as string))
  );
  if (isLoading)
    return (
      <div className="container">
        <Card className="card-container">
          <Skeleton.Image style={{ width: "500px", height: "400px" }} />
          <Skeleton paragraph={{ rows: 8 }} />
        </Card>
      </div>
    );
  return (
    <div className="container">
      <Card className="card-container">
        <div className="images-wrapper">
          <ImageCarousel
            images={product?.images ?? []}
            size={{ width: "500px", height: "400px" }}
          />
        </div>
        <div className="product-details-info">
          <Title level={2}>{product?.name}</Title>
          <Title level={4}>Description</Title>
          <p>{product?.description}</p>
          <div className="tags">
            <Tag color="#108ee9">Keywords: {product?.keyword}</Tag>
            <Tag color="#108ee9">Department: {product?.department}</Tag>
            <Tag color="#108ee9">Material: {product?.material}</Tag>
          </div>
          <div className="addtocart-container">
            <span>
              <Title type="secondary">
                Price: {formatter.format(parseFloat(product?.price ?? ""))}
              </Title>

              <Tag
                color="magenta"
                style={{
                  visibility: product?.hasDiscount ? "visible" : "hidden",
                }}
              >
                Discount: {product?.discount}% off
              </Tag>
            </span>
            <Button
              type="primary"
              icon={<UilShoppingCart />}
              className="cart-button"
              size="large"
              disabled={isItemInCart}
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              {!isItemInCart ? "Add to cart" : "Added to cart"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
