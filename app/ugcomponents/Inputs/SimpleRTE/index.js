import { withStyles } from '@material-ui/core/styles';
import { ADVANCED_EDIT_MODE, RTE_IMAGE_ACCEPT } from 'appConstants';
import classnames from 'classnames';
import { withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactQuill from 'react-quill';
import { compose } from 'redux';
import Attachment from 'smartComponents/Inputs/Attachments';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { padFacadeURL } from 'utils/helpers/request';
import { isEmptyRTE } from 'utils/helpers/RTE';
import SeeMore from 'ugcomponents/SeeMore';
import { withRouter } from 'react-router-dom';
import styles from './style';

const COMMENT_MODULES = { clipboard: { matchVisual: false } };
export class SimpleRTE extends PureComponent {
  componentDidMount = () => {
    const { autoFocus } = this.props;

    if (autoFocus && this.quill) {
      this.quill.focus();
    }
  };

  wrapperClassName = () => {
    const {
      classes,
      wrapperClassName,
      readOnly,
      mode,
      noPaddingBottom,
      noPadding,
      filled,
    } = this.props;

    return classnames(
      'commentEditor',
      mode !== ADVANCED_EDIT_MODE && classes.root,
      LOGIC_HELPERS.ifElse(readOnly, classes.readOnly),
      wrapperClassName,
      mode === ADVANCED_EDIT_MODE && classes.advancedRoot,
      LOGIC_HELPERS.ifElse(noPaddingBottom, classes.noPaddingBottom),
      LOGIC_HELPERS.ifElse(noPadding, classes.noPadding),
      LOGIC_HELPERS.ifElse(filled, classes.filledRTE),
    );
  };

  imageHandler = (id, file) => {
    if (id && file) {
      if (file.link) {
        const fileUrl = padFacadeURL(file.link);
        if (this.quill) {
          if (typeof this.quill.getEditor !== 'function') return;
          const quillRef = this.quill.getEditor();
          if (quillRef !== null) {
            const range = quillRef.getSelection();
            const position = range ? range.index : 0;
            quillRef.insertEmbed(position, 'image', fileUrl);
          }
        }
      }
    }
  };

  handleRef = r => {
    this.quill = r;
    this.validatingTargetOfHostname();
  };

  searchQlEditor = () => document.querySelectorAll('.ql-editor a');

  convertHrefToURL = originalURL => {
    const newUrl = new URL(originalURL);
    return newUrl.pathname + newUrl.search;
  };

  validatingTargetOfHostname = () => {
    const { history } = this.props;
    const linkNode = this.searchQlEditor();
    const hostnameUrl = window.location.hostname.replace(/^www\./, '');
    for (let i = 0; i < linkNode.length; i += 1) {
      linkNode[i].addEventListener('click', event => {
        if (linkNode[i].getAttribute('href').indexOf(hostnameUrl) > -1) {
          event.preventDefault();
          const linkURL = linkNode[i].getAttribute('href');
          const pathAndQueryURL = this.convertHrefToURL(linkURL);

          history.push(pathAndQueryURL);
        }
      });
    }
  };

  handleValueRef = r => {
    this.attachments = r;
  };

  handleChange = value => {
    const { onChange, setValue } = this.props;

    this.validatingTargetOfHostname();
    const analyzedValue = LOGIC_HELPERS.ifFunction(
      value === '<p><br></p>',
      '',
      value,
    );
    LOGIC_HELPERS.ifFunction(setValue, [analyzedValue]);
    LOGIC_HELPERS.ifFunction(onChange, [analyzedValue]);
  };

  renderEditor = ({ rteValue, rtePlaceholder, readOnly, lines, className }) => (
    <ReactQuill
      ref={this.handleRef}
      placeholder={rtePlaceholder}
      modules={COMMENT_MODULES}
      theme={null}
      value={rteValue}
      onChange={this.handleChange}
      readOnly={readOnly}
      className={classnames(`lines${lines}`, className)}
    />
  );

  render() {
    const {
      lines,
      placeholder,
      value,
      getValue,
      readOnly,
      id,
      mode,
      className,
      classes,
      editing,
      renderSeeMore,
      disableImgUpload,
      isMinHeightCollapse,
      isCollapeSeeMore,
      userId,
    } = this.props;

    const rteValue = LOGIC_HELPERS.ifFunction(getValue, [], value) || '';
    const rtePlaceholder = placeholder;

    // const finalValue = isEmptyRTE(rteValue) ? '' : rteValue;
    const finalValue = LOGIC_HELPERS.ifElse(isEmptyRTE(rteValue), '', rteValue);

    let quill;
    if (mode !== ADVANCED_EDIT_MODE) {
      quill =
        readOnly || disableImgUpload ? (
          this.renderEditor({
            rteValue,
            rtePlaceholder,
            readOnly,
            lines,
            className,
          })
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
            {this.renderEditor({
              rteValue,
              rtePlaceholder,
              readOnly,
              lines,
              className,
            })}
          </Attachment>
        );
    } else {
      quill = (
        <RichTextEditor
          initContent={finalValue}
          value={finalValue}
          onChange={this.handleChange}
          toolBarId={`rte${id}`}
          disableImgUpload={disableImgUpload}
        />
      );
    }

    return (
      <React.Fragment>
        <div className={classes.seeAllContainer}>
          <SeeMore
            userId={userId}
            isMinHeightCollapse={isMinHeightCollapse}
            isCollapeSeeMore={isCollapeSeeMore}
            renderSeeMore={renderSeeMore}
            editing={editing}
            readOnly={readOnly}
          >
            <div className={this.wrapperClassName()}>{quill}</div>
          </SeeMore>
        </div>
      </React.Fragment>
    );
  }
}

SimpleRTE.propTypes = {
  classes: PropTypes.object.isRequired,
  getValue: PropTypes.func,
  setValue: PropTypes.func,
  userId: PropTypes.number,

  history: PropTypes.object.isRequired,

  // from parent
  placeholder: PropTypes.string,
  className: PropTypes.string,
  mode: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  editing: PropTypes.bool,
  renderSeeMore: PropTypes.bool,
  id: PropTypes.number,
  lines: PropTypes.number,
  autoFocus: PropTypes.bool,
  filled: PropTypes.bool,
  onChange: PropTypes.func,
  noPadding: PropTypes.bool,
  noPaddingBottom: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  disableImgUpload: PropTypes.bool,
  isCollapeSeeMore: PropTypes.bool,
  isMinHeightCollapse: PropTypes.bool,
  // from resaga
};

SimpleRTE.defaultProps = {
  placeholder: 'Write a personal message',
  className: '',
  value: '',
  readOnly: false,
  autoFocus: false,
  lines: 1,
  noPaddingBottom: false,
  disableImgUpload: false,
  isCollapeSeeMore: false,
  isMinHeightCollapse: false,
};

// style only, no formsy
export const StyledSimpleRTE = compose(
  withRouter,
  withStyles(styles, { name: 'SimpleRTE' }),
)(SimpleRTE);

export default compose(withFormsy)(StyledSimpleRTE);
