import { Pagination, PaginationProps, Empty } from "antd";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetallproductsQuery } from "../../app/api/Product";
import ProductCard from "../../components/ProductCard";
import "./styles.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addToCart } from "../../app/features/cart/cartSlice";
import { computePriceWithDiscount } from "../../utils/computePrice";
import { getCartItems } from "../../app/features/cart/selectors";
import {
  getDiscountFilter,
  getFilterValue,
  getPriceFilter,
  getSelectedFilter,
} from "../../app/features/filter/selectors";
import { Product } from "../../app/api/interfaces";

export default function Home() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(getCartItems);
  const filterValue = useAppSelector(getFilterValue);
  const filterType = useAppSelector(getSelectedFilter);
  const priceFilter = useAppSelector(getPriceFilter);
  const discountFilter = useAppSelector(getDiscountFilter);

  const [page, setPage] = useState(1);

  const isInCart = (id: number) =>
    cartItems.some((item) => item.product.id === id);
  const isInCartMemoized = useMemo(() => isInCart, [cartItems]);

  const { data: response, isLoading } = useGetallproductsQuery(
    {
      page: page,
      params: {
        [filterType.value]: filterValue,
        [priceFilter]: true,
        hasdiscount: discountFilter,
      },
    },
    {
      pollingInterval: 3000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  const navigate = useNavigate();

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="home-container">
      <div className="site-layout-content">
        {response?.data.length === 0 && (
          <div className="no-results">
            <Empty description="No results found" />
          </div>
        )}
        {isLoading &&
          Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)).map(
            (_, index) => (
              <ProductCard
                keyword=""
                loading
                key={index}
                title=""
                description=""
                image=""
                price=""
                onClick={() => {}}
                onDetailsClick={() => {}}
                isInCart={false}
              />
            )
          )}
        {response &&
          response?.data.map((product: Product) => (
            <ProductCard
              discount={
                product.hasDiscount ? parseFloat(product.discount) : undefined
              }
              isInCart={isInCartMemoized(product.id)}
              keyword={product.keyword}
              loading={isLoading}
              key={product.id}
              title={product.name}
              description={product.description}
              image={product.images[0].path}
              price={computePriceWithDiscount(product).toString()}
              onClick={() => dispatch(addToCart(product))}
              onDetailsClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
      </div>
      {(response?.data?.length ?? 0) > 0 && (
        <Pagination
          current={page}
          disabled={isLoading}
          showSizeChanger={false}
          total={response?.total}
          pageSize={20}
          onChange={onChange}
        />
      )}
    </div>
  );
}
