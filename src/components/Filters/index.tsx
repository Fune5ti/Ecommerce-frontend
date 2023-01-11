import React from "react";
import { Input, Radio, RadioChangeEvent } from "antd";
import { FilterType } from "../../app/features/filter/interfaces";

const { Search } = Input;

interface Props {
  type: FilterType;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: RadioChangeEvent) => void;
  radioCurrentValue?: string;
}
const options = [
  { label: "Brazilian Provider", value: "brazilian_provider" },
  { label: "European Provider", value: "european_provider" },
];
export default function FilterField({
  type,
  onSearch,
  onChange,
  radioCurrentValue,
}: Props) {
  if (type.value !== "suplier") {
    return (
      <Search
        placeholder={`Search for product ${type.label}`}
        allowClear
        onChange={onSearch}
      />
    );
  }
  return (
    <Radio.Group
      options={options}
      onChange={onChange}
      value={radioCurrentValue}
      optionType="button"
      buttonStyle="solid"
      defaultValue={options[0].value}
    />
  );
}
