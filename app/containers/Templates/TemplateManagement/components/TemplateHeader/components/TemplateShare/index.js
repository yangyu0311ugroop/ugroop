import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import { ability } from 'apis/components/Ability/ability';
import { NODE_SHARE } from 'utils/modelConstants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { VARIANTS } from 'variantsConstants';
import { PeopleListHeading, AvatarList } from 'viewComponents/People';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import TemplateShareModal from 'containers/Templates/Modals/ShareList';
import MorePeopleModal from 'containers/Templates/Modals/MorePeopleModal';
import TransferTourOwner from 'containers/Templates/Modals/TransferTourOwner';
import Badge from 'viewComponents/Badge';
import { CONFIG } from './config';

export class TemplateShare extends PureComponent {
  state = {
    openOtherPeopleModal: false,
  };

  onOpenShareModal = () => this.props.resaga.setValue({ shareDialog: true });

  onCloseShareModal = () => this.props.resaga.setValue({ shareDialog: false });

  onOpenOtherPeopleModal = () => this.setState({ openOtherPeopleModal: true });

  onCloseTransferModal = () =>
    this.props.resaga.setValue({ transferDialog: false });

  onCloseOtherPeopleModal = () =>
    this.setState({ openOtherPeopleModal: false });

  render = () => {
    const {
      people,
      templateId,
      shareDialog,
      ownerId,
      maxAvatars,
      mountTemplateShare,
      transferDialog,
    } = this.props;

    return (
      <GridItem>
        <GridContainer direction="column" spacing={0}>
          <PeopleListHeading>
            Contributors{' '}
            <Badge Component="span" color="blue" variant={VARIANTS.SQUARE}>
              {people.length + 1}
            </Badge>
          </PeopleListHeading>
          <GridItem>
            <AvatarList
              maxAvatars={maxAvatars}
              ownerId={ownerId}
              people={people}
              avatarById
              add={ability.can('execute', { type: NODE_SHARE })}
              addTooltipText="Invite Contributor"
              onOpenMorePeople={this.onOpenOtherPeopleModal}
              onClick={this.onOpenShareModal}
            />
          </GridItem>
        </GridContainer>
        {mountTemplateShare && (
          <TemplateShareModal
            id={templateId}
            open={shareDialog}
            onClose={this.onCloseShareModal}
          />
        )}
        <MorePeopleModal
          isOpen={this.state.openOtherPeopleModal}
          onClose={this.onCloseOtherPeopleModal}
          people={people}
        />
        <TransferTourOwner
          id={templateId}
          open={transferDialog}
          onClose={this.onCloseTransferModal}
        />
      </GridItem>
    );
  };
}

TemplateShare.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  people: PropTypes.array,

  // parent
  templateId: PropTypes.number.isRequired,
  maxAvatars: PropTypes.number,
  mountTemplateShare: PropTypes.bool,

  // resaga value
  ownerId: PropTypes.number,
  shareDialog: PropTypes.bool,
  transferDialog: PropTypes.bool,
};
TemplateShare.defaultProps = {
  ownerId: null,
  people: [],

  shareDialog: false,
  mountTemplateShare: false,
  transferDialog: false,
};

export default compose(
  INVITATION_STORE_HOC.selectUserNodeUserIds({
    nodeIds: 'templateId',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
    outputProp: 'people',
  }),
  resaga(CONFIG),
)(TemplateShare);
