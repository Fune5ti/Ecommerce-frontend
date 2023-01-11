import { RootState } from "../../store";

export const nameValueSelector = (state: RootState) => state.filter.name;
export const getSelectedFilter = (state: RootState) =>
  state.filter.selectedFilterType;
export const getFilterTypes = (state: RootState) => state.filter.filterTypes;
export const getFilterValue = (state: RootState) =>
  state.filter.currentFilterValue;
export const getPriceFilter = (state: RootState) =>
  state.filter.selectedPriceFilter;
export const getPriceFilterTypes = (state: RootState) =>
  state.filter.priceFilterTypes;
export const getDiscountFilter = (state: RootState) =>
  state.filter.selectedDiscountFilter;
export const getDiscountFilterTypes = (state: RootState) =>
  state.filter.hasDiscountTypes;
