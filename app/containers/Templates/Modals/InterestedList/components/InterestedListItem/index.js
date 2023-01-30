import React from 'react';
import PropTypes from 'prop-types';
import { VARIANTS } from 'variantsConstants';
import { INTERESTED_LINKEE } from 'utils/modelConstants';
import GridItem from 'components/GridItem';
import { Name } from 'smartComponents/Node/parts';
import { PeopleListRow } from 'viewComponents/People';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import { compose } from 'redux';
import Node from 'smartComponents/Node';

export class InterestedListItem extends React.PureComponent {
  renderItem = obj => {
    const { id, nodeUserId, templateId, index } = this.props;
    return (
      <GridItem>
        <PeopleListRow>
          <Node
            id={id}
            variant={VARIANTS.ROW}
            userId={obj.userId || nodeUserId}
            templateId={templateId}
            index={index}
          />
        </PeopleListRow>
      </GridItem>
    );
  };

  render = () => {
    const { id } = this.props;
    return (
      <Name id={id} variant={VARIANTS.RENDER_PROP}>
        {this.renderItem}
      </Name>
    );
  };
}

InterestedListItem.propTypes = {
  // HOC
  nodeUserId: PropTypes.number,
  // parent
  id: PropTypes.number,
  templateId: PropTypes.number,
  index: PropTypes.number,
};

InterestedListItem.defaultProps = {
  id: null,
};

export default compose(
  selectLinkedUserData({
    nodeIdProp: 'id',
    outputProp: 'nodeUserId',
    roles: [INTERESTED_LINKEE],
  }),
)(InterestedListItem);
