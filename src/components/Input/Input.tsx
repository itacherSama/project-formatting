import { Input as InputMU } from '@material-ui/core';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

type Props = {
  onChange: any;
  name: string;
  currentValue: number | null;
};

const Input = ({ currentValue, name, onChange }: Props) => {
  const [value, setValue] = useState<null | number>(currentValue);

  useEffect(() => {
    if (currentValue !== value) {
      setValue(currentValue);
    }
  }, [currentValue]);

  useEffect(() => {
    if (currentValue !== value) {
      onChange({ [name]: value });
    }
  }, [value]);

  const onSetValue = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const transformValue = parseInt(value, 10);
    if (transformValue < 0) {
      return;
    }
    setValue(transformValue);
  }, []);

  return <InputMU name={name} type="number" value={value} onChange={onSetValue} />;
};

export default Input;
