import { DEFAULT, VIEW_MODE_COPY } from 'appConstants';
import classnames from 'classnames';
import JText from 'components/JText';
import omit from 'lodash/omit';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { PERSON_DETAIL_HELPER } from 'apis/components/PersonDetail/helpers';
import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { EditableTextForm } from 'smartComponents/Editables';
import Icon from 'ugcomponents/Icon';
import { VARIANTS } from 'variantsConstants';
import { PERSON_VALIDATIONS } from 'smartComponents/Person/parts/validations';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Email as EmailField } from 'smartComponents/Inputs';
import TextField from 'ugcomponents/Inputs/ValidationTextField';
import Button from 'viewComponents/Button';
import NewIcon from 'viewComponents/Icon';

import { PERSON_EMAIL_FORM_NAME } from './constants';
import { CONFIG } from './config';
import inputs from './inputs';
import m from './messages';
import styles from './styles';

export class Email extends PureComponent {
  state = {
    copied: false,
  };

  componentWillMount = () => {
    this.tooltipProps = { leaveDelay: 500 };
  };

  componentWillUnmount = () => {
    clearTimeout(this.reset);
  };

  getEditableName = () =>
    PERSON_STORE_HELPERS.pathToPersonInputName(PERSON_PATHS.email, this.props);

  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'email', 'id', 'classes', 'variant']);

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

  handleCopy = () => {
    this.setState({ copied: true });
  };

  handleClickEmail = () => {
    const {
      updatedEmail,
      emailSubjectLink,
      emailBodyLink,
      email: userPersonaEmail,
    } = this.props;
    const email = LOGIC_HELPERS.ifElse(
      updatedEmail,
      updatedEmail,
      userPersonaEmail,
    );
    let link = `mailto:${email}?`;
    link += LOGIC_HELPERS.ifElse(
      emailSubjectLink,
      `&subject=${emailSubjectLink}`,
      '',
    );
    link += LOGIC_HELPERS.ifElse(emailBodyLink, `&body=${emailBodyLink}`, '');
    window.open(encodeURI(link));
  };

  resetCopy = () => {
    this.reset = setTimeout(() => this.setState({ copied: false }), 500);
  };

  renderDefault = () => this.renderTextOnly();

  renderTextField = () => (
    <TextField
      name={PERSON_EMAIL_FORM_NAME}
      label={this.props.intl.formatMessage(m.label)}
      value={this.props.email}
      validations="isEmail"
      validationErrors={PERSON_VALIDATIONS.email}
      {...this.getStrippedOwnProps()}
    />
  );

  renderEditable = () => {
    const { email, readOnly } = this.props;
    return (
      <React.Fragment>
        <EditableTextForm
          name={this.getEditableName()}
          value={email}
          TextComponent={EmailField}
          {...inputs.editable}
          onSubmit={this.handleEditableSubmit}
          readOnly={readOnly}
        />
      </React.Fragment>
    );
  };

  renderTextOnly = () => {
    const { updatedEmail, email: userPersonaEmail } = this.props;
    const email = updatedEmail || userPersonaEmail;
    return <span {...this.getStrippedOwnProps()}>{email}</span>;
  };

  renderTextWitchIcon = () => {
    const { updatedEmail, classes, email: userPersonaEmail } = this.props;
    const email = updatedEmail || userPersonaEmail;
    return (
      <GridContainer wrap="nowrap" spacing={0}>
        <GridItem>
          <Icon icon="lnr-envelope" size="small" className={classes.icon} />
        </GridItem>
        <GridItem
          className={classes.noWrap}
          clickable
          onClick={this.handleClickEmail}
        >
          <JText ellipsis>{email}</JText>
        </GridItem>
      </GridContainer>
    );
  };

  renderCopy = () => {
    const {
      classes,
      link,
      className,
      dark,
      updatedEmail,
      isEllipsis,
      emailSubjectLink,
      emailBodyLink,
      email: userPersonalEmail,
    } = this.props;
    const { copied } = this.state;
    let renderEmail = this.renderTextOnly();
    const email = updatedEmail || userPersonalEmail;
    if (link) {
      renderEmail = (
        <a
          className={className}
          href={`mailto:${email}?&subject=${emailSubjectLink}&body=${emailBodyLink}`}
          target="_blank"
        >
          {renderEmail}
        </a>
      );
    }
    return (
      <GridContainer
        alignItems="center"
        spacing={0}
        onMouseLeave={this.resetCopy}
        wrap="nowrap"
      >
        <GridItem
          className={classnames(
            'j-text-ellipsis',
            isEllipsis && classes.emailEllipsis,
          )}
        >
          {isEllipsis ? (
            <abbr title={email} className={classes.noUnderline}>
              {renderEmail}
            </abbr>
          ) : (
            renderEmail
          )}
        </GridItem>
        {email ? (
          <GridItem>
            <CopyToClipboard text={email} onCopy={this.handleCopy}>
              <Button
                noMargin
                dense
                size="extraSmall"
                variant={VARIANTS.OUTLINE}
                className={classnames(
                  classes.actionButton,
                  LOGIC_HELPERS.ifElse(dark, classes.darkButton),
                )}
                title={LOGIC_HELPERS.ifElse(copied, 'Copied', 'Copy')}
                tooltipProps={this.tooltipProps}
              >
                <Icon icon="lnr-copy" size="xsmall" />
              </Button>
            </CopyToClipboard>
          </GridItem>
        ) : (
          ''
        )}
      </GridContainer>
    );
  };

  renderRow = () => {
    const { updatedEmail, email: userPersonalEmail } = this.props;
    const email = updatedEmail || userPersonalEmail;
    const renderEmail = LOGIC_HELPERS.ifElse(
      email,
      <JText ellipsis nowrap>
        {email}
      </JText>,
      <JText italic>Email not specified</JText>,
    );

    return (
      <GridContainer wrap="nowrap" alignItems="center">
        <GridItem>
          <NewIcon icon="envelope" size="extraSmall" color="darkGray" />
        </GridItem>
        <GridItem xs>{renderEmail}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderTextField,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VIEW_MODE_COPY]: this.renderCopy,
      [VARIANTS.ICON]: this.renderTextWitchIcon(),
      [VARIANTS.ROW]: this.renderRow,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Email.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  templateId: PropTypes.number,
  nodeId: PropTypes.number,
  variant: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
  linkeeRole: PropTypes.string,
  readOnly: PropTypes.bool,
  userConnected: PropTypes.bool,
  link: PropTypes.bool,
  dark: PropTypes.bool,
  invitationPending: PropTypes.bool,
  emailSubjectLink: PropTypes.string,
  emailBodyLink: PropTypes.string,

  // resaga props
  email: PropTypes.string,
  updatedEmail: PropTypes.string,
  type: PropTypes.string,
  isEllipsis: PropTypes.bool,
};

Email.defaultProps = {
  id: null,
  variant: VARIANTS.TEXT_ONLY,
  readOnly: false,

  updatedEmail: '',
  email: '',
  isEllipsis: false,
  emailSubjectLink: '',
  emailBodyLink: '',
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Email' }),
  resaga(CONFIG),
)(Email);
