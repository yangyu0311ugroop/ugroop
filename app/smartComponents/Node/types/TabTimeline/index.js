import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import CalculatedDuration from 'smartComponents/Node/logics/CalculatedDuration';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { CONFIG } from './config';
import ThreeColumn from './components/ThreeColumn';
import styles from './styles';

export class TabTimeline extends PureComponent {
  renderThreeColumn = () => {
    const { templateId, tabId, isPublic } = this.props;

    return (
      <>
        {!isPublic && (
          <CalculatedDuration templateId={templateId} tabId={tabId} />
        )}
        <ThreeColumn {...this.props} />
      </>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderThreeColumn,
    });
  };
}

TabTimeline.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  templateId: PropTypes.number,
  tabId: PropTypes.number,
  isPublic: PropTypes.bool,
};

TabTimeline.defaultProps = {
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'TabTimeline' }),
  resaga(CONFIG),
)(TabTimeline);
