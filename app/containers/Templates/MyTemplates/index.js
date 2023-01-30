import NodeExplorer from 'containers/Templates/Components/NodeExplorer';
import { FOLDER_QUERY_PARAM } from 'containers/Templates/constants';
import PropTypes from 'prop-types';
/**
 * Created by paulcedrick on 6/15/17.
 */
import React, { PureComponent } from 'react';
import { PAGE_HELMETS } from 'appConstants';
import { compose } from 'redux';
import resaga from 'resaga';
import { Helmet } from 'react-helmet';
import { CONFIG } from './config';

export class MyTemplatePage extends PureComponent {
  static propTypes = {
    // parent

    // hoc
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // resaga
    rootNodeId: PropTypes.number,
  };

  static defaultProps = {
    rootNodeId: 0,
  };

  render = () => {
    const { rootNodeId, location, history } = this.props;
    return (
      <React.Fragment>
        <Helmet
          title={PAGE_HELMETS.MY_TOURS}
          meta={[{ name: 'description', content: 'Description of My Tours' }]}
        />
        <NodeExplorer
          rootNodeId={rootNodeId}
          currentRoute={FOLDER_QUERY_PARAM.MY_TOURS}
          location={location}
          history={history}
        />
      </React.Fragment>
    );
  };
}

export default compose(resaga(CONFIG))(MyTemplatePage);
