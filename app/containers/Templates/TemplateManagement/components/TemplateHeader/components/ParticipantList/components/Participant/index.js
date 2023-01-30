import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { PARTICIPANT_LINKEE } from 'utils/modelConstants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { PeopleListHeading, AvatarList } from 'viewComponents/People';
import Node from 'smartComponents/Node';
import { Name } from 'smartComponents/Node/parts';
import { ConditionsBorderStyle } from 'smartComponents/Node/logics';
import { CONFIG } from './config';

export class TemplateParticipant extends React.PureComponent {
  handleListClick = () => {
    const { nodeId, mode } = this.props;
    this.props.resaga.setValue({
      participantViewOpen: true,
      participantViewId: nodeId,
      participantViewMode: mode,
    });
  };

  renderTooltipText = id => () => <Node id={id} variant={VARIANTS.TEXT_ONLY} />;

  renderAvatarWithClassname = (id, props) => className => (
    <Name
      id={id}
      className={className}
      variant={VARIANTS.AVATAR}
      AvatarProps={props}
      tooltipText={this.renderTooltipText(id)}
    />
  );

  renderAvatar = (id, props) => (
    <ConditionsBorderStyle id={id}>
      {this.renderAvatarWithClassname(id, props)}
    </ConditionsBorderStyle>
  );

  render = () => {
    const { nodeId } = this.props;
    return (
      nodeId && (
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <PeopleListHeading>Participant</PeopleListHeading>
            <GridItem>
              <AvatarList
                people={[nodeId]}
                add={false}
                onClick={this.handleListClick}
                renderAvatar={this.renderAvatar}
                customBorder
              />
            </GridItem>
          </GridContainer>
        </GridItem>
      )
    );
  };
}

TemplateParticipant.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // resaga value
  nodeId: PropTypes.number,
  mode: PropTypes.string,
};

TemplateParticipant.defaultProps = {
  nodeId: null,
  mode: null,
};

export default compose(
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'participantIds',
    roles: [PARTICIPANT_LINKEE],
  }),
  resaga(CONFIG),
)(TemplateParticipant);
