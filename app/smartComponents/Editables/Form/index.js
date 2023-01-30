import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { generateFontClass } from 'utils/style-utils';
import Editable, {
  EditableFormActions,
  EditablePlaceholder,
  EditableLabel,
} from 'viewComponents/Editable';
import PopoverForm from 'viewComponents/PopoverForm';
import { withStyles } from 'components/material-ui';

import style from '../style';

export const ANONYMOUS_FUNC = () => {};
export const renderDefaultValue = value => value;

/**
 * Wrapper component to make children editable inline with own form.
 */
export class EditableForm extends PureComponent {
  state = {
    editing: false,
    loading: false,
    anchorEl: null,
  };

  handleSubmitSuccess = () => {
    this.setState({ editing: false, loading: false });
  };

  handleSubmitError = () => {
    this.setState({ editing: true, loading: false });
  };

  handleValidSubmit = model => {
    const { onSubmit } = this.props;
    this.setState({ loading: true });
    onSubmit({
      model,
      onSuccess: this.handleSubmitSuccess,
      onError: this.handleSubmitError,
    });
  };

  handlePopoverClose = () => {
    this.setState({ editing: false });
  };

  handleEditableClick = () => {
    LOGIC_HELPERS.ifFunction(this.props.onOpen);
    this.setState({ editing: true });
  };

  handleCancel = () => {
    LOGIC_HELPERS.ifFunction(this.props.onClose);
    this.setState({ editing: false });
  };

  handleEditableButtonRef = ref => {
    this.setState({ anchorEl: ref });
  };

  typographyClass = (className = '') => {
    const { classes, Typography } = this.props;
    return classnames(generateFontClass(Typography, classes), className);
  };

  renderPlaceholder = () => {
    const { placeholder, readOnly, readOnlyPlaceholder } = this.props;
    return (
      <EditablePlaceholder className={this.typographyClass()}>
        {readOnly ? readOnlyPlaceholder : placeholder}
      </EditablePlaceholder>
    );
  };

  // TODO: Convert placeholder render to func + completely remove value prop
  renderValue = () => {
    const { renderValue, renderActions, value, classes, isRow } = this.props;

    return renderActions ? (
      <GridContainer
        alignItems="center"
        wrap="nowrap"
        className="j-text-ellipsis"
      >
        {isRow ? (
          <GridItem className={classes.grow}>
            <div className="j-text-ellipsis">{renderValue(value)}</div>
          </GridItem>
        ) : (
          <GridItem>
            <div className="j-text-ellipsis">{renderValue(value)}</div>
          </GridItem>
        )}
        <GridItem>
          <div className="j-text-ellipsis">{renderActions(value)}</div>
        </GridItem>
      </GridContainer>
    ) : (
      <div className="j-text-ellipsis">{renderValue(value)}</div>
    );
  };

  renderContent = () => {
    const { value, hasValue } = this.props;
    return hasValue(value) ? this.renderValue() : this.renderPlaceholder();
  };

  renderLabel = () => <EditableLabel>{this.props.label}</EditableLabel>;

  renderEditable = () => {
    const { readOnly, testId } = this.props;
    return (
      <React.Fragment>
        {this.renderLabel()}
        <Editable
          onClick={this.handleEditableClick}
          readOnly={readOnly}
          buttonRef={this.handleEditableButtonRef}
          className={this.typographyClass()}
          data-testid={testId}
        >
          {this.renderContent()}
        </Editable>
      </React.Fragment>
    );
  };

  renderFormActions = () => {
    const {
      renderSecondaryFormActions,
      renderSecondaryFormActionsWithProps,
    } = this.props;
    const { loading } = this.state;
    const { loading: propLoading } = this.props;

    let renderSecondaryActions = renderSecondaryFormActions;

    if (typeof renderSecondaryFormActionsWithProps === 'function') {
      renderSecondaryActions = renderSecondaryFormActionsWithProps({
        onCancel: this.handleCancel,
      });
    }

    return (
      <EditableFormActions
        loading={loading || propLoading}
        renderSecondaryActions={renderSecondaryActions}
        onCancel={this.handleCancel}
      />
    );
  };

  renderFormChildren = () => {
    const { children } = this.props;
    return <GridItem xs>{children}</GridItem>;
  };

  renderForm = () => {
    const { classes: c, popoverProps } = this.props;
    const { editing, loading, anchorEl } = this.state;
    const classes = { paper: c.paper };
    return (
      <PopoverForm
        open={editing}
        popoverProps={{ anchorEl, classes, ...popoverProps }}
        onValidSubmit={this.handleValidSubmit}
        onClose={this.handlePopoverClose}
        disabled={loading}
        formClassName={c.popover}
      >
        <GridContainer direction="column" className={c.relative}>
          {this.renderFormChildren()}
          {this.renderFormActions()}
        </GridContainer>
      </PopoverForm>
    );
  };

  render = () => (
    <React.Fragment>
      {this.renderForm()}
      {this.renderEditable()}
    </React.Fragment>
  );
}

EditableForm.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  isRow: PropTypes.bool,
  value: PropTypes.any,
  hasValue: PropTypes.func,
  placeholder: PropTypes.any,
  renderValue: PropTypes.func,
  renderActions: PropTypes.func,
  renderSecondaryFormActions: PropTypes.func,
  renderSecondaryFormActionsWithProps: PropTypes.func,
  Typography: PropTypes.string,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  readOnlyPlaceholder: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  label: PropTypes.node,
  loading: PropTypes.bool,
  popoverProps: PropTypes.object,
  testId: PropTypes.string,
};

EditableForm.defaultProps = {
  children: null,
  isRow: false,
  value: '',
  hasValue: value => !!value,
  onSubmit: ANONYMOUS_FUNC,
  placeholder: 'Click to specify',
  renderValue: renderDefaultValue,
  readOnly: false,
  readOnlyPlaceholder: 'None',
  onOpen: ANONYMOUS_FUNC,
  onClose: ANONYMOUS_FUNC,
  label: '',
  renderActions: ANONYMOUS_FUNC,
  renderSecondaryFormActions: ANONYMOUS_FUNC,
  Typography: 'P',
  loading: false,
  popoverProps: {},
};

export default withStyles(style, { name: 'EditableForm' })(EditableForm);
