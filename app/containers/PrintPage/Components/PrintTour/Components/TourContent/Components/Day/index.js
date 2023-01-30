import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dotProp from 'dot-prop-immutable';
import GridItem from 'components/GridItem/index';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { VARIANTS } from 'variantsConstants';
import Node from 'smartComponents/Node';

import styles from './styles';
import Content from './Components/Content';
import Sections from './Components/Sections';
import Events from './Components/Events';

export class Day extends PureComponent {
  renderDay = () => {
    const { dayIds, templateId } = this.props;
    const array = dayIds.map((dayId, index) => {
      const photo = dotProp.get(this.props.days, `${dayId}.photos`);
      let photoId = '';
      let isLoading = true;
      if (photo) {
        photoId = photo.length > 0 ? photo[0] : '';
        isLoading = false;
      }
      const dayIndex = index + 1;
      return (
        <div key={dayId}>
          <Content
            dayId={dayId}
            index={dayIndex}
            dayPhotoId={photoId}
            loading={isLoading}
            templateId={templateId}
          />
          <Sections dayId={dayId} />
          <Events dayId={dayId} />
          <Node id={dayId} variant={VARIANTS.LOGIC} />
        </div>
      );
    });
    return <GridItem>{array}</GridItem>;
  };

  render = () => {
    const { classes } = this.props;
    const day = this.renderDay();
    return <GridItem className={classes.colWith}>{day}</GridItem>;
  };
}

Day.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  templateId: PropTypes.number,
  // parent props
  days: PropTypes.object,
  dayIds: PropTypes.array,
  // resaga props
};

Day.defaultProps = {
  days: {},
  dayIds: [],
  templateId: 0,
};

export default compose(withStyles(styles, { name: 'Day' }))(Day);
