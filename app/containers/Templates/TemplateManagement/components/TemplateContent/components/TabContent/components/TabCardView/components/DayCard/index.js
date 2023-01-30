import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { isEmptyString } from 'utils/stringAdditions';
import { VARIANTS } from 'variantsConstants';

import Node from 'smartComponents/Node';
import Card from 'ugcomponents/Card';
import Image from 'containers/Templates/TemplateManagement/components/Image';

import EventIds from './components/Events/eventIds';
import Content from './components/Content';
import Activities from './components/Activities';
import Header from './components/Header';
import { CONFIG } from './config';
import styles from './styles';

export class DayCard extends PureComponent {
  renderCard = () => {
    const {
      classes,
      startDate,
      dayCount,
      id,
      photoId,
      displayDate,
      isLazyLoad,
    } = this.props;

    const photoSection = isEmptyString(photoId) ? (
      ''
    ) : (
      <GridItem>
        <Image
          photoId={this.props.photoId}
          imgClassName={classes.image}
          isLazyLoad={isLazyLoad}
        />
      </GridItem>
    );

    return (
      <Card className={classes.root}>
        <Header
          startDate={startDate}
          dayCount={dayCount}
          id={id}
          displayDate={displayDate}
        />
        <div className={classes.dayContentContainer}>
          <GridContainer
            spacing={0}
            className={classes.dayContent}
            alignItems="center"
          >
            {photoSection}
            <GridItem className={classes.grow}>
              <Content
                content={this.props.content}
                location={this.props.location}
                dayId={id}
                templateId={this.props.templateId}
              />
            </GridItem>
          </GridContainer>
          <EventIds id={id} />
          <Activities dayId={id} isLazyLoad={this.props.isLazyLoad} />
        </div>
      </Card>
    );
  };

  render = () => {
    const { id } = this.props;
    return (
      <>
        {this.renderCard()}
        <Node id={id} variant={VARIANTS.LOGIC} />
      </>
    );
  };
}

DayCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  dayCount: PropTypes.number,
  startDate: PropTypes.string,
  templateId: PropTypes.number,
  displayDate: PropTypes.string,

  // resaga props
  id: PropTypes.number,
  content: PropTypes.string,
  location: PropTypes.string,
  photoId: PropTypes.string,
  isLazyLoad: PropTypes.bool,
};

DayCard.defaultProps = {
  dayCount: 0,
  location: '',
  content: '',
  id: '',
  photoId: '',
  startDate: '',
  isLazyLoad: true,
};

export default compose(
  withStyles(styles, { name: 'DayCard' }),
  resaga(CONFIG),
)(DayCard);
