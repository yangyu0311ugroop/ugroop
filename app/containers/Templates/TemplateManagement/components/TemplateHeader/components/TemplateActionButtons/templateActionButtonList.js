import { ability } from 'apis/components/Ability/ability';
import { Can } from 'apis/components/Ability/components/Can';
import {
  URL_HELPERS,
  PENDING,
  PEOPLE_TAB_OPTIONS,
  PEOPLE_FILTERS,
} from 'appConstants';
import classNames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Hidden, Badge, withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import TourSettingsDialog from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabHeader/components/TourSettingsDialog';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import resaga from 'resaga';
import OpenDiscussion from 'smartComponents/Node/components/OpenDiscussion';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { VARIANTS } from 'variantsConstants';
import {
  ACTIVITY,
  CLONE,
  HASH_KEY,
  NODE_SHARE,
  TEMPLATE,
  TEMPLATE_SETTING,
  TOUR_CONTRIBUTOR,
  PARTICIPANT,
  INTERESTED_PEOPLE,
  EMAIL_EVENTS,
  CHAT,
} from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import Hr from 'components/Hr';
import PeopleTabRedirect from 'smartComponents/Node/logics/PeopleTabRedirect';
import JText from 'components/JText';
import { CONFIG } from './actionConfig';
import stylesheet from './style';
import { PORTAL_HELPERS } from '../../../../../../Portal/helpers';
import { DATASTORE_UTILS } from '../../../../../../../datastore';
import Star from '../../../../../../../smartComponents/Node/components/Star';

export class TemplateActionButtonList extends PureComponent {
  componentWillMount = () => {
    const { createdBy } = this.props;

    if (typeof createdBy === 'object') {
      this.template = { type: TEMPLATE, createdBy: createdBy.id };
    } else {
      this.template = { type: TEMPLATE, createdBy };
    }

    this.tooltipProps = { placement: 'bottom' };
  };

  componentDidUpdate = prevProps => {
    const { createdBy } = this.props;
    if (createdBy !== prevProps.createdBy) {
      if (typeof createdBy === 'object') {
        this.template = { type: TEMPLATE, createdBy: createdBy.id };
      } else {
        this.template = { type: TEMPLATE, createdBy };
      }
    }
  };

  toggleUpdateInfo = () => {
    this.props.resaga.setValue({
      editable: RESAGA_HELPERS.toggleValue,
    });
  };

  handleModeChange = mode => () => {
    const { dayIds } = this.props;
    const editing = mode === 'editing';
    let values = { editable: editing };
    if (!editing) {
      const dayNode = dayIds.reduce(
        (acc, cur) => ({ ...acc, [cur]: { calculated: { editing } } }),
        {},
      );
      values = {
        editable: editing,
        node: DATASTORE_UTILS.upsertObject(dayNode),
      };
    }
    this.props.resaga.setValue(values);
  };

  handleClickMenu = func => (...props) => {
    this.closeMoreMenu(...props);

    func(...props);
  };

  openSettings = () => this.props.resaga.setValue({ tourSettingsDialog: true });

  openTransferTour = () => this.props.resaga.setValue({ transferDialog: true });

  canSeeMoreButtons = () => ability.can('read', TEMPLATE);

  canTransferTour = () => ability.can('execute', this.template);

  canDelete = () => ability.can('delete', this.template);

  openEmailToEvent = () => {
    PORTAL_HELPERS.openCreateTourEmail(
      {
        templateId: this.props.templateId,
        templateName: this.props.content,
      },
      { resaga: this.props.resaga },
    );
  };

