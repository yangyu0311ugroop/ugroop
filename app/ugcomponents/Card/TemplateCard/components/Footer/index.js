import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UGCardFooter from 'ugcomponents/Card/UGCardFooter';
import ItemDuration from './components/ItemDuration';

import styles from './styles';

export const TemplateCardFooter = ({ classes, renderActions, customData }) => (
  <UGCardFooter className={classes.templateItemFooter}>
    <ItemDuration
      startDate={customData.startDate}
      duration={customData.duration}
      weekDay={customData.weekDay}
    />
    {renderActions}
  </UGCardFooter>
);

TemplateCardFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  customData: PropTypes.object,
  renderActions: PropTypes.node,
};

TemplateCardFooter.defaultProps = {
  renderActions: '',
  customData: {},
};

export default withStyles(styles, { name: 'TemplateCardFooter' })(
  TemplateCardFooter,
);
