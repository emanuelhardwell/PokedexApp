import {useEffect, useState} from 'react';

export const useDebouncedValue = (value: string = '', timeMS: number = 500) => {
  const [debuncedValue, setDebuncedValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebuncedValue(value);
    }, timeMS);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value]);

  return debuncedValue;
};
