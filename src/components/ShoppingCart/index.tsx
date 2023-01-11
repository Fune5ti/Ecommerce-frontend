import { Button, Drawer, Empty, Space, Typography } from "antd";
import { useMemo } from "react";
import { Client } from "../../app/api/interfaces";
import { CartItem } from "../../app/features/cart/interfaces";
import { useAppSelector } from "../../app/hooks";
import { computePriceWithDiscount } from "../../utils/computePrice";
import { formatter } from "../../utils/currencyFormatter";
import ClientInfoForm from "../ClientInfoForm";
import PurchaseSummary from "../PurchaseSummary";
import ShoppingCartItem from "../ShoppingCartItem";
import "./styles.css";

const { Text } = Typography;

interface Props {
  onClose: () => void;
  onClearCart: () => void;
  onRemoveItem: (id: number) => void;
  onChangeQuantity: ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => void;
  items: CartItem[];
  open: boolean;
  total: number;
  onClientInfoDrawerClose: () => void;
  clientInfoDrawer: boolean;
  showSummary: boolean;
  onFinalizePurchase: () => void;
  onClientInfoFormFinish: (values: any) => void;
  onSummaryConfirmation: () => void;
}
export default function ShoppingCart({
  onClose,
  open,
  items,
  total,
  showSummary,
  onClientInfoFormFinish,
  onFinalizePurchase,
  onClearCart,
  onChangeQuantity,
  onRemoveItem,
  onClientInfoDrawerClose,
  onSummaryConfirmation,
  clientInfoDrawer,
}: Props) {
  const cartEmpty = useMemo(() => items.length === 0, [items.length]);
  const client = useAppSelector((state) => state.cart.client);
  return (
    <Drawer
      title="Shopping Cart"
      className="shopping-cart-drawer"
      placement="right"
      onClose={onClose}
      open={open}
      footer={
        !cartEmpty && (
          <div className="finalize-button">
            <span className="total-row">
              <Text strong>Total: </Text> <Text>{formatter.format(total)}</Text>
            </span>
            <Button onClick={onFinalizePurchase} type="primary">
              Advance
            </Button>
          </div>
        )
      }
      extra={
        !cartEmpty && (
          <Space>
            <Button onClick={onClearCart} danger>
              Clear cart
            </Button>
          </Space>
        )
      }
    >
      <Drawer
        title={!showSummary ? "Client Information" : "Summary"}
        width={540}
        closable={false}
        onClose={onClientInfoDrawerClose}
        open={clientInfoDrawer}
        footer={
          showSummary && (
            <Button type="primary" onClick={onSummaryConfirmation}>
              Finish
            </Button>
          )
        }
      >
        {showSummary ? (
          <PurchaseSummary
            total={total}
            client={client as Client}
            items={items}
          />
        ) : (
          <ClientInfoForm onFormFinish={onClientInfoFormFinish} />
        )}
      </Drawer>
      {cartEmpty && <Empty description="Your shopping cart is empty" />}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {!cartEmpty &&
          items.map((item: CartItem) => (
            <ShoppingCartItem
              onQuantityChange={(quantity) => {
                onChangeQuantity({ id: item.product.id, quantity });
              }}
              onRemoveClick={() => onRemoveItem(item.product.id)}
              image={item.product.images[0].path}
              price={computePriceWithDiscount(item.product) * item.quantity}
              quantity={item.quantity}
              title={item.product.name}
              key={item.product.id}
            />
          ))}
      </div>
    </Drawer>
  );
}
