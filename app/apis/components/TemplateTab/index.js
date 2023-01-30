import {
  BATCH_GET_TEMPLATE_TAB_DETAIL,
  GET_TEMPLATE_TAB_DETAIL,
  TEMPLATE_TAB_API,
} from 'apis/constants';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga, { reducer } from 'resaga';
import injectReducer from 'utils/injectReducer';
import { CONFIG } from './config';

export class TemplateTab extends PureComponent {
  componentWillReceiveProps = nextProps => {
    this.props.resaga.analyse(nextProps, {
      [GET_TEMPLATE_TAB_DETAIL]: {
        onSuccess: this.props.resaga.setValue,
      },
      [BATCH_GET_TEMPLATE_TAB_DETAIL]: {
        onSuccess: this.props.resaga.setValue,
      },
    });
  };

  render = () => null;
}

TemplateTab.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

TemplateTab.defaultProps = {};

export default compose(
  injectReducer({ key: TEMPLATE_TAB_API, reducer: reducer(TEMPLATE_TAB_API) }),
  resaga(CONFIG),
)(TemplateTab);
