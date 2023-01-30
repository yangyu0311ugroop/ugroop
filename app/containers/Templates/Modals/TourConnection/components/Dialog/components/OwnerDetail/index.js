import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { LINK } from 'appConstants';
import { H5 } from 'viewComponents/Typography';
import { CreatedBy, CreatedAt } from 'smartComponents/Node/parts';
import m from './messages';

export class OwnerDetail extends React.PureComponent {
  renderNodePart = (Component, variant, props = {}) => {
    const { id } = this.props;
    return <Component id={id} variant={variant} {...props} />;
  };

  render = () => (
    <H5 dense>
      <M
        {...m.description}
        values={{
          by: this.renderNodePart(CreatedBy, LINK),
          at: this.renderNodePart(CreatedAt),
        }}
      />
    </H5>
  );
}

OwnerDetail.propTypes = {
  // parent
  id: PropTypes.number,
};

OwnerDetail.defaultProps = {
  id: null,
};

export default OwnerDetail;
