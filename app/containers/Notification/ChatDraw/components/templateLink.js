import { compose } from 'redux';
import React from 'react';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { CONFIG1 } from './config';
import UGLink from '../../../../components/Link';
function TemplateLink(props) {
  return (
    <UGLink to="" onClick={props.onClickLink(props.id)}>
      {props.templateName}
    </UGLink>
  );
}

TemplateLink.propTypes = {
  templateName: PropTypes.string,
  id: PropTypes.number,
  onClickLink: PropTypes.func,
};

export default compose(resaga(CONFIG1))(React.memo(TemplateLink));
