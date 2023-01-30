import { EMPTY_RTE, RTE_IMAGE_ACCEPT } from 'appConstants';
import React, { PureComponent } from 'react';
import { padFacadeURL } from 'utils/helpers/request';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { toolBarIndex } from 'utils/constant';
import { isEmptyString } from 'utils/stringAdditions';
import Attachment from 'smartComponents/Inputs/Attachments';
import CustomToolbar, { redo, undo } from './customToolBars/customToolBars';

const icons = ReactQuill.Quill.import('ui/icons');
icons.bold = '<i class="lnr-bold" />';
icons.italic = '<i class="lnr-italic" />';
icons.underline = '<i class="lnr-underline" />';
icons.list.ordered = '<i class="lnr-list2" />';
icons.list.bullet = '<i class="lnr-list" />';
icons.align[''] = '<i class="lnr-text-align-left" />';
icons.align.center = '<i class="lnr-text-align-center" />';
icons.align.right = '<i class="lnr-text-align-right" />';
icons.align.justify = '<i class="lnr-text-align-justify" />';
icons.indent['-1'] = '<i class="lnr-indent-decrease" />';
icons.indent['+1'] = '<i class="lnr-indent-increase" />';
icons.link = '<i class="lnr-link" />';
icons.clean = '<i class="lnr-text-format-remove" />';

export const stylesheet = {
  toolbarStyle: {
    backgroundColor: 'white !important',
    padding: '15px 10px 15px 0px !important',
    margin: '0px 25px !important',
    border: '0px solid #000 !important',
    borderBottom: '1px solid #EDF2F4 !important',
  },
  toolbarReadOnlyStyle: {
    padding: '0',
    margin: '0',
    display: 'none',
  },
  wrapperReadOnlyStyle: {
    border: '0px solid #EDF2F4',
    '& .ql-editor': {
      overflowY: 'unset',
    },
  },
  editorStyle: {
    marginTop: '10px',
    backgroundColor: 'white',
    padding: '0px 15px 10px',
    '& .DraftEditor-root': {
      height: '190px',
    },
    '& .public-DraftStyleDefault-block': {
      margin: 0,
    },
  },
  editorReadOnlyStyle: {
    marginTop: '10px',
    backgroundColor: 'white',
    padding: '0px 0px 10px',
    '& .public-DraftStyleDefault-block': {
      margin: 0,
    },
  },
  toolbarsBox: {
    border: '0px solid #fff !important',
    padding: '5px !important',
    '&:hover': {
      border: '0px solid #fff !important',
      boxShadow: '0px 0px 0px #fff !important',
    },
  },
  inlineToolbar: {
    padding: '0px 20px !important',
    paddingLeft: '0 !important',
    borderRight: '1px solid #ddd !important',
  },
  listToolbar: {
    padding: '0px 20px !important',
  },
  historyToolbar: {
    flex: '1 1 0 !important',
    justifyContent: 'flex-end !important',
  },
};

export class UGRichEditor extends PureComponent {
  state = {
    value: null,
  };

  componentWillMount = () => {
    if (this.props.initContent) {
      const { initContent } = this.props;
      this.onSetContentState(initContent);
    } else {
      this.setState({
        value: '',
      });
    }
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.toolBarFunc = {
      redo: this.redo,
      undo: this.undo,
      insertEmoij: this.insertEmoij,
      insertImage: this.imageHandler,
    };
  };

  componentDidMount = () => {
    this.attachQuillRefs();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps && nextProps.initContent) {
      if (
        this.props.initContent !== nextProps.initContent ||
        isEmptyString(this.props.initContent)
      ) {
        this.onSetContentState(nextProps.initContent);
      }
    }

