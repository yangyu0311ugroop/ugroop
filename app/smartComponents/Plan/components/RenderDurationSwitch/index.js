import React from 'react';
import GridItem from '../../../../components/GridItem';
import Header from '../Header';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';

const RenderDurationSwitch = props => {
  const { showDurationSwitch } = props;
  const header = (
    <GridItem>
      <Header onChange={props.handleInterval} interval={props.intervalState} />
    </GridItem>
  );
  return LOGIC_HELPERS.ifElse(showDurationSwitch, header, null);
};

export default RenderDurationSwitch;
