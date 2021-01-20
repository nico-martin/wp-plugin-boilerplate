import React from 'react';

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
import { Settings } from '../utils/types';
import { withSettingsForm } from '../utils/settings';

const PageSettings = ({
  form,
  saveSettings,
}: {
  form: any;
  saveSettings: () => Promise<Settings>;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  return (
    <Form
      onSubmit={form.handleSubmit((data) => {
        setLoading(true);
        setError('');
        saveSettings()
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

export default withSettingsForm([
  'myString',
  'myStringArea',
  'mySelectValue',
  'myCheckox',
  'myRadio',
  'myImages',
])(PageSettings);
