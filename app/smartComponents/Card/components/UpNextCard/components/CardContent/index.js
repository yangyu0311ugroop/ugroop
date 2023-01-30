import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import { USER_API_HELPERS } from 'apis/components/User/helpers';
import { USER_PREFERENCE } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Header from 'smartComponents/Card/parts/Header';
import { LoadingText } from 'ugcomponents/Progress';
import { H4 } from 'viewComponents/Typography';
import EventContainer from 'containers/Templates/TemplateManagement/components/EventContainer';

import Time from '../Time';
import { CONFIG, USER_ID_CONFIG } from './config';
import styles from './styles';

export class UpNextCardRenderer extends PureComponent {
  renderHeader = () => (
    <Header
      renderIcon="lnr-clock3"
      iconColor="warning"
      renderTitle={
        <GridContainer>
          <GridItem>
            <H4 dense weight="bold">
              Up Next
            </H4>
          </GridItem>
          <GridItem>
            <H4 dense>-</H4>
          </GridItem>
          <GridItem>
            <H4 dense>7 days</H4>
          </GridItem>
        </GridContainer>
      }
      onClickToggle={USER_API_HELPERS.updateUserPreference(
        this.props.resaga,
        USER_PREFERENCE.DASH_BOARD_UP_NEXT,
        (!this.props.open).toString(),
        this.props.userId,
      )}
      expanded={this.props.open}
      isLoading={this.props.updateUserPreference}
    />
  );

  renderEmpty = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.empty}>Nothing to see yet</div>
      </div>
    );
  };

  renderLoading = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.empty}>
          <LoadingText />
        </div>
      </div>
    );
  };

  renderTimes = () => {
    const {
      times,
      fetchUserRelatedTemplates,
      fetchTimes,
      fetchEvents,
    } = this.props;

    if (
      (!Array.isArray(times) || !times.length) &&
      (fetchUserRelatedTemplates || fetchTimes || fetchEvents)
    ) {
      return this.renderLoading();
    }

    if (!Array.isArray(times) || !times.length) {
      return this.renderEmpty();
    }

    return times.map((time, index) => (
      <Time
        key={time}
        id={time}
        prevId={index > 0 ? times[index - 1] : undefined}
        first={index === 0}
        last={index === times.length - 1}
      />
    ));
  };

  renderProp = () => {
    const { classes, times, children } = this.props;

    const content = (
      <>
        <EventContainer />
        <GridContainer spacing={0} direction="column" className={classes.root}>
          <GridItem>{this.renderTimes()}</GridItem>
        </GridContainer>
      </>
    );

    return children({ array: times, content });
  };

  render = () => {
    const { classes, showHeader, fixHeight, open, children } = this.props;

    if (typeof children === 'function') {
      return this.renderProp();
    }

    return (
      <>
        <EventContainer />
        <GridContainer spacing={0} direction="column" className={classes.root}>
          {showHeader && <GridItem>{this.renderHeader()}</GridItem>}
          <GridItem>
            <Collapse in={open} transitionduration="auto" unmountOnExit>
              <GridContainer spacing={0}>
                <GridItem
                  xs={12}
                  className={classnames({ [classes.fixHeight]: fixHeight })}
                >
                  {this.renderTimes()}
                </GridItem>
              </GridContainer>
            </Collapse>
          </GridItem>
        </GridContainer>
      </>
    );
  };
}

UpNextCardRenderer.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  fixHeight: PropTypes.bool,
  fetchTimes: PropTypes.bool,
  fetchEvents: PropTypes.bool,
  children: PropTypes.func,

  // resaga props
  times: PropTypes.array,
  open: PropTypes.bool,
  updateUserPreference: PropTypes.bool,
  showHeader: PropTypes.bool,
  userId: PropTypes.number,
  fetchUserRelatedTemplates: PropTypes.bool,
};

UpNextCardRenderer.defaultProps = {
  times: [],
  fixHeight: false,
  fetchTimes: false,
  open: true,
  updateUserPreference: false,
  userId: 0,
  fetchUserRelatedTemplates: false,
};

export default compose(
  withStyles(styles, { name: 'UpNextCardRenderer' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(UpNextCardRenderer);
