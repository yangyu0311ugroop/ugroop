import { INVITATION_VIEW_STORE } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import difference from 'lodash/difference';
import first from 'lodash/first';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import InvitationCard from 'ugcomponents/Card/InvitationCard';
import Icon from 'ugcomponents/Icon';
import NavItem from 'ugcomponents/NaviBar/AdminNavBar/components/NavItem';
import InvitationTooltip from './components/InvitationTooltip';
import { CONFIG } from './config';

export class Invitations extends PureComponent {
  renderTooltip = () => {
    const { ids } = this.props;

    return <InvitationTooltip token={first(ids)} />;
  };

  renderButton = ({ openMenu }) => (
    <GridContainer alignItems="center" onClick={openMenu}>
      <GridItem>
        <Icon icon="lnr-users-plus" />
      </GridItem>
    </GridContainer>
  );

  renderMenu = ({ closeMenu }) => (
    <InvitationCard
      onClose={closeMenu}
      viewStore={INVITATION_VIEW_STORE}
      fixWidth
      disablePortal
    />
  );

  render = () => {
    const { ids, exclusion } = this.props;

    const count = difference(ids, exclusion).length;

    return (
      <NavItem
        title="Invitations"
        count={count}
        renderTooltip={this.renderTooltip}
        popper
        renderButton={this.renderButton}
        renderMenu={this.renderMenu}
      />
    );
  };
}

Invitations.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  ids: PropTypes.array,
  exclusion: PropTypes.array,
};

Invitations.defaultProps = {
  ids: [],
  exclusion: [],
};

export default compose(
  // withStyles(styles, { name: 'Invitations' }),
  resaga(CONFIG),
)(Invitations);
