import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function makeContainerExplorerHOC(
  ComponentToBeWrapped,
  options,
) {
  class PP extends Component {
    static propTypes = {
      resaga: PropTypes.object,
    };

    state = {
      isLoading: false,
      data: [],
      error: false,
    };

    componentWillReceiveProps = nextProps => {
      this.props.resaga.analyse(nextProps, {
        [options.action]: {
          onSuccess: this.fetchChildrenOnSuccess,
          onError: this.fetchChildrenOnError,
        },
      });
    };

    fetchChildrenOnError = () => {
      this.setState({
        error: true,
        isLoading: false,
      });
    };

    fetchChildrenOnSuccess = data => {
      this.setState({ data, isLoading: false, error: false });
    };

    fetchChildren = url => {
      this.props.resaga.dispatch(url, options.action);
    };

    resetState = () => {
      this.setState({
        isLoading: false,
        data: [],
        error: false,
      });
    };

    render = () => {
      const explorerData = {
        ...this.state,
        fetchChildren: this.fetchChildren,
        resetData: this.resetState,
      };
      return <ComponentToBeWrapped explorer={explorerData} {...this.props} />;
    };
  }

  return PP;
}
