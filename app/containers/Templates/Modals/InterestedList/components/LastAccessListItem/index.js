import React, { PureComponent } from 'react';
import _ from 'lodash';
import { VARIANTS } from 'variantsConstants';
import GridItem from 'components/GridItem';
import Editable from 'viewComponents/Editable';
import { PeopleListRow } from 'viewComponents/People';
import Node from 'smartComponents/Node';
import { Name } from 'smartComponents/Node/parts';
import PropTypes from 'prop-types';

export class LastAccessListItem extends PureComponent {
  getRestProps = () => _.omit(this.props, ['id', 'onClick']);

  handleClick = () => {
    const { id, onClick } = this.props;
    onClick(id);
  };

  renderItem = obj => (
    <GridItem>
      <PeopleListRow>
        <Editable onClick={this.handleClick}>
          <Node
            id={this.props.id}
            userId={obj.userId}
            variant={VARIANTS.WITH_LAST_ACCESS}
            {...this.getRestProps()}
          />
        </Editable>
      </PeopleListRow>
    </GridItem>
  );

  render = () => {
    const { id } = this.props;
    return (
      <Name id={id} variant={VARIANTS.RENDER_PROP}>
        {this.renderItem}
      </Name>
    );
  };
}

LastAccessListItem.propTypes = {
  // parent
  id: PropTypes.number,
  onClick: PropTypes.func,
};

LastAccessListItem.defaultProps = {
  id: null,
  onClick: () => {},
};

export default LastAccessListItem;
