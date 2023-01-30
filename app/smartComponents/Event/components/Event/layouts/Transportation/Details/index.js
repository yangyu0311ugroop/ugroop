import GridContainer from 'components/GridContainer/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';

import {
  EventName,
  EventDescription,
  TransportationType,
} from 'smartComponents/Event/components/Event/parts';

import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { EVENT_CONSTANTS } from 'utils/constants/events';

import { CONFIG } from './config';
import m from './messages';

export class Details extends PureComponent {
  renderSubType = () => {
    const { hasType, options, subtype } = this.props;

    if (!hasType) return null;

    return this.renderPart(TransportationType, { options, key: subtype });
  };

  renderTitle = () => <M {...m.title} />;

  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderField = () => (
    <Section title={this.renderTitle()}>
      <GridContainer direction="column">
        {this.renderPart(EventName)}
        {this.renderSubType()}
        {this.renderPart(EventDescription)}
      </GridContainer>
    </Section>
  );

  renderEditable = () => (
    <React.Fragment>
      {this.renderPart(EventName)}
      {this.renderPart(EventDescription, {
        variant: EVENT_CONSTANTS.VARIANTS.editableForm,
      })}
      {this.renderSubType()}
    </React.Fragment>
  );

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderField={this.renderField}
        renderDefault={this.renderEditable}
      />
    );
  };
}

Details.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  hasType: PropTypes.bool,
  options: PropTypes.array,
  subtype: PropTypes.string,

  // resaga props
};

Details.defaultProps = {
  variant: '',
  hasType: false,
  options: undefined,
  subtype: '',
};

export default compose(resaga(CONFIG))(Details);
