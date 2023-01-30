import { DATA_HELPERS } from 'datastore/utils';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Dialog from './components/Dialog';
import { CONFIG } from './config';

export class Portal extends PureComponent {
  closePortal = id => {
    this.props.resaga.setValue({
      portalIds: DATA_HELPERS.arrayRemove(id),
      portalData: DATA_HELPERS.objectRemove(id),
    });
  };

  render = () => {
    const { portalIds } = this.props;

    return portalIds.map(portalId => (
      <Dialog key={portalId} portalId={portalId} onClose={this.closePortal} />
    ));
  };
}

Portal.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
  portalIds: PropTypes.array,
};

Portal.defaultProps = {
  portalIds: [],
};

export default compose(resaga(CONFIG))(Portal);
