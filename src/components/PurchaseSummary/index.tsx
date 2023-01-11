import { Divider, List, Descriptions } from "antd";
import { useMemo } from "react";
import { Client } from "../../app/api/interfaces";
import { CartItem } from "../../app/features/cart/interfaces";
import { formatter } from "../../utils/currencyFormatter";

interface Props {
  items: CartItem[];
  total: number;
  client: Client;
}
const PurchaseSummary = ({ items, total, client }: Props) => {
  const discount = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + parseFloat(item.product.discount) * item.quantity,
        0
      ),
    []
  );
  return (
    <div>
      {items.map((item, index) => (
        <List
          key={index}
          size="small"
          split
          bordered
          dataSource={[
            { label: "Product Name", value: item.product.name },
            {
              label: "Price",
              value: formatter.format(parseFloat(item.product.price)),
            },
            { label: "Discount", value: item.product.discount },
            { label: "Quantity", value: item.quantity },
            {
              label: "Total",
              value: formatter.format(
                (parseFloat(item.product.price) -
                  parseFloat(item.product.discount)) *
                  item.quantity
              ),
            },
          ]}
          renderItem={({ label, value }) => (
            <Descriptions
              bordered
              column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label={label}>{value}</Descriptions.Item>
            </Descriptions>
          )}
        />
      ))}
      <Descriptions
        style={{ paddingTop: "10px" }}
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Purchase Total">
          {formatter.format(total)}
        </Descriptions.Item>
        <Descriptions.Item label="Purchase Discount Total">
          {formatter.format(discount)}
        </Descriptions.Item>
      </Descriptions>

      <Divider />
      <Descriptions
        title="Client"
        bordered
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Name">{client.name}</Descriptions.Item>
        <Descriptions.Item label="Address">{client.address}</Descriptions.Item>
        <Descriptions.Item label="Contact">{client.phone}</Descriptions.Item>
        <Descriptions.Item label="CPF">{client.cpf}</Descriptions.Item>
        <Descriptions.Item label="Email">{client.email}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
export default PurchaseSummary;
