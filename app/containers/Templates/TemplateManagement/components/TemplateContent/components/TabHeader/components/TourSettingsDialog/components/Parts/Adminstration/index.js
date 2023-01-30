import JText from 'components/JText';
import React from 'react';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';

import { VARIANTS } from 'variantsConstants';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import resaga from 'resaga';
import { withStyles } from 'components/material-ui';
import { Number, Text } from 'smartComponents/Inputs';
import { ADMIN_TOUR_SETTINGS } from 'appConstants';
import { TourSetting } from 'smartComponents/TourSettings';
import { CONFIG } from './config';
import styles from './styles';
import Hr from '../../../../../../../../../../../../components/Hr';

export class Adminstration extends React.PureComponent {
  render = () => {
    const { id, paxLabel } = this.props;
    return (
      <GridItem>
        <GridContainer card highlight direction="column" spacing={1}>
          <GridItem>
            <JText dark lg>
              Administration
            </JText>
          </GridItem>
          <GridItem>
            <TourSetting
              id={id}
              settingKey={ADMIN_TOUR_SETTINGS.TOUR_CODE}
              variant={VARIANTS.EDITABLE}
              label="Itinerary reference"
              placeholder="Enter itinerary reference"
              textComponent={Text}
            />
          </GridItem>
          <Hr half />
          <GridItem>
            <TourSetting
              id={id}
              settingKey={ADMIN_TOUR_SETTINGS.MIN_PAX}
              variant={VARIANTS.EDITABLE}
              label={`Minimum ${paxLabel}`}
              placeholder={`Enter minimum ${paxLabel}`}
              textComponent={Number}
            />
          </GridItem>
          <Hr half />
          <GridItem>
            <TourSetting
              id={id}
              settingKey={ADMIN_TOUR_SETTINGS.MAX_PAX}
              variant={VARIANTS.EDITABLE}
              label={`Maximum ${paxLabel}`}
              placeholder={`Enter maximum ${paxLabel}`}
              textComponent={Number}
            />
          </GridItem>
          <Hr half />
        </GridContainer>
      </GridItem>
    );
  };
}

Adminstration.propTypes = {
  id: PropTypes.number,
  // hoc props
  paxLabel: PropTypes.string,
};

Adminstration.defaultProps = {};

// export default Adminstration;
export default compose(
  withStyles(styles, { name: 'Adminstration' }),
  resaga(CONFIG),
)(Adminstration);
