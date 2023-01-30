import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Location from 'ugcomponents/Inputs/Location';
import GridItem from 'components/GridItem/index';
import GridContainer from 'components/GridContainer/index';
import { CONFIG } from '../../config';
import styles from './styles';

export class Header extends PureComponent {
  renderContent = () => {
    const { classes, content: title } = this.props;
    const content =
      title || "There's no description provided by the organisers.";

    return (
      <GridItem>
        <div className={classes.content}>{content}</div>
      </GridItem>
    );
  };

  renderLocation = () => {
    const { classes, icon, placeId, location } = this.props;

    if (!location) return '';
    return (
      <GridItem>
        <Location
          icon={icon}
          placeId={placeId}
          location={location}
          className={classes.location}
        />
      </GridItem>
    );
  };

  render = () => {
    const { classes } = this.props;

    const content = this.renderContent();
    const location = this.renderLocation();

    return (
      <GridContainer spacing={0} alignItems="center">
        <GridItem className={classes.grow}>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <div className={classes.content}>{content}</div>
            </GridItem>
            {location}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.number.isRequired,

  // resaga props
  content: PropTypes.string,
  icon: PropTypes.string,
  placeId: PropTypes.string,
  location: PropTypes.string,
};

Header.defaultProps = {
  content: '',
  icon: '',
  placeId: '',
  location: '',
};

export default compose(
  withStyles(styles, { name: 'Header' }),
  resaga(CONFIG),
)(Header);
