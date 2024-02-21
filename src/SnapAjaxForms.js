/**
 * SnapAjaxForms.js
 *
 * Instantly turn html form elements into ajax forms by just adding an attribute.
 * 
 * @author Nick Adams
 * @see {@link https://github.com/nickolasjadams/snap-ajax-forms|Repository}
 * @license MIT
 * @version 1.0.1
 */

class SnapAjaxForms {
    
    constructor(options) {
        this.selector = "form[data-ajax]";
        this.submitDisabledDuration = 1500;
        this.recaptcha = {
            version: "v3"
        };
        this.onDone = "";
        this.onFail = "";
        this.onAlways = "";
        this.onBeforeSend = "";
        if (options) {
            if (options.selector) {
                this.selector = options.selector;
            }
            if (options.submitDisabledDuration) {
                this.submitDisabledDuration = options.submitDisabledDuration;
            }
            if (options.recaptcha) {
                this.recaptcha = { ...this.recaptcha, ...options.recaptcha };
                if (parseInt(this.recaptcha.version)) {
                    this.recaptcha.version = "v" + this.recaptcha.version;
                } else {
                    this.recaptcha.version = this.recaptcha.version.toLowerCase();
                }
                if (this.recaptcha.version !== "v3") {
                    console.warn("Only reCAPTCHA v3 is supported at this time.");
                }
                if (!this.recaptcha.siteKey) {
                    console.warn("reCAPTCHA siteKey must be set.")
                }

            }
        }
        this.forms = document.querySelectorAll(this.selector);
        this.addFormEventListeners();
    }

    addFormEventListeners() {
        let _this = this;
        this.forms.forEach(function (form) {
            form.addEventListener("submit", function(e) {
                e.preventDefault();

                let form, data, submitter;
                [form, data, submitter] = _this.prepFormData(this, e);

                //console.log(data);

                if (form.dataset['ajaxRecaptcha'] === '') {
                    if (typeof window['grecaptcha'] === "undefined") {
                        console.warn("reCAPTCHA objects couldn't be found. Have the scripts been loaded?");
                    } else {
                        window['grecaptcha'].ready(function() {
                            window['grecaptcha'].execute(_this.recaptcha.siteKey, {action: 'submit'}).then(function(token) {
                                data['recaptcha_token'] = token;
                                _this.sendXhrRequest(form, data, submitter);
                            });
                        });
                    }
                } else {
                    _this.sendXhrRequest(form, data, submitter);
                }

            }, false)
        })
    }

    prepFormData(form, submissionEvent) {
        this.onDone = window[form.getAttribute('data-ajax-done')];
        this.onFail = window[form.getAttribute('data-ajax-fail')];
        this.onAlways = window[form.getAttribute('data-ajax-always')];
        this.onBeforeSend = window[form.getAttribute('data-ajax-before-send')];
        let submitter = submissionEvent.submitter;
        let formData = new FormData(form, submitter);
        if (submitter) {
            submitter.disabled = "disabled";
        }

        let data = {};
        for (const [key, value] of formData) {
            let formElements = document.querySelectorAll("[name='" + key + "']");
            if (formElements.length > 1) { // multiple elements with the same 'name' attribute
                let isSubmissionElement = (formElements[0].tagName === "INPUT" && formElements[0].type === "submit") || (formElements[0].tagName === "BUTTON" && formElements[0].type !== "button");
                let isRadioElement = formElements[0].tagName === "INPUT" && formElements[0].type === "radio";
                if (isSubmissionElement) { // Make scalar because only one element can submit the form
                    data[key] = formData.get(key)
                } else if (isRadioElement) { // Make scalar because only one item is selected
                    data[key] = formData.get(key)
                } else { // Make an array because this is assumed to be checkboxes
                    data[key] = formData.getAll(key)
                }
            } else {
                let isMultipleSelect = formElements[0].tagName === "SELECT" && formElements[0].attributes["multiple"]
                let isMultipleFiles = formElements[0].tagName === "INPUT" && formElements[0].attributes["multiple"]
                if (isMultipleSelect) { // Make an array because multiple values are assumed available
                    data[key] = formData.getAll(key)
                } else if (isMultipleFiles) {
                    data[key] = formData.getAll(key)
                } else {
                    data[key] = formData.get(key)
                }
            }
        }
        return [ form, data, submitter ];
    }

    sendXhrRequest(form, data, submitter) {
        let _this = this;
        $.ajax({
            url: form.action,
            method: form.method,
            data: data,
            processData: false, // don't transform FormData object to string
            contentType: false, // don't transform FormData object to string
            beforeSend: () => {
                if (submitter) {
                    setTimeout(() => {
                        submitter.removeAttribute("disabled");
                    }, _this.submitDisabledDuration);
                    if (typeof _this.onBeforeSend === "function") _this.onBeforeSend();
                }
            }
        })
            .fail(function(data) {
                if (data.responseJSON || data.errors) {
                    let errors
                    if (data.responseJSON) {
                        if (data.responseJSON.errors) {
                            errors = data.responseJSON.errors;
                        }
                    }  else if (data.errors) {
                        errors = data.errors;
                    }
                    form.querySelectorAll("[data-ajax-errors]").forEach(function(errorElement) {
                        errorElement.innerHTML = "";
                    });
                    if (errors) {
                        Object.entries(errors).forEach(function(entry) {
                            let key = entry[0];
                            let messages = entry[1]['messages'];
                            let errorElement = form.querySelector(`[data-ajax-errors="${key}"]`);
                            if (errorElement) {
                                messages.forEach(function(message) {
                                    errorElement.insertAdjacentHTML("afterbegin", `<div>${message}</div>`)
                                });
                            }
                        });
                    }
                }
                if (typeof _this.onFail === "function") _this.onFail(data);
            })
            .done(function(data) {
                form.reset();
                document.querySelectorAll("[data-ajax-errors]").forEach(function(element) {
                    element.innerHTML = "";
                });
                if (typeof _this.onDone === "function") _this.onDone(data);
                if (form.id) {
                    // Make the id kebab-case
                    let id = form.id.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase();
                    form.dispatchEvent(new CustomEvent(id + "-submit"), { detail: data });
                }
            })
            .always(function(data) {
                if (typeof _this.onAlways === "function") _this.onAlways(data);
            });
    }

}