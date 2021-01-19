import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControls,
  FormElement,
  FormFeedback,
  InputCheckbox,
  InputRadio,
  InputSelect,
  InputText,
  InputTextarea,
  InputUpload,
  NOTICE_TYPES,
} from '../theme';
import { useSettings } from '../utils/settings';

const PageSettings = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [settings, saveSettings] = useSettings([
    'myString',
    'myStringArea',
    'mySelectValue',
    'myCheckox',
    'myRadio',
    'myImages',
  ]);
  const [error, setError] = React.useState<string>('');

  const form = useForm({
    defaultValues: settings,
  });

  const values = form.watch();
  console.log('values', values);

  return (
    <Form
      onSubmit={form.handleSubmit((data) => {
        setLoading(true);
        setError('');
        saveSettings(data)
          .then((data) => {
            setLoading(false);
          })
          .catch((data) => {
            setError(data.message);
            setLoading(false);
          });
      })}
    >
      <FormElement
        form={form}
        name="myString"
        label="My Email"
        rules={{
          required: 'This value is required',
          pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'This needs to be a valid Email adress',
          },
        }}
        Input={InputText}
      />
      <FormElement
        form={form}
        name="myStringArea"
        label="Description"
        Input={InputTextarea}
      />
      <FormElement
        form={form}
        name="mySelectValue"
        label="Color"
        Input={InputSelect}
        optionProps={(color) => ({ style: { color } })}
        options={{
          green: 'Green',
          red: 'Red',
          blue: 'Blue',
        }}
      />
      <FormElement
        form={form}
        name="myCheckox"
        label="Check this"
        Input={InputCheckbox}
      />
      <FormElement
        form={form}
        name="myRadio"
        label="Radio Box"
        rules={{
          required: 'This value is required',
        }}
        Input={InputRadio}
        options={{
          hallo: 'Welt',
          foo: 'Foo',
          bar: 'Bar',
        }}
      />
      <FormElement
        form={form}
        name="myImages"
        label="Image (max. 2)"
        Input={InputUpload}
        count={4}
      />
      {error !== '' && (
        <FormFeedback type={NOTICE_TYPES.ERROR} message={error} />
      )}
      <FormControls type="submit" disabled={loading} />
    </Form>
  );
};

export default PageSettings;
