import { ability } from 'apis/components/Ability/ability';
import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { compose } from 'redux';
import lodash from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { DEFAULT, LAYOUT_CONSTANTS } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Hr from 'components/Hr';
import { H4, H5, H6 } from 'viewComponents/Typography';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import MenuItem from 'components/Popper/components/MenuItem';
import LastAccessAt from 'smartComponents/RecentActivity/parts/LastAccessAt';
import Name from 'smartComponents/Node/parts/Name';
import FirstName from 'smartComponents/Node/parts/FirstName';
import LastName from 'smartComponents/Node/parts/LastName';
import Email from 'smartComponents/Node/parts/Email';
import Phone from 'smartComponents/Node/parts/Phone';
import InterestLevel from 'smartComponents/Node/parts/InterestLevel';
import Comment from 'smartComponents/Node/parts/Comment';
import Participants from 'smartComponents/Node/parts/Participants';
import CreatedAt from 'smartComponents/Node/parts/CreatedAt';
// import EmergencyContact from '../../../Links/parts/EmergencyContact';
import Badge from 'viewComponents/Badge';
import { FormattedMessage as M } from 'react-intl';
import Editable from 'viewComponents/Editable';
import Button from 'viewComponents/Button';
import Hidden from '@material-ui/core/Hidden';
import {
  INTERESTED_LINKEE,
  INTERESTED_PERSON,
  PARTICIPANT,
} from 'utils/modelConstants';
import { selectLinkedUserData } from 'smartComponents/Node/hoc';
import Relationship from 'smartComponents/Links/parts/Relationship';
import EmergencyContact from 'smartComponents/Links/parts/EmergencyContact';

import { Grow } from '@material-ui/core';
import InviteButton from './components/InviteButton';
import { CONFIG, CONFIG_0, CONFIG_1, CONFIG_2, CONFIG_3 } from './config';
import styles from './styles';
import m from './messages';
import {
  ANIMATION_MAX_INDEX,
  ANIMATION_TIMEOUT,
  INCREMENT_TIMEOUT,
  NO_ANIMATION_TIMEOUT,
} from '../../../../containers/Templates/Modals/ShareList/components/Invitee/constants';

export class InterestedPerson extends React.PureComponent {
  state = {
    isEmergencyContact: false,
    show: false,
  };

  componentDidMount = () => {
    const { index } = this.props;

    // only show animation of the first ANIMATION_MAX_INDEX items
    let timeout;

    if (index < ANIMATION_MAX_INDEX) {
      timeout = ANIMATION_TIMEOUT + index * INCREMENT_TIMEOUT;
    } else {
      timeout = NO_ANIMATION_TIMEOUT;
    }
    this.show = setTimeout(() => this.setState({ show: true }), timeout);
  };

  componentWillUnmount = () => {
    clearTimeout(this.show);
  };

  getRestProps = () => lodash.omit(this.props, ['classes', 'variant']);

  getAvatarProps = () => {
    const { userId, personEmail, tourName: emailSubjectLink } = this.props;
    const id = userId || 1;
    if (!this.AvatarProps) {
      this.AvatarProps = {
        AvatarProps: {
          showAvatarDetails: true,
          tooltipText: this.renderTextOnly(),
          noTooltip: false,
          userId: id,
          personEmail,
          emailSubjectLink,
        },
      };
    }
    return this.AvatarProps;
  };

  renderTextOnlyNameValue = value => (
    <H5 dense weight="bold">
      {value}
    </H5>
  );

  renderTextOnly = (variant = VARIANTS.TEXT_ONLY) => () => (
    <GridContainer direction="column">
      <GridItem>
        {this.renderPart(Name, variant, {
          renderValue: this.renderTextOnlyNameValue,
        })}
      </GridItem>
    </GridContainer>
  );

  renderPart = (Component, variant, props = {}) => (
    <Component {...this.getRestProps()} variant={variant} {...props} />
  );

  onEmerCcontactChange = (_, checked) =>
    this.setState({ isEmergencyContact: checked });

