import { UilTrash } from "@iconscout/react-unicons";
import { Button, Card, InputNumber, Typography } from "antd";
import { parseInt } from "lodash";
import { formatter } from "../../utils/currencyFormatter";
import ImageWithLoader from "../ImageWithLoader";
import "./styles.css";

const { Text } = Typography;

interface Props {
  title: string;
  image: string;
  quantity: number;
  price: number;
  onRemoveClick: () => void;
  onQuantityChange: (value: number) => void;
}
export default function ShoppingCartItem({
  title,
  image,
  quantity,
  price,
  onRemoveClick,
  onQuantityChange,
}: Props) {
  return (
    <Card
      title={title}
      className="body"
      extra={
        <Button
          type="primary"
          danger
          onClick={onRemoveClick}
          icon={<UilTrash />}
        />
      }
    >
      <div className="item-container">
        <div className="left-wrapper">
          <ImageWithLoader
            image={image}
            title={title}
            size={{ width: "100px", height: "100px" }}
          />
        </div>
        <div className="right-wrapper">
          <span className="label-wrapper">
            <Text>Quantity:</Text>
            <InputNumber
              defaultValue={quantity}
              size="small"
              min={1}
              onChange={(value) => onQuantityChange(value as number)}
            />
          </span>
          <span className="label-wrapper">
            <Text>Price:</Text>
            <Text>{formatter.format(price)}</Text>
          </span>
        </div>
      </div>
    </Card>
  );
}
