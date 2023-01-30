import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import {
  ADMIN_TOUR_SETTINGS,
  CALENDAR_BADGE,
  COGNITO_ACCOUNTSTORE,
  CONTENT,
  DEFAULT_MAILTO_LINK_TEXT,
  HEADING,
  SUB_TITLE,
  TOUR_SETTINGS,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Hidden } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import InviteSelf from 'containers/Templates/Modals/ShareList/components/InviteSelf';
import TemplateActionButtons from 'containers/Templates/TemplateManagement/components/TemplateHeader/components/TemplateActionButtons';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import Star from 'smartComponents/Node/components/Star';
import AssignedOrganiser from 'smartComponents/Node/parts/AssignedOrganiser';
import Duration from 'smartComponents/Node/parts/Duration';
import Hashkey from 'smartComponents/Node/parts/Hashkey';
import Photo from 'smartComponents/Node/parts/Photo';
import StartDate from 'smartComponents/Node/parts/StartDate';
import Subtitle from 'smartComponents/Node/parts/Subtitle';
import { TourBannerPhoto } from 'smartComponents/Node/parts/TourBanner';
import TourRoles from 'smartComponents/Node/parts/TourRoles';
import { withNodeRole } from 'smartComponents/Node/hoc/withNodeRole';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { Facebook, Mail, Twitter, WhatsApp } from 'viewComponents/ShareButtons';
import FloatingActions from 'ugcomponents/Layout/PublicLayout/components/FloatingActions';
import { VARIANTS } from 'variantsConstants';
import { TEMPLATE } from 'utils/modelConstants';
import TourViewCount from 'smartComponents/Statistics/TourViewCount';
import Status from 'smartComponents/Node/parts/Status';
import JText from 'components/JText';
import Icon from 'ugcomponents/Icon';
import { TourSetting } from 'smartComponents/TourSettings';
import { GET_TEMPLATE_DETAIL, TEMPLATE_API } from 'apis/constants';

import CopyLinkDialog from '../CopyLinkDialog';
import stylesheet from './style';
import JButton from '../../../../../../../viewComponents/Button/variants/JButton';

export class TemplateDetailReadMode extends PureComponent {
  componentWillMount = () => {
    const { classes } = this.props;

    this.dialogProps = {
      maxWidth: false,
    };
    this.photoProps = {
      containerClassName: classes.templateImageContainer,
    };
  };

  canUpdateTemplate = () => {
    const { publicView } = this.props;
    return ability.can('update', TEMPLATE) && !publicView;
  };

  renderButtons = () => {
    const { templateId, readOnly } = this.props;

    if (readOnly) return null;

    return (
      <GridItem>
        <Star id={templateId} />
      </GridItem>
    );
  };

  renderCopyLinkDialog = () => {
    const { readOnly } = this.props;

    if (readOnly) return null;

    return <CopyLinkDialog />;
  };