  renderForm = (variant = VARIANTS.TEXT_FIELD) => () => {
    const {
      isPublic,
      extended,
      withRelationshipField,
      /* isEmptyInterestLevel,
      onChange, */
    } = this.props;
    const { isEmergencyContact } = this.state;
    return (
      <GridContainer direction="column">
        <GridItem>
          {withRelationshipField && this.renderPart(Relationship, variant)}
        </GridItem>
        <GridItem>
          {withRelationshipField &&
            this.renderPart(EmergencyContact, variant, {
              onChange: this.onEmerCcontactChange,
            })}
        </GridItem>
        <GridItem>
          <GridContainer>
            {this.renderPart(FirstName, variant, {
              required: isPublic,
              extended,
            })}
            {this.renderPart(LastName, variant, {
              required: isPublic,
              extended,
            })}
          </GridContainer>
        </GridItem>
        {this.renderPart(Email, variant, { required: isPublic })}
        {this.renderPart(Phone, variant, {
          required: isPublic || (isEmergencyContact && withRelationshipField),
        })}
        {/*    {!withRelationshipField &&
          this.renderPart(InterestLevel, variant, {
            required: !isPublic,
            isEmptyInterestLevel,
            onChange,
          })} */}
        {!isPublic && this.renderPart(Comment, variant)}
      </GridContainer>
    );
  };

  renderEditableNames = variant => {
    const { noName } = this.props;
    return (
      !noName && (
        <React.Fragment>
          {this.renderPart(FirstName, variant)}
          {this.renderPart(LastName, variant)}
          {this.renderPart(Email, variant)}
        </React.Fragment>
      )
    );
  };

  isReadOnly = () => {
    const { myId, userId, createdBy } = this.props;
    return (
      !ability.can('execute', INTERESTED_PERSON) &&
      myId !== userId &&
      createdBy !== myId
    );
  };

  renderEditable = (variant = VARIANTS.EDITABLE) => () => {
    const { templateId } = this.props;
    return (
      <GridContainer direction="column">
        {this.renderEditableNames(variant)}
        {this.renderPart(Phone, variant, {
          readOnly: this.isReadOnly(),
        })}
        {this.isFromRyi() &&
          this.renderPart(InterestLevel, variant, {
            readOnly: this.isReadOnly(),
          })}
        {this.renderPart(Comment, variant, {
          readOnly: this.isReadOnly(),
        })}
        {/* TODO: Re-implement the participants using links instead of parentNodeId in linking participants and followers */}

        {ability.can('execute', PARTICIPANT) && (
          <React.Fragment>
            <Hr />
            {this.renderPart(Participants, variant, {
              parentId: templateId,
              showDetails: false,
              hideInviteButtons: true,
              itemsVariant: VARIANTS.ROW_SIMPLE,
              readOnlyStatus: this.isReadOnly(),
            })}
          </React.Fragment>
        )}
      </GridContainer>
    );
  };

  isFromRyi = () => !this.props.createdBy;

  renderRowValue = (value, userId) => (
    <H4
      dense
      weight={userId ? 'bold' : undefined}
      title={
        userId
          ? undefined
          : 'This follower is not yet connected to someone registered on uGroop.'
      }
    >
      {value}
    </H4>
  );

  renderRowSubtitle = () => {
    const { onRenderRowSubtitle } = this.props;
    return onRenderRowSubtitle ? (
      onRenderRowSubtitle()
    ) : (
      <H6 dense>
        {
          <M
            {...LOGIC_HELPERS.ifElse(
              this.isFromRyi(),
              m.subheadingPrefix,
              m.subheadingPrefixFromTour,
            )}
            values={{
              date: this.renderPart(CreatedAt, DEFAULT, { showFromNow: true }),
            }}
          />
        }
      </H6>
    );
  };

  renderEmail = () => {
    const { classes } = this.props;
    return (
      <H6 className={classes.emailContainer} dense>
        {this.renderPart(Email, VARIANTS.VALUE)}
      </H6>
    );
  };

  renderRowTail = variant => {
    const { mode, id } = this.props;
    return (
      mode !== 'invite' && (
        <React.Fragment>
          {/* {this.renderPart(InterestLevel, variant)} */}
          {this.renderPart(Participants, variant, {
            parentId: id,
          })}
        </React.Fragment>
      )
    );
  };

  handleClick = () => {
    const { id } = this.props;
    this.props.resaga.setValue({
      interestedPersonViewOpen: true,
      interestedPersonViewId: id,
      interestedPersonViewMode: null,
    });
  };

  /*
  renderStatus = () => {
    const { userConnected, invitationPending } = this.props;

    if (userConnected) return null;

    if (invitationPending)
      return <Badge color="yellow">Pending Invitation</Badge>;

    return <Badge color="translucent">Not Yet Connected</Badge>;
  };
*/
  openSeeDetail = e => {
    e.stopPropagation();
    this.props.resaga.setValue({ seeDetail: this.props.shareToken });
  };

