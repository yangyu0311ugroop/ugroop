import { DEFAULT } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class GoogleMap extends PureComponent {
  state = {};

  componentWillMount = () => {
    const { options } = this.props;

    this.bootstrapURLKeys = {
      key: process.env.GOOGLE_MAPS_API_KEY,
      libraries: 'places',
    };
    this.options = {
      fullscreenControl: false,
      // ...(silver
      //   ? { styles: simple ? SILVER_SIMPLE_STYLES : SILVER_STYLES }
      //   : {}),
      ...options,
    };
  };

  renderGoogleMap = () => {
    const {
      children,
      defaultCenter,
      defaultZoom,
      onGoogleApiLoaded,
      MapProps,
      onChildClick,
    } = this.props;

    return (
      <GoogleMapReact
        bootstrapURLKeys={this.bootstrapURLKeys}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        options={this.options}
        yesIWantToUseGoogleMapApiInternals={
          typeof onGoogleApiLoaded === 'function'
        }
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChildClick={onChildClick}
        {...MapProps}
      >
        {children}
      </GoogleMapReact>
    );
  };

  renderCard = () => {
    const { className } = this.props;

    return (
      <div className={classnames(className)}>{this.renderGoogleMap()}</div>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderCard,
    });
  };
}

GoogleMap.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  children: PropTypes.any,
  variant: PropTypes.string,
  onGoogleApiLoaded: PropTypes.func,
  onChildClick: PropTypes.func,

  // resaga props

  // customise props
  MapProps: PropTypes.object,
  options: PropTypes.object,
  defaultCenter: PropTypes.object,
  defaultZoom: PropTypes.number,
  className: PropTypes.string,
};

GoogleMap.defaultProps = {
  defaultCenter: { lat: -37.8319749, lng: 144.9512944 }, // melbourne
  defaultZoom: 14,

  options: {},
  MapProps: {},
};

export default compose(
  withStyles(styles, { name: 'GoogleMap' }),
  resaga(CONFIG),
)(GoogleMap);
