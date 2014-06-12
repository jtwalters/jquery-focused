/*
 *  jQuery Focused - v0.0.1
 *  Simplify pages by focusing in on relevant items. Use values of things, e.g. select elements, to hide irrelevant items.
 *  https://github.com/jtwalters/jquery-focused
 *
 *  Made by Joel Walters
 *  Under MIT License
 */
;(function ($, window, document, undefined) {

  // Create the defaults once
  var pluginName = 'focused',
      defaults = {
        dataAttr: 'focus',
        changeSelector: 'select[name=focus]',
        value: null,
        afterUpdate: function focusAfterUpdate() {
          $('.focus-wrapper:visible').hide().fadeIn(400);
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
      var initialValue = $(this.options.changeSelector).val();

      // Handle initial value
      this._update(initialValue);

      // Bind event handler to change event
      $(this.options.changeSelector).change(this.changeHandler);
    },

    _changeHandler: function focusChangeHandler(e) {
      var value = e.target.value;

      // If value option is a function, call it, passing the currently selected value
      if (typeof this.options.value === 'function') {
        value = this.options.value.call(this.element, value);
      }

      // Hide elements with any dataAttr attribute
      $(this.element).find('[data-' + this.options.dataAttr + ']').hide();

      // Show elements with specific dataAttr value
      $(this.element).find('[data-' + this.options.dataAttr + '="' + value + '"]').show();

      // Call afterUpdate option, if it's a function
      if (typeof this.options.transition === 'function') {
        this.options.afterUpdate.call(this.element, this.settings);
      }
    }
  });

  $.fn[pluginName] = function (options) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
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

})(jQuery, window, document);
