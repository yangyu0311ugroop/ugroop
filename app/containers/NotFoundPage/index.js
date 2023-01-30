/* eslint-disable react/prefer-stateless-function */
/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import ErrorPages from 'ugcomponents/ErrorPages';
import Header from 'ugcomponents/Layout/AuthenticatedLayout/Header/index';
import { CONFIG } from './config';

export class NotFound extends PureComponent {
  render() {
    let header;
    if (this.props.account) {
      header = <Header showLeftMenu={false} />;
    }
    return (
      <div>
        {header}
        <ErrorPages error="404" type="page" />
      </div>
    );
  }
}

NotFound.propTypes = {
  // resaga
  account: PropTypes.bool.isRequired,
};

export default resaga(CONFIG)(NotFound);
