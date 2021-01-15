import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Form,
  InputCheckbox,
  InputRadio,
  InputSelect,
  InputText,
  InputTextarea,
  InputUpload,
} from '../theme';

const PageSettings = () => {
  const form = useForm({
    defaultValues: {
      FirstName: 'nico@sayhello.ch',
      desc: '',
      'the-select': 'foo',
      agree: 'yes',
      theradio: 'foo',
      image: '5,8',
    },
  });
  return (
    <Form onSubmit={form.handleSubmit((data) => console.log('DATA', data))}>
      <InputText
        form={form}
        name="FirstName"
        label="First Name"
        rules={{
          required: 'This value is required',
          pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'This needs to be a valid Email adress',
          },
        }}
      />
      <InputTextarea form={form} name="desc" label="Description" />
      <InputSelect
        form={form}
        name="the-select"
        label="Select Box"
        optionProps={(value) => ({ theValue: value })}
        options={{
          hallo: 'Welt',
          foo: 'Bar',
        }}
      />
      <InputCheckbox
        form={form}
        name="agree"
        label="Agree?"
        rules={{
          required: 'This value is required',
        }}
      />
      <InputRadio
        form={form}
        name="theradio"
        label="Select Box"
        optionProps={(value) => ({ theValue: value })}
        options={{
          hallo: 'Welt',
          foo: 'Foo',
          bar: 'Bar',
        }}
        rules={{
          required: 'This value is required',
        }}
      />
      <InputUpload form={form} name="image" label="Image" count={6} />
      <Button type="submit">submit</Button>
    </Form>
  );
};

export default PageSettings;
