import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT, LINK, TEXT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import Icon from 'viewComponents/Icon';
import { AttachmentIcon } from 'viewComponents/Attachment';
import Name from 'ugcomponents/Person/Name';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import m from './messages';

export class ConsentedBy extends React.PureComponent {
  getConsentedOnBehalf = () => {
    const { userId, value } = this.props;
    return userId !== value;
  };

  renderIconConsentedTitle = by => {
    const { intl } = this.props;
    if (this.getConsentedOnBehalf()) {
      return intl.formatMessage(m.iconConsentedOnBehalfTitle, { by });
    }
    return intl.formatMessage(m.iconConsentedTitle, { by });
  };

  renderIconNotConsentedTitle = () => {
    const { intl } = this.props;
    return intl.formatMessage(m.iconNotConsentedTitle);
  };

  renderIcon = () => {
    const { value, requiresConsent } = this.props;

    if (requiresConsent) {
      if (value) {
        return (
          <Name id={value} variant={VARIANTS.RENDER_PROP}>
            {by => (
              <Icon
                icon="lnr-thumbs-up"
                size="extraSmall"
                color="success"
                title={this.renderIconConsentedTitle(by)}
              />
            )}
          </Name>
        );
      }

      return (
        <Icon
          icon="lnr-question"
          size="extraSmall"
          color="darkGray"
          title={this.renderIconNotConsentedTitle()}
        />
      );
    }

    return <AttachmentIcon />;
  };

  renderLink = () => {
    const { value } = this.props;
    return <Name id={value} variant={LINK} bold={false} />;
  };

  renderTextOnly = () => {
    const { value } = this.props;
    return <Name id={value} variant={TEXT} bold={false} />;
  };

  renderProp = () => {
    const { value, children } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [value]);
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [LINK]: this.renderLink,
      [VARIANTS.ICON]: this.renderIcon,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

ConsentedBy.propTypes = {
  // hoc
  intl: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  variant: PropTypes.string,
  userId: PropTypes.number,
  requiresConsent: PropTypes.bool,

  // resaga value
  value: PropTypes.number,
};

ConsentedBy.defaultProps = {
  children: null,
  variant: null,
  userId: null,
  requiresConsent: null,

  value: null,
};

export default compose(
  injectIntl,
  resaga(CONFIG),
)(ConsentedBy);
