/*
 *
 * SharedAssets
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS } from 'appConstants';

function SharedAssets() {
  return (
    <div>
      <Helmet
        title={PAGE_HELMETS.SHARED_ASSETS}
        meta={[
          { name: 'description', content: 'Description of All Templates' },
        ]}
      />
      <h1>SharedAssets</h1>
    </div>
  );
}

export default SharedAssets;
