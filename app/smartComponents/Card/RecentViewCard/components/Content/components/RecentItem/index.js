import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { HIDE_RECENT_ACTIVITY, USER_API } from 'apis/constants';
import NodeContent from 'smartComponents/Node/parts/Content';
import { LINK } from 'appConstants';
import ActionIcon from 'smartComponents/RecentActivity/parts/ActionIcons';
import LastUpdateAt from 'smartComponents/RecentActivity/parts/LastUpdateAt';
import styles from './styles';

export class RecentItem extends PureComponent {
  state = {
    loading: false,
  };

  onLoading = loading => () => this.setState({ loading });

  onHideRecentActivity = () => {
    const { id: nodeId } = this.props;
    const payload = { nodeId };
    this.onLoading(true)();
    this.props.resaga.dispatchTo(USER_API, HIDE_RECENT_ACTIVITY, {
      payload,
      onSuccess: this.onLoading(false),
    });
  };

  render() {
    const { loading } = this.state;
    const { id, classes } = this.props;

    return (
      <GridItem key={id}>
        <GridContainer className={classes.item}>
          <GridItem>
            <ActionIcon
              id={id}
              variant={VARIANTS.BUTTON}
              onClick={this.onHideRecentActivity}
              loading={loading}
            />
          </GridItem>
          <GridItem className={classes.grow}>
            <NodeContent id={id} variant={LINK} /> <LastUpdateAt id={id} />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  }
}

RecentItem.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
};

export default compose(
  withStyles(styles, { name: 'RecentItem' }),
  resaga(),
)(RecentItem);
