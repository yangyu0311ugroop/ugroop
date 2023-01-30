import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { compose } from 'redux';
import resaga from 'resaga';
import { withStyles } from '@material-ui/core/styles';
import TabCustomWrapper from './Components/TabCustomWrapper';
import { CONFIG, IDS_CONFIG } from './config';
import styles from './styles';

export class TourFooter extends PureComponent {
  renderCustom = () => {
    const { customTabIds, classes, tabPrintOnly } = this.props;
    const tabcustoms = customTabIds.map(customTabId => (
      <div key={customTabId}>
        <TabCustomWrapper
          tabId={Number(customTabId)}
          tabPrintOnly={tabPrintOnly}
        />
      </div>
    ));
    return <GridItem className={classes.wrapper}>{tabcustoms}</GridItem>;
  };

  renderFooter = () => {
    const { classes, customTabIds } = this.props;
    return customTabIds.length > 0 ? (
      <GridItem className={classes.grow}>{this.renderCustom()}</GridItem>
    ) : (
      ''
    );
  };

  render() {
    return <GridContainer spacing={0}>{this.renderFooter()}</GridContainer>;
  }
}

TourFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  customTabIds: PropTypes.array,
  tabPrintOnly: PropTypes.bool,
};

export default compose(
  withStyles(styles, { name: 'TourFooter' }),
  resaga(IDS_CONFIG),
  resaga(CONFIG),
)(TourFooter);
