import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import TourConnectionDialog from './components/Dialog';
import { CONFIG } from './config';

export class TemplateTourConnection extends React.PureComponent {
  handleCloseTourConnectionDialog = () => {
    const { tourConnectionOnClose } = this.props;
    tourConnectionOnClose();
    this.props.resaga.setValue({ tourConnectionOpen: false });
  };

  render = () => {
    const {
      tourConnectionOpen,
      tourConnectionId,
      tourConnectionMode,
    } = this.props;

    if (!tourConnectionOpen) return null;

    return (
      <TourConnectionDialog
        open={tourConnectionOpen}
        id={tourConnectionId}
        mode={tourConnectionMode}
        onClose={this.handleCloseTourConnectionDialog}
      />
    );
  };
}

TemplateTourConnection.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // resaga value
  tourConnectionOpen: PropTypes.bool,
  tourConnectionId: PropTypes.number,
  tourConnectionMode: PropTypes.string,
  tourConnectionOnClose: PropTypes.func,
};

TemplateTourConnection.defaultProps = {
  tourConnectionOpen: false,
  tourConnectionId: null,
  tourConnectionMode: null,
  tourConnectionOnClose: () => {},
};

export default resaga(CONFIG)(TemplateTourConnection);
