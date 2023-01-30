import { ClickAwayListener } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { NODE_API, UPDATE_NODE } from 'apis/constants';
import {
  COMPLETED,
  CONTENT,
  DEFAULT,
  HEADING,
  LINK,
  NODE_PROP,
  PERSONAL,
  TITLE,
  UNDERLINE,
  URL_HELPERS,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import utils from 'datastore/utils';
import UGLink from 'components/Link';
import { compose } from 'redux';
import resaga from 'resaga';
import _ from 'lodash';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import { LoadingText } from 'ugcomponents/Progress';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import { TRUNCATE_SEPARATOR } from 'sizeConstants';
import EditableTextForm from 'smartComponents/Editables/TextForm';
import ButtonLegacy from 'ugcomponents/Buttons/Button';
import InlineButton from 'ugcomponents/Buttons/InlineButton';
import Form from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import { InlineText, SimpleRTE } from 'ugcomponents/Inputs';
import { Span } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { convertStyleClass } from 'utils/style-utils';
import { VARIANTS } from 'variantsConstants';
import truncate from 'lodash/truncate';

import { CONFIG } from './config';
import styles from './styles';

export class Content extends PureComponent {
  state = {
    editing: false,
  };

  componentDidMount = () => {
    const { memberIds, content, status } = this.props;
    if (status === PERSONAL) {
      if (!_.includes(memberIds, Number(content))) {
        this.props.resaga.setValue({
          nodes: utils.removeObjectById(Number(content)),
        });
      }
    }
  };

  startEdit = event => {
    this.stopPropagation(event);
    this.setState({ editing: true });
  };

  finishEdit = event => {
    this.stopPropagation(event);
    this.setState({ editing: false });
  };

  stopPropagation = (event = {}) =>
    this.props.stopPropagation &&
    event.stopPropagation &&
    event.stopPropagation();

  contentClassName = variantClassName => {
    const { classes, className, disabled, bold, nowrap, darkMode } = this.props;

    return classnames(
      classes.content,
      LOGIC_HELPERS.ifElse(darkMode, classes.contentDarkMode),
      LOGIC_HELPERS.ifElse(disabled, classes.disabled),
      LOGIC_HELPERS.ifElse(bold, classes.bold),
      LOGIC_HELPERS.ifElse(nowrap, classes.nowrap),
      variantClassName,
      className,
    );
  };

  handleFormRef = ref => {
    this.form = ref;
  };

  submitForm = () => {
    const { autoSaveOnBlur } = this.props;

    return autoSaveOnBlur && this.form.submitForm();
  };

  discardChanges = ({ content }) => {
    if (!content) {
      this.finishEdit();
    }
  };

  changeContent = ({ content }) => {
    const { id, type, content: currentContent, updatingNode } = this.props;

    if (currentContent === content || (!currentContent && !content)) {
      return this.finishEdit();
    }

    if (updatingNode) {
      return null;
    }

    return this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        node: { content, type },
      },
      onSuccess: this.finishEdit,
      onError: this.finishEdit,
    });
  };

  changeEditableContent = ({ model: { content }, onSuccess, onError }) => {
    const { id, type } = this.props;

    return this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        node: { content, type },
      },
      onSuccess,
      onError,
    });
  };

  renderContent = variantClassName => {
    const {
      content,
      component: Component,
      quote,
      index,
      status,
      mapping,
      noContent,
      showEmpty,
    } = this.props;

    let renderedContent = LOGIC_HELPERS.ifFunction(mapping, [content], content);

    if (!renderedContent && showEmpty) {
      renderedContent = <i>{noContent}</i>;
    }

    if (status === PERSONAL) {
      renderedContent = (
        <KnownAs
          id={Number.parseInt(content, 10)}
          variant={VARIANTS.STRING_ONLY}
        />
      );
    }

    if (quote && content) {
      renderedContent = `"${content}"`;
    }

    if (index) {
      if (content) {
        renderedContent = `${index} - ${renderedContent}`;
      } else {
        renderedContent = index;
      }
    }

    return (
      <Component className={this.contentClassName(variantClassName)}>
        {renderedContent}
      </Component>
    );
  };

  renderHeading = () => this.renderEditableTextForm('H3', true);

  renderTitle = () => {
    const {
      id,
      editable,
      viewComponentProps,
      viewingClassName,
      multiline,
      textAlign,
    } = this.props;

    return (
      <NodeProp
        id={id}
        variant={TITLE}
        valueKey={CONTENT}
        component={GridItem}
        viewComponentProps={viewComponentProps}
        viewingClassName={viewingClassName}
        editable={editable}
        showEmpty={editable}
        isCustomData={false}
        noContent="Add a Title"
        multiline={multiline}
        textAlign={textAlign}
      />
    );
  };

  // not editable yet
  renderCompleted = () => {
    const { classes } = this.props;

    return this.renderContent(
      classnames(classes.disabled, classes.lineThrough),
    );
  };

  // not editable yet
  renderUnderline = () => {
    const { classes } = this.props;

    return this.renderContent(classes.underline);
  };

  renderLink = () => {
    const { classes, id, onClick, linkClassName } = this.props;

    return (
      <UGLink
        to={URL_HELPERS.tours(id)}
        className={classnames(classes.link, linkClassName)}
        title="View tour"
        onClick={onClick}
      >
        {this.renderNodeProp()}
      </UGLink>
    );
  };

  renderNodeProp = () => {
    const { id, bold, component, ellipsis, ellipsisClassName } = this.props;

    return (
      <NodeProp
        id={id}
        bold={bold}
        variant={LINK}
        valueKey={CONTENT}
        editable={false}
        showEmpty
        isCustomData={false}
        component={component}
        ellipsis={ellipsis}
        ellipsisClassName={ellipsisClassName}
      />
    );
  };

  renderDefault = () => {
    const { classes } = this.props;
    const { editing } = this.state;

    if (editing) {
      return this.renderEditContent(
        this.contentClassName(classes.default),
        classes.defaultGrid,
      );
    }

    return this.renderEditable(classes.default, classes.defaultGrid);
  };

  renderEditable = (variantClassName, gridClassName) => {
    const { classes, editable, darkMode } = this.props;

    const renderContent = this.renderContent(variantClassName);

    if (!editable) {
      return renderContent;
    }

    return (
      <GridContainer
        alignItems="center"
        spacing={0}
        className={classnames(
          LOGIC_HELPERS.ifElse(darkMode, classes.hoverDarkMode),
          gridClassName,
        )}
        wrap="nowrap"
      >
        <GridItem onClick={this.startEdit} className={classes.hover}>
          {renderContent}
          <InlineButton
            darkMode={darkMode}
            color="secondary"
            className={classes.iconHidden}
          >
            <Icon icon="lnr-pencil3" size="small" />
          </InlineButton>
        </GridItem>
      </GridContainer>
    );
  };

  renderEditableTextForm = (Typography, bold, gridClassName) => {
    const {
      classes,
      content,
      editable,
      disabled,
      nowrap,
      required,
      fullWidth,
    } = this.props;

    const TextProps = {
      className: classnames(nowrap && classes.nowrap, bold && classes.bold),
    };

    return (
      <GridContainer
        spacing={0}
        alignItems="center"
        onClick={this.stopPropagation}
        className={gridClassName}
      >
        <EditableTextForm
          name="content"
          value={content}
          TextProps={TextProps}
          Typography={Typography}
          onSubmit={this.changeEditableContent}
          readOnly={!editable || disabled}
          bold={bold}
          fullWidth={fullWidth}
          required={required}
        />
      </GridContainer>
    );
  };

  renderButtons = () => {
    const { updatingNode } = this.props;

    if (updatingNode) {
      return <LoadingText text="Saving" />;
    }

    return (
      <Fragment>
        <ButtonLegacy first inline type="submit" size="xsmall" color="green">
          Save
        </ButtonLegacy>
        <ButtonLegacy
          inline
          size="xsmall"
          onClick={this.finishEdit}
          color="outLineGrey"
        >
          Cancel
        </ButtonLegacy>
      </Fragment>
    );
  };

  renderEditContent = (variantClassName, gridClassName) => {
    const {
      classes,
      content,
      darkMode,
      mouseEvent,
      required,
      multiline,
    } = this.props;

    return (
      <ClickAwayListener onClickAway={this.submitForm} mouseEvent={mouseEvent}>
        <Form onValidSubmit={this.changeContent} ref={this.handleFormRef}>
          <GridContainer
            alignItems="center"
            spacing={0}
            onClick={this.stopPropagation}
            className={gridClassName}
            direction={LOGIC_HELPERS.ifElse(multiline, 'column')}
          >
            <GridItem
              className={classnames(
                classes.grow,
                multiline && classes.fullWidth,
              )}
            >
              <div className={classes.input}>
                <InlineText
                  fullWidth
                  name="content"
                  value={content}
                  required={required}
                  autoComplete="off"
                  autoFocus
                  useTypography={false}
                  placeholder="Set title"
                  className={classnames(
                    LOGIC_HELPERS.ifElse(darkMode, classes.darkMode),
                    variantClassName,
                  )}
                  multiline={multiline}
                />
              </div>
            </GridItem>

            <GridItem className={classes.editForm}>
              {this.renderButtons()}
            </GridItem>
          </GridContainer>
        </Form>
      </ClickAwayListener>
    );
  };

  renderValue = () =>
    _.truncate(this.props.content, {
      length: this.props.maxChars,
    });

  renderTextOnly = () => {
    const { showTooltip, content } = this.props;
    const otherProps = LOGIC_HELPERS.ifElse(
      showTooltip,
      { title: content },
      {},
    );
    return (
      <span
        className={convertStyleClass(this.props.classes, this.props.fontWeight)}
        {...otherProps}
      >
        {this.props.truncateLength !== -1
          ? truncate(this.props.content, {
              length: this.props.truncateLength,
              separator: TRUNCATE_SEPARATOR.standard,
            })
          : this.props.content}
      </span>
    );
  };

  renderProp = () => {
    const { children, content } = this.props;

    return children(content);
  };

  renderField = () => {
    const { content, reactQuillProps } = this.props;

    return <SimpleRTE name="content" value={content} {...reactQuillProps} />;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [HEADING]: this.renderHeading,
      [TITLE]: this.renderTitle,
      [COMPLETED]: this.renderCompleted,
      [UNDERLINE]: this.renderUnderline,
      [LINK]: this.renderLink,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.TEXT_FIELD]: this.renderField,
      [NODE_PROP]: this.renderNodeProp,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [VARIANTS.VALUE_ONLY]: this.renderValue,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Content.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number,
  index: PropTypes.number,
  variant: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  editable: PropTypes.bool,
  bold: PropTypes.bool,
  nowrap: PropTypes.bool,
  quote: PropTypes.bool,
  darkMode: PropTypes.bool,
  showEmpty: PropTypes.bool,
  autoSaveOnBlur: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  required: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.func,
  fullWidth: PropTypes.bool,

  fontWeight: PropTypes.string,
  status: PropTypes.string,
  mouseEvent: PropTypes.string,
  truncateLength: PropTypes.number,
  multiline: PropTypes.bool,
  textAlign: PropTypes.string,
  // resaga props
  content: PropTypes.string,
  noContent: PropTypes.node,
  type: PropTypes.string,
  memberIds: PropTypes.array,
  updatingNode: PropTypes.bool,

  // customisable props
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  mapping: PropTypes.func,
  viewComponentProps: PropTypes.object,
  viewingClassName: PropTypes.string,
  ellipsis: PropTypes.bool,
  ellipsisClassName: PropTypes.string,
  linkClassName: PropTypes.string,
  reactQuillProps: PropTypes.object,
  maxChars: PropTypes.number,
  showTooltip: PropTypes.bool,
};

Content.defaultProps = {
  fullWidth: true,
  id: 0,
  variant: '',
  className: '',
  status: '',
  disabled: false,
  editable: false,
  bold: false,
  nowrap: false,
  autoSaveOnBlur: true,
  showEmpty: true,
  content: '',
  noContent: 'Untitled',
  type: '',
  component: Span,
  fontWeight: '',
  truncateLength: -1,
  mouseEvent: 'onMouseDown',
  reactQuillProps: {},
  maxChars: 30,
  textAlign: 'left',
};

export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG),
)(Content);
