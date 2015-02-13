(function () {
    "use strict";

    var SkrivValidator = function (config) {
        this.config = config;
        $(document).on('blur', this.config.form + ' input,textarea', this.validate.bind(this));
        $(document).on('change', this.config.form + ' input', this.validate.bind(this));
        $(document).on('keyup', this.config.form + ' textarea', this.validate.bind(this));
    };

    $.extend(SkrivValidator.prototype, {
        validateAll: function () {
            var firstNonValidElement = true;
            $(document).find(this.config.form + ' input,textarea').each(function (index, element) {
                var wasValid = this.validate({currentTarget: element});
                if (!wasValid && firstNonValidElement) {
                    $(element).blur().focus();
                    firstNonValidElement = false;
                }
            }.bind(this));
        },
        validate: function (event) {
            var $el = $(event.currentTarget);
            if (event.type === 'keyup' && (event.keyCode === 9 || event.keyCode == 32)) {
                return;
            }
            if ($el.is('input[type=checkbox]')) {
                return this.validateCheckbox($el);
            } else if ($el.is('textarea')) {
                return this.validateTextArea($el);
            }
            return true;
        },
        validateCheckbox: function ($el) {
            if (!$el.prop('checked')) {
                $el.attr('aria-invalid', 'true');
                $el.attr('aria-describedBy', 'aria-error-' + $el.attr('id'));
                $el.next('label').addClass('validation-error');
                this.showErrorMessage(this.config.checkboxErrorMessage);
                return false;
            } else {
                $el.removeAttr('aria-invalid');
                $el.removeAttr('aria-describedBy');
                $el.next('label').removeClass('validation-error');
                this.hideErrorMessage(this.config.checkboxErrorMessage);
                return true;
            }
        },
        validateTextArea: function ($el) {
            if ($el.val().length === 0 || $el.val() === this.config.textareaPlaceholder || $el.val().length > this.config.maxLength) {
                $el.attr('aria-invalid', 'true');
                $el.attr('aria-describedBy', 'aria-error-' + $el.attr('id'));
                $el.addClass('validation-error')
                    .nextAll('label').addClass('validation-error');
                if ($el.val().length > this.config.maxLength) {
                    $el.nextAll('.tekst-feilmelding').show().text(this.config.textareaErrorMessageLength);
                } else {
                    $el.nextAll('.tekst-feilmelding').show().text(this.config.textareaErrorMessage);
                }
                this.showErrorMessage(this.config.textareaErrorMessage);
                return false;
            } else {
                $el.removeAttr('aria-invalid');
                $el.removeAttr('aria-describedBy');
                $el.removeClass('validation-error')
                    .nextAll('label').removeClass('validation-error');
                $el.nextAll('.tekst-feilmelding').hide();
                this.hideErrorMessage(this.config.textareaErrorMessage);
                return true;
            }
        },
        showErrorMessage: function (message) {

        },
        hideErrorMessage: function (message) {

        }
    });

    window.SkrivFormValidator = SkrivValidator;
})();