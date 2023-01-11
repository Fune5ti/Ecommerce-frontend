import { Layout, Input, Button, Badge, Select, RadioChangeEvent } from "antd";
import "./styles.css";
import { Link, Outlet } from "react-router-dom";
import { useCallback } from "react";
import { debounce } from "lodash";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setFilterType,
  setFilterValue,
} from "../../app/features/filter/filterSlice";
import ShoppingCart from "../ShoppingCart";
import {
  closeCart,
  changeQuantity,
  openCart,
  removeFromCart,
  clearCart,
  openClientInfoDrawer,
  closeClientInfoDrawer,
  setClient,
} from "../../app/features/cart/cartSlice";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { useCreatePurchaseMutation } from "../../app/api/Purchase";
import { toast } from "react-toastify";
import FilterField from "../Filters";
import {
  getCartItems,
  getCartOpened,
  getClient,
  getClientInfoDrawerOpened,
  getShowSummary,
  getTotal,
} from "../../app/features/cart/selectors";
import {
  getFilterTypes,
  getFilterValue,
  getSelectedFilter,
} from "../../app/features/filter/selectors";

const { Header, Content } = Layout;
const { Search } = Input;

export default function RootLayout() {
  const [createPurchase] = useCreatePurchaseMutation();
  const dispatch = useAppDispatch();
  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setFilterValue(e.target.value.toLocaleLowerCase()));
  };
  const onQuantityChange = (id: number, quantity: number) => {
    dispatch(changeQuantity({ id, quantity }));
  };

  const debouncedSearch = useCallback(debounce(onSearchChange, 300), []);
  const debouncedQuantity = useCallback(debounce(onQuantityChange, 300), []);

  const cartOpened = useAppSelector(getCartOpened);
  const cartItems = useAppSelector(getCartItems);
  const total = useAppSelector(getTotal);
  const clientInfoDrawerOpened = useAppSelector(getClientInfoDrawerOpened);
  const showSummary = useAppSelector(getShowSummary);
  const client = useAppSelector(getClient);
  const filterTypes = useAppSelector(getFilterTypes);
  const selectedFilterType = useAppSelector(getSelectedFilter);
  const selectedFilterValue = useAppSelector(getFilterValue);

  const onCompletePurchase = () => {
    createPurchase({
      products: cartItems.map((item) => {
        return {
          id: item.product.id,
          quantity: item.quantity,
        };
      }),
      client,
    })
      .unwrap()
      .then(() => {
        dispatch(clearCart());
        dispatch(closeClientInfoDrawer());
        dispatch(closeCart());
        toast.success("Purchase completed successfully");
      });
  };

  const onChange = (value: string) => {
    dispatch(setFilterType(value));
  };

  const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(setFilterType("suplier"));
    dispatch(setFilterValue(value));
  };

  return (
    <Layout className="layout">
      <Header className="navbar">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: " space-between",
          }}
        >
          <Link to="/">Ecommerce Home</Link>
          <span className="filters">
            <Select
              style={{ minWidth: "150px" }}
              placeholder="Select a field to filter"
              optionFilterProp="children"
              onChange={onChange}
              defaultValue={selectedFilterType.value}
              options={filterTypes}
            />
            <FilterField
              type={selectedFilterType}
              onSearch={debouncedSearch}
              onChange={onRadioChange}
              radioCurrentValue={selectedFilterValue}
            />
          </span>
          <Badge count={cartItems.length}>
            <Button
              type="primary"
              icon={<UilShoppingBag />}
              size="large"
              onClick={() => dispatch(openCart())}
            />
          </Badge>
        </div>
      </Header>
      <Content className="wrapper">
        <Outlet />
        <ShoppingCart
          onSummaryConfirmation={() => onCompletePurchase()}
          showSummary={showSummary}
          onClientInfoFormFinish={(values) => dispatch(setClient(values))}
          clientInfoDrawer={clientInfoDrawerOpened}
          onClientInfoDrawerClose={() => dispatch(closeClientInfoDrawer())}
          onFinalizePurchase={() => dispatch(openClientInfoDrawer())}
          total={total}
          onClearCart={() => dispatch(clearCart())}
          onClose={() => dispatch(closeCart())}
          items={cartItems}
          onChangeQuantity={({ id, quantity }) =>
            debouncedQuantity(id, quantity)
          }
          onRemoveItem={(id) => {
            dispatch(removeFromCart(id));
          }}
          open={cartOpened}
        />
      </Content>
    </Layout>
  );
}
