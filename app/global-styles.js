import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  html,
  body.fontLoaded {
    font-family: 'IBM Plex Sans', sans-serif;
    line-height: 1.5;
  }

  .commentEditor .lines2 .ql-editor {
    min-height: 40px;
  }
  .commentEditor .ql-editor {
    padding: 0;
    overflow: unset;
  }

  .commentEditor .ql-editor img {
    max-width: 100%;
    height: auto;
  }

  .commentEditor .ql-editor.ql-blank::before {
    font-family: 'IBM Plex Sans', sans-serif;
    font-style: normal;
    color: #acb2c1;
    font-size: 14px;
  }

  .quill-edit .ql-toolbar {
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }

  .ql-snow .ql-tooltip.ql-editing input[type=text] {
    width: calc(100% - 105px) !important;
    max-width: unset !important;
    height: 32px;
  }

  .ql-snow .ql-color-picker .ql-picker-label, .ql-snow .ql-icon-picker .ql-picker-label {
    padding: 0 4px;
  }

  .ql-snow .ql-tooltip a.ql-preview {
    width: calc(100% - 155px) !important;
    max-width: unset !important;
  }

  .ql-snow .ql-tooltip::before {
      content: "URL:" !important;
  }
  .ql-snow .ql-background {
    margin-top: -3px;
  }

  .ql-snow .ql-tooltip {
    width: 100%;
    left: -6px !important;
  }

  .ql-snow .ql-tooltip a.ql-remove::before {
    content: 'X' !impxxortant;
  }

  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: 'Url:' !important;
  }


  .quill-edit .ql-editor {
    min-height: 122px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #fbfcfd;
    box-shadow: inset 0 0 5px 0 #e3e9ef;
    border: solid 1px #e3e9ef;
    word-break: break-word;
  }

  .ql-container {
    font-family: 'IBM Plex Sans',sans-serif !important;
    font-size: 14px !important;
  }

  .quill-edit .ql-container {
    font-size: 16px;
  }

  .quill-edit .ql-container.ql-snow {
    border: 0px;
  }

  .quill-edit .ql-toolbar.ql-snow {
    padding: 8px;
    background: #FFFFFF;
    border: 1px solid #e3e9ef;
    border-bottom: none;
    font-size: 15px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .ql-toolbar.ql-snow .ql-formats {
    margin-right: 24px;
    margin-bottom: 8px !important;
  }

  .ql-snow.ql-toolbar button,
  .ql-snow .ql-toolbar button {
    font-size: 20px;
    padding: 0;
    margin: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
  }

  .ql-snow .ql-editor h1 {
    font-size: 36px;
  }

  .ql-snow .ql-editor h2 {
    font-size: 30px;
  }

  .ql-snow .ql-editor h3 {
    font-size: 24px;
  }

  .ql-snow.ql-toolbar button + button,
  .ql-snow .ql-toolbar button + button {
    margin-left: 8px;
  }

  .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: #1F273D;
    outline: none;
  }

  .quill-edit .ql-snow .ql-picker {
    font-weight: normal;
  }

  .quill-read .ql-container.ql-snow {
    border: 0px solid #EDF2F4;
  }

  .quill-read .ql-container {
    font-size: 14px;
  }

  .quill-read .ql-editor {
    font-size: 14px;
    padding: 0;
    word-break: break-word;
  }

  .ql-editor {
      word-break: break-word;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }

  .rrui__input-field {
    position: relative;
    margin: 0;
    height: 1.5em;
    box-sizing: content-box;
  }

  .react-phone-number-input__row {
    padding: 8px;
  }

  .react-phone-number-input__icon-image {
    margin-top: -10px;
    flex: 1;
  }

  .react-phone-number-input__icon {
    border: none;
    display: flex;
    align-items: flex-end;
  }

  .react-phone-number-input__icon svg {
    margin-top: -10px;
    flex: 1;
  }

  .react-phone-number-input__row:before {
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    content: "";
    position: absolute;
    transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    pointer-events: none;
    background-color: rgb(212, 212, 212);
  }

  .intercom-note-frame, .intercom-launcher-frame, .intercom-badge-frame {
    z-index: 9 !important;
  }

  .react-phone-number-input__row:after {
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    content: "";
    position: absolute;
    transform: scaleX(0);
    transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    pointer-events: none;
    background-color: rgb(112, 151, 235);
  }

  .react-phone-number-input__row:hover:before {
    height: 2px;
    background-color: rgb(175, 175, 175);
  }

  .rrui__input-field,
  .rrui__input-field:hover,
  .rrui__input-field:active,
  .rrui__input-field:focus {
    border-bottom: none;
  }

  .rrui__select__selected-label {
    overflow: unset;
  }

  .rrui__select__selected-content {
    position: relative;
    margin-top: -12px;
    height: 1.5em;
    padding: 8px 0;
    box-sizing: content-box;
  }

  .rrui__input-error {
    margin-top: calc(0.3rem);
    color: #D30F00;
    margin-left: 8px;
  }

  .react-phone-number-input__error .rrui__input-error{
    color: #f44336;
    margin: 0;
    font-size: 12px;
    text-align: left;
    margin-top: 8px;
    min-height: 1em;
    font-family: 'IBM Plex Sans',sans-serif;
    line-height: 1em;
    font-weight: 400;
    margin-bottom: 2px;
  }

  .rrui__select__button {
    border-bottom: none;
  }

  .ql-snow .ql-stroke {
  }

  .ql-toolbar.ql-snow .ql-picker-label {
    border: none;
  }

  .ql-toolbar.ql-snow .ql-picker-label:focus {
    outline: none;
  }

  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    border: 1px solid #E3E9EF;
    border-radius: 4px;
    box-shadow: #E3E9EF 0 0 10px 0;
    padding: 8px 16px;
  }

  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border: none;
  }

  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label:focus {
    outline: none;
  }

  .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
  }

  .ql-snow.ql-toolbar button:hover .ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-fill,
  .ql-snow .ql-toolbar button:focus .ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: #1F273D;
  }

  .ql-snow.ql-toolbar button:hover .ql-stroke,
  .ql-snow .ql-toolbar button:hover .ql-stroke,
  .ql-snow.ql-toolbar button:focus .ql-stroke,
  .ql-snow .ql-toolbar button:focus .ql-stroke,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
  .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: #1F273D;
  }
  .ql-editor ol, .ql-editor ul {
    padding-left: 0 !important;
  }
  .StripeElement {
     border: 0 solid #000;
     border-bottom: 1px solid #ddd;
     border-radius: 0;
     padding: 8px 0;
  }
  .StripeElement--focus {
    outline: 0;
    border-bottom: 1px solid #777;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes popperFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes slideDown {
    0% {
      opacity: 0.5;
      transform: translateY(-12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes slideUp {
    0% {
      opacity: 0.5;
      transform: translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes blinking{
    0%{     opacity: 1;    }
    49%{    opacity: 1; }
    60%{    opacity: 0; }
    99%{    opacity: 0;  }
    100%{   opacity: 1;    }
  }
  .j-text-ellipsis {
    display: -webkit-box;
    overflow: hidden;
    word-break: break-all;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .j-text-ellipsis2 {
    display: -webkit-box;
    overflow: hidden;
    word-break: break-word;
    white-space: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  @keyframes pulsate1{0%{transform:scale(.1,.1);opacity:0}50%{opacity:1}100%{transform:scale(1.2,1.2);opacity:0}}

  .intercom-lightweight-app, .intercom-launcher {
    z-index: 100000 !important,
  }
`;

export default GlobalStyle;
