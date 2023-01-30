import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class ConnectLinksToNodes extends PureComponent {
  componentDidMount() {}

  render = () => null;
}

ConnectLinksToNodes.propTypes = {
  // hoc props
  // parent props
  // resaga props
};

ConnectLinksToNodes.defaultProps = {};

export default compose(resaga(CONFIG))(ConnectLinksToNodes);
