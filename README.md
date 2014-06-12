# jQuery Focused

## Usage

1. Include jQuery:

  ```html
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
  ```

2. Include plugin's code:

  ```html
  <script src="dist/jquery.focused.min.js"></script>
  ```

3. Call the plugin:

  ```javascript
  $('#content').focused({
    // attr: {string} attribute to use as selector
    attr: 'data-focus',

    // changeElement: {jQuery object or selector} to bind the change event handler to
    changeElement: 'select[name=focus]',

    // bindChange: {boolean} whether we should update on change event (if false, only updates on initialization)
    bindChange: true,

    // value: (optional) {function} to modify the value before using it
    value: null,

    // afterUpdate: (optional) {function} to run after the value has changed
    afterUpdate: function focusTransition() {
      $('.focus-wrapper:visible').hide().fadeIn(400)
    }
  });
  ```

## Contributing

Check [CONTRIBUTING.md](https://github.com/jquery-boilerplate/boilerplate/blob/master/CONTRIBUTING.md) for more information.

## License

[MIT License](http://joelwalters.mit-license.org/) © Joel Walters
