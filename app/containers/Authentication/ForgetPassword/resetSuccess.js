/**
 * Created by Yang on 5/4/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import H4 from 'components/H4';
import UGLink from 'components/Link';
import m from './defines/messages';

function ResetSuccess({ email }) {
  return (
    <div>
      <H4>
        <M {...m.resetPasswordContentPart1} />
        <b>{email}</b>
      </H4>
      <H4>
        <UGLink to={`/login?email=${encodeURIComponent(email)}`}>
          <M {...m.login} />
        </UGLink>
      </H4>
    </div>
  );
}

ResetSuccess.propTypes = {
  email: PropTypes.string,
};

export default ResetSuccess;
