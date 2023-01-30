import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'redux';
import { withStyles } from 'components/material-ui';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import style from './style';

export const ANONYMOUS_FUNC = () => {};

export class EditableFormActions extends PureComponent {
  renderSaveButton = () => {
    const { loading, size, saveContent, classes } = this.props;

    const buttonProps = LOGIC_HELPERS.ifElse(
      saveContent,
      {},
      { icon: 'check', iconButton: true },
    );

    return (
      <Button
        type="submit"
        size={size}
        color="primary"
        disabled={loading}
        className={classes.submit}
        {...buttonProps}
        dense
        square
      >
        {saveContent}
      </Button>
    );
  };

  renderCancelButton = () => {
    const { loading, onCancel, size, cancelContent } = this.props;

    const buttonProps = LOGIC_HELPERS.ifElse(
      cancelContent,
      {},
      { icon: 'cross', iconButton: true },
    );

    return (
      <Button
        size={size}
        color="gray"
        disabled={loading}
        onClick={onCancel}
        {...buttonProps}
        dense
        square
      >
        {cancelContent}
      </Button>
    );
  };

  renderPrimaryActions = () => {
    const { renderPrimaryActions } = this.props;

    const actions = (
      <React.Fragment>
        {this.renderSaveButton()}
        {this.renderCancelButton()}
      </React.Fragment>
    );

    return renderPrimaryActions ? renderPrimaryActions({ actions }) : actions;
  };

  renderSecondaryActions = () => {
    const { classes, renderSecondaryActions } = this.props;

    const actions = renderSecondaryActions();

    return !!actions && <div className={classes.secondaryRoot}>{actions}</div>;
  };

  render = () => {
    const { classes, inline, noGrid } = this.props;
    const buttons = (
      <React.Fragment>
        {this.renderSecondaryActions()}
        {this.renderPrimaryActions()}
      </React.Fragment>
    );

    if (noGrid) {
      return buttons;
    }

    return (
      <GridItem className={classnames(classes.item, inline && classes.inline)}>
        {buttons}
      </GridItem>
    );
  };
}

EditableFormActions.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  renderPrimaryActions: PropTypes.func,
  renderSecondaryActions: PropTypes.func,
  loading: PropTypes.bool,
  noGrid: PropTypes.bool,
  onCancel: PropTypes.func,
  size: PropTypes.string,
  saveContent: PropTypes.string,
  cancelContent: PropTypes.string,
  inline: PropTypes.bool,
};

EditableFormActions.defaultProps = {
  renderPrimaryActions: null,
  renderSecondaryActions: ANONYMOUS_FUNC,
  loading: false,
  onCancel: ANONYMOUS_FUNC,
  size: 'extraSmall',
  saveContent: '',
  cancelContent: '',
};

export default compose(
  withStyles(style, { name: 'viewComponents/Editable/FormActions' }),
)(EditableFormActions);