  renderStatus = () => {
    const { userConnected, invitationPending, classes } = this.props;

    if (userConnected) return null;

    if (invitationPending)
      // return <Badge color="yellow">Pending Invitation</Badge>;
      return (
        <Button
          size="extraSmall"
          color="base"
          onClick={this.openSeeDetail}
          variant={VARIANTS.OUTLINE}
          className={classes.invitBtn}
        >
          Pending
        </Button>
      );

    return <Badge color="translucent">Not Yet Connected</Badge>;
  };

  renderInviteButton = () => {
    const { userConnected, invitationPending } = this.props;
    if (!userConnected && !invitationPending)
      return this.renderPart(InviteButton);

    return this.renderStatus();
  };

  renderRow = (variant = VARIANTS.TEXT_ONLY) => () => {
    const { classes, userId, layout, noanimate } = this.props;
    const isDetailed = layout === LAYOUT_CONSTANTS.DETAILED_VIEW;
    const content = (
      <GridContainer alignItems="center">
        <GridItem>
          {this.renderPart(Name, VARIANTS.AVATAR, this.getAvatarProps())}
        </GridItem>
        <GridItem className={classes.grow}>
          <Editable onClick={this.handleClick}>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                {this.renderPart(Name, DEFAULT, {
                  renderValue: this.renderRowValue,
                  boldFromNode: false,
                  isEllipsis: true,
                })}
              </GridItem>
              {isDetailed && (
                <GridItem className={classes.email}>
                  {this.renderEmail(variant)}
                </GridItem>
              )}
              <GridItem className={classes.added}>
                <GridContainer alignItems="center" spacing={0}>
                  {this.renderRowSubtitle(variant)}
                </GridContainer>
              </GridItem>
              {isDetailed && (
                <GridItem className={classes.emailContainer}>
                  <LastAccessAt
                    variant={VARIANTS.TEXT_WITH_LABEL}
                    id={userId}
                    showNoAccessPlaceHolder
                  />
                </GridItem>
              )}
            </GridContainer>
          </Editable>
        </GridItem>
        <Hidden xsDown>
          <GridItem>{this.renderInviteButton()}</GridItem>
        </Hidden>
        {this.renderRowTail(variant)}
      </GridContainer>
    );
    if (noanimate) return content;
    return (
      <Grow in={this.state.show} timeout={ANIMATION_TIMEOUT / 2}>
        {content}
      </Grow>
    );
  };

  renderMenuItem = (variant = VARIANTS.TEXT_ONLY) => () => {
    const { classes, openDialog, id, participantParentId } = this.props;
    return id !== participantParentId ? (
      <MenuItem button className={classes.item} onClick={openDialog(id)}>
        {this.renderPart(Name, variant, {
          renderValue: this.renderRowValue,
        })}
      </MenuItem>
    ) : null;
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.FORM]: this.renderForm(),
      [VARIANTS.EDITABLE]: this.renderEditable(),
      [VARIANTS.MENU_ITEM]: this.renderMenuItem(),
      [DEFAULT]: this.renderRow(),
    });
  };
}

InterestedPerson.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  userConnected: PropTypes.bool,
  invitationPending: PropTypes.bool,
  // parent
  variant: PropTypes.string,
  id: PropTypes.number,
  templateId: PropTypes.number,
  participantParentId: PropTypes.number,
  mode: PropTypes.string,
  noName: PropTypes.bool,
  onRenderRowSubtitle: PropTypes.func,
  onRenderRowTail: PropTypes.func,
  readOnlyStatus: PropTypes.bool,
  isPublic: PropTypes.bool,
  extended: PropTypes.bool,
  openDialog: PropTypes.func,
  userId: PropTypes.number,
  personEmail: PropTypes.string,
  withRelationshipField: PropTypes.bool,
  tourName: PropTypes.string,
  index: PropTypes.number,

  // resaga
  createdBy: PropTypes.number,
  myId: PropTypes.number,
  layout: PropTypes.string,
  shareToken: PropTypes.string,
  isEmptyInterestLevel: PropTypes.bool,
  onChange: PropTypes.func,
  noanimate: PropTypes.bool,
};

InterestedPerson.defaultProps = {
  layout: 'simpleView',
  variant: null,
  mode: null,
  noName: false,
  onRenderRowSubtitle: null,
  onRenderRowTail: null,
  readOnlyStatus: false,
  isPublic: false,
  extended: false,
  createdBy: null,
  personEmail: '',
  withRelationshipField: false,
  isEmptyInterestLevel: false,
};

export default compose(
  withStyles(styles, { name: 'InterestedPerson' }),
  selectLinkedUserData({ nodeIdProp: 'id', roles: [INTERESTED_LINKEE] }),
  resaga(CONFIG),
  resaga(CONFIG_0()),
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
  resaga(CONFIG_3()),
)(InterestedPerson);
