import React from 'react';
import GoogleMaps from './index';

export const withGoogleMaps = placeId => WrappedComponent => {
  class GenericGoogleMaps extends React.PureComponent {
    renderContent = prop => (
      <WrappedComponent {...this.props} googleMaps={prop} />
    );

    render = () => (
      <GoogleMaps placeId={placeId}>{this.renderContent}</GoogleMaps>
    );
  }

  GenericGoogleMaps.displayName = 'WithGoogleMaps';

  return GenericGoogleMaps;
};
