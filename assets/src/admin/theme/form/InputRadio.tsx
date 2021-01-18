import React from 'react';

import cn from '../../utils/classnames';
import FormElement, { Input } from './FormElement';

import styles from './InputRadio.css';

const InputRadio = ({
  form,
  name,
  label,
  rules = {},
  options = {},
  optionProps = () => ({}),
}: {
  form: any;
  name: string;
  label: string;
  rules?: {};
  options: Record<string, string>;
  optionProps?: (value: string, label: string) => Record<string, any>;
}) => {
  const Input = ({ id, className, field, value }: Input) => (
    <div className={cn(className, 'input-radio')}>
      {Object.entries(options).map(([optionValue, optionLabel]) => (
        <div className={styles.element} key={optionValue}>
          <input
            type="radio"
            className={styles.input}
            id={`${id}-${optionValue}`}
            name={id}
            value={optionValue}
            checked={value === optionValue}
            onChange={(e) => field.onChange(optionValue)}
            {...optionProps(optionValue, optionLabel)}
          />
          <label className={styles.label} htmlFor={`${id}-${optionValue}`}>
            {optionLabel}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <FormElement
      form={form}
      Input={Input}
      label={label}
      name={name}
      rules={rules}
    />
  );
};

export default InputRadio;
