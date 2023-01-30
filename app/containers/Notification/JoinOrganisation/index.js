/*
 *
 * JoinOrganisation
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import UGCardHeaderImage from 'ugcomponents/Card/UGCardHeaderImage/index';

function JoinOrganisation({ data }) {
  return (
    <div className="container">
      <h3>
        {data.senderName || 'Someone'} from{' '}
        {data.organisationName || 'an organisation'} invite you to join as{' '}
        {data.role || 'staff'}
      </h3>
      <h5>
        See the spectacular sights and historical highlights of Kyoto and
        Hiroshoma on a 3-day self-guided tour of two of Japan’s most famous
        cities.
      </h5>
      <UGCardHeaderImage
        borderColors={['green', 'blue', 'purple']}
        images={data.photos}
      />
    </div>
  );
}

JoinOrganisation.propTypes = {
  data: PropTypes.object,
};

JoinOrganisation.defaultProps = {
  data: {},
};

export default JoinOrganisation;
