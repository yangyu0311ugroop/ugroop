/*
 *
 * AllAssets
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS } from 'appConstants';

function AllAssets() {
  return (
    <div>
      <Helmet
        title={PAGE_HELMETS.ALL_ASSETS}
        meta={[
          { name: 'description', content: 'Description of All Templates' },
        ]}
      />
      <h1>AllAssets</h1>
    </div>
  );
}

export default AllAssets;
