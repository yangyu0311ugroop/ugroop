import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { compose } from 'redux';
import resaga from 'resaga';
import Notification from '../Parts/Notification';
import ParticipantAccess from '../Parts/ParticipantAccess';
import TourStatus from '../Parts/TourStatus';
import Adminstration from '../Parts/Adminstration';
import { CONFIG } from './config';
import styles from './styles';

export class Content extends PureComponent {
  render = () => {
    const { id } = this.props;
    return (
      <GridContainer direction="column">
        <GridItem>
          <Notification id={id} />
        </GridItem>
        <GridItem>
          <ParticipantAccess id={id} />
        </GridItem>
        <GridItem>
          <TourStatus id={id} />
        </GridItem>
        <GridItem>
          <Adminstration id={id} />
        </GridItem>
      </GridContainer>
    );
  };
}

Content.propTypes = {
  id: PropTypes.number,
};

Content.defaultProps = {};
export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG),
)(Content);
