import { SUB_TITLE } from 'appConstants';

import NodeProp from 'smartComponents/Node/components/NodeProp';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
// import resaga from 'resaga';
// import { CONFIG } from './config';
// import styles from './styles';

export class Subtitle extends PureComponent {
  render = () => (
    <NodeProp
      valueKey={SUB_TITLE}
      noContent="Add a short description"
      placeholder="Add a short description"
      {...this.props}
    />
  );
}

Subtitle.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,
  // parent props
  // resaga props
  // customisable props
};

Subtitle.defaultProps = {};

export default compose()(Subtitle);
// withStyles(styles, { name: 'Subtitle' }),
// resaga(CONFIG)
