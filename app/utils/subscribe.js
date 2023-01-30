import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import createResaga from 'resaga';
import omit from 'lodash/omit';

export class ResagaSubscriber extends PureComponent {
  static propTypes = {
    // hoc

    // parent
    subscribe: PropTypes.func,

    // resaga

    children: PropTypes.func,
  };

  static defaultProps = {
    children: undefined,
    subscribe: undefined,
  };

  componentDidMount = () => {
    const props = this.getSubscribedValues();
    this.executeSubscribeFunction(props);
  };

  getSubscribedValues = () =>
    omit(this.props, ['resaga', 'children', 'subscribe']);

  executeSubscribeFunction = props => {
    if (typeof this.props.subscribe === 'function') this.props.subscribe(props);
  };

  render = () => {
    const props = this.getSubscribedValues();
    if (typeof this.props.children === 'function')
      return this.props.children(props);
    return null;
  };
}

export const createResagaSubscriber = config => {
  ResagaSubscriber.displayName = 'ResagaSubscriber';
  return createResaga(config)(ResagaSubscriber);
};
