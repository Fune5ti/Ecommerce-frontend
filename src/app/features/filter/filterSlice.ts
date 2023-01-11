import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FilterType } from "./interfaces";

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
  name: "",
  currentFilterValue: "",
} as {
  name: string;
  filterTypes: FilterType[];
  selectedFilterType: FilterType;
  currentFilterValue: string;
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
  },
});

export const { searchByName, setFilterType, setFilterValue } = slice.actions;
export default slice.reducer;
