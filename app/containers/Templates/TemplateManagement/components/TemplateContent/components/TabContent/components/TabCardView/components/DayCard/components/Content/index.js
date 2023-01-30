import { withStyles } from '@material-ui/core/styles';
import { TITLE } from 'appConstants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Content from 'smartComponents/Node/parts/Content';
import Location from 'ugcomponents/Inputs/Location';
import { DAY } from 'utils/modelConstants';
import { isEmptyString } from 'utils/stringAdditions';
import { CONFIG } from './config';

import styles from './styles';

export class CardContent extends PureComponent {
  openDayView = () => {
    const { dayId } = this.props;

    this.props.resaga.setValue({
      selectedId: dayId,
      layout: DAY,
    });
  };

  renderWithoutContent = () => {
    const { classes } = this.props;
    return (
      <div className={classes.noContentContainer}>
        <i>Day has no title</i>
      </div>
    );
  };

  renderWithContent = () => {
    const { classes, placeId, dayId } = this.props;
    return (
      <React.Fragment>
        <Content
          viewingClassName={classes.dayTitle}
          id={dayId}
          variant={TITLE}
          viewComponentProps={{
            onClick: this.openDayView,
            title: 'See this day in detail',
          }}
        />
        <Location
          placeId={placeId}
          location={this.props.location}
          className={classes.dayLocation}
          withWrap
        />
      </React.Fragment>
    );
  };

  render() {
    const { content, location } = this.props;
    if (isEmptyString(content) && isEmptyString(location)) {
      return null;
    }

    return this.renderWithContent();
  }
}

CardContent.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  content: PropTypes.string,
  location: PropTypes.string,
  dayId: PropTypes.number,

  // resaga
  placeId: PropTypes.string,
};

CardContent.defaultProps = {
  content: '',
  location: '',

  // resaga
  placeId: '',
};

// export default withStyles(styles, { name: 'Content' })(Content);
export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG),
)(CardContent);
