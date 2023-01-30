import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import InsurancePolicy from 'smartComponents/Person/components/InsurancePolicy';
import Create from 'smartComponents/Person/components/InsurancePolicy/components/Create';
import { withStyles } from '@material-ui/core/styles';
import EditablePlaceholder from 'viewComponents/Editable/components/Placeholder';
import Empty from 'components/Empty';
import Scroll, { scroller } from 'react-scroll';
import Box from '@material-ui/core/Box';
import m from './messages';

import styles from './styles';
import { CONFIG_1 } from './config';
import { scrollOptions } from '../../../../utils/constant';
import JText from '../../../../components/JText';

export function InsurancePolicies(props) {
  const {
    id,
    variant,
    readOnly,
    value,
    personInsurancePolicyValue,
    userInsurancePolicyValue,
  } = props;

  const renderInsurancePolicy = variantParm => idParm => (
    <GridItem key={`InsurancePolicy.${idParm}`}>
      <Scroll.Element name={`scroller-policy-${idParm}`}>
        <InsurancePolicy
          id={idParm}
          variant={variantParm}
          readOnly={readOnly}
        />
      </Scroll.Element>
    </GridItem>
  );

  const renderCreate = () => {
    if (!readOnly) {
      return <Create id={id} onSuccessCreate={onSuccessCreate} />;
    }
    return null;
  };

  const scrolling = (idParm, scrollOtion) => () => {
    scroller.scrollTo(`scroller-policy-${idParm}`, scrollOtion);
  };

  const onSuccessCreate = data => {
    const { addResult } = data;
    setTimeout(scrolling(addResult.id, scrollOptions), 100);
  };

  const renderInsurancePolicies = (variantParm = VARIANTS.EDITABLE) => {
    let data = value;
    if (!data.length)
      data = LOGIC_HELPERS.ifElse(
        personInsurancePolicyValue.length,
        personInsurancePolicyValue,
        userInsurancePolicyValue,
      );
    return (
      !!data.length && (
        <GridContainer direction="column" wrap="nowrap">
          {data.map(renderInsurancePolicy(variantParm))}
        </GridContainer>
      )
    );
  };

  const renderCard = variantParm => () => {
    const data = value;
    if (!value.length)
      return (
        <GridContainer direction="column" wrap="nowrap" card>
          <GridItem>
            <GridItem>{renderEditableLabel()}</GridItem>
          </GridItem>
          <GridItem>{renderEditablePlaceholder()}</GridItem>
        </GridContainer>
      );

    return (
      <GridContainer direction="column" wrap="nowrap">
        <GridItem>{renderEditableLabel()}</GridItem>
        {data.map(renderInsurancePolicy(variantParm))}
      </GridContainer>
    );
  };

  const renderEditableLabel = () => (
    <GridContainer wrap="nowrap" alignItems="baseline">
      <GridItem xs>
        <GridContainer spacing={0} noWrap alignItems="baseline">
          <GridItem>
            <Box pl={1}>
              <JText gray nowrap={false}>
                Some info may be visible to other people using uGroop.
              </JText>
            </Box>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem>{renderCreate()}</GridItem>
    </GridContainer>
  );

  const renderEditablePlaceholder = () => (
    <Empty
      description={
        <EditablePlaceholder>
          <M {...m.placeholder} />
        </EditablePlaceholder>
      }
    />
  );

  const renderEditable = () => {
    const insurancePolicies = renderInsurancePolicies();
    const content = insurancePolicies ? (
      <GridItem>{insurancePolicies}</GridItem>
    ) : (
      renderEditablePlaceholder()
    );
    return (
      <GridContainer
        direction="column"
        spacing={LOGIC_HELPERS.ifElse(insurancePolicies, 3, 0)}
        wrap="nowrap"
      >
        <GridItem>{renderEditableLabel(insurancePolicies)}</GridItem>
        {content}
      </GridContainer>
    );
  };

  const renderTextOnly = () =>
    !!value.length && (
      <GridItem>{renderInsurancePolicies(VARIANTS.TEXT_ONLY)}</GridItem>
    );

  const renderRow = () => (
    <GridContainer direction="column" spacing={0} wrap="nowrap">
      <GridItem>
        {renderInsurancePolicies() || renderEditablePlaceholder()}
      </GridItem>
    </GridContainer>
  );

  const renderCount = () => value.length;

  return LOGIC_HELPERS.switchCase(variant, {
    [VARIANTS.TEXT_ONLY]: renderTextOnly,
    [VARIANTS.ROW]: renderRow,
    [VARIANTS.COUNT]: renderCount,
    [VARIANTS.CARD]: renderCard(VARIANTS.CARD),
    [VARIANTS.FIELDS_ONLY]: renderCard(VARIANTS.FIELDS_ONLY),
    [DEFAULT]: renderEditable,
  });
}

InsurancePolicies.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  personInsurancePolicyValue: PropTypes.array,
  userInsurancePolicyValue: PropTypes.array,

  // resaga value
  value: PropTypes.array,
};

InsurancePolicies.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,

  value: [],
  personInsurancePolicyValue: [],
  userInsurancePolicyValue: [],
};
export default compose(
  withStyles(styles, { name: 'InsurancePolicies' }),
  resaga(CONFIG_1),
)(React.memo(InsurancePolicies));
