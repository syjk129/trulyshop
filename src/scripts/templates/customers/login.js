/**
 * Login Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

import $ from "jquery";

const selectors = {
  recoverPasswordLink: '#RecoverPassword',
  hideRecoverPasswordLink: '#HideRecoverPasswordLink',
};

function onShowHidePasswordForm(evt) {
  evt.preventDefault();
  toggleRecoverPasswordForm();
}

function checkUrlHash() {
  const hash = window.location.hash;

  // Allow deep linking to recover password form
  if (hash === '#recover') {
    toggleRecoverPasswordForm();
  }
}

function toggleRecoverPasswordForm() {
  $('#RecoverPasswordForm').toggleClass('hide');
  $('#CustomerLoginForm').toggleClass('hide');
}

if ($(selectors.recoverPasswordLink).length) {
  checkUrlHash();

  $(selectors.recoverPasswordLink).on('click', onShowHidePasswordForm);
  $(selectors.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);
}