    // if RTE is reused to render other content, we need to reset state.value
    if (this.props.toolBarId !== nextProps.toolBarId) {
      this.onSetContentState(nextProps.initContent);
    }
  };

  componentDidUpdate = () => {
    this.attachQuillRefs();
  };

  onSetContentState = val => {
    const contentState = val;
    this.setState({
      value: contentState,
    });
  };

  onChange = content => {
    if (this.reactQuillRef) {
      this.setState({ value: content });
      this.props.onChange(content, {
        plainText: this.reactQuillRef.editor.getText(),
      });
    }
  };

  assignReactQuillRef = ref => {
    this.reactQuillRef = ref;
  };

  attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (this.reactQuillRef) {
      if (typeof this.reactQuillRef.getEditor !== 'function') return;
      // Skip if Quill reference is defined:
      if (this.quillRef !== null) return;

      const quillRef = this.reactQuillRef.getEditor();
      if (quillRef !== null) this.quillRef = quillRef;
    }
  };

  imageHandler = (id, file) => {
    if (id && file) {
      if (file.link) {
        const fileUrl = padFacadeURL(file.link);
        const range = this.quillRef.getSelection();
        const position = range ? range.index : 0;
        this.quillRef.insertEmbed(position, 'image', fileUrl);
      }
    }
  };

  insertEmoij = value => {
    const range = this.quillRef.getSelection();
    const position = range ? range.index : 0;
    setTimeout(() => {
      // this.quillRef.insertText(position, value, 'user');
      this.quillRef.insertText(position, value, '', '', null, 'api');
    }, 100);
  };

  renderEditor = (wrappClass, wrapperClassname) => {
    const { readOnly, disabled } = this.props;
    return (
      <ReactQuill
        ref={this.assignReactQuillRef}
        theme="snow"
        className={classNames(wrappClass, wrapperClassname)}
        readOnly={readOnly || disabled}
        value={this.state.value}
        onChange={this.onChange}
        modules={UGRichEditor.modules(this.props)}
        formats={UGRichEditor.formats}
      />
    );
  };

  handleValueRef = r => {
    this.attachments = r;
  };

  render = () => {
    const {
      classes,
      wrapperClassname,
      readOnly,
      disabled,
      disableImgUpload,
    } = this.props;
    const { value } = this.state;
    let quillWrappClass = 'quill-edit';
    let wrappClass;
    if (readOnly) {
      wrappClass = classes.wrapperReadOnlyStyle;
      quillWrappClass = 'quill-read';
    }

    if (readOnly && value === EMPTY_RTE) {
      return '';
    }

    const quill = disableImgUpload ? (
      this.renderEditor(wrappClass, wrapperClassname)
    ) : (
      <Attachment
        onUpload={this.imageHandler}
        valueRef={this.handleValueRef}
        uploadLabel="Uploading..."
        simple
        disableClick
        accept={RTE_IMAGE_ACCEPT}
        allowPaste
      >
        {this.renderEditor(wrappClass, wrapperClassname)}
      </Attachment>
    );

    return (
      <div className={quillWrappClass}>
        <CustomToolbar
          toolBarId={`${toolBarIndex(this.props.toolBarId)}`}
          readOnly={readOnly || disabled}
          toolBarAction={this.toolBarFunc}
          disableImgUpload={disableImgUpload}
        />
        {quill}
      </div>
    );
  };
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
UGRichEditor.modules = props => ({
  toolbar: {
    syntax: true,
    container: `#${toolBarIndex(props.toolBarId)}`,
    handlers: {
      redo,
      undo,
    },
  },
  history: {
    delay: 1000,
    maxStack: 500,
    userOnly: true,
  },
});

UGRichEditor.propTypes = {
  // PropTypes here...
  classes: PropTypes.object,
  onChange: PropTypes.func,
  initContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  toolBarId: PropTypes.string.isRequired,
  wrapperClassname: PropTypes.string,
  disableImgUpload: PropTypes.bool,
};
UGRichEditor.defaultProps = {
  onChange: () => {},
  wrapperClassname: '',
  initContent: '',
  readOnly: false,
  disabled: false,
  disableImgUpload: false,
};

export default withStyles(stylesheet)(UGRichEditor);
