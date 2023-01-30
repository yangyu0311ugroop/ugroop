import { withStyles } from '@material-ui/core/styles';
import Popper from 'components/Popper';
import { TAB_ACTION, DEFAULT } from 'appConstants';
import { ability } from 'apis/components/Ability/ability';
import MenuItem from 'components/Popper/components/MenuItem';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { TAB_OTHER } from 'utils/modelConstants';
import { compose } from 'redux';
import resaga from 'resaga';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { CONFIG } from './config';
import styles from './styles';

export class TabOption extends PureComponent {
  renderMorePopper = ({ closeMenu }) => (
    <GridContainer direction="column" spacing={0}>
      <GridItem>
        <MenuItem
          icon="lnr-copy"
          closeMenu={closeMenu}
          onClick={this.openCopyDialog}
        >
          Copy to other travel
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          icon="lnr-move"
          closeMenu={closeMenu}
          onClick={this.openMoveDialog}
        >
          Move to other travel
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  openMoveDialog = () => {
    const { templateId, id } = this.props;
    return PORTAL_HELPERS.openCopyTabOther(
      {
        templateId,
        id,
        action: TAB_ACTION.MOVE,
      },
      this.props,
    );
  };

  canSeeMoreButton = () => ability.can('execute', TAB_OTHER);

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
    return PORTAL_HELPERS.openCopyTabOther(
      {
        templateId,
        id,
        action: TAB_ACTION.COPY,
      },
      this.props,
    );
  };

  renderMoreMenu = () => (
    <Popper
      placement="bottom-end"
      renderButton={this.renderMoreButton}
      value={this.canSeeMoreButton()}
      noPadding
    >
      {this.renderMorePopper}
    </Popper>
  );

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.POPPER]: this.renderMoreMenu,
      [DEFAULT]: this.renderMoreMenu,
    });
  };
}

TabOption.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // hoc props
  // resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  templateId: PropTypes.number,
  variant: PropTypes.string,
};

TabOption.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'CopyParticipant' }),
  resaga(CONFIG),
)(TabOption);
