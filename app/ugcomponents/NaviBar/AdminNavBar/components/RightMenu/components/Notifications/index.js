import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import first from 'lodash/first';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NotificationViewCard from 'smartComponents/Card/NotificationViewCard';
import ContentWrapper from 'smartComponents/Card/NotificationViewCard/components/Content/wrapper';
import Icon from 'ugcomponents/Icon';
import NavItem from 'ugcomponents/NaviBar/AdminNavBar/components/NavItem';
import { CONFIG, CONFIG2 } from './config';

export class Notifications extends PureComponent {
  renderTooltip = () => {
    const { ids } = this.props;

    return <ContentWrapper id={first(ids)} simple />;
  };

  renderButton = ({ openMenu }) => (
    <GridContainer alignItems="center" onClick={openMenu}>
      <GridItem>
        <Icon icon="lnr-alarm" />
      </GridItem>
    </GridContainer>
  );

  renderMenu = ({ closeMenu }) => (
    <NotificationViewCard onClose={closeMenu} fixWidth />
  );

  render = () => {
    const { count } = this.props;

    return (
      <NavItem
        title="Notifications"
        count={count}
        renderTooltip={this.renderTooltip}
        popper
        renderButton={this.renderButton}
        renderMenu={this.renderMenu}
      />
    );
  };
}

Notifications.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  ids: PropTypes.array,
  count: PropTypes.number,
};

Notifications.defaultProps = {
  ids: [],
  count: 0,
};

export default compose(
  // withStyles(styles, { name: 'Notifications' }),
  resaga(CONFIG),
  resaga(CONFIG2),
)(Notifications);
