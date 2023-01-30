/**
 * Created by quando on 17/3/17.
 */
import makeAsyncScriptLoader from 'react-async-script';
import Captcha from './recaptcha';

const callbackName = 'onloadcallback';
const URL = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;

const globalName = 'grecaptcha';
export default makeAsyncScriptLoader(Captcha, URL, {
  callbackName,
  globalName,
  exposeFuncs: ['getValue', 'reset', 'execute'],
});
