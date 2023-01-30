import { NODE_VIEW_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import React from 'react';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { withStyles } from 'components/material-ui';
import Icon from 'ugcomponents/Icon';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import AvatarByToken from 'ugcomponents/Person/AvatarByToken';
import AvatarById from 'ugcomponents/Person/AvatarById';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import Margin from 'viewComponents/Margin';
import styles from './styles';

export class AvatarList extends React.PureComponent {
  getRootClass = () => {
    const { classes, customBorder } = this.props;
    return classNames(classes.avatar, !customBorder && classes.avatarBorder);
  };

  getPeopleAvatars = () => {
    if (!this.AvatarProps) {
      const { classes } = this.props;
      this.AvatarProps = {
        sm: true,
        disableGrow: true,
        imgClass: classes.avatarImg,
        rootClass: this.getRootClass(),
        width: 120,
        imageSize: IMAGE_SIZES_CONSTANTS.XS,
      };
    }
    return this.AvatarProps;
  };

  calculateMore = () => {
    const { ownerId, people, maxAvatars } = this.props;
    const peopleCount = people.length + LOGIC_HELPERS.ifElse(ownerId, 1, 0);
    return peopleCount - maxAvatars;
  };

  renderOwnerAvatar = () => {
    const { classes, onClick, ownerId } = this.props;
    return (
      <GridItem key={ownerId}>
        <button type="button" className={classes.item} onClick={onClick}>
          <AvatarByToken
            sm
            rootClass={this.getRootClass()}
            imgClass={classes.avatarImg}
            tooltipClass={classes.tooltip}
            displayFirstAndLastInitials
            userId={ownerId}
            imageSize={IMAGE_SIZES_CONSTANTS.XS}
          />
        </button>
      </GridItem>
    );
  };

  renderPeopleAvatars = (person, idx) => {
    const {
      maxAvatars,
      avatarById,
      renderAvatar,
      ownerId,
      classes,
      onClick,
    } = this.props;

    if (idx < maxAvatars - LOGIC_HELPERS.ifElse(ownerId, 1, 0)) {
      const AvatarProps = this.getPeopleAvatars();
      let avatar;
      if (renderAvatar) avatar = renderAvatar(person, AvatarProps);
      else if (avatarById)
        avatar = <AvatarById {...AvatarProps} userId={person} />;
      else avatar = <AvatarByToken {...AvatarProps} token={person} />;
      return (
        <GridItem key={person}>
          <button type="button" className={classes.item} onClick={onClick}>
            {avatar}
          </button>
        </GridItem>
      );
    }

    return <span key={person} />;
  };

  renderExcessPeopleAvatar = () => {
    const { classes, onClick } = this.props;
    const more = this.calculateMore();
    return more > 0 ? (
      <GridItem>
        <button type="button" className={classes.item} onClick={onClick}>
          <AvatarByToken
            sm
            more={more}
            imgClass={classes.avatarImg}
            rootClass={classNames(this.getRootClass(), classes.excess)}
            imageSize={IMAGE_SIZES_CONSTANTS.XS}
          />
        </button>
      </GridItem>
    ) : null;
  };

  renderAddAvatar = () => {
    const { add, addTooltipText, classes, onClick } = this.props;
    return (
      add && (
        <GridItem>
          <button type="button" className={classes.item} onClick={onClick}>
            <AvatarByToken
              sm
              tooltipText={addTooltipText}
              imgClass={classes.avatarImg}
              rootClass={classNames(
                this.getRootClass(),
                classes.excess,
                classes.addBtn,
              )}
            >
              <Icon icon="users-plus" />
            </AvatarByToken>
          </button>
        </GridItem>
      )
    );
  };

  renderSeeMore = () => {
    const { seeMore, onClick, seeMoreText } = this.props;
    if (!seeMore) return null;

    return (
      <Margin top="xs">
        <GridContainer>
          <GridItem>
            <Button
              variant={VARIANTS.INLINE}
              size="extraSmall"
              onClick={onClick}
            >
              {seeMoreText}
            </Button>
          </GridItem>
        </GridContainer>
      </Margin>
    );
  };

  renderPlaceholder = () => {
    const { people, ownerId, placeholder } = this.props;
    const total = people.length - LOGIC_HELPERS.ifElse(ownerId, 1, 0);

    if (total === 0) return placeholder;

    return null;
  };

  render = () => {
    const { ownerId, people } = this.props;
    return (
      <>
        <GridContainer alignItems="center" spacing={0}>
          {!!ownerId && this.renderOwnerAvatar()}
          {people.map(this.renderPeopleAvatars)}
          {this.renderExcessPeopleAvatar()}
          {this.renderAddAvatar()}
          {this.renderPlaceholder()}
        </GridContainer>
        {this.renderSeeMore()}
      </>
    );
  };
}

AvatarList.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  ownerId: PropTypes.number,
  people: PropTypes.array,
  pending: PropTypes.array,
  declined: PropTypes.array,
  interestedPending: PropTypes.array,
  interestedComplete: PropTypes.array,
  add: PropTypes.bool,
  addTooltipText: PropTypes.string,
  onClick: PropTypes.func,
  maxAvatars: PropTypes.number,
  avatarById: PropTypes.bool,
  renderAvatar: PropTypes.func,
  customBorder: PropTypes.bool,
  addOnly: PropTypes.bool,
  allParticipantIds: PropTypes.array,
  allInterestedIds: PropTypes.array,
  showInterested: PropTypes.bool,
  seeMore: PropTypes.bool,
  seeMoreText: PropTypes.node,
  placeholder: PropTypes.node,

  // resaga
  editable: PropTypes.bool,
  participantViewModeFilter: PropTypes.string,
  interestedListViewFilter: PropTypes.string,
};

AvatarList.defaultProps = {
  ownerId: null,
  people: [],
  add: false,
  seeMore: false,
  addTooltipText: 'Add new',
  onClick: () => {},
  maxAvatars: 12,
  avatarById: false,
  renderAvatar: null,
  customBorder: false,
  showInterested: false,
  seeMoreText: 'See More',
  placeholder: '',
};

export default resaga({
  value: {
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    participantViewModeFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.filter,
    interestedListViewFilter:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INTERESTED_LIST.FILTER.view,
  },
})(
  withStyles(styles, { name: 'viewComponents/People/AvatarList' })(AvatarList),
);
