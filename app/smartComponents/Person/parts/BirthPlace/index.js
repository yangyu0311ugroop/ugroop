import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import { USER_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { VARIANTS } from 'variantsConstants';
import omit from 'lodash/omit';
import { isEmptyString } from 'utils/stringAdditions';
import { EditableTextForm } from 'smartComponents/Editables';

import { CONFIG } from './config';
import styles from './styles';

const label = 'Place of Birth';
export class BirthPlace extends PureComponent {
  stripOwnProps = () =>
    omit(this.props, ['variant', 'classes', 'birthPlace', 'id']);

  renderDefault = () => this.renderTextWithLabel();

  renderTextOnly = () => {
    const { birthPlace } = this.props;
    return <span>{birthPlace}</span>;
  };

  renderTextWithLabel = () => (
    <React.Fragment>
      <EditableTextForm
        label={label}
        value={this.props.birthPlace}
        name={USER_FIELDS.birthPlace}
        onSubmit={PERSON_DETAIL_HELPER.updatePassport(this.props, {
          passportIdKey: 'passportId',
          userIdKey: 'id',
        })}
        placeholder="Click to specify place of birth"
      />
    </React.Fragment>
  );

  renderTextField = () => {
    const { birthPlace } = this.props;
    const defaultVal = isEmptyString(birthPlace) ? '' : birthPlace;
    return (
      <TextField
        name={USER_FIELDS.birthPlace}
        label={label}
        value={defaultVal}
        {...this.stripOwnProps()}
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_WITH_LABEL]: this.renderTextWithLabel,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

BirthPlace.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  birthPlace: PropTypes.string,
};

BirthPlace.defaultProps = {
  birthPlace: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'BirthPlace' }),
  resaga(CONFIG),
)(BirthPlace);
