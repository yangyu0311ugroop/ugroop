/*
 *
 * UpcomingTours
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

function UpcomingTours() {
  return (
    <div>
      <Helmet
        title="UpcomingTours"
        meta={[
          { name: 'description', content: 'Description of UpcomingTours' },
        ]}
      />
      <h1>UpcomingTours</h1>
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
)(UpcomingTours);
