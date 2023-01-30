import { GET_CHECKLISTS, GET_TIMES, NODE_API, USER_API } from 'apis/constants';
import { DO_NOTHING, USER_PREFERENCE } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui/index';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { DUE_DATE_HELPERS } from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';
import { LoadingText } from 'ugcomponents/Progress';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Collapse from '@material-ui/core/Collapse';
import { USER_API_HELPERS } from 'apis/components/User/helpers';
import Header from '../../parts/Header';
import Time from './components/Time/index';
import { CONFIG, USER_ID_CONFIG } from './config';
import styles from './styles';

export class ChecklistCard extends PureComponent {
  componentDidMount = () => {
    this.props.resaga.dispatchTo(USER_API, GET_CHECKLISTS, {
      onSuccess: this.handleGetTimes,
    });
  };

  handleGetTimes = results => {
    const { checklistIds } = results;
    if (Array.isArray(checklistIds) && checklistIds.length) {
      return this.props.resaga.dispatchTo(NODE_API, GET_TIMES, {
        payload: { ids: checklistIds },
        onSuccess: this.handleGetTimesSuccess,
      });
    }

    return DO_NOTHING;
  };

  timeReducer = nodes => (accumulate, key) => {
    const start = get(nodes, `${key}.calculated.time.start.value`);
    const mode = get(nodes, `${key}.calculated.time.start.mode`);
    const real = get(nodes, `${key}.calculated.time.start.real`);

    if (!start || !real || DUE_DATE_HELPERS.isUnset(mode)) {
      return accumulate;
    }

    if (!Array.isArray(accumulate[start])) {
      return { ...accumulate, [start]: [key] };
    }

    return { ...accumulate, [start]: accumulate[start].concat(key) };
  };

  handleGetTimesSuccess = nodes => {
    const timeNodes = Object.keys(nodes).reduce(this.timeReducer(nodes), {});

    this.props.resaga.setValue({
      timeNodes,
      times: Object.keys(timeNodes).sort(),
    });
  };

  renderHeader = () => (
    <Header
      renderIcon="lnr-clock3"
      iconColor="warning"
      renderTitle="Up Next"
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
    const { times, fetchChecklists, fetchTimes } = this.props;

    if (fetchChecklists || fetchTimes) {
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
      />
    ));
  };

  render = () => {
    const { classes, fixHeight, open } = this.props;

    return (
      <GridContainer direction="column" className={classes.root}>
        <GridItem>{this.renderHeader()}</GridItem>
        <Collapse in={open} transitionduration="auto" unmountOnExit>
          <GridItem
            className={classnames(
              classes.body,
              LOGIC_HELPERS.ifElse(fixHeight, classes.fixHeight),
            )}
          >
            <div className={classes.paddingFooter}>{this.renderTimes()}</div>
          </GridItem>
        </Collapse>
      </GridContainer>
    );
  };
}

ChecklistCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  fixHeight: PropTypes.bool,
  fetchChecklists: PropTypes.bool,
  fetchTimes: PropTypes.bool,

  // resaga props
  times: PropTypes.array,
  open: PropTypes.bool,
  updateUserPreference: PropTypes.bool,
  userId: PropTypes.number,
};

ChecklistCard.defaultProps = {
  times: [],
  fixHeight: false,
  fetchChecklists: false,
  fetchTimes: false,
  open: true,
  updateUserPreference: false,
  userId: 0,
};

export default compose(
  withStyles(styles, { name: 'ChecklistCard' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(ChecklistCard);