  renderUpdateInfoButton = isMobile => ({ openMenu }) => {
    const { classes, editable, buttonClassName, onStiky } = this.props;
    const mobileProps = isMobile
      ? { variant: 'outline', dense: true }
      : {
          className: classNames(
            classes.actionButton,
            classes.modePopper,
            buttonClassName,
          ),
        };

    const title = LOGIC_HELPERS.ifElse(
      editable,
      'Editing mode',
      'Viewing mode',
    );
    const icon = LOGIC_HELPERS.ifElse(editable, 'lnr-pencil', 'lnr-eye');

    return (
      <Button
        dense
        noPadding={!isMobile}
        size="extraSmall"
        color="black"
        {...mobileProps}
        onClick={openMenu}
        tooltipProps={this.tooltipProps}
      >
        <GridContainer
          alignItems="center"
          wrap="nowrap"
          title={title}
          // spacing={LOGIC_HELPERS.ifElse(isMobile, 1, 0)}
        >
          <Hidden mdUp>
            <GridItem>
              <Icon
                size={LOGIC_HELPERS.ifElse(isMobile, 'small', 'xsmall')}
                icon={icon}
              />
            </GridItem>
          </Hidden>
          {(!onStiky || !isMobile) && (
            <GridItem>
              <JText bold={!isMobile} uppercase={!isMobile}>
                {LOGIC_HELPERS.ifElse(editable, 'Editing Mode', 'Viewing Mode')}
              </JText>
            </GridItem>
          )}
          <GridItem>
            <Icon size="xxsmall" icon="lnr-chevron-down" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderModeMenu = ({ value: editable, closeMenu }) => (
    <GridContainer direction="column" spacing={0} wrap="nowrap">
      <GridItem>
        <MenuItem
          selected={editable}
          alignItems="baseline"
          icon="lnr-pencil"
          iconClassName={this.props.classes.menuIcon}
          closeMenu={closeMenu}
          onClick={this.handleModeChange('editing')}
        >
          <GridContainer direction="column" spacing={0} wrap="nowrap">
            <GridItem>
              <JText bold className={this.props.classes.menuHeading}>
                EDITING MODE
              </JText>
            </GridItem>
            <GridItem>
              <span className={this.props.classes.menuSubtitle}>
                Make changes
              </span>
            </GridItem>
          </GridContainer>
        </MenuItem>
      </GridItem>
      <GridItem>
        <MenuItem
          selected={!editable}
          alignItems="baseline"
          icon="lnr-eye"
          iconClassName={this.props.classes.menuIcon}
          closeMenu={closeMenu}
          onClick={this.handleModeChange('viewing')}
        >
          <GridContainer direction="column" spacing={0} wrap="nowrap">
            <GridItem>
              <JText bold className={this.props.classes.menuHeading}>
                VIEWING MODE
              </JText>
            </GridItem>
            <GridItem>
              <span className={this.props.classes.menuSubtitle}>
                Read or print
              </span>
            </GridItem>
          </GridContainer>
        </MenuItem>
      </GridItem>
    </GridContainer>
  );

  renderModePopper = isMobile => {
    const { editable } = this.props;

    return (
      <Popper
        placement="bottom-end"
        noPadding
        renderButton={this.renderUpdateInfoButton(isMobile)}
        value={editable}
        menuHeader="Switch mode"
      >
        {this.renderModeMenu}
      </Popper>
    );
  };

  canSeeChat = () => ability.can('create', CHAT);

  renderOpenCommentButton = variant => {
    const { templateId, buttonClassName, onStiky } = this.props;

    return (
      this.canSeeChat() && (
        <OpenDiscussion
          id={templateId}
          onClick={this.redirectMessengerPage}
          className={buttonClassName}
          variant={variant}
          label={LOGIC_HELPERS.ifElse(
            !onStiky,
            <JText bold={!variant} uppercase={!variant}>
              Chat
            </JText>,
          )}
        />
      )
    );
  };

  redirectMessengerPage = () => {
    this.props.history.replace(
      `${this.props.location.pathname}?messenger=true`,
    );
  };

  renderMoreButton = isMobile => ({ openMenu }) => {
    const { classes, buttonClassName, onStiky } = this.props;
    const mobileProps = isMobile
      ? { variant: 'outline', dense: true }
      : {
          className: classNames(
            classes.actionButton,
            classes.modePopper,
            buttonClassName,
          ),
        };
    return (
      <Button
        dense
        noPadding={!isMobile}
        size="extraSmall"
        color="black"
        onClick={openMenu}
        tooltipProps={{
          title: 'More options',
        }}
        {...mobileProps}
      >
        <GridContainer
          alignItems="center"
          wrap="nowrap"
          // spacing={LOGIC_HELPERS.ifElse(isMobile, 1, 0)}
        >
          {!onStiky && (
            <GridItem>
              <JText bold={!isMobile} uppercase={!isMobile}>
                Options
              </JText>
            </GridItem>
          )}
          <GridItem>
            <Icon
              icon={LOGIC_HELPERS.ifElse(
                isMobile && !onStiky,
                'lnr-chevron-down',
                'lnr-ellipsis',
              )}
              size={LOGIC_HELPERS.ifElse(
                isMobile && !onStiky,
                'xxsmall',
                'small',
              )}
            />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderBadge = (children = '') => {
    const { classes, hashkey } = this.props;

    if (!hashkey) return null;

    return (
      <Badge
        classes={{ badge: classes.badge }}
        color="secondary"
        badgeContent=""
      >
        {children}
      </Badge>
    );
  };

  isOwner = () => this.props.createdBy === this.props.me;

  isTransferPending = () => PENDING === this.props.transferStatus;

  renderPeople = ({
    closeMenu,
    peopleView,
    filterView,
    icon,
    label,
  }) => props => (
    <GridItem>
      <MenuItem
        icon={icon}
        closeMenu={closeMenu}
        onClick={props.handlePeopleRedirect({
          peopleView,
          filterView,
        })}
      >
        {label}
      </MenuItem>
    </GridItem>
  );

  renderMoreMenu = ({ closeMenu }) => {
    const {
      onClickDelete,
      showCopyLinkDialog,
      onClickClone,
      templateId,
      onClickMove,
      paxLabel,
    } = this.props;

    return (
      <GridContainer direction="column" wrap="nowrap">
        <Can do="create" on={NODE_SHARE}>
          <PeopleTabRedirect>
            {this.renderPeople({
              closeMenu,
              peopleView: TOUR_CONTRIBUTOR,
              filterView: {
                peopleFilterSelected: PEOPLE_FILTERS.CONTRIBUTORS,
                peopleTabOptionSelected: 'allContributors',
              },
              icon: 'lnr-share',
              label: 'Contributors',
            })}
          </PeopleTabRedirect>
        </Can>

        <Can do="create" on={NODE_SHARE}>
          <PeopleTabRedirect>
            {this.renderPeople({
              closeMenu,
              peopleView: PARTICIPANT,
              filterView: {
                participantViewFilter: VARIANTS.ALL_PARTICIPANTS,
                peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.ALL_PARTICIPANTS,
                peopleFilterSelected: PEOPLE_FILTERS.PARTICIPANTS,
              },
              icon: 'lnr-users',
              label: paxLabel,
            })}
          </PeopleTabRedirect>
        </Can>

        <Can do="create" on={NODE_SHARE}>
          <PeopleTabRedirect>
            {this.renderPeople({
              closeMenu,
              peopleView: INTERESTED_PEOPLE,
              filterView: {
                interestedListViewModalFilter: VARIANTS.ALL_FOLLOWERS,
                peopleTabOptionSelected: PEOPLE_TAB_OPTIONS.ALL_FOLLOWERS,
                peopleFilterSelected: PEOPLE_FILTERS.FOLLOWER,
              },
              icon: 'lnr-users-plus',
              label: 'Followers',
            })}
          </PeopleTabRedirect>
        </Can>

        <Can do="create" on={HASH_KEY}>
          <GridItem>
            <MenuItem
              icon="lnr-link"
              closeMenu={closeMenu}
              onClick={showCopyLinkDialog}
            >
              Get travel link
              {this.renderBadge()}
            </MenuItem>
          </GridItem>
        </Can>

        <Can do="create" on={EMAIL_EVENTS}>
          <GridItem>
            <MenuItem
              icon="lnr-envelope"
              closeMenu={closeMenu}
              onClick={this.openEmailToEvent}
            >
              Email-to-event Settings
            </MenuItem>
          </GridItem>
        </Can>

        <GridItem>
          <a href={URL_HELPERS.tourPrint(templateId)} target="_blank">
            <MenuItem icon="lnr-printer" closeMenu={closeMenu} hover>
              Open print view
            </MenuItem>
          </a>
        </GridItem>

        <Can do="create" on={CLONE}>
          <Can do="create" on={NODE_SHARE}>
            <GridItem>
              <MenuItem
                icon="lnr-papers"
                closeMenu={closeMenu}
                onClick={onClickClone}
              >
                Clone
              </MenuItem>
            </GridItem>
          </Can>
        </Can>

        <Can do="create" on={TEMPLATE_SETTING}>
          <GridItem>
            <MenuItem
              icon="lnr-cog"
              closeMenu={closeMenu}
              onClick={this.openSettings}
            >
              Settings
            </MenuItem>
          </GridItem>
        </Can>
        {(this.isOwner() || this.canTransferTour() || this.canDelete()) && (
          <GridItem>
            <Hr className={this.props.classes.hr}>Danger Zone</Hr>
          </GridItem>
        )}
        {this.canDelete() && (
          <GridItem>
            <MenuItem
              color="danger"
              icon="lnr-trash2"
              closeMenu={closeMenu}
              onClick={onClickDelete}
            >
              Delete
            </MenuItem>
          </GridItem>
        )}
        {(this.isOwner() || this.canTransferTour()) && (
          <GridItem>
            <MenuItem
              color="danger"
              icon="lnr-compare"
              closeMenu={closeMenu}
              onClick={onClickMove}
            >
              Move
            </MenuItem>
          </GridItem>
        )}
        {(this.canTransferTour() || this.isOwner()) && (
          <GridItem>
            <MenuItem
              color="danger"
              icon="lnr-share3"
              closeMenu={closeMenu}
              onClick={this.openTransferTour}
            >
              {LOGIC_HELPERS.ifElse(
                this.isTransferPending(),
                'Pending Transfer',
                'Transfer Ownership',
              )}
            </MenuItem>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  canDoSomething = () => ability.can('create', ACTIVITY);

  renderMore = isMobile =>
    this.canSeeMoreButtons() && (
      <Popper noPadding renderButton={this.renderMoreButton(isMobile)}>
        {this.renderMoreMenu}
      </Popper>
    );

  renderStar = ({ starred, onClick }) => {
    const { classes } = this.props;
    const outlineButtonProps = { variant: 'outline', color: 'black' };
    return (
      <Button {...outlineButtonProps} dense size="xs" onClick={onClick}>
        <GridContainer noWrap>
          <GridItem>
            {
              <Icon
                size="small"
                icon="lnr-star"
                className={classNames(
                  LOGIC_HELPERS.ifElse(starred, classes.defaultUnstar),
                )}
              />
            }
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  renderMobileButtons = () => {
    const { isPublic, templateId } = this.props;

    return (
      <GridContainer
        justify={LOGIC_HELPERS.ifElse(this.canDoSomething(), 'left', 'center')}
        noWrap
      >
        {this.canDoSomething() && (
          <GridItem>{this.renderModePopper(true)}</GridItem>
        )}
        <GridItem>
          {!isPublic && (
            <GridItem>{this.renderOpenCommentButton(VARIANTS.INLINE)}</GridItem>
          )}
        </GridItem>
        <GridItem>{this.renderMore(true)}</GridItem>
        <GridItem>
          <Star id={templateId}>{this.renderStar}</Star>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const {
      templateId,
      classes,
      buttonClassName,
      editable,
      isPublic,
      showManageTabs,
    } = this.props;

    const icon = LOGIC_HELPERS.ifElse(editable, 'lnr-pencil', 'lnr-eye');
    return (
      <Fragment>
        <GridContainer
          alignItems="center"
          wrap="nowrap"
          spacing={0}
          justify="flex-end"
        >
          <Hidden smDown>
            {this.canDoSomething() && (
              <GridItem>
                <GridContainer
                  spacing={0}
                  className={
                    showManageTabs
                      ? classes.actionButtons2
                      : classes.actionButtons
                  }
                  wrap="nowrap"
                >
                  <Fragment>
                    <GridItem className={classes.iconBorder}>
                      <Button
                        dense
                        noPadding
                        size="extraSmall"
                        color="black"
                        className={classNames(
                          classes.actionButton,
                          buttonClassName,
                        )}
                        title="Toggle viewing/editing mode"
                        onClick={this.toggleUpdateInfo}
                      >
                        <Icon size="small" icon={icon} />
                      </Button>
                    </GridItem>
                    <GridItem>{this.renderModePopper()}</GridItem>
                  </Fragment>
                </GridContainer>
              </GridItem>
            )}
            <GridItem>
              <GridContainer
                spacing={0}
                className={classes.actionButtons}
                wrap="nowrap"
              >
                <GridItem>
                  {!isPublic && this.renderOpenCommentButton()}
                </GridItem>
                <GridItem>{this.renderMore()}</GridItem>
              </GridContainer>
            </GridItem>
          </Hidden>
          <Hidden mdUp>
            <GridItem xs>{this.renderMobileButtons()}</GridItem>
          </Hidden>
        </GridContainer>

        <TourSettingsDialog id={templateId} />
      </Fragment>
    );
  };
}

TemplateActionButtonList.propTypes = {
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  onClickDelete: PropTypes.func,
  showCopyLinkDialog: PropTypes.func,
  // onClickUnderConstruction: PropTypes.func,
  onClickClone: PropTypes.func,
  onClickMove: PropTypes.func,
  templateId: PropTypes.number,
  isPublic: PropTypes.bool,
  showManageTabs: PropTypes.bool,
  onStiky: PropTypes.bool,

  // resaga
  editable: PropTypes.bool,
  hashkey: PropTypes.string,
  createdBy: PropTypes.any,
  me: PropTypes.number,
  transferStatus: PropTypes.string,
  content: PropTypes.string,
  paxLabel: PropTypes.string,
  // customisable
  buttonClassName: PropTypes.string,
  dayIds: PropTypes.array,
};

TemplateActionButtonList.defaultProps = {
  editable: false,
  isPublic: false,
  dayIds: [],
};

export default compose(
  withRouter,
  withStyles(stylesheet, { name: 'TemplateActionButtonList' }),
  resaga(CONFIG),
)(TemplateActionButtonList);
