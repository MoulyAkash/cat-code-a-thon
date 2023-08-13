import { useState, useEffect } from "react";

// interface definitions
export type FilterType = string | number | boolean;

export interface FilterProps {
  [key: string]: FilterType[];
}

export const equalsIgnoreCase = (str1: string, str2: string) => {
  return str1.toString().toUpperCase() === str2.toString().toUpperCase();
};

export function isObject(objValue: any) {
  return (
    objValue && typeof objValue === "object" && objValue.constructor === Object
  );
}

export function toUpper(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substr(1))
    .join(" ");
}

export function formatDateToString(date: Date): string {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const generateFilterOptions = (data: any, filterKeys: string[]) => {
  if (!data) return {};
  let filterOptions: FilterProps = {};
  for (let key of filterKeys) {
    filterOptions[key] = data
      ?.map((item: any) => item[key])
      .filter(
        (name: FilterType, index: number, currentVal: FilterType[]) =>
          currentVal.indexOf(name) === index
      );
  }
  return filterOptions;
};

export const generateColumnFilterOptions = (columnNames: string[]) => {
  let obj: FilterProps = {};
  obj["Columns"] = columnNames;
  return obj;
};

export const initializeFilters = (filterOptions: FilterProps) => {
  let obj: FilterProps = {};
  Object.keys(filterOptions).map((key) => (obj[key] = []));
  return obj;
};

export const initializeColumnFilters = (initialColumnFilters: any) => {
  let obj: FilterProps = {};
  obj["Columns"] = initialColumnFilters ? initialColumnFilters : [];
  return obj;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password: string) => {
  return String(password).match(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  );
};

export const validateAlphabet = (value: string) => {
  return String(value).match(/^[a-zA-Z][a-zA-Z0-9 ]+/);
};

interface RenderIconProps {
  iconName: string;
  className?: string;
  style?: {};
}

export const RenderIcon = ({ iconName, className, style }: RenderIconProps) => {
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        const image = await import(`../assets/icons/${iconName}.png`);
        if (isMounted) {
          setCurrentImage(image.default);
        }
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [iconName]);

  return <img src={currentImage} alt="" className={className} style={style} />;
};

export const isExcelTime = (num: any) =>
  typeof num === "number" && num % 1 !== 0 && num >= 0 && num < 0.99999999;

export function parseExcelTime(timeDecimal: number): any {
  if (isExcelTime(timeDecimal)) {
    const hours = Math.floor(timeDecimal * 24);
    const minutes = Math.floor((timeDecimal * 24 * 60) % 60);
    const seconds = Math.floor((timeDecimal * 24 * 60 * 60) % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else return timeDecimal;
}

export const parseExcelData = (data: any[]) => {
  let keys = Object.keys(data[0]);
  for (let item of data)
    for (let key of keys)
      if (typeof item[key] === "boolean") item[key] = item[key] ? "Yes" : "No";
      else if (isExcelTime(item[key])) item[key] = parseExcelTime(item[key]);
      else if (typeof item[key] === "number") item[key] = item[key].toString();

  return [...data];
};
