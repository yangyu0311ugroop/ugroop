import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  BTN_ITEMS_TOUR_INDEX,
  DEFAULT_VIEW_TOUR_INDEX,
} from 'containers/Templates/constants';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { withRouter } from 'react-router-dom';
import GroupButton from 'ugcomponents/Buttons/GroupButton';

import { CONFIG } from './config';
import styles from './styles';

export class LayoutControl extends PureComponent {
  componentWillMount = () => {
    const queryParam = parseQueryParam(this.props.search);
    this.onInitReduxView(queryParam);
  };

  onInitReduxView = queryParams => {
    const { view, location, history } = this.props;
    const copyQueryParam = queryParams;
    const pathname = location.pathname;

    if (queryParams.view && view === '') {
      this.props.resaga.setValue({
        view: queryParams.view,
      });
    } else if (!queryParams.view && view !== '') {
      copyQueryParam.view = view;
      const stringifiedParam = stringifyParam(copyQueryParam);
      history.replace(`${pathname}?${stringifiedParam}`);
    } else if (queryParams.view && view !== '') {
      this.props.resaga.setValue({
        view: queryParams.view,
      });
    } else {
      copyQueryParam.view = DEFAULT_VIEW_TOUR_INDEX;
      const stringifiedParam = stringifyParam(copyQueryParam);
      history.replace(`${pathname}?${stringifiedParam}`);
      this.props.resaga.setValue({
        view: DEFAULT_VIEW_TOUR_INDEX,
      });
    }
  };

  onLayoutChange = val => {
    const { location } = this.props;
    const qsParsed = parseQueryParam(this.props.search);
    const pathname = location.pathname;
    qsParsed.view = val;
    const stringifiedParam = stringifyParam(qsParsed);
    this.props.history.replace(`${pathname}?${stringifiedParam}`);
    this.props.resaga.setValue({
      view: val,
    });
  };

  render = () => (
    <GroupButton
      btnItems={BTN_ITEMS_TOUR_INDEX}
      initSelected={this.props.view}
      onClick={this.onLayoutChange}
    />
  );
}

LayoutControl.propTypes = {
  // hoc props
  history: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object,
  // parent props

  // resaga props
  view: PropTypes.string,
  search: PropTypes.string,
};

LayoutControl.defaultProps = {
  view: '',
  search: '',
  location: {},
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'LayoutControl' }),
  resaga(CONFIG),
)(LayoutControl);
