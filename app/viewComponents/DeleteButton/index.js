import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { VARIANTS } from 'variantsConstants';
import DeleteConfirmationDialog from 'ugcomponents/DialogPopup/DeleteConfirmation';
import Button from 'viewComponents/Button';
import { LOGIC_HELPERS } from '../../utils/helpers/logic';
import JText from '../../components/JText';
import Icon from '../../ugcomponents/Icon';

export class DeleteButton extends React.PureComponent {
  state = {
    open: false,
  };

  handleDeleteButtonClick = ev => {
    ev.stopPropagation();
    this.setState({ open: true });
  };

  handleDialogConfirmClick = (ev, { onLoad }) => {
    ev.stopPropagation();
    this.props.onClick({ onLoad, onClose: this.handleDialogClose });
  };

  handleDialogCancelClick = ev => {
    ev.stopPropagation();
    this.setState({ open: false });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  renderDeleteIconButton = () => {
    const { ButtonProps, size } = this.props;
    return (
      <Button
        iconButton
        variant={VARIANTS.OUTLINE}
        size={size}
        square
        dense
        title="Delete"
        icon="lnr-trash2"
        color="alert"
        onClick={this.handleDeleteButtonClick}
        {...ButtonProps}
      />
    );
  };

  renderDeleteSimpleIconButton = () => (
    <JText onClick={this.handleDeleteButtonClick}>
      <Icon size="small" icon="lnr-cross" />
    </JText>
  );

  renderProp = () => {
    const { children } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [
      { onClick: this.handleDeleteButtonClick },
    ]);
  };

  renderDeleteButton = () => {
    const { ButtonProps, size, text } = this.props;
    return (
      <Button
        variant={VARIANTS.OUTLINE}
        size={size}
        square
        dense
        title="Delete"
        color="alert"
        onClick={this.handleDeleteButtonClick}
        {...ButtonProps}
      >
        {text}
      </Button>
    );
  };

  renderDeleteDialog = () => {
    const { open } = this.state;
    return (
      <DeleteConfirmationDialog
        open={open}
        onConfirm={this.handleDialogConfirmClick}
        onCancel={this.handleDialogCancelClick}
        {...omit(this.props, ['onClick', 'ButtonProps'])}
      />
    );
  };

  renderIconButton = () =>
    this.props.simple
      ? this.renderDeleteSimpleIconButton()
      : this.renderDeleteIconButton();

  renderButton = () => {
    const { renderProp } = this.props;
    if (renderProp) return this.renderProp();
    return this.props.iconButton
      ? this.renderIconButton()
      : this.renderDeleteButton();
  };

  render = () => (
    <>
      {this.renderButton()}
      {this.renderDeleteDialog()}
    </>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  ButtonProps: PropTypes.object,
  cancelTimeoutMs: PropTypes.number,
  size: PropTypes.string,
  text: PropTypes.string,
  iconButton: PropTypes.bool,
  children: PropTypes.any,
  renderProp: PropTypes.bool,
  simple: PropTypes.bool,
};

DeleteButton.defaultProps = {
  onClick: () => {},
  ButtonProps: {},
  cancelTimeoutMs: 7000,
  size: 'extraSmall',
  iconButton: true,
  text: 'Delete',
};

export default DeleteButton;
