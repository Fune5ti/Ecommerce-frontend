import { RootState } from "../../store";

export const nameValueSelector = (state: RootState) => state.filter.name;
export const getSelectedFilter = (state: RootState) =>
  state.filter.selectedFilterType;
export const getFilterTypes = (state: RootState) => state.filter.filterTypes;
export const getFilterValue = (state: RootState) =>
  state.filter.currentFilterValue;
