/*
 *
 * AllAssets
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS } from 'appConstants';

function MyAssets() {
  return (
    <div>
      <Helmet
        title={PAGE_HELMETS.MY_ASSETS}
        meta={[
          { name: 'description', content: 'Description of All Templates' },
        ]}
      />
      <h1>MyAssets</h1>
    </div>
  );
}

export default MyAssets;
