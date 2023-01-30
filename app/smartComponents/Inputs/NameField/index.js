import React from 'react';
import PropTypes from 'prop-types';
import Text from 'smartComponents/Inputs/TextField';

export class NameField extends React.PureComponent {
  buildValidations = () => {
    const { validations, validationErrors } = this.props;

    return { validations, validationErrors };
  };

  render = () => {
    const { validations, validationErrors, ...rest } = this.props;
    return (
      <Text
        maxLength={50}
        // TODO: Uncomment once we find a nice way to ensure all payloads get sent capitalized or at least stored in db capitalized
        // SK: I don't like capitalization as it's non-standard and some names start with lower case: https://en.wikipedia.org/wiki/List_of_people_with_lower_case_names_and_pseudonyms
        // capitalize
        {...this.buildValidations()}
        {...rest}
      />
    );
  };
}

NameField.propTypes = {
  // parent
  type: PropTypes.string,
  validations: PropTypes.object,
  validationErrors: PropTypes.object,
};

NameField.defaultProps = {
  type: 'text',
  validations: {},
  validationErrors: {},
};

export default NameField;
