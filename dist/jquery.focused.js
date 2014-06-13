/*
 *  jQuery Focused - v0.1.2
 *  Simplify pages by focusing in on relevant items, based on values of elements (e.g. select, input, textarea).
 *  http://jtwalters.github.io/jquery-focused/
 *
 *  Made by Joel Walters
 *  Under MIT License
 */
;(function ($, window, document, undefined) {

  // Create the defaults once
  var pluginName = 'focused',
      defaults = {
        attr: 'data-focus',
        changeElement: 'select[name=focus]',
        bindChange: true,
        value: null,
        afterUpdate: function focusAfterUpdate() {
          $(this).hide().fadeIn(400);
        },
      };

  // The actual plugin constructor
  function Plugin (element, options) {
    this.element = element;
    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function focusInit() {
      // Place initialization logic here
      // Element and settings are accessible at:
      //   this.element
      //   this.settings
      var initialValue = $(this.options.changeElement).val();

      // Handle initial value
      this._update(initialValue);

      if (this.options.bindChange) {
        // Bind event handler to change event
        $(this.options.changeElement).change(this._changeHandler.bind(this));
      }
    },

    _changeHandler: function focusChangeHandler(e) {
      this._update(e.target.value);
    },

    _value: function focusValue(value) {
      // If value option is a function, call it, passing the currently selected value
      if (typeof this.options.value === 'function') {
        value = this.options.value.call(this.element, value);
      }

      return value;
    },

    _update: function focusUpdate(value) {
      // Hide elements with any attr attribute
      $(this.element).find('[' + this.options.attr + ']').hide();

      // Show elements with specific attr value
      $(this.element).find('[' + this.options.attr + '="' + this._value(value) + '"]').show();

      // Call afterUpdate option, if it's a function
      if (typeof this.options.afterUpdate === 'function') {
        this.options.afterUpdate.call(this.element, this.settings);
      }
    }
  });

  $.fn[pluginName] = function (options) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        $.data(this, 'plugin_' + pluginName + '_' + this.count++, new Plugin(this, options));
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance instanceof Plugin && typeof instance[options] === 'function') {
          instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
        if (options === 'destroy') {
          $.data(this, 'plugin_' + pluginName, null);
        }
      });
    }
  };

  $[pluginName] = function () {
    var $body = $('body');
    return $body[pluginName].apply($body, Array.prototype.slice.call(arguments, 0));
  };

})(jQuery, window, document);
