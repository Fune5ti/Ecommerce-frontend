import {
  Layout,
  Input,
  Button,
  Badge,
  Select,
  RadioChangeEvent,
  Popover,
} from "antd";
import "./styles.css";
import { Link, Outlet } from "react-router-dom";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setDiscountFilter,
  setFilterType,
  setFilterValue,
  setPriceFilter,
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
import { UilFilter, UilShoppingBag } from "@iconscout/react-unicons";
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
  getDiscountFilter,
  getDiscountFilterTypes,
  getFilterTypes,
  getFilterValue,
  getPriceFilter,
  getPriceFilterTypes,
  getSelectedFilter,
} from "../../app/features/filter/selectors";
import { PriceFilters } from "../../app/features/filter/interfaces";

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
  const selectedPriceFilter = useAppSelector(getPriceFilter);
  const priceFilterTypes = useAppSelector(getPriceFilterTypes);
  const selectedDiscountFilter = useAppSelector(getDiscountFilter);
  const discountFilterTypes = useAppSelector(getDiscountFilterTypes);

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

  const onChangePriceFilter = (value: string) => {
    dispatch(setPriceFilter(value));
  };
  const onChangeDiscountFilter = (value: string) => {
    dispatch(setDiscountFilter(value));
  };

  const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(setFilterType("suplier"));
    dispatch(setFilterValue(value));
  };
  const [openFilters, setOpenFilters] = useState(false);
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
          <Popover
            content={
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
                <Select
                  style={{ minWidth: "150px" }}
                  placeholder="Select a price filter"
                  optionFilterProp="children"
                  onChange={onChangePriceFilter}
                  defaultValue={selectedPriceFilter}
                  options={priceFilterTypes}
                />
                <Select
                  style={{ minWidth: "150px" }}
                  placeholder="Select a discount filter"
                  optionFilterProp="children"
                  onChange={onChangeDiscountFilter}
                  defaultValue={selectedDiscountFilter}
                  options={discountFilterTypes}
                />
              </span>
            }
            title="Filters"
            trigger="click"
            open={openFilters}
            onOpenChange={() => {
              setOpenFilters(!openFilters);
            }}
          >
            <Button type="primary" icon={<UilFilter />} size="large" />
          </Popover>

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
