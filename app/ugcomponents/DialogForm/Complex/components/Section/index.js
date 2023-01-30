/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpandMoreIcon,
} from 'components/material-ui';
import { H3 } from 'viewComponents/Typography';
import stylesheet from './styles';

export const Section = ({ classes, children, title, ExpansionPanelProps }) => (
  <ExpansionPanel
    classes={{ expanded: classes.panelExpanded }}
    {...ExpansionPanelProps}
  >
    <ExpansionPanelSummary
      classes={{
        root: classes.summaryRoot,
        content: classes.summaryContent,
      }}
      expandIcon={<ExpandMoreIcon />}
    >
      <H3 weight="bold" dense>
        {title}
      </H3>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails classes={{ root: classes.detailsRoot }}>
      {children}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

Section.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any.isRequired,
  title: PropTypes.any.isRequired,
  ExpansionPanelProps: PropTypes.object,
};

Section.defaultProps = {
  ExpansionPanelProps: {
    defaultExpanded: true,
  },
};

export default withStyles(stylesheet, { name: 'ComplexDialogFormSection' })(
  Section,
);
