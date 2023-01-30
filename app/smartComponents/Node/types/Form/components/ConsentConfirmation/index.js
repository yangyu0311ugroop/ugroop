import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { DEFAULT, LINK } from 'appConstants';
import { SIZE_CONSTANTS } from 'sizeConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Checkbox, Data } from 'ugcomponents/Inputs';
import ConsentedBy from 'smartComponents/Node/parts/ConsentedBy';
import ConsentedAt from 'smartComponents/Node/parts/ConsentedAt';
import { CONFIG } from './config';
import inputs from './inputs';
import m from './messages';

export class ConsentConfirmation extends React.PureComponent {
  state = {
    changed: false,
  };

  getValue = () => {
    const { consentId } = this.props;
    return !!consentId;
  };

  getConsentingOnBehalf = () => {
    const { userId, myId } = this.props;
    return userId !== myId;
  };

  getConsentedOnBehalf = consentedUserId => {
    const { userId } = this.props;
    return userId !== consentedUserId;
  };

  handleChange = () => {
    const { changed } = this.state;
    if (!changed) {
      this.setState({ changed: true });
    }
  };

  renderConsentPart = (Component, variant, props = {}) => {
    const { consentId } = this.props;
    return <Component id={consentId} variant={variant} {...props} />;
  };

  renderCheckboxConsentedLabel = consentedUserId =>
    this.getConsentedOnBehalf(consentedUserId) ? (
      <M
        {...m.labelConsentedOnBehalf}
        values={{
          by: this.renderConsentPart(ConsentedBy, LINK),
          at: this.renderConsentPart(ConsentedAt),
        }}
      />
    ) : (
      <M
        {...m.labelConsented}
        values={{
          by: this.renderConsentPart(ConsentedBy, LINK),
          at: this.renderConsentPart(ConsentedAt),
        }}
      />
    );

  renderCheckboxLabel = () => {
    const { consentId } = this.props;
    const { changed } = this.state;

    if (consentId && !changed) {
      return this.renderConsentPart(ConsentedBy, VARIANTS.RENDER_PROP, {
        children: this.renderCheckboxConsentedLabel,
      });
    }

    if (this.getConsentingOnBehalf()) {
      return <M {...m.labelOnBehalf} />;
    }

    return <M {...m.label} />;
  };

  renderCheckboxField = () => {
    const { changed } = this.state;
    return (
      <React.Fragment>
        <Checkbox
          value={this.getValue()}
          compact
          size={SIZE_CONSTANTS.SM}
          onChange={this.handleChange}
          label={this.renderCheckboxLabel()}
          {...inputs.base}
        />
        <Data value={false} currentValue={changed} {...inputs.changed} />
      </React.Fragment>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderCheckboxField,
    });
  };
}

ConsentConfirmation.propTypes = {
  // parent
  variant: PropTypes.string,
  userId: PropTypes.number,

  // resaga value
  consentId: PropTypes.number,
  myId: PropTypes.number,
};

ConsentConfirmation.defaultProps = {
  variant: null,
  userId: null,

  consentId: null,
  myId: null,
};

export default resaga(CONFIG)(ConsentConfirmation);
