import { ClickAwayListener } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import {
  ADVANCED_EDIT_MODE,
  DEFAULT,
  INLINE_EDIT_MODE,
  NODE_PROPS,
  TEXT,
  VIEW_MODE,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'ugcomponents/Buttons/Button';
import InlineButton from 'ugcomponents/Buttons/InlineButton';
import Form from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import { InlineText } from 'ugcomponents/Inputs';
import { LoadingText } from 'ugcomponents/Progress';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import ViewButton from 'viewComponents/Button';
import Actions from 'viewComponents/Editable/components/FormActions';
import { isEmptyRTE } from 'utils/helpers/RTE';
import { CONFIG } from './config';
import styles from './styles';

export class NodeProp extends PureComponent {
  state = {
    mode: VIEW_MODE,
  };

  startEdit = event => {
    const { onModeChange } = this.props;

    this.stopPropagation(event);
    this.setState({ mode: INLINE_EDIT_MODE });

    LOGIC_HELPERS.ifFunction(onModeChange, [INLINE_EDIT_MODE]);
  };

  startAdvancedEdit = event => {
    const { onModeChange } = this.props;

    this.stopPropagation(event);
    this.setState({ mode: ADVANCED_EDIT_MODE });

    LOGIC_HELPERS.ifFunction(onModeChange, [ADVANCED_EDIT_MODE]);
  };

  finishEdit = event => {
    const { onModeChange } = this.props;

    this.stopPropagation(event);
    this.setState({ mode: VIEW_MODE });

    LOGIC_HELPERS.ifFunction(onModeChange, [VIEW_MODE]);
  };

  stopPropagation = (event = {}) => {
    const { stopPropagation } = this.props;

    return (
      stopPropagation && LOGIC_HELPERS.ifFunction(event.stopPropagation, [])
    );
  };

  contentClassName = () => {
    const {
      classes,
      editable,
      className,
      disabled,
      bold,
      nowrap,
      darkMode,
      ellipsis,
      variant,
      viewingClassName,
      editingViewModeClassName,
      editableClassName,
      url,
    } = this.props;
    const { mode } = this.state;

    return classnames(
      classes.content,
      LOGIC_HELPERS.ifElse(darkMode, classes.darkMode),
      LOGIC_HELPERS.ifElse(disabled, classes.disabled),
      LOGIC_HELPERS.ifElse(bold, classes.bold),
      LOGIC_HELPERS.ifElse(nowrap, classes.nowrap),
      LOGIC_HELPERS.ifElse(ellipsis, classes.ellipsis),
      LOGIC_HELPERS.ifElse(url, classes.url),
      classes[variant],
      className,
      LOGIC_HELPERS.ifElse(!editable, viewingClassName),
      LOGIC_HELPERS.ifElse(editable, editableClassName),
      LOGIC_HELPERS.ifElse(
        [mode === VIEW_MODE, editable],
        editingViewModeClassName,
      ),
    );
  };

  gridClassName = () => {
    const { classes, variant, gridClassName } = this.props;

    return classnames(classes[`${variant}Grid`], gridClassName);
  };

  handleFormRef = ref => {
    this.form = ref;
  };

  handleSuccess = formData => event => {
    const { onSave } = this.props;
    this.finishEdit(event);
    onSave(formData);
  };

  submitForm = () => {
    const { autoSaveOnBlur, loading } = this.props;

    return autoSaveOnBlur && !loading && this.form.submitForm();
  };

  isEmpty = value => {
    const { isEmpty } = this.props;

    if (typeof isEmpty === 'function') {
      return isEmpty(value);
    }

    return !value;
  };

  isEqual = formData => {
    const { isEqual, value, valueKey } = this.props;

    if (this.isEmpty(formData[valueKey]) && this.isEmpty(value)) {
      return true;
    }

    if (typeof isEqual === 'function') {
      return isEqual(formData, this.props);
    }

    return value === formData[valueKey];
  };

  makeNode = formData => {
    const { makeNode, type, valueKey, isCustomData } = this.props;

    if (typeof makeNode === 'function') {
      return makeNode(formData, this.props);
    }

    const filterSpaces = isEmptyRTE(formData[valueKey])
      ? ''
      : formData[valueKey];

    const node = { [valueKey]: filterSpaces };

    if (isCustomData) {
      return { customData: node, type };
    }

    return { ...node, type };
  };

  clearContent = () => {
    const { valueKey } = this.props;

    this.handleValidSubmit({ [valueKey]: null });
  };

  handleValidSubmit = formData => {
    const { id, updatingNode } = this.props;

    if (this.isEqual(formData)) {
      return this.finishEdit();
    }

    return (
      !updatingNode &&
      NODE_API_HELPERS.updateNode(
        {
          nodeId: id,
          node: this.makeNode(formData),
          onSuccess: this.handleSuccess(formData),
          onError: this.finishEdit,
        },
        this.props,
      )
    );
  };

  renderView = () => {
    const { value, renderView, showEmpty, noContent } = this.props;

    let text = LOGIC_HELPERS.ifFunction(renderView, [this.props], value);

    if (!text && showEmpty) {
      text = <i>{noContent}</i>;
    }

    return text;
  };

  renderComponent = () => {
    const {
      component: Component,
      editable,
      value,
      ellipsis,
      ellipsisClassName,
      componentProps,
      viewComponentProps,
      isTitleAttrb,
      isTextAttrb,
    } = this.props;

    const renderComponent = (
      <Component
        className={this.contentClassName()}
        {...componentProps}
        {...LOGIC_HELPERS.ifElse(!editable, viewComponentProps, {})}
        title={LOGIC_HELPERS.ifElse(isTitleAttrb, value)}
        text={LOGIC_HELPERS.ifElse(isTextAttrb, value)}
      >
        {this.renderView()}
      </Component>
    );

    if (ellipsis) {
      return <div className={ellipsisClassName}>{renderComponent}</div>;
    }

    return renderComponent;
  };

  renderDefault = () => {
    const { showEmpty, value, children } = this.props;
    const { mode } = this.state;

    if (this.isEmpty(value) && !showEmpty) {
      return null;
    }

    let content;

    if (mode === VIEW_MODE) {
      content = this.renderViewing();
    } else {
      content = this.renderEditing();
    }

    if (typeof children === 'function') {
      return children({
        content,
        isViewing: mode === VIEW_MODE,
        isEmpty: this.isEmpty(value),
        startEdit: this.startEdit,
      });
    }

    return content;
  };

  renderViewing = () => {
    const {
      classes,
      editable,
      darkMode,
      alignItems,
      textAlign,
      photoView,
    } = this.props;

    const renderComponent = this.renderComponent();

    if (!editable) {
      return renderComponent;
    }

    return (
      <GridContainer
        alignItems="center"
        spacing={0}
        className={classnames(
          this.gridClassName(),
          classes.hover,
          LOGIC_HELPERS.ifElse(darkMode, classes.hoverDarkMode),
        )}
        wrap="nowrap"
      >
        <GridItem xs={12}>
          <InlineButton
            onClick={this.startEdit}
            darkMode={darkMode}
            padding="none"
            color="inherit"
            hover
            textAlign={textAlign}
            fullWidth
          >
            <GridContainer alignItems={alignItems} wrap="nowrap">
              <GridItem xs>{renderComponent}</GridItem>
              {!photoView && (
                <GridItem className={classes.iconHidden}>
                  <Icon icon="lnr-pencil" size="small" />
                </GridItem>
              )}
            </GridContainer>
          </InlineButton>
        </GridItem>
      </GridContainer>
    );
  };

  renderAdvancedButton = () => {
    const { mode } = this.state;
    const { classes } = this.props;

    const onClick = LOGIC_HELPERS.ifElse(
      mode === ADVANCED_EDIT_MODE,
      this.startEdit,
      this.startAdvancedEdit,
    );
    const label = LOGIC_HELPERS.ifElse(
      mode === ADVANCED_EDIT_MODE,
      'Simple',
      'Advanced',
    );

    return (
      <Button
        first
        inline
        size="small"
        color="blue"
        onClick={onClick}
        className={classes.editBtn}
      >
        {label}
      </Button>
    );
  };

  renderClearButton = () => {
    const { value, classes, required } = this.props;
    const show = LOGIC_HELPERS.ifElse(
      [!required, !this.isEmpty(value)],
      true,
      false,
    );

    return (
      show && (
        <ViewButton
          iconButton
          icon="broom"
          color="gray"
          size="extraSmall"
          onClick={this.clearContent}
          className={classes.clearBtn}
          square
          dense
        />
      )
    );
  };

  renderSaveCancelButton = loading => (
    <div className={this.props.classes.flex}>
      <Actions
        noGrid
        loading={loading}
        renderSecondaryActions={this.renderClearButton}
        onCancel={this.finishEdit}
      />
    </div>
  );

  renderAdvancedButtons = () => {
    const { classes, loading } = this.props;

    return (
      <GridContainer alignItems="center" spacing={0}>
        <GridItem className={classes.advanceEdit}>
          {this.renderAdvancedButton()}
        </GridItem>
        <GridItem>{this.renderSaveCancelButton(loading)}</GridItem>
      </GridContainer>
    );
  };

  renderButtons = () => {
    const { advancedMode, updatingNode, loading } = this.props;

    if (updatingNode) {
      return <LoadingText icon />;
    }

    if (advancedMode) {
      return this.renderAdvancedButtons();
    }

    return this.renderSaveCancelButton(loading);
  };

  renderEdit = () => {
    const {
      value,
      valueKey,
      renderEdit,
      required,
      placeholder,
      multiline,
    } = this.props;

    const className = this.contentClassName();
    const gridClassName = this.gridClassName();

    if (typeof renderEdit === 'function') {
      return renderEdit(
        { ...this.props, className, gridClassName },
        this.state,
      );
    }

    return (
      <InlineText
        fullWidth
        name={valueKey}
        value={value}
        required={required}
        autoFocus
        useTypography={false}
        placeholder={placeholder}
        className={this.contentClassName()}
        multiline={multiline}
      />
    );
  };

  renderEditing = () => {
    const {
      classes,
      mouseEvent,
      alignItems,
      direction,
      inlineButtons,
      editGridClassName,
      actionBtnClassName,
    } = this.props;

    const { mode } = this.state;

    const absoluteClass = LOGIC_HELPERS.ifElse(
      [mode === INLINE_EDIT_MODE, !inlineButtons],
      true,
      false,
    );

    return (
      <ClickAwayListener onClickAway={this.submitForm} mouseEvent={mouseEvent}>
        <Form onValidSubmit={this.handleValidSubmit} ref={this.handleFormRef}>
          <GridContainer
            alignItems={alignItems}
            spacing={0}
            className={classnames(
              this.gridClassName(),
              editGridClassName,
              classes.relative,
            )}
            direction={direction}
          >
            <GridItem className={classes.grow}>{this.renderEdit()}</GridItem>

            <GridItem
              className={classnames({
                [classes.editForm]: absoluteClass,
                [classes.inline]: inlineButtons,
                [actionBtnClassName]: actionBtnClassName,
              })}
            >
              {this.renderButtons()}
            </GridItem>
          </GridContainer>
        </Form>
      </ClickAwayListener>
    );
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

NodeProp.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // important props
  type: PropTypes.string,
  valueKey: PropTypes.oneOf(NODE_PROPS).isRequired, // must be a node property
  value: PropTypes.any,
  isEmpty: PropTypes.func,
  isEqual: PropTypes.func,
  makeNode: PropTypes.func,
  renderView: PropTypes.func,
  renderEdit: PropTypes.func,
  isCustomData: PropTypes.bool,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.node,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  bold: PropTypes.bool,
  nowrap: PropTypes.bool,
  darkMode: PropTypes.bool,
  showEmpty: PropTypes.bool,
  autoSaveOnBlur: PropTypes.bool,
  onSave: PropTypes.func,
  onModeChange: PropTypes.func,
  loading: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  required: PropTypes.bool,
  advancedMode: PropTypes.bool,
  children: PropTypes.func,
  inlineButtons: PropTypes.bool,
  url: PropTypes.bool,
  multiline: PropTypes.bool,
  textAlign: PropTypes.string,

  // resaga props
  noContent: PropTypes.node,
  // type: PropTypes.oneOf([CONTENT, SUB_TITLE]),
  updatingNode: PropTypes.bool,
  editable: PropTypes.bool,

  // customisable props
  ellipsis: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  componentProps: PropTypes.object,
  viewComponentProps: PropTypes.object,
  alignItems: PropTypes.string,
  mouseEvent: PropTypes.string,
  direction: PropTypes.string,
  editGridClassName: PropTypes.string,
  actionBtnClassName: PropTypes.string,
  gridClassName: PropTypes.string,
  viewingClassName: PropTypes.string,
  editableClassName: PropTypes.string,
  ellipsisClassName: PropTypes.string,
  editingViewModeClassName: PropTypes.string,
  isTitleAttrb: PropTypes.bool,
  isTextAttrb: PropTypes.bool,
  photoView: PropTypes.bool,
};

NodeProp.defaultProps = {
  id: 0,
  url: false,
  variant: DEFAULT,
  className: '',
  placeholder: 'Set title',
  disabled: false,
  editable: false,
  bold: false,
  nowrap: false,
  inlineButtons: false,
  autoSaveOnBlur: true,
  onSave: () => {},
  loading: false,
  showEmpty: false,
  noContent: 'Untitled',
  type: '',
  component: 'span',
  componentProps: {},
  viewComponentProps: {},
  mouseEvent: 'onMouseDown',
  alignItems: 'center',
  direction: 'row',
  textAlign: 'left',

  isCustomData: true, // most properties are in customData, set it to true by default for the majority
  isTitleAttrb: false,
  isTextAttrb: false,
  multiline: false,
  photoView: false,
};

export default compose(
  withStyles(styles, { name: 'NodeProp' }),
  resaga(CONFIG),
)(NodeProp);
