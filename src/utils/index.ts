import { useEffect, useState } from 'react';

export const isFalse = (value: any) => {
  return value === 0 ? false : !value;
};

// 去除对象中的空值
export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach(key => {
    const value = result[key];
    if (isFalse(value)) {
      delete result[key];
    }
  });
  return result;
};

// 防抖
export const useDebounce = <T>(value: T, delay: number = 1000): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedValue;
};
