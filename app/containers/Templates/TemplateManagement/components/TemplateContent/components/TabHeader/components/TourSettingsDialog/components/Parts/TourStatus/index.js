import JText from 'components/JText';
import React from 'react';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import Status from 'smartComponents/Node/parts/Status';
import { VARIANTS } from 'variantsConstants';
import PropTypes from 'prop-types';

export class TourStatus extends React.PureComponent {
  render = () => {
    const { id } = this.props;
    return (
      <GridItem>
        <GridContainer card highlight direction="column" spacing={2}>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText dark lg>
                  Travel Status
                </JText>
              </GridItem>
              <GridItem>
                <JText gray nowrap={false}>
                  Cancel or re-activate.
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <Status id={id} variant={VARIANTS.EDITABLE} />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

TourStatus.propTypes = {
  id: PropTypes.number,
};

TourStatus.defaultProps = {};

export default TourStatus;
