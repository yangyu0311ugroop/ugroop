import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { injectIntl } from 'react-intl';
import omit from 'lodash/omit';
import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { EditableTextForm } from 'smartComponents/Editables';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { H1, P } from 'viewComponents/Typography';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import { DATASTORE_UTILS } from 'datastore';

import classnames from 'classnames';
import Tooltip from 'viewComponents/Tooltip';
import JText from 'components/JText';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';
import inputs from './inputs';
import { KNOWNAS_FORM_NAME } from './constants';

export class KnownAs extends PureComponent {
  componentDidMount = () => {
    if (!this.props.hasPersonDetail && this.props.organisationId) {
      this.props.resaga.setValue({
        person: DATASTORE_UTILS.removeItemsInArray(this.props.id),
      });
    }
  };

  getStrippedOwnProps = () =>
    omit(this.props, [
      'resaga',
      'knownAs',
      'firstName',
      'lastName',
      'id',
      'dataStore',
      'readOnly',
      'classes',
      'hasPersonDetail',
      'variant',
    ]);

  getEditableName = () =>
    PERSON_STORE_HELPERS.pathToPersonInputName(
      PERSON_PATHS.knownAs,
      this.props,
    );

  handleEditableSubmit = ({ model, onSuccess, onError }) => {
    const { id } = this.props;
    PERSON_DETAIL_HELPER.updatePerson(
      {
        personId: id,
        ...model,
        onSuccess,
        onError,
      },
      this.props,
    );
  };

  renderTextField = () => {
    const { knownAs } = this.props;

    return (
      <TextField
        name={KNOWNAS_FORM_NAME}
        value={knownAs}
        label={this.props.intl.formatMessage(m.label)}
        {...this.getStrippedOwnProps()}
      />
    );
  };

  renderTextOnly = () => {
    const {
      classes,
      breakWord,
      component: Component,
      knownAs,
      firstName,
      lastName,
      isMatchToName,
    } = this.props;

    const showAlias =
      knownAs !== `${firstName} ${lastName}` &&
      knownAs &&
      (!!firstName || !!lastName);

    if (isMatchToName) {
      return (
        <Component
          {...this.getStrippedOwnProps()}
          className={LOGIC_HELPERS.ifElse(!breakWord, classes.noWordBreak, '')}
        >
          {showAlias ? (
            <JText bold md>
              {this.renderStringOnly(isMatchToName)}
              {` `}
            </JText>
          ) : null}
        </Component>
      );
    }

    return (
      <Component
        {...this.getStrippedOwnProps()}
        className={LOGIC_HELPERS.ifElse(!breakWord, classes.noWordBreak, '')}
      >
        {this.renderStringOnly()}{' '}
      </Component>
    );
  };

  renderEditable = () => {
    const { knownAs, readOnly } = this.props;
    return (
      <EditableTextForm
        name={this.getEditableName()}
        value={knownAs}
        {...inputs.editable}
        onSubmit={this.handleEditableSubmit}
        readOnly={readOnly}
      />
    );
  };

  renderDefault = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1>{this.renderStringOnly()}</H1>
      </React.Fragment>
    );
  };

  renderEllipsisString = () => {
    const {
      className,
      knownAs,
      firstName,
      lastName,
      maxCharCountToEllipsis,
    } = this.props;

    let name = knownAs || `${firstName} ${lastName}`;

    name =
      name.length > maxCharCountToEllipsis ? (
        <span className={classnames('j-text-ellipsis', className)}>{name}</span>
      ) : (
        <span title={name}>{name}</span>
      );

    return name;
  };

  renderStringOnly = isMatchToName => {
    const {
      className,
      knownAs,
      firstName,
      lastName,
      isToolTip,
      ellipsis,
    } = this.props;

    const name = knownAs || `${firstName} ${lastName}`;

    if (isToolTip) {
      return (
        <Tooltip placement="top" title={name}>
          {name}
        </Tooltip>
      );
    }

    if (ellipsis) {
      return (
        <div className={classnames('j-text-ellipsis', className)} title={name}>
          {name} (Personal)
        </div>
      );
    }

    return (
      <div className={classnames('j-text-ellipsis', className)} title={name}>
        {isMatchToName ? `(${firstName} ${lastName})` : name}
      </div>
    );
  };

  renderValueOnly = () => {
    const { knownAs, firstName, lastName } = this.props;

    const name = knownAs || `${firstName} ${lastName}`;

    return name;
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VARIANTS.STRING_ONLY]: this.renderStringOnly,
      [VARIANTS.STRING_ELLIPSIS]: this.renderEllipsisString,
      [VARIANTS.VALUE_ONLY]: this.renderValueOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

KnownAs.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  isMatchToName: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.number,
  organisationId: PropTypes.number,
  readOnly: PropTypes.bool,
  breakWord: PropTypes.bool,
  component: PropTypes.any,
  ellipsis: PropTypes.bool,
  // resaga props
  knownAs: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  hasPersonDetail: PropTypes.bool,
  maxCharCountToEllipsis: PropTypes.number,
  isToolTip: PropTypes.bool,
};

KnownAs.defaultProps = {
  variant: VARIANTS.TITLE,
  readOnly: false,

  knownAs: '',
  firstName: '',
  lastName: '',
  breakWord: true,
  component: P,
  maxCharCountToEllipsis: 32,
  isToolTip: false,
  ellipsis: false,
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'KnownAs' }),
  resaga(CONFIG),
)(KnownAs);
