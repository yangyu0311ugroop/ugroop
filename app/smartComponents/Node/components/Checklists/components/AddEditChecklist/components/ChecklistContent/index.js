import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import React, { PureComponent } from 'react';
import resaga from 'resaga';
import Node from 'smartComponents/Node';
import { withRouter } from 'react-router-dom';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

export class ChecklistContent extends PureComponent {
  renderDefault = () => {
    const { content, id, parentNodeId, index } = this.props;
    if (!parentNodeId) return content;
    return (
      <Node
        variant={VARIANTS.TEXT_ONLY}
        key={id}
        id={id}
        parentNodeId={parentNodeId}
        index={index}
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

ChecklistContent.propTypes = {
  // hoc props
  variant: PropTypes.string,
  id: PropTypes.number,
  parentNodeId: PropTypes.number,
  index: PropTypes.number,

  // resaga props
  content: PropTypes.string,
};

ChecklistContent.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'ChecklistContent' }),
  withRouter,
  resaga(CONFIG),
)(ChecklistContent);
