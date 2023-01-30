import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import RenderActivity from './Components/RenderActivity';
import { CONFIG } from './config';
import styles from './styles';

export class Sections extends PureComponent {
  renderSection = () => {
    let section;
    const { sectionIds, dayId, classes } = this.props;
    if (sectionIds && sectionIds.length > 0) {
      section = sectionIds.map(id => (
        <div key={id} className={classes.root}>
          <RenderActivity dayId={dayId} activityId={id} readOnly print />
        </div>
      ));
    }
    return section;
  };

  render = () => <GridItem>{this.renderSection()}</GridItem>;
}

Sections.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  // parent props
  dayId: PropTypes.number.isRequired,
  // resaga props
  sectionIds: PropTypes.array,
};

Sections.defaultProps = {
  sectionIds: [],
};

export default compose(
  withStyles(styles, { name: 'Sections' }),
  resaga(CONFIG),
)(Sections);
