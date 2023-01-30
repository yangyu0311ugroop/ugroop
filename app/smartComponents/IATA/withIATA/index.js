/**
 * Created by stephenkarpinskyj on 30/7/18.
 */

import 'whatwg-fetch';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

export const withIATA = () => WrappedComponent => {
  class IATA extends React.PureComponent {
    constructor(props) {
      super(props);
      this.props = props;
      this.iata = {
        api: (params, callback) => {
          if (!this.search) {
            this.search = _.debounce(this.api, 200);
          }
          this.search(params, callback);
          this.params = params;
        },
      };
    }

    api = (params, callback) =>
      this.props.firebase.queryAirports(params.value).then(result => {
        const data = {
          city: result[0],
          name: result[1],
          iata: result[2],
        };
        if (this.params === params) {
          callback(data);
        }
      });

    render = () => <WrappedComponent iata={this.iata} {...this.props} />;
  }

  IATA.propTypes = {
    firebase: PropTypes.object.isRequired,
  };

  return IATA;
};

export default withIATA;
