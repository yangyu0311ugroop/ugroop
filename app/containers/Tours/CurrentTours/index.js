/*
 *
 * CurrentTours
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';

function CurrentTours() {
  return (
    <div>
      <Helmet
        title="CurrentTours"
        meta={[{ name: 'description', content: 'Description of CurrentTours' }]}
      />
      <h1>CurrentTours</h1>
    </div>
  );
}
export default CurrentTours;
