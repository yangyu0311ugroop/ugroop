import {
  NODE_API,
  TEMPLATE_API,
  UPDATE_HASHKEY,
  UPDATE_NODE,
} from 'apis/constants';
import {
  ADVANCED_EDIT_MODE,
  BADGE,
  COMPRESSED,
  DEFAULT,
  EMPTY_RTE,
  INLINE_EDIT_MODE,
  READ_ONLY,
  VIEW_MODE,
} from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import dotProp from 'dot-prop-immutable';
import GridContainer from 'components/GridContainer/index';
import { InlineButton } from 'ugcomponents/Buttons';
import Button from 'ugcomponents/Buttons/Button';
import Form from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import SimpleRTE, { StyledSimpleRTE } from 'ugcomponents/Inputs/SimpleRTE';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ClickAwayListener, Fade } from 'components/material-ui/index';
import { TEMPLATE_ID, CONFIG } from './config';
import styles from './styles';

export class EditableRTE extends PureComponent {
  state = {
    mode: VIEW_MODE,
  };

  startEdit = () => this.setState({ mode: INLINE_EDIT_MODE });

  startAdvancedEdit = () => this.setState({ mode: ADVANCED_EDIT_MODE });

  finishEdit = () => this.setState({ mode: VIEW_MODE });

  empty = () => {
    const { content } = this.props;

    return !content || content === EMPTY_RTE;
  };

  handleFormRef = ref => {
    this.form = ref;
  };

  submitForm = () => {
    const { autoSaveOnBlur } = this.props;

    return autoSaveOnBlur && this.form.submitForm();
  };

  clearContent = () => {
    this.changeEditableRTE({ content: null });
  };

