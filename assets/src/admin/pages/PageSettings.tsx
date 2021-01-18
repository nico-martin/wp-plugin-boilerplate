import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControls,
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
  const [settings, saveSettings] = useSettings();
  const [error, setError] = React.useState<string>('');

  const form = useForm({
    defaultValues: {
      myString: settings.myString,
      myStringArea: settings.myStringArea,
      mySelectValue: settings.mySelectValue,
      myCheckox: settings.myCheckox,
      myRadio: settings.myRadio,
      myImages: settings.myImages,
    },
  });

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
      <FormFeedback message="<p>Hallo Welt</p>" />

      <InputText
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
      />
      <InputTextarea form={form} name="myStringArea" label="Description" />
      <InputSelect
        form={form}
        name="mySelectValue"
        label="Color"
        optionProps={(color) => ({ style: { color } })}
        options={{
          green: 'Green',
          red: 'Red',
          blue: 'Blue',
        }}
      />
      <InputCheckbox
        form={form}
        name="myCheckox"
        label="Check this"
        rules={{
          required: 'This value is required',
        }}
      />
      <InputRadio
        form={form}
        name="myRadio"
        label="Radio Box"
        options={{
          hallo: 'Welt',
          foo: 'Foo',
          bar: 'Bar',
        }}
        rules={{
          required: 'This value is required',
        }}
      />
      <InputUpload
        form={form}
        name="myImages"
        label="Image (max. 2)"
        count={2}
      />
      {error !== '' && (
        <FormFeedback type={NOTICE_TYPES.ERROR} message={error} />
      )}
      <FormControls type="submit" disabled={loading} />
    </Form>
  );
};

export default PageSettings;
