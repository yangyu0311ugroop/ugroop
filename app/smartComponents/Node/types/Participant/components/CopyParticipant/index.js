import { withStyles } from '@material-ui/core/styles';
import Popper from 'components/Popper';

import { Can } from 'apis/components/Ability/components/Can';
import MenuItem from 'components/Popper/components/MenuItem';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { DEFAULT } from 'appConstants';
import { ability } from 'apis/components/Ability/ability';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { PARTICIPANT } from 'utils/modelConstants';
import { compose } from 'redux';
import resaga from 'resaga';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import styles from './styles';
import { CONFIG } from './config';

export class CopyParticipant extends PureComponent {
  renderMorePopper = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      <Can do="create" on={PARTICIPANT}>
        <GridItem>
          <MenuItem
            icon="lnr-copy"
            closeMenu={closeMenu}
            onClick={this.openCopyDialog}
          >
            Copy Participant
          </MenuItem>
        </GridItem>
      </Can>
    </GridContainer>
  );

  canSeeMoreButton = () => ability.can('create', PARTICIPANT);

  renderMoreButton = ({ openMenu }) => {
    const { classes } = this.props;

    return (
      <Button
        dense
        noPadding
        size="extraSmall"
        color="black"
        className={classes.actionButton}
        onClick={openMenu}
        tooltipProps={{
          title: 'More options',
        }}
      >
        <Icon icon="lnr-ellipsis" size="small" />
      </Button>
    );
  };

  openCopyDialog = () => {
    const { templateId, id } = this.props;
    return PORTAL_HELPERS.openCopyParticipant(
      {
        templateId,
        id,
      },
      this.props,
    );
  };

  renderMoreMenu = () => {
    if (!this.canSeeMoreButton()) return null;
    return (
      <Popper
        placement="bottom-end"
        renderButton={this.renderMoreButton}
        value={this.canSeeMoreButton()}
        noPadding
      >
        {this.renderMorePopper}
      </Popper>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.POPPER]: this.renderMoreMenu,
      [DEFAULT]: this.renderMoreMenu,
    });
  };
}

CopyParticipant.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  templateId: PropTypes.number,
  variant: PropTypes.string,
};

CopyParticipant.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'CopyParticipant' }),
  resaga(CONFIG),
)(CopyParticipant);