  renderTourTitle = () => {
    const { editable, classes, templateId, publicView } = this.props;

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem
          className={classnames(LOGIC_HELPERS.ifElse(editable, classes.grow))}
          xs={!!editable}
        >
          <Hidden smDown>
            <NodeProp
              id={templateId}
              variant={HEADING}
              valueKey={CONTENT}
              component={GridItem}
              editable={editable && this.canUpdateTemplate()}
              bold
              showEmpty
              required
              isCustomData={false}
            />
          </Hidden>
          <Hidden mdUp>
            <NodeProp
              id={templateId}
              valueKey={CONTENT}
              component={GridItem}
              editable={editable && this.canUpdateTemplate()}
              bold
              showEmpty
              required
              isCustomData={false}
              className={classes.titleXs}
            />
          </Hidden>
        </GridItem>
        <Hidden smDown>{!publicView && this.renderButtons()}</Hidden>
      </GridContainer>
    );
  };

  renderSubtitle = () => {
    const { editable, classes, templateId } = this.props;

    return (
      <Subtitle
        id={templateId}
        component={GridItem}
        editable={editable && this.canUpdateTemplate()}
        showEmpty={editable}
        className={classes.subtitle}
      />
    );
  };

  renderHeaderContent = () => {
    const { classes, templateId } = this.props;

    return (
      <Fragment>
        <GridItem xs>
          <GridContainer alignItems="center" wrap="nowrap" spacing={2}>
            <StartDate
              id={templateId}
              variant={CALENDAR_BADGE}
              editable={this.canUpdateTemplate()}
              component={GridItem}
            />

            <GridItem xs>
              <GridContainer
                direction="column"
                spacing={0}
                wrap="nowrap"
                className={classes.titleColor}
              >
                <GridItem>{this.renderTourTitle()}</GridItem>

                <Hidden smDown>{this.renderSubtitle()}</Hidden>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </Fragment>
    );
  };

  // renderPublished = () => {
  //   const { classes, featuredTour } = this.props;
  //
  //   // do not render if this is organisation tour, or user is the owner
  //   // if (!personal) return null;
  //
  //   if (featuredTour) {
  //     return (
  //       <GridItem title="Featured">
  //         <GridContainer
  //           alignItems="center"
  //           spacing={0}
  //           className={classes.published}
  //         >
  //           <GridItem>
  //             <Icon size="xsmall" icon="lnr-earth" paddingRight />
  //           </GridItem>
  //           <GridItem>Published</GridItem>
  //         </GridContainer>
  //       </GridItem>
  //     );
  //   }
  //
  //   return null;
  // };

  renderCoverPhoto = () => {
    const { templateId } = this.props;

    return (
      <Photo
        id={templateId}
        component="div"
        renderEmpty
        dialogProps={this.dialogProps}
        classNames={this.photoProps}
        hideFrame
      />
    );
  };

  generatePublicTemplateLink = hashkey => {
    const { origin } = window.location;
    return `${origin}/public/template/${hashkey}`;
  };

  generateShareLinks = () => {
    const { hashkey, title, classes } = this.props;

    const url = this.generatePublicTemplateLink(hashkey);
    const body = `${title || DEFAULT_MAILTO_LINK_TEXT}: ${url}`;

    return (
      hashkey && (
        <GridContainer alignItems="center" wrap="nowrap" spacing={0}>
          <GridItem>
            <Facebook
              link={url}
              sizeButton="small"
              variant={VARIANTS.INLINE}
              message={title}
              tooltipProps={{
                title: 'Post to Facebook',
              }}
              customButtonClass={classes.shareButton}
            />
          </GridItem>
          <GridItem>
            <Twitter
              link={url}
              sizeButton="small"
              variant={VARIANTS.INLINE}
              message={title}
              tooltipProps={{
                title: 'Post to Twitter',
              }}
              customButtonClass={classes.shareButton}
            />
          </GridItem>
          <GridItem>
            <WhatsApp
              link={url}
              sizeButton="small"
              variant={VARIANTS.INLINE}
              message={title}
              tooltipProps={{
                title: 'Post to WhatsApp',
              }}
              customButtonClass={classes.shareButton}
            />
          </GridItem>
          <GridItem>
            <Mail
              link={body}
              sizeButton="small"
              variant={VARIANTS.INLINE}
              message={title}
              tooltipProps={{
                title: 'Send email',
              }}
              customButtonClass={classes.shareButton}
            />
          </GridItem>
        </GridContainer>
      )
    );
  };

  renderSharesAndview = () => {
    const { templateId, hashkey, publicView, printView, classes } = this.props;
    if (!hashkey) return null;
    return (
      <GridItem>
        <GridContainer
          alignItems="center"
          wrap="nowrap"
          className={classes.noWrap}
        >
          {LOGIC_HELPERS.ifElse(
            printView,
            null,
            <>
              <GridItem>
                <Hashkey id={templateId} component={GridItem} expand />
              </GridItem>
              <GridItem>{this.generateShareLinks()}</GridItem>
            </>,
          )}
          {publicView ? null : (
            <React.Fragment>
              <GridItem>
                <JButton className={classes.bar}>
                  <JText darkGray>|</JText>
                </JButton>
              </GridItem>
              <GridItem>
                <TourViewCount id={templateId} label="VIEWS" />
              </GridItem>
            </React.Fragment>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  renderMobileTourHeader = () => {
    const {
      templateId,
      publicView,
      disableRYI,
      printView,
      classes,
      smDown,
    } = this.props;
    return (
      <GridContainer
        alignItems="baseline"
        className={smDown && classes.mobileDefault}
      >
        <GridItem xs>
          <GridContainer
            alignItems="center"
            spacing={LOGIC_HELPERS.ifElse(smDown, 1, 2)}
            noWrap={!smDown}
          >
            <GridItem>
              <Status
                id={templateId}
                variant={VARIANTS.BADGE}
                disabled={!this.canUpdateTemplate()}
              >
                {LOGIC_HELPERS.ifElse(
                  printView,
                  null,
                  <StartDate
                    id={templateId}
                    variant={SUB_TITLE}
                    // component={GridItem}
                  />,
                )}
              </Status>
            </GridItem>
            <Duration
              id={templateId}
              className={classnames('j-text-ellipsis', classes.nowrap)}
            />
            <TourRoles id={templateId} tourRoles={this.props.roles} />
            <Hidden mdUp>{this.renderSharesAndview()}</Hidden>
            {publicView && this.renderSharesAndview()}
            {!publicView && (
              <Hidden mdUp>
                <TourSetting
                  settingKey={TOUR_SETTINGS.PUSH_NOTIFICATION}
                  variant={VARIANTS.RENDER_PROP}
                  id={templateId}
                  withAction
                  smDown={smDown}
                >
                  {this.renderNotifyStatus}
                </TourSetting>
                <TourSetting
                  settingKey={ADMIN_TOUR_SETTINGS.TOUR_CODE}
                  variant={VARIANTS.RENDER_PROP}
                  id={templateId}
                  withAction
                  smDown={smDown}
                >
                  {this.renderTourCode}
                </TourSetting>
              </Hidden>
            )}
          </GridContainer>
        </GridItem>
        {publicView ? (
          <GridItem>
            <FloatingActions disableRYI={disableRYI} />
          </GridItem>
        ) : (
          <Hidden smDown>
            <GridItem>
              <TemplateActionButtons
                isPublic={publicView}
                templateId={templateId}
              />
            </GridItem>
          </Hidden>
        )}
      </GridContainer>
    );
  };

  renderNotifyStatus = (value, onClick) => {
    const { classes, smDown } = this.props;
    const isOn = value === '1';
    const text = LOGIC_HELPERS.ifElse(isOn, 'Active', 'Off');
    const props = this.canUpdateTemplate()
      ? {
          onClick,
          title: `click to turn ${LOGIC_HELPERS.ifElse(
            isOn,
            'OFF',
            'ON',
          )} notifications`,
        }
      : {};
    return (
      <GridItem>
        <GridContainer
          spacing={0}
          noWrap
          className={classnames(
            smDown && classes.mobileDefault,
            classes.subtitle,
            classes.noWrap,
          )}
          alignItems="center"
        >
          <GridItem>
            <JText gray danger={!isOn} darkgreen={isOn}>
              <Icon paddingRight size="small" icon="lnr-alarm" />
            </JText>
          </GridItem>
          <GridItem>
            <JText halfPaddingRight>Notifications{''}</JText>
          </GridItem>
          <GridItem>
            <JText
              gray
              capitalize
              danger={!isOn}
              success={isOn}
              title
              sm={smDown}
              {...props}
            >
              {' '}
              {text}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderTourCode = value => {
    if (!value) return null;
    const { classes, smDown } = this.props;
    return (
      <GridItem>
        <GridContainer
          spacing={0}
          noWrap
          className={classnames(
            smDown && classes.mobileDefault,
            classes.subtitle,
            classes.noWrap,
          )}
          alignItems="center"
        >
          <GridItem>
            <JText halfPaddingRight>Itinerary Reference:</JText>
          </GridItem>
          <GridItem>{value}</GridItem>
          <GridItem>
            <Icon size="small" icon="lnr-barcode" color="white" />
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderAssignedOrganiser = isTemplatePhoto => {
    const { templateId, classes } = this.props;
    return (
      <GridItem
        md={4}
        sm={6}
        xs={12}
        className={!isTemplatePhoto && classes.addMargins}
      >
        <Box pr={1}>
          <AssignedOrganiser variant={VARIANTS.READ_ONLY} id={templateId} />
        </Box>
      </GridItem>
    );
  };

  render = () => {
    const {
      classes,
      templateId,
      publicView,
      smDown,
      fetchingTemplate,
    } = this.props;

    const renderHeaderContent = this.renderHeaderContent();
    const coverPhoto = this.renderCoverPhoto();
    const actionButtons = publicView ? null : (
      <Hidden mdUp>
        <GridItem>
          <TemplateActionButtons
            isPublic={publicView}
            templateId={templateId}
          />
        </GridItem>
      </Hidden>
    );

    return (
      <Fragment>
        {this.renderCopyLinkDialog()}
        <GridContainer
          direction="column"
          spacing={0}
          className={classes.whiteBg}
        >
          {publicView ? (
            <GridItem className={classes.grow}>
              <GridContainer
                direction="row"
                alignItems="center"
                justify="space-between"
                spacing={0}
                wrap="nowrap"
              >
                <TourBannerPhoto
                  id={templateId}
                  smDown={smDown}
                  renderAssignedOrganiser={this.renderAssignedOrganiser}
                />
              </GridContainer>
            </GridItem>
          ) : null}
          <GridItem>
            <GridContainer direction="column" spacing={0} noWrap>
              <GridItem className={classes.photoMinHeight}>
                {coverPhoto}
              </GridItem>
              <GridItem
                className={classnames(
                  classes.tourHeader,
                  LOGIC_HELPERS.ifElse(smDown, classes.tourHeaderXs),
                  classes.relative,
                )}
              >
                <GridContainer
                  direction="column"
                  noWrap
                  className={classnames(classes.nowrap, classes.fullWidth)}
                >
                  <GridItem>
                    <GridContainer alignItems="center">
                      {renderHeaderContent}
                    </GridContainer>
                  </GridItem>
                  <Hidden mdUp>
                    <GridItem
                      className={classnames(
                        classes.paddingTop,
                        classes.mobileDefault,
                      )}
                    >
                      {this.renderSubtitle()}
                    </GridItem>
                  </Hidden>
                  {actionButtons}
                  <GridItem>
                    <GridContainer direction="column" spacing={0}>
                      <GridItem className={classes.subtitle}>
                        {this.renderMobileTourHeader()}
                      </GridItem>
                      <Hidden smDown>
                        <React.Fragment>
                          {!publicView && !fetchingTemplate && (
                            <React.Fragment>
                              <GridItem>{this.renderSharesAndview()}</GridItem>
                              <GridItem>
                                <GridContainer>
                                  <TourSetting
                                    settingKey={TOUR_SETTINGS.PUSH_NOTIFICATION}
                                    variant={VARIANTS.RENDER_PROP}
                                    id={templateId}
                                    withAction
                                    smDown={smDown}
                                  >
                                    {this.renderNotifyStatus}
                                  </TourSetting>
                                  <TourSetting
                                    settingKey={ADMIN_TOUR_SETTINGS.TOUR_CODE}
                                    variant={VARIANTS.RENDER_PROP}
                                    id={templateId}
                                    withAction
                                    smDown={smDown}
                                  >
                                    {this.renderTourCode}
                                  </TourSetting>
                                </GridContainer>
                              </GridItem>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      </Hidden>
                    </GridContainer>
                  </GridItem>
                  {!fetchingTemplate && <InviteSelf id={templateId} />}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Fragment>
    );
  };
}

TemplateDetailReadMode.propTypes = {
  classes: PropTypes.object,
  templateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editable: PropTypes.bool,
  readOnly: PropTypes.bool,
  publicView: PropTypes.bool,
  printView: PropTypes.bool,
  smDown: PropTypes.bool,
  hashkey: PropTypes.string,
  title: PropTypes.string,
  disableRYI: PropTypes.bool,
  roles: PropTypes.array,
  fetchingTemplate: PropTypes.bool,
  // resaga props
};
TemplateDetailReadMode.defaultProps = {
  readOnly: false,
  publicView: false,
  disableRYI: false,
  roles: [],
};

export const CONFIG = {
  value: {
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    hashkey: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.hashkey, 'templateId'),
    title: NODE_STORE_SELECTORS.content,
    disableRYI: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.disableRYI,
      'templateId',
    ),
    userId: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
  },
  isLoading: {
    fetchingTemplate: [TEMPLATE_API, GET_TEMPLATE_DETAIL],
  },
};

export default compose(
  withStyles(stylesheet, { name: 'TemplateDetailReadMode' }),
  withSMDown,
  resaga(CONFIG),
  withNodeRole,
)(TemplateDetailReadMode);
