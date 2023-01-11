import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FilterType, PriceFilters } from "./interfaces";

const initialState = {
  filterTypes: [
    { value: "name", label: "Name" },
    { value: "description", label: "Description" },
    { value: "suplier", label: "Suplier" },
    { value: "material", label: "Material" },
    { value: "keyword", label: "Keyword" },
    { value: "department", label: "Department" },
  ],
  selectedFilterType: { value: "name", label: "Name" },
  priceFilterTypes: [
    { label: "None", value: PriceFilters.none },
    { label: "Price Ascending", value: PriceFilters.asc },
    { label: "Price Descending", value: PriceFilters.desc },
  ],
  selectedPriceFilter: "none",
  hasDiscountTypes: [
    { label: "Has Discount", value: "true" },
    { label: "No Discount", value: "false" },
    { label: "None", value: "none" },
  ],
  selectedDiscountFilter: "none",
  name: "",
  currentFilterValue: "",
} as {
  name: string;
  filterTypes: FilterType[];
  selectedFilterType: FilterType;
  currentFilterValue: string;
  selectedPriceFilter: string;
  priceFilterTypes: FilterType[];
  selectedDiscountFilter: string;
  hasDiscountTypes: FilterType[];
};

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searchByName: (state, action) => {
      state.name = action.payload;
    },
    setFilterValue: (state, action) => {
      state.currentFilterValue = action.payload;
    },
    setFilterType: (state, action) => {
      state.currentFilterValue = "";
      state.selectedFilterType = state.filterTypes.find(
        (filterType) => filterType.value === action.payload
      ) as FilterType;
    },
    setPriceFilter: (state, action) => {
      state.selectedPriceFilter = action.payload;
    },
    setDiscountFilter: (state, action) => {
      state.selectedDiscountFilter = action.payload;
    },
  },
});

export const {
  searchByName,
  setFilterType,
  setFilterValue,
  setPriceFilter,
  setDiscountFilter,
} = slice.actions;
export default slice.reducer;
