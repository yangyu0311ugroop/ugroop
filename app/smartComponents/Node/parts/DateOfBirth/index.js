import GridContainer from 'components/GridContainer';
import JText from 'components/JText';
import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import GridItem from 'components/GridItem';
import NewIcon from 'viewComponents/Icon';
import { H4 } from 'viewComponents/Typography';
import { Date } from 'smartComponents/Inputs';
import EditableMenu from './components/EditableMenu';
import EditableDate from './components/EditableDate';
import inputs from './inputs';
import { CONFIG } from './config';

export class DateOfBirth extends React.PureComponent {
  getNodeName = () =>
    NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.dateOfBirth, this.props);

  getPersonName = () =>
    PERSON_STORE_HELPERS.pathToPersonInputName(
      PERSON_PATHS.birthDate,
      this.props,
    );

  renderTextOnly = () => {
    const { value } = this.props;
    return (
      !!value && (
        <GridItem>
          <H4 dense weight="bold">
            {value}
          </H4>
        </GridItem>
      )
    );
  };

  renderTextField = () => {
    const { value, currentValue, readOnly } = this.props;
    return (
      <GridItem xs>
        <Date
          name={this.getNodeName()}
          value={currentValue || value}
          disabled={readOnly}
          maxDate={MOMENT_HELPERS.getDateLastYear()}
          initialFocusedDate={MOMENT_HELPERS.getDateMiddleLastYear()}
          {...inputs.textField}
        />
      </GridItem>
    );
  };

  renderEditableValue = value => {
    if (value) {
      return `${MOMENT_HELPERS.renderDate(value)} (${MOMENT_HELPERS.renderAge(
        value,
      )})`;
    }
    return value;
  };

  renderEditable = () => {
    const {
      id,
      personId,
      userConnected,
      value,
      userValue,
      userId,
      readOnly,
    } = this.props;
    return (
      <GridItem>
        {userConnected && userValue ? (
          <EditableMenu
            id={id}
            personId={personId}
            name={this.getPersonName()}
            value={value}
            userValue={userValue}
            userId={userId}
            readOnly={readOnly}
            renderValue={this.renderEditableValue}
          />
        ) : (
          <EditableDate
            personId={personId}
            name={this.getPersonName()}
            value={value}
            readOnly={readOnly}
            renderValue={this.renderEditableValue}
          />
        )}
      </GridItem>
    );
  };

  renderRow = () => {
    const { value, showAge } = this.props;
    const birth = LOGIC_HELPERS.ifElse(
      value,
      <JText ellipsis nowrap>
        {MOMENT_HELPERS.renderDate(value)}
        {showAge && ` (${MOMENT_HELPERS.renderAge(value)})`}
      </JText>,
      <JText italic>Birth date not specified</JText>,
    );

    return (
      <GridContainer alignItems="flex-start" wrap="nowrap">
        <GridItem>
          <NewIcon icon="cake" size="extraSmall" color="darkGray" />
        </GridItem>
        <GridItem>{birth}</GridItem>
      </GridContainer>
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

DateOfBirth.propTypes = {
  // parent
  id: PropTypes.number,
  personId: PropTypes.number,
  variant: PropTypes.string,
  readOnly: PropTypes.bool,
  currentValue: PropTypes.string,
  userId: PropTypes.number,
  userConnected: PropTypes.bool,
  showAge: PropTypes.bool,

  // resaga value
  value: PropTypes.string,
  userValue: PropTypes.string,
};

DateOfBirth.defaultProps = {
  id: null,
  personId: null,
  variant: null,
  readOnly: false,
  currentValue: '',
  userId: null,
  userConnected: false,

  value: null,
  userValue: null,
  showAge: false,
};

export default resaga(CONFIG)(DateOfBirth);
