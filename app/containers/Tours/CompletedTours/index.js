/*
 *
 * CompletedTours
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

function CompletedTours() {
  return (
    <div>
      <Helmet
        title="CompletedTours"
        meta={[
          { name: 'description', content: 'Description of CompletedTours' },
        ]}
      />
      <h1>CompletedTours</h1>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(CompletedTours);
