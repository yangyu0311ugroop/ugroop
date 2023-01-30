import { DEFAULT } from 'appConstants';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { INTERESTED_LINKEE } from 'utils/modelConstants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { PeopleListHeading, AvatarList } from 'viewComponents/People';
import { Name } from 'smartComponents/Node/parts';
import { CONFIG } from './config';

export class TemplateInterestedPerson extends React.PureComponent {
  handleListClick = () => {
    const { nodeId, mode } = this.props;
    this.props.resaga.setValue({
      interestedPersonViewOpen: true,
      interestedPersonViewId: nodeId,
      interestedPersonViewMode: mode,
    });
  };

  renderAvatar = (id, props) => (
    <Name id={id} variant={VARIANTS.AVATAR} AvatarProps={props} />
  );

  renderDefault = () => {
    const { nodeId } = this.props;
    return (
      nodeId && (
        <GridItem>
          <GridContainer direction="column" spacing={0} wrap="nowrap">
            <PeopleListHeading>Followers</PeopleListHeading>
            <GridItem>
              <AvatarList
                people={[nodeId]}
                add={false}
                onClick={this.handleListClick}
                renderAvatar={this.renderAvatar}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      )
    );
  };

  renderProp = () => {
    const { children, nodeId } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [nodeId]);
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderDefault,
    });
  };
}

TemplateInterestedPerson.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  children: PropTypes.any,

  // resaga value
  nodeId: PropTypes.number,
  mode: PropTypes.string,
};

TemplateInterestedPerson.defaultProps = {
  variant: null,
  children: null,

  nodeId: null,
  mode: null,
};

export default compose(
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'interestedPersonIds',
    roles: [INTERESTED_LINKEE],
  }),
  resaga(CONFIG),
)(TemplateInterestedPerson);
