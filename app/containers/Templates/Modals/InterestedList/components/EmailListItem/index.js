import React, { PureComponent } from 'react';
import _ from 'lodash';
import { VARIANTS } from 'variantsConstants';
import GridItem from 'components/GridItem';
import Editable from 'viewComponents/Editable';
import { PeopleListRow } from 'viewComponents/People';
import Node from 'smartComponents/Node';
import PropTypes from 'prop-types';

export class EmailListItem extends PureComponent {
  getRestProps = () => _.omit(this.props, ['id', 'onClick']);

  handleClick = () => {
    const { id, onClick } = this.props;
    onClick(id);
  };

  render = () => {
    const { id } = this.props;
    return (
      <GridItem>
        <PeopleListRow>
          <Editable onClick={this.handleClick}>
            <Node
              id={id}
              variant={VARIANTS.WITH_EMAIL}
              {...this.getRestProps()}
            />
          </Editable>
        </PeopleListRow>
      </GridItem>
    );
  };
}

EmailListItem.propTypes = {
  // parent
  id: PropTypes.number,
  onClick: PropTypes.func,
};

EmailListItem.defaultProps = {
  id: null,
  onClick: () => {},
};

export default EmailListItem;
