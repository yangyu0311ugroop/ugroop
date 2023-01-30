import {
  DEFAULT,
  RELATIONSHIPS,
  NON_OTHER_RELATIONSHIPS,
  EMERGENCY_CONTACT_VALUES,
} from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Select, Text } from 'smartComponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';

import { CONFIG } from './config';
import styles from './styles';

export class Relationship extends PureComponent {
  state = {
    showOther: false,
  };

  onChange = value => {
    if (value === RELATIONSHIPS.OTHER) {
      return this.setState({
        showOther: true,
      });
    }

    return this.setState({
      showOther: false,
    });
  };

  getRelationshipOptions = () => [
    {
      value: RELATIONSHIPS.FATHER,
      children: 'Father',
    },
    {
      value: RELATIONSHIPS.MOTHER,
      children: 'Mother',
    },
    {
      value: RELATIONSHIPS.SIBLING,
      children: 'Sibling',
    },
    {
      value: RELATIONSHIPS.GUARDIAN,
      children: 'Guardian',
    },
    {
      value: RELATIONSHIPS.OTHER,
      children: 'Other',
    },
  ];

  renderField = () => {
    const { relationship } = this.props;
    const { showOther } = this.state;
    const relationshipValue = relationship || RELATIONSHIPS.FATHER;
    const isOtherRelationship = !NON_OTHER_RELATIONSHIPS.includes(
      relationshipValue,
    );
    const mainRelationshipValue = LOGIC_HELPERS.ifElse(
      isOtherRelationship,
      RELATIONSHIPS.OTHER,
      relationshipValue,
    );

    const otherField = LOGIC_HELPERS.ifElse(
      showOther || isOtherRelationship,
      <GridItem>
        <Text
          label="Specific Relationship"
          name="otherRelationship"
          value={relationshipValue}
          fullWidth
        />
      </GridItem>,
      null,
    );

    return (
      <GridContainer direction="column">
        <GridItem>
          <Select
            value={mainRelationshipValue}
            label="Relationship"
            name="relationship"
            onChange={this.onChange}
            fullWidth
            options={this.getRelationshipOptions()}
          />
        </GridItem>
        {otherField}
      </GridContainer>
    );
  };

  renderTextOnly = () => {
    const { relationship, emergencyContact, withECStatus } = this.props;
    if (withECStatus)
      return `${relationship} ${LOGIC_HELPERS.ifElse(
        EMERGENCY_CONTACT_VALUES.YES === emergencyContact,
        ' (Emergency Contact)',
        '',
      )}`;

    return relationship;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderField,
    });
  };
}

Relationship.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  relationship: PropTypes.string,
  emergencyContact: PropTypes.string,
  withECStatus: PropTypes.bool,
};

Relationship.defaultProps = {
  relationship: null,
};

export default compose(
  withStyles(styles, { name: 'Relationship' }),
  resaga(CONFIG),
)(Relationship);
