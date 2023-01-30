import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import { GET_ORG_TYPES, ORGANISATION_API } from 'apis/constants';
import { DEFAULT, DO_NOTHING, SELECT } from 'appConstants';
import dotProp from 'dot-prop-immutable';
import { find, omit } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import { Select, InlineRadioGroup } from 'ugcomponents/Inputs';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { H1, P } from 'viewComponents/Typography';
import { CONFIG } from './config';
import { ORG_FORM_NAME } from './constants';
import m from './messages';
import styles from './styles';

const DEFAULT_LABEL = 'Type';
const DEFAULT_TYPE = 'Tour Operator';
export class Type extends PureComponent {
  componentDidMount = () => {
    const { orgTypes } = this.props;
    if (!orgTypes.length) {
      return this.getOrgTypes();
    }

    return DO_NOTHING;
  };

  getInputLabelProps = {
    shrink: true,
  };

  getOrgTypes = () => {
    this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_TYPES, {});
  };

  getStrippedOwnProps = () =>
    omit(this.props, [
      'resaga',
      'type',
      'orgTypes',
      'id',
      'classes',
      'variant',
    ]);

  renderSelect = () => {
    const { orgTypes } = this.props;

    const options = orgTypes.reduce(
      (accu, { code, name }) => ({ ...accu, [code]: name }),
      {},
    );

    return (
      <InlineRadioGroup
        highlightSelected
        required
        autoClose
        color="primary"
        name="type"
        label="Organisation type"
        valueLabel="Organisation type"
        tooltip="Click button to change type"
        options={options}
      />
    );
  };

  renderTextField = () => {
    const { orgTypes, type } = this.props;
    const orgTypeStrip = orgTypes.map(({ code: value, name: children }) => ({
      value,
      children,
    }));
    return (
      <Select
        name={ORG_FORM_NAME}
        label={this.props.intl.formatMessage(m.label)}
        value={type || ''}
        options={orgTypeStrip}
        {...this.getStrippedOwnProps()}
      />
    );
  };

  renderTextOnly = () => {
    // const { type } = this.props;
    const { orgTypes, type, simple } = this.props;
    const typeValue = find(orgTypes, { code: type });
    const value = dotProp.get(typeValue, 'name', DEFAULT_TYPE);
    if (simple) return value;
    return <P {...this.getStrippedOwnProps()}>{value}</P>;
  };

  renderDefault = () => {
    const { classes, type } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {type}
        </H1>
      </React.Fragment>
    );
  };

  renderTextWithLabel = () => {
    const { orgTypes, type } = this.props;
    const typeValue = find(orgTypes, { code: type });
    const value = dotProp.get(typeValue, 'name', DEFAULT_TYPE);
    return (
      <React.Fragment>
        <InputLabel shrink>{DEFAULT_LABEL}</InputLabel>
        <P noMargin>{value}</P>
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderTextField,
      [ORG_FIELD_VARIANTS.TEXT_WITH_LABEL]: this.renderTextWithLabel,
      [SELECT]: this.renderSelect,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Type.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  simple: PropTypes.bool,

  // resaga props
  type: PropTypes.string,
  orgTypes: PropTypes.array,
};

Type.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  type: '',
  orgTypes: [],
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Type' }),
  resaga(CONFIG),
)(Type);
