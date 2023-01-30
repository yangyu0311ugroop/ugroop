import GridContainer from 'components/GridContainer';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { GEOCODE_API, GET_GEO_CURRENT_LOCATION } from 'apis/constants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridItem from 'components/GridItem';
import Form from 'ugcomponents/Form';
import { isEmptyString } from 'utils/stringAdditions';
import { Phone as PhoneInput } from 'smartComponents/Inputs';
import NewIcon from 'viewComponents/Icon';
import _ from 'lodash';
import EditableMenu from './components/EditableMenu';
import EditableText from './components/EditableText';
import inputs from './inputs';
import { CONFIG_1, CONFIG_2 } from './config';

export class Phone extends React.PureComponent {
  componentDidMount = () => {
    const { variant, value } = this.props;
    if (variant === VARIANTS.TEXT_FIELD && isEmptyString(value))
      this.fetchLocationApi();
  };

  fetchLocationApi = () =>
    this.props.resaga.dispatchTo(GEOCODE_API, GET_GEO_CURRENT_LOCATION, {
      payload: {},
      onSuccess: this.test,
      onError: this.test,
    });

  renderTextOnly = () => {
    const { value } = this.props;
    return !!value && <GridItem>{value}</GridItem>;
  };

  renderTextField = () => {
    const { value, readOnly, countryCode, required } = this.props;
    const phoneProps = {
      required,
      country: countryCode,
    };
    return (
      <GridItem xs>
        <PhoneInput
          value={value}
          disabled={readOnly}
          {...inputs.textField}
          {...phoneProps}
        />
      </GridItem>
    );
  };

  renderEditableValue = value => (
    <Form>
      <PhoneInput value={value} readOnly {...inputs.editableValue} />
    </Form>
  );

  renderEditableMenuValue = value =>
    !!value && <PhoneInput value={value} readOnly {...inputs.editableValue} />;

  getUserValue = id => {
    const { userValues } = this.props;
    const userValue = _.find(userValues, ([i]) => i === id);
    return userValue ? userValue[1] : null;
  };

  getDefaultUserValue = () => {
    const { userValues } = this.props;
    return userValues.length ? userValues[0][1] : null;
  };

  renderValue = () => {
    const { userPhoneId, value } = this.props;
    if (userPhoneId) {
      return this.getUserValue(userPhoneId);
    }
    const phoneVal = this.getDefaultUserValue();
    return LOGIC_HELPERS.ifElse(phoneVal, phoneVal, value);
  };

  renderRow = () => {
    const { value, userConnected, userValues } = this.props;
    const phoneValue = LOGIC_HELPERS.ifElse(
      userConnected && userValues.length,
      this.renderValue(),
      value,
    );

    const phone = LOGIC_HELPERS.ifElse(
      phoneValue,
      <JText ellipsis nowrap>
        {phoneValue}
      </JText>,
      <JText italic>Phone not specified</JText>,
    );

    return (
      <GridContainer wrap="nowrap" alignItems="center">
        <GridItem>
          <NewIcon icon="telephone" size="extraSmall" color="darkGray" />
        </GridItem>
        <GridItem xs>{phone}</GridItem>
      </GridContainer>
    );
  };

  renderEditable = () => {
    const {
      id,
      userConnected,
      value,
      userValues,
      userId,
      readOnly,
    } = this.props;
    return (
      <GridItem>
        {userConnected && userValues.length ? (
          <EditableMenu
            id={id}
            value={value}
            userValues={userValues}
            userId={userId}
            readOnly={readOnly}
            renderValue={this.renderEditableMenuValue}
          />
        ) : (
          <EditableText
            id={id}
            value={value}
            readOnly={readOnly}
            renderValue={this.renderEditableValue}
          />
        )}
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.ROW]: this.renderRow,
      [DEFAULT]: this.renderEditable,
    });
  };
}

Phone.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  userId: PropTypes.number,
  userConnected: PropTypes.bool,
  required: PropTypes.bool,
  userPhoneId: PropTypes.number,

  // resaga value
  value: PropTypes.string,
  userValues: PropTypes.array,
  countryCode: PropTypes.string,
};

Phone.defaultProps = {
  id: null,
  variant: null,
  readOnly: false,
  required: false,
  userId: null,
  userConnected: false,

  value: '',
  userValues: [],
};

export default compose(
  resaga(CONFIG_1),
  resaga(CONFIG_2),
)(Phone);
