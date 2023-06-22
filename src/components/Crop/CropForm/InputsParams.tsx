import React from 'react';
import { ICropFormData } from 'interfaces/interfaces';
import Input from '../../Input/Input';

type Props = {
  onSetValue: (data: any) => void;
  crop: ICropFormData;
};

const InputsParam = ({ onSetValue, crop }: Props) => {
  return (
    <>
      <Input currentValue={crop?.width} name="width" onChange={onSetValue} />
      <Input currentValue={crop?.height} name="height" onChange={onSetValue} />
    </>
  );
};

export default InputsParam;
