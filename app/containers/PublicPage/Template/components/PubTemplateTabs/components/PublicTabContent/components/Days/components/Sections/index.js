import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import RenderActivity from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/RenderActivity';
import { CONFIG } from './config';
import styles from './styles';

export class Sections extends PureComponent {
  renderSection = () => {
    let children;
    const { sections, dayId } = this.props;
    if (sections && sections.length > 0) {
      children = sections.map(id => (
        <RenderActivity key={id} dayId={dayId} activityId={id} isReadOnly />
      ));
    }
    return children;
  };

  render = () => {
    const { classes } = this.props;
    const children = this.renderSection();

    if (!children) {
      return null;
    }

    return (
      <GridContainer spacing={0}>
        <GridItem className={classes.section}>{children}</GridItem>
      </GridContainer>
    );
  };
}

Sections.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  dayId: PropTypes.number.isRequired,
  // resaga props
  sections: PropTypes.array,
};

Sections.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Sections' }),
  resaga(CONFIG),
)(Sections);
