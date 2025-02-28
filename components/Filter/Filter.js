"use client";
import { useState, useEffect } from "react";
import { Slider } from "@mui/material";

import { useRouter } from "next/navigation";
import classes from "./Filter.module.css";
import Link from "next/link";
const Filter = ({
  filter,
  selectedFilters,
  setSelectedFilters,
  categoryData,
  changeFilters,
  setChangeFilters,
  setTempSelectedFilters,
  tempSelectedFilters,
}) => {
  const changeHandler = (data) => {
    let tmp = [...tempSelectedFilters];
    const filtered = tmp.filter((item) => item.column === data.column);
    if (data.value.selected.length === 0) {
      if (filtered.length > 0) {
        const index = tmp.indexOf(filtered[0]);
        tmp.splice(index, 1);
      }
    } else {
      if (filtered.length > 0) {
        tmp = tmp.map((item) => (item.column === data.column ? data : item));
      } else {
        tmp.push(data);
      }
    }
    setChangeFilters(true);
    setTempSelectedFilters([...tmp]);
    setChangeFilters(true);
    // setSelectedFilters([...tmp]);
  };

  let selected = tempSelectedFilters.filter(
    (item) => item.column === filter.key
  )[0];
  selected = selected ? selected.value.selected : [];

  switch (filter.type) {
    case "range":
      return (
        <FilterRange
          filter={filter}
          onChange={changeHandler}
          selected={selected}
        />
      );
    case "in":
      return (
        <FilterIn
          filter={filter}
          onChange={changeHandler}
          selected={selected}
        />
      );
    case "within_tree":
      return <FilterWithinTree filter={filter} />;
  }
};

export default Filter;

const FilterIn = ({
  filter,
  onChange = () => {},
  selected,
  changeFilterOptions,
}) => {
  const [filterNumber, setFilterNumber] = useState(3);
  const numFiltersLoaded = Math.min(filterNumber, filter?.params?.items.length);
  const allFiltersLoaded = numFiltersLoaded === filter?.params?.items.length;
  const handleFilterNumber = () => {
    setFilterNumber(filterNumber + 3);
  };
  const checkedChanged = ({ target }) => {
    if (target.checked) {
      if (!selected.includes(target.value)) {
        const tmp = [...selected, target.value];

        onChange({
          column: filter?.params?.use_field
            ? filter[filter?.params?.use_field]
            : filter.key,
          value: { selected: tmp },
        });
      }
    } else {
      const tmp = [...selected];
      var index = tmp.indexOf(target.value);
      if (index !== -1) {
        tmp.splice(index, 1);
      }

      onChange({
        column: filter.key,
        value: { selected: tmp },
      });
    }
  };
  return (
    <>
      {(filter?.params?.items ?? []).map((item) => (
        <>
          <div
            key={item.id}
            className="mt-2 flex flex-row items-center gap-2 pl-4 text-[0.775rem]"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded-sm bg-croonus-1  text-croonus-3 focus:ring-0"
              name={item.label}
              checked={selected.includes(
                filter?.params?.use_field
                  ? item[filter?.params?.use_field]
                  : item.key
              )}
              onChange={checkedChanged}
              value={
                filter?.params?.use_field
                  ? item[filter?.params?.use_field]
                  : item.key
              }
              id={"chbx-" + item.id}
            />
            <label
              className="text-[0.875rem] leading-[1.625rem]"
              htmlFor={"chbx-" + item.id}
            >
              {item.label}
            </label>
          </div>
        </>
      ))}
    </>
  );
};

const FilterRange = ({ filter, onChange, selected }) => {
  const [selectedValue, setSelectedValue] = useState(
    selected.length === 2
      ? selected
      : [Number(filter.params.min), Number(filter.params.max)]
  );
  const onRangeChange = (data, value) => {
    onChange({
      column: filter?.params?.use_field
        ? filter[filter?.params?.use_field]
        : filter.key,
      value: { selected: value },
    });
  };

  useEffect(() => {
    if (selected.length !== 2)
      setSelectedValue([Number(filter.params.min), Number(filter.params.max)]);
  }, [selected, filter.params]);

  return (
    <>
      <div className={`mt-5 w-[85%] mx-auto`}>
        <Slider
          sx={{
            width: "100%",
            "& .MuiSlider-thumb": {
              color: "black",
            },
            "& .MuiSlider-track": {
              color: "black",
            },
            "& .MuiSlider-rail": {
              color: "black",
            },
            "& .MuiSlider-active": {
              color: "black",
            },
          }}
          value={selectedValue}
          onChange={(e) => {
            setSelectedValue(e.target.value);
          }}
          onChangeCommitted={onRangeChange}
          valueLabelDisplay="auto"
          min={Number(filter.params.min)}
          max={Number(filter.params.max)}
        />
      </div>
      <div className={`${classes.valueHolder} max-md:text-center`}>
        <span>od: {selectedValue[0]}</span>
        <span> do: {selectedValue[1]}</span>
      </div>
    </>
  );
};

const FilterWithinTree = ({ filter }) => {
  const router = useRouter();

  return (
    <>
      {(filter?.params?.items ?? []).map((item) => (
        <>
          <div
            key={item.id}
            className="mt-2 flex flex-row items-center gap-2 pl-4 text-[0.775rem]"
          >
            <Link
              className="text-[0.875rem] leading-[1.625rem]"
              htmlFor={"chbx-" + item.id}
              href={`/${item?.link?.link_path}`}
            >
              {item.label}
            </Link>
          </div>
        </>
      ))}
    </>
  );
};
