import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import DayDateDisplay from 'containers/Templates/TemplateManagement/components/DayDateDisplay';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem';
import { H4 } from 'viewComponents/Typography';
import { withStyles } from 'components/material-ui';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Itinerary extends PureComponent {
  render() {
    const { id, classes, index, content, location } = this.props;

    const title = content || 'No Title';
    const place = LOGIC_HELPERS.ifElse(
      location,
      <React.Fragment>
        {' '}
        | <strong>{location}</strong>
      </React.Fragment>,
      null,
    );
    const dayInfo = (
      <H4 className={classes.text} dense>
        {title}
        {place}
      </H4>
    );
    return (
      <GridContainer spacing={0}>
        <GridItem md={12} sm={12}>
          <DayDateDisplay
            id={id}
            index={index - 1}
            customClass={classes}
            displayInfo={dayInfo}
            dayDateFormat={FORMATS_DATE_TIME.DAY_DATE_SHORT}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

Itinerary.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,

  // resaga props
  content: PropTypes.string,
  location: PropTypes.string,
};

Itinerary.defaultProps = {
  content: '',
  location: '',
};

export default compose(
  withStyles(styles, { name: 'Itinerary' }),
  resaga(CONFIG),
)(Itinerary);
