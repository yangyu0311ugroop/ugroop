import {
  EVENTS_API,
  GET_EVENTS_BY_ID,
  GET_TIMES,
  GET_USER_RELATED_TEMPLATES,
  NODE_API,
  USER_API,
} from 'apis/constants';
import { DO_NOTHING } from 'appConstants';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { DUE_DATE_HELPERS } from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';
import {
  CONFIG,
  USER_ID_CONFIG,
} from 'smartComponents/Card/components/UpNextCard/config';
import CardContent from './components/CardContent';

export class UpNextCardContainer extends PureComponent {
  componentDidMount = () => {
    this.props.resaga.dispatchTo(USER_API, GET_USER_RELATED_TEMPLATES, {
      payload: { activeOnly: true },
      onSuccess: this.handleGetTimes(this.handleGetTimesSuccess),
    });
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

  handleFilterNode = (nodes, excludedIds) => (acc, value) => {
    const id = Number(value);
    if (excludedIds.includes(id)) {
      return acc;
    }

    return { ...acc, [value]: nodes[value] };
  };

  handleGetTimesSuccess = ({ templateIds, eventIds, excludedIds }) => (
    nodes = {},
  ) => {
    const filteredNodes = Object.keys(nodes).reduce(
      this.handleFilterNode(nodes, excludedIds),
      {},
    );

    const timeNodes = Object.keys(filteredNodes).reduce(
      this.timeReducer(nodes),
      {},
    );

    if (eventIds.length > 0) {
      this.props.resaga.dispatchTo(EVENTS_API, GET_EVENTS_BY_ID, {
        payload: {
          ids: templateIds,
        },
      });
    }

    this.props.resaga.setValue({
      timeNodes,
      times: Object.keys(timeNodes).sort(),
    });
  };

  handleGetTimes = onSuccess => results => {
    const { checklistIds, templateIds, tabtimelineIds, eventIds } = results;
    const ids = [
      ...checklistIds,
      ...templateIds,
      ...tabtimelineIds,
      ...eventIds,
    ];

    if (ids.length > 0) {
      return this.props.resaga.dispatchTo(NODE_API, GET_TIMES, {
        payload: {
          ids,
        },
        onSuccess: onSuccess({
          templateIds,
          eventIds,
          excludedIds: [...eventIds, ...tabtimelineIds, ...templateIds],
        }),
      });
    }

    this.props.resaga.setValue({
      timeNodes: {},
      times: [],
    });
    return DO_NOTHING;
  };

  render = () => <CardContent {...this.props} />;
}

UpNextCardContainer.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

UpNextCardContainer.defaultProps = {};

export default compose(
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
)(UpNextCardContainer);
