import React from 'react';

import { useController } from 'react-hook-form';
import { ControllerRenderProps } from 'react-hook-form/dist/types/props';

import styles from './FormElement.css';

export interface Input {
  field: ControllerRenderProps<{}>;
  value: string | boolean;
  id: string;
  className?: string;
}

const FormElement = ({
  form,
  Input,
  label,
  name,
  rules = {},
}: {
  form: any;
  Input: any;
  label: string;
  name: string;
  rules?: {};
}) => {
  const {
    field: { value = '', ...field },
  } = useController({
    control: form.control,
    name,
    rules,
  });

  const error = React.useMemo(() =>
    name in form.errors ? form.errors[name] : null
  );

  return (
    <tr className={styles.container}>
      <th scope="row">
        <label htmlFor={name}>{label}</label>
      </th>
      <td>
        <Input field={field} value={value} id={name} className={styles.input} />
        {error && <p>{error.message}</p>}
      </td>
    </tr>
  );
};

export default FormElement;
