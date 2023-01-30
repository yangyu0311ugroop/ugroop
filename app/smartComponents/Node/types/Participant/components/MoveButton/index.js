import React, { PureComponent } from 'react';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import PropTypes from 'prop-types';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import InterestedPersons from 'smartComponents/Node/logics/InterestedPersons';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DEFAULT } from 'appConstants';
import InterestedMenuItem from './components/InterestedMenuItem';

export class MoveButton extends PureComponent {
  state = {
    anchorEl: null,
  };

  componentWillUnmount = () => {
    clearTimeout(this.handleMenuClose);
  };

  handleMenuAction = ev => {
    if (this.state.anchorEl) {
      this.handleMenuClose();
    } else {
      this.setState({
        anchorEl: ev.currentTarget,
      });
    }
  };

  handleMenuClose = () =>
    setTimeout(() => this.setState({ anchorEl: null }), 100);

  renderButton = () => {
    const text = LOGIC_HELPERS.ifElse(
      this.props.variant === VARIANTS.LINK,
      'Link',
      'Move',
    );
    const title = LOGIC_HELPERS.ifElse(
      this.props.variant === VARIANTS.LINK,
      'Link to a follower',
      'Move to Other Follower',
    );
    return (
      <Button
        size="extraSmall"
        color="primary"
        onClick={this.handleMenuAction}
        variant={VARIANTS.INLINE}
        tooltipProps={{
          title,
        }}
      >
        {text}
      </Button>
    );
  };

  handleOpenDialog = id => () => {
    const { openDialog } = this.props;
    openDialog(id)();
    this.handleMenuClose();
  };

  renderMenuItem = interested => {
    const { parentId } = this.props;
    if (interested.length === 1) {
      return <MenuItem>No Other Followers</MenuItem>;
    }

    return interested.map(id => (
      <InterestedMenuItem
        key={id}
        id={id}
        variant={VARIANTS.MENU_ITEM}
        participantParentId={parentId}
        openDialog={this.handleOpenDialog}
      />
    ));
  };

  renderMove = () => {
    const { anchorEl } = this.state;
    const { templateId } = this.props;

    return (
      <React.Fragment>
        <Popper
          placement="bottom-start"
          renderButton={this.renderButton}
          onClose={this.handleMenuClose}
          anchorEl={anchorEl}
        >
          <InterestedPersons templateId={templateId} move>
            {this.renderMenuItem}
          </InterestedPersons>
        </Popper>
      </React.Fragment>
    );
  };

  renderUnlink = () => {
    const { openDialog, templateId } = this.props;
    return (
      <React.Fragment>
        <Button
          size="extraSmall"
          color="primary"
          onClick={openDialog(templateId)}
          variant={VARIANTS.INLINE}
          tooltipProps={{
            title: 'Unlink this participant',
          }}
        >
          Unlink
        </Button>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.MOVE]: this.renderMove(),
      [VARIANTS.UNLINK]: this.renderUnlink(),
      [DEFAULT]: this.renderMove(),
    });
  };
}

MoveButton.propTypes = {
  templateId: PropTypes.number,
  parentId: PropTypes.number,
  openDialog: PropTypes.func,
  variant: PropTypes.string,
};

export default MoveButton;
