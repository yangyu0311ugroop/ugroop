import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Node from 'smartComponents/Node/index';
import { CHECKITEM } from 'utils/modelConstants';

export class Checkitems extends PureComponent {
  renderEmpty = () => {
    const { showPlaceholder } = this.props;

    if (!showPlaceholder) {
      return null;
    }

    return <i>There are no tasks in this checklist</i>;
  };

  render = () => {
    const { checklists, ...props } = this.props;

    if (!checklists.length) {
      return this.renderEmpty();
    }

    return checklists.map((checkitemId, index) => (
      <Node
        key={checkitemId}
        id={checkitemId}
        index={index}
        type={CHECKITEM}
        {...props}
      />
    ));
  };
}

Checkitems.propTypes = {
  // hoc props

  // parent props
  checklists: PropTypes.array,
  showPlaceholder: PropTypes.bool,

  // resaga props
};

Checkitems.defaultProps = {
  checklists: [],
  showPlaceholder: false,
};

export default Checkitems;