  changeEditableRTE = ({ content }) => {
    const {
      id,
      type,
      nodePath,
      content: currentContent,
      updatingNode,
    } = this.props;

    if (updatingNode) {
      return null;
    }

    if (currentContent === content) {
      return this.finishEdit();
    }
    // set new value to nodePath to make new node
    const node = dotProp.set({ type }, nodePath, content);

    if (this.props.hashKeyDesc) {
      return this.props.resaga.dispatchTo(TEMPLATE_API, UPDATE_HASHKEY, {
        payload: {
          id,
          description: content,
        },
        onSuccess: this.finishEdit,
        onError: this.finishEdit,
      });
    }
    return this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        nodeId: id,
        node,
      },
      onSuccess: this.finishEdit,
      onError: this.finishEdit,
    });
  };

  renderHeader = editable => {
    const { classes, headingIcon, headingLabel, showHeader } = this.props;

    if (!showHeader) {
      return null;
    }

    return (
      <div className={classes.header}>
        {
          (headingIcon && (
            <Icon icon={headingIcon} size="xsmall" paddingRight />
          ),
          ' ')
        }
        {this.props.hashKeyDesc ? (
          <span className={classes.hashkeyLabel}>{headingLabel}</span>
        ) : (
          <b>{headingLabel}</b>
        )}

        <Fade in={editable}>
          <InlineButton
            color="secondary"
            className={classes.iconHidden}
            onClick={this.startEdit}
          >
            <Icon icon="lnr-pencil3" size="xsmall" /> Edit
          </InlineButton>
        </Fade>
      </div>
    );
  };

  renderAdvancedButton = () => {
    const { advancedMode } = this.props;
    const { mode } = this.state;

    if (!advancedMode) return null;

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
      <Button first inline size="xsmall" color="blue" onClick={onClick}>
        {label}
      </Button>
    );
  };

  renderClearButton = () =>
    !this.empty() && (
      <GridItem>
        <Button inline size="xsmall" color="pink" onClick={this.clearContent}>
          Clear
        </Button>
      </GridItem>
    );

  renderButtons = () => {
    const { updatingNode, classes } = this.props;

    if (updatingNode) {
      return <LoadingText text="Saving" />;
    }

    return (
      <GridContainer alignItems="center">
        <GridItem className={classes.grow}>
          {this.renderAdvancedButton()}
        </GridItem>
        {this.renderClearButton()}
        <GridItem>
          <Button inline type="submit" size="xsmall" color="green">
            Save
          </Button>
          <Button inline size="xsmall" onClick={this.finishEdit}>
            Cancel
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  renderEdit = () => {
    const {
      classes,
      content,
      className,
      placeholder,
      mouseEvent,
      id,
    } = this.props;
    const { mode } = this.state;

    return (
      <ClickAwayListener onClickAway={this.submitForm} mouseEvent={mouseEvent}>
        <Form onValidSubmit={this.changeEditableRTE} ref={this.handleFormRef}>
          <GridContainer direction="column" spacing={0}>
            <GridItem>{this.renderHeader()}</GridItem>
            <GridItem>
              <SimpleRTE
                id={id}
                mode={mode}
                autoFocus
                name="content"
                value={content}
                placeholder={placeholder}
                className={classnames(className)}
              />
            </GridItem>

            <GridItem className={classes.buttons}>
              {this.renderButtons()}
            </GridItem>
          </GridContainer>
        </Form>
      </ClickAwayListener>
    );
  };

  renderEmptyCompressed = () => {
    const { typeLabel, headingIcon } = this.props;

    return (
      <div>
        <InlineButton
          italic
          color="secondary"
          onClick={this.startEdit}
          offsetLeft
        >
          <Icon size="xsmall" icon={headingIcon} paddingRight /> Click to add{' '}
          {typeLabel}
        </InlineButton>
      </div>
    );
  };

  renderEmptyView = () => {
    const { classes, typeLabel, emptyPlaceholder, padding, dense } = this.props;
    const message = emptyPlaceholder || `Click to add ${typeLabel}`;
    return (
      <div>
        {this.renderHeader()}
        <InlineButton
          className={classnames(
            LOGIC_HELPERS.ifElse(
              padding,
              classes.padding,
              classes.defaultPadding,
            ),
            dense && classes.dense,
          )}
          italic
          color="secondary"
          onClick={this.startEdit}
        >
          {message}
        </InlineButton>
      </div>
    );
  };

  renderView = variantClassName => {
    const {
      classes,
      content,
      className,
      variant,
      showEmpty,
      ...props
    } = this.props;

    if (this.empty()) {
      if (!showEmpty) {
        return null;
      }

      return LOGIC_HELPERS.switchCase(variant, {
        [COMPRESSED]: this.renderEmptyCompressed,
        [DEFAULT]: this.renderEmptyView,
      });
    }

    return (
      <GridItem className={classes.hover} onClick={this.startEdit}>
        {this.renderHeader(true)}
        <StyledSimpleRTE
          readOnly
          className={classnames(variantClassName, className)}
          wrapperClassName={classes.editableDescription}
          value={content}
          {...props}
        />
      </GridItem>
    );
  };

  renderDefault = () => {
    const { classes } = this.props;
    const { mode } = this.state;

    if (mode === VIEW_MODE) {
      return this.renderView(classes.default);
    }

    return this.renderEdit();
  };

  renderCompressed = () => {
    const { classes } = this.props;
    const { mode } = this.state;

    if (mode === VIEW_MODE) {
      return this.renderView(classes.compressed);
    }

    return this.renderEdit();
  };

  renderReadOnly = () => {
    const { classes, id, content, className, ...props } = this.props;
    const { mode } = this.state;

    if (this.empty()) {
      return null;
    }

    return (
      <div>
        <GridItem>{this.renderHeader()}</GridItem>
        <StyledSimpleRTE
          readOnly
          className={classnames(classes.readOnly, className)}
          value={content}
          id={id}
          mode={mode}
          {...props}
        />
      </div>
    );
  };

  renderBadge = () => {
    const { component: Component, headingIcon, componentProps } = this.props;

    if (this.empty()) {
      return null;
    }

    return (
      <Component {...componentProps}>
        <Icon size="xsmall" icon={headingIcon} />
      </Component>
    );
  };

  render = () => {
    const { classes, variant, nodePath } = this.props;
    // nodePath is required
    if (!nodePath || !nodePath.length) {
      return null;
    }

    // pass in your custom variant if you need a different UI rendering
    const content = LOGIC_HELPERS.switchCase(variant, {
      [READ_ONLY]: this.renderReadOnly,
      [COMPRESSED]: this.renderCompressed,
      [BADGE]: this.renderBadge,
      [DEFAULT]: this.renderDefault,
    });

    return <div className={classes.root}>{content}</div>;
  };
}

EditableRTE.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  nodePath: PropTypes.array.isRequired,
  variant: PropTypes.node,
  content: PropTypes.string,
  className: PropTypes.string,
  patch: PropTypes.bool, // TODO: Remove once UPDATE_NODE is understandable and doesn't wipe customData :-(

  // resaga props
  type: PropTypes.string,
  updatingNode: PropTypes.bool,

  // customisable props
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  headingIcon: PropTypes.string,
  headingLabel: PropTypes.string,
  typeLabel: PropTypes.string,
  placeholder: PropTypes.string,
  mouseEvent: PropTypes.string,
  emptyPlaceholder: PropTypes.node,
  showHeader: PropTypes.bool,
  showEmpty: PropTypes.bool,
  autoSaveOnBlur: PropTypes.bool,
  padding: PropTypes.bool,
  dense: PropTypes.bool,
  advancedMode: PropTypes.bool,
  componentProps: PropTypes.object,
  hashKeyDesc: PropTypes.bool,
  onClickEditableView: PropTypes.func,
};

EditableRTE.defaultProps = {
  id: 0,
  variant: '',
  content: '',
  className: '',
  patch: false,
  type: '',

  component: 'span',
  headingIcon: '',
  headingLabel: '',
  emptyPlaceholder: '',
  typeLabel: 'content',
  placeholder: '',
  mouseEvent: 'onMouseDown',
  showHeader: true,
  showEmpty: true,
  autoSaveOnBlur: true,
  componentProps: {},
  hashKeyDesc: false,
};

export default compose(
  withStyles(styles, { name: 'EditableRTE' }),
  resaga(TEMPLATE_ID),
  resaga(CONFIG),
)(EditableRTE);
