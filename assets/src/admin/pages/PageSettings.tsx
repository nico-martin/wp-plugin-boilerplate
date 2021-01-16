import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControls,
  InputCheckbox,
  InputRadio,
  InputSelect,
  InputText,
  InputTextarea,
  InputUpload,
} from '../theme';
import { useSettings } from '../utils/settings';

const PageSettings = () => {
  const [settings, saveSettings] = useSettings();

  const form = useForm({
    defaultValues: {
      myString: settings.data.myString,
      myStringArea: settings.data.myStringArea,
      mySelectValue: settings.data.mySelectValue,
      myCheckox: settings.data.myCheckox,
      myRadio: settings.data.myRadio,
      myImages: settings.data.myImages,
    },
  });

  return (
    <Form
      onSubmit={form.handleSubmit((data) => {
        saveSettings(data);
      })}
    >
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
      <FormControls type="submit" disabled={settings.loading} />
    </Form>
  );
};

export default PageSettings;
