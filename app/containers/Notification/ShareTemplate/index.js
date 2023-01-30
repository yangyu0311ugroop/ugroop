/*
 *
 * ShareTemplate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// TODO: Jay based on the rule, can we refactor this to use it's own TemplateItem
import UGTemplateItem from 'containers/Templates/Components/GridView/TemplateItem';

function ShareTemplate({ data }) {
  return (
    <div className="container">
      <div>
        <div>
          <h3>Hey there,</h3>
          {data.senderName || 'Someone'} wants to share this{' '}
          {data.nodeType || 'thing'} with you
        </div>
      </div>
      <hr />
      <div>
        <div>
          <UGTemplateItem {...data} />
        </div>
      </div>
      <hr />
    </div>
  );
}

ShareTemplate.propTypes = {
  data: PropTypes.object,
};

ShareTemplate.defaultProps = {
  data: {},
};

export default ShareTemplate;
