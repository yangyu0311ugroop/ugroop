import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { injectIntl } from 'react-intl';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { H1, P } from 'viewComponents/Typography';
import Location from 'ugcomponents/Inputs/Location';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';
import { ORG_FORM_NAME } from './constants';
import { VARIANTS } from '../../../../../../variantsConstants';

export class Address extends PureComponent {
  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'id', 'classes', 'variant']);

  renderLocationField = () => {
    const { placeId, address, textFieldProps } = this.props;
    return (
      <Location
        name={ORG_FORM_NAME}
        locationKey={ORG_FORM_NAME}
        placeId={placeId}
        textFieldProps={{
          value: address,
          label: this.props.intl.formatMessage(m.label),
          ...textFieldProps,
        }}
        location={address}
        editing
        hide={false}
        {...this.getStrippedOwnProps()}
      />
    );
  };

  renderReadOnly = () => {
    const { address, placeId } = this.props;
    return <Location placeId={placeId} location={address} withWrap />;
  };

  renderTextOnly = () => {
    const { address } = this.props;
    return <P {...this.getStrippedOwnProps()}>{address}</P>;
  };

  renderStringOnly = () => {
    const { address } = this.props;
    return address;
  };

  renderDefault = () => {
    const { classes, address } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {address}
        </H1>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderLocationField,
      [ORG_FIELD_VARIANTS.TEXT_READ_ONLY]: this.renderReadOnly,
      [VARIANTS.STRING_ONLY]: this.renderStringOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Address.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  // parent props
  variant: PropTypes.string,
  textFieldProps: PropTypes.object,

  // resaga props
  address: PropTypes.string,
  placeId: PropTypes.string,
};

Address.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  address: '',
  placeId: '',
  textFieldProps: {},
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Address' }),
  resaga(CONFIG),
)(Address);
