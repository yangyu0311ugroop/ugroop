import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Section } from 'ugcomponents/DialogForm/Complex';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { FormattedMessage as M } from 'react-intl';

import Locations from './components/Locations';
import Map from '../../Event/Map';

import m from './messages';
import { CONFIG } from './config';

export class Destination extends PureComponent {
  renderPart = (Component, props = {}) => (
    <Component {...this.props} {...props} />
  );

  renderTitle = () => <M {...m.title} />;

  renderDefault = () => (
    <React.Fragment>
      {this.renderPart(Map)}
      {this.renderPart(Locations)}
    </React.Fragment>
  );

  renderField = () => (
    <Section title={this.renderTitle()}>
      <GridContainer direction="column">
        <GridItem>{this.renderPart(Locations)}</GridItem>
        <GridItem>{this.renderPart(Map)}</GridItem>
      </GridContainer>
    </Section>
  );

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderDefault}
        renderField={this.renderField}
      />
    );
  };
}

Destination.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
};

Destination.defaultProps = {
  variant: '',
};

export default compose(resaga(CONFIG))(Destination);
