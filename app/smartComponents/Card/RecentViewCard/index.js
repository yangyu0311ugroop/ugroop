import React, { PureComponent } from 'react';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { compose } from 'redux';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import Header from 'smartComponents/Card/RecentViewCard/components/Header';
import Content from 'smartComponents/Card/RecentViewCard/components/Content';
import { USER_API_HELPERS } from 'apis/components/User/helpers';
import Collapse from '@material-ui/core/Collapse';
import { USER_PREFERENCE } from 'appConstants';
import { GET_RECENT_ACTIVITY, USER_API } from 'apis/constants';
import { CONFIG, USER_ID_CONFIG } from './config';
import styles from './styles';

export class RecentViewCard extends PureComponent {
  componentDidMount = () => {
    this.fetchRecentActivity();
  };

  fetchRecentActivity = () => {
    this.props.resaga.dispatchTo(USER_API, GET_RECENT_ACTIVITY, {});
  };

  render = () => {
    const {
      classes,
      fixHeight,
      open,
      updateUserpreferenceLoading,
      ids,
      userId,
    } = this.props;
    return (
      <div className={classes.root}>
        <GridContainer
          direction="column"
          className={classes.relative}
          spacing={0}
        >
          <Header
            onClickToggle={USER_API_HELPERS.updateUserPreference(
              this.props.resaga,
              USER_PREFERENCE.DASH_BOARD_ACTIVITY,
              (!open).toString(),
              userId,
            )}
            expanded={this.props.open}
            isLoading={updateUserpreferenceLoading}
            ids={ids}
          />
          <Collapse in={open} transitionduration="auto" unmountOnExit>
            <GridItem
              className={classnames(
                classes.body,
                fixHeight && classes.fixHeight,
              )}
            >
              <div className={classes.paddingContent}>
                <Content ids={ids} />
              </div>
            </GridItem>
          </Collapse>
        </GridContainer>
      </div>
    );
  };
}

RecentViewCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  fixHeight: PropTypes.bool,

  // resaga
  open: PropTypes.bool,
  updateUserpreferenceLoading: PropTypes.bool,
  ids: PropTypes.array,
  userId: PropTypes.number,
};
RecentViewCard.defaultProps = {
  open: true,
  updateUserpreferenceLoading: false,
  ids: [],
  userId: 0,
};

export default compose(
  withStyles(styles, { name: 'RecentViewCard' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(RecentViewCard);
