/*
 *
 * OrganisationAssets
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS } from 'appConstants';

function OrganisationAssets() {
  return (
    <div>
      <Helmet
        title={PAGE_HELMETS.ORGANISATION_ASSETS}
        meta={[
          { name: 'description', content: 'Description of All Templates' },
        ]}
      />
      <h1>OrganisationAssets</h1>
    </div>
  );
}

export default OrganisationAssets;
