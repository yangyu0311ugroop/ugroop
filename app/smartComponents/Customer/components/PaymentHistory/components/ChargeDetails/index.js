import { DEFAULT, LIST } from 'appConstants';
import PropTypes from 'prop-types';
import React from 'react';
import { H5 } from 'viewComponents/Typography';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';
import ChargeAmount from 'smartComponents/Customer/parts/Charges/ChargeAmount';
import ChargeDate from 'smartComponents/Customer/parts/Charges/ChargeDate';
import ChargeStatus from 'smartComponents/Customer/parts/Charges/ChargeStatus';
import { FormattedMessage as M } from 'react-intl';
import m from './messages';
function ChargeDetails(props) {
  const { id, actionButtonPros, variant } = props;
  const renderPart = (Component, passProps = {}) => (
    <GridItem>
      <Component {...passProps} />
    </GridItem>
  );

  const renderDateSeparator = () => (
    <GridItem>
      <H5>
        <M {...m.dateText} />
      </H5>
    </GridItem>
  );

  const renderActions = () => {
    const buttonPros = {
      variant: VARIANTS.INLINE,
      size: 'xs',
      dense: true,
    };
    return (
      <GridContainer spacing={0}>
        <GridItem data-testid="viewAllPayment">
          <Button {...buttonPros} onClick={actionButtonPros.onClick}>
            <M {...m.actionViewButtonLabel} />
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  const renderDefault = () => {
    if (!id) {
      return null;
    }

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <GridContainer>
            {renderPart(ChargeAmount, { id })}
            {renderPart(ChargeStatus, { id })}
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer>
            {renderDateSeparator()}
            {renderPart(ChargeDate, { id })}
          </GridContainer>
        </GridItem>
        {actionButtonPros && <GridItem>{renderActions()}</GridItem>}
      </GridContainer>
    );
  };

  return LOGIC_HELPERS.switchCase(variant, {
    [LIST]: renderDefault,
    [DEFAULT]: renderDefault,
  });
}

ChargeDetails.propTypes = {
  // hoc props
  id: PropTypes.string,
  variant: PropTypes.node,
  className: PropTypes.string,
  bold: PropTypes.bool,
  actionButtonPros: PropTypes.object,
};

ChargeDetails.defaultProps = {
  variant: '',
  className: '',
  bold: true,
};

export default React.memo(ChargeDetails);
