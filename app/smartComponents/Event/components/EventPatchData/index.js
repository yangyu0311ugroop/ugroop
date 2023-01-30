/**
 * Created by stephenkarpinskyj on 13/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import Type from '../Event/parts/Event/Type';
import Subtype from '../Event/parts/Event/Subtype';
import NodeType from '../Event/parts/Event/NodeType';

export class EventPatchData extends React.PureComponent {
  renderPart = Component => (
    <Component variant={EVENT_CONSTANTS.VARIANTS.data} {...this.props} />
  );

  renderNode = () => {
    const { id } = this.props;
    return !!id && <React.Fragment>{this.renderPart(NodeType)}</React.Fragment>;
  };

  renderData = () => {
    const { dataId, subtype } = this.props;
    return (
      !!dataId && (
        <React.Fragment>
          {this.renderPart(Type)}
          {subtype && this.renderPart(Subtype)}
        </React.Fragment>
      )
    );
  };

  render = () => (
    <React.Fragment>
      {this.renderNode()}
      {this.renderData()}
    </React.Fragment>
  );
}

EventPatchData.propTypes = {
  // parent
  id: PropTypes.number,
  dataId: PropTypes.number,
  subtype: PropTypes.bool,
};

EventPatchData.defaultProps = {
  id: 0,
  dataId: 0,
  subtype: false,
};

export default EventPatchData;
