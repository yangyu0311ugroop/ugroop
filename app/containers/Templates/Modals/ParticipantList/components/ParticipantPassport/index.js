import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { VARIANTS } from 'variantsConstants';
import GridItem from 'components/GridItem';
import Node from 'smartComponents/Node';
import Passport from 'smartComponents/Node/parts/Passport';

export class ParticipantPassport extends React.PureComponent {
  getRestProps = () => omit(this.props, ['id']);

  renderItem = ({ id }) =>
    id ? (
      <GridItem>
        <Node
          id={this.props.id}
          variant={VARIANTS.WITH_PASSPORT}
          {...this.getRestProps()}
        />
      </GridItem>
    ) : (
      <GridItem>
        <Node id={this.props.id} {...this.getRestProps()} />
      </GridItem>
    );

  render = () => {
    const { id } = this.props;
    return (
      <Passport id={id} renderProp>
        {this.renderItem}
      </Passport>
    );
  };
}

ParticipantPassport.propTypes = {
  id: PropTypes.number,
};

export default ParticipantPassport;
