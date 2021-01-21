# Plugin Boilerplate

This is a WordPress Plugin Boilerplate that focuses on a easy to use admin interface for settings.

## Ok cool.. But why?

Because WordPress ist great, being able to make it even better by creating plugins is great, but let's be honest. **
Creating admin screens sucks!**

So I fixed it. You're welcome.

**Is it over engineered?**  
Yes, totally!

**Do I care?**  
No

## Demo

![WP Plugin Boilerplate](https://uploads.nico.dev/wp-plugin-boilerplate.png)

There is also a short Demo on YouTube:  
https://youtu.be/rsOc4fRvfB8

## How to register a setting

To register a setting you need to add it to you `PREFIX_register_settings` filter:

```php
add_filter( 'PREFIX_register_settings', function($settings) {

  $settings['myString'] = [
    'default'  => 'default value',
    'validate' => function($value) {
      if( $isValid ) {
        return '';
      }
      return 'Serverside validation for "myString" falied';
    },
  ];
  
  return $settings;
} );
```

Calling `PREFIX_get_instance()->settings->get_single_setting('myString');` will now return `default value` or the actual
value saved to the database.

## How to create an admin page

By default, the boilerplate will generate
an [admin menu entry](https://github.com/nico-martin/wp-plugin-boilerplate/blob/main/src/class-adminpage.php).  
This will only render an empty `div`. JavaScript takes over from here on.

Inside `assets/src/admin/` we have a React application that renders the actual content.  
It comes with some handy, WordPress like UI elements, a very rudimentary router and a easy to use abstraction of
react-hooks-form, connected to the settings we registered in our PHP.

## Modules

### Router

https://github.com/nico-martin/wp-plugin-boilerplate/blob/main/assets/src/admin/utils/router.tsx

It comes with a very simple URL-hash-based "router".  
You can use `useLocation` as a hook that returns the current hash, a `Link` component that will update the hash and
a `Route` component that will only render it's child component if the current hash matches the given `page` property.

### Translated Strings

https://github.com/nico-martin/wp-plugin-boilerplate/blob/main/assets/src/admin/utils/i18n.tsx

If you need dynamic strings you can register them in PHP using the `PREFIX_translation_strings` filter.

```php
add_filter( 'PREFIX_translation_strings', function( $strings ) {
  $strings['my.new.string'] = __('My new string', 'PREFIX');
  $strings['my.new.placeholder'] = __('Welcome to {plugin}', 'PREFIX');
  return $strings;
} );
```

Those strings will be passed to the admin frontend, where you can just call `__('my.new.string')`, which will
render `'My new string'` or the translation if set.  
For variables you can use a key in curly brackets and then pass an object as the second argument of the `__` function:

```javascript
const myString = __('my.new.placeholder', {
  plugin: 'My Plugin',
})
console.log(myString); // logs "Welcome to My Plugin"
```

### Settings

https://github.com/nico-martin/wp-plugin-boilerplate/blob/main/assets/src/admin/utils/settings.tsx

The biggest part of the boilerplate is the settings module. It has basicly two tasks.

#### global state for settings

The `useSettings` hook accepts an array of setting keys and returns an object of the current settings for those
elements:

```JavaScript
const settings = useSettings(['myString']);
console.log(settings); // { myString: 'default value' }
```

#### [react-hook-form](https://react-hook-form.com/) wrapper

`useSettingsForm` is a hook that returns a react-hook-form instance together with a `submit` function and different form
states for `loading` and an `error`.

```JavaScript
const MyForm = () => {
  const {form, submit, error, loading} = useSettingsForm(['myString']);

  return (
    <Form onSubmit={submit}>
      <FormElement
        form={form} // the form instance
        name="myString" // the settings key
        label="My String" // a label
        rules={{ // react-hook-form validation rules
          required: 'This value is required',
          pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'This needs to be a valid Email adress',
          },
        }}
        Input={InputText} // an Input UI Component
      />
      {error !== '' && (
        <FormFeedback type={NOTICE_TYPES.ERROR} message={error}/>
      )}
      <FormControls type="submit" disabled={loading}/>
    </Form>
  );
}
```

This `useSettingsForm` will handle everything for you. It will call the settings API endpoint and it will sync the data
between php and the frontend app.

One other neat hook is the `useSettingsDiff`. It again accepts an array of setting keys and return wether there are
unsaved settings for those keys or not. Imagine you update one setting but did not yet click the save-button, this hook
will detect unsaved settings.

## UI Components

The boilerplate comes with a set of handy UI components that can be used to style your content and your form elements

https://github.com/nico-martin/wp-plugin-boilerplate/blob/main/assets/src/admin/theme/index.ts

## Contributors

* Nico Martin | [nicomartin.ch](https://www.nicomartin.ch) | [@nic_o_martin](https://twitter.com/nic_o_martin)

## License

Use this code freely, widely and for free. Provision of this code provides and implies no guarantee.

Please respect the GPL v3 licence, which is available
via [http://www.gnu.org/licenses/gpl-3.0.html](http://www.gnu.org/licenses/gpl-3.0.html)
