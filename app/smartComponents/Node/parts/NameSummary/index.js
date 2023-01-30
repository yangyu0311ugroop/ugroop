import { withStyles } from '@material-ui/core/styles';
import { DEFAULT, TEXT, EMPTY_RTE, TITLE } from 'appConstants';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'ugcomponents/Icon';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import ReactQuill from 'react-quill';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import Url from 'smartComponents/Node/parts/URL';
import Location from 'smartComponents/Node/parts/Location';
import { OVERVIEW_FORMATS } from './constants';
import { CONFIG, CONFIG_ATTACH } from './config';
import styles from './styles';

export class NameSummary extends PureComponent {
  state = {
    descrValue: null,
  };

  assignQuillRef = ref => {
    if (ref) {
      if (typeof ref.getEditor !== 'function') return;
      if (typeof ref.getEditor().getText === 'function') {
        this.setState({ descrValue: ref.getEditor().getText() });
      }
    }
  };

  contentClassName = () => {
    const {
      classes,
      className,
      disabled,
      bold,
      nowrap,
      ellipsis,
      variant,
    } = this.props;

    return classnames(
      classes.content,
      LOGIC_HELPERS.ifElse(disabled, classes.disabled),
      LOGIC_HELPERS.ifElse(bold, classes.bold),
      LOGIC_HELPERS.ifElse(nowrap, classes.nowrap),
      LOGIC_HELPERS.ifElse(ellipsis, classes.ellipsis),
      classes[variant],
      className,
    );
  };

  isEmpty = value => {
    const { isEmpty } = this.props;

    if (typeof isEmpty === 'function') {
      return isEmpty(value);
    }

    return !value;
  };

  renderRtePlaceHolder = () => {
    const { classes, description, id } = this.props;
    if (!description) return null;
    return (
      <div className={classnames(classes.root, classes.noVal)}>
        <ReactQuill
          key={`${id}${description}`}
          readOnly
          value={description}
          theme={null}
          formats={OVERVIEW_FORMATS}
          ref={this.assignQuillRef}
        />
      </div>
    );
  };

  renderAttachment = () => {
    const { attachmentdescription, attachmentName, classes } = this.props;
    if (!attachmentdescription && !attachmentName) return '';

    return (
      <GridContainer wrap="nowrap">
        <GridItem>
          <Icon icon="lnr-paperclip" size="small" color="lavender" />
        </GridItem>
        <GridItem className={classes.ellipsis}>
          {attachmentdescription || attachmentName}
        </GridItem>
      </GridContainer>
    );
  };

  renderLocation = () => {
    const { id, classes, editable } = this.props;
    return (
      <Location
        id={id}
        showIcon
        labelClassName={classnames(classes.ellipsis, classes.location, {
          [classes.locationEditable]: editable,
        })}
        link=""
        showTooltip={false}
        editable={false}
      />
    );
  };

  renderUrl = () => {
    const { id, classes } = this.props;
    return <Url id={id} variant={TITLE} viewingClassName={classes.ellipsis} />;
  };

  renderView = () => {
    const { value, description, location, url } = this.props;
    const { descrValue } = this.state;

    let text = value;

    if (this.isEmpty(value)) {
      if (
        !this.isEmpty(descrValue) &&
        !!description &&
        description !== EMPTY_RTE &&
        descrValue.length > 1
      ) {
        text = descrValue;
      } else if (!this.isEmpty(location)) {
        text = this.renderLocation();
      } else if (!this.isEmpty(url)) {
        text = this.renderUrl(url);
      } else {
        text = this.renderAttachment();
      }
    }
    return text;
  };

  renderComponent = () => {
    const {
      component: Component,
      value,
      ellipsis,
      ellipsisClassName,
    } = this.props;

    const renderComponent = (
      <Component
        className={this.contentClassName()}
        {...LOGIC_HELPERS.ifElse(ellipsis, { title: value })}
      >
        {this.renderRtePlaceHolder()}
        {this.renderView()}
      </Component>
    );

    if (ellipsis) {
      return <div className={ellipsisClassName}>{renderComponent}</div>;
    }

    return renderComponent;
  };

  renderDefault = () => {
    const content = this.renderComponent();
    return content;
  };

  renderText = () => {
    const { value } = this.props;

    return value || null;
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [TEXT]: this.renderText,
      [DEFAULT]: this.renderDefault,
    });
  };
}

NameSummary.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // important props
  type: PropTypes.string,
  value: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  url: PropTypes.string,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  bold: PropTypes.bool,
  nowrap: PropTypes.bool,
  isEmpty: PropTypes.func,
  darkMode: PropTypes.bool,
  showEmpty: PropTypes.bool,

  // resaga props
  attachmentName: PropTypes.string,
  attachmentdescription: PropTypes.string,
  editable: PropTypes.bool,
  // customisable props
  ellipsis: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  ellipsisClassName: PropTypes.string,
  editingViewModeClassName: PropTypes.string,
};

NameSummary.defaultProps = {
  id: 0,
  variant: DEFAULT,
  className: '',
  disabled: false,
  bold: false,
  nowrap: false,
  showEmpty: false,
  type: '',
  component: 'span',
  editable: false,
};

export default compose(
  withStyles(styles, { name: 'NameSummary' }),
  resaga(CONFIG),
  resaga(CONFIG_ATTACH),
)(NameSummary);
