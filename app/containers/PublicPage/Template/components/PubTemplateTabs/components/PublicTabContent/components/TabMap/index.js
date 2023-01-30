import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import { compose } from 'redux';
import TabMapView from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabMapView';

import styles from './styles';

export class TabMap extends PureComponent {
  render = () => {
    const { classes, tabId } = this.props;

    return (
      <div className={classes.container}>
        <TabMapView tabId={tabId} />
      </div>
    );
  };
}

TabMap.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  tabId: PropTypes.number,
};

export default compose(withStyles(styles, { name: 'PublicTabMap' }))(TabMap);
