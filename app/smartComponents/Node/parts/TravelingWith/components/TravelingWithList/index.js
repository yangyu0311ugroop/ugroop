import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { NODESTORE_HOOKS } from 'datastore/nodeStore/hooks';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Name from 'smartComponents/Node/parts/Name';
import Status from 'smartComponents/Node/parts/Status';
import { PARTICIPANT } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';

export const TravelingWithList = memo(props => {
  const travelWiths = NODESTORE_HOOKS.useNodeGetTravelingWith(props.id);

  const participantsTravelingWith = travelWiths.map(travelWith => (
    <GridItem xs={12} md={4} key={`${travelWith[1]}`}>
      <GridContainer alignItems="center">
        <GridItem xs>
          <GridContainer alignItems="center" card elevation={1} cardPadding={0}>
            <GridItem>
              <Name id={travelWith[1]} variant={VARIANTS.AVATAR} />
            </GridItem>
            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <JText bold>
                    <Name id={travelWith[1]} variant={VARIANTS.TEXT_ONLY} />
                  </JText>
                </GridItem>
                <GridItem>
                  <JText>
                    <Status type={PARTICIPANT} id={travelWith[1]} />
                  </JText>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </GridItem>
  ));
  return <GridContainer>{participantsTravelingWith}</GridContainer>;
});

TravelingWithList.propTypes = {
  id: PropTypes.number,
};

export default TravelingWithList;
