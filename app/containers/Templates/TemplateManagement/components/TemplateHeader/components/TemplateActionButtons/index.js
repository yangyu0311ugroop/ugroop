import { withStyles } from '@material-ui/core/styles';
import {
  CREATE_CLONE,
  REMOVE_TEMPLATE,
  NODE_API,
  TEMPLATE_API,
  FIND_ORGANISATION_ID,
  UPDATE_NODE,
  ORGANISATION_API,
  GET_ORG_MEMBERS,
  GET_ORGANISATION,
} from 'apis/constants';
import {
  DO_NOTHING,
  URL_HELPERS,
  DEFAULT_NODE_SHARE_TOUR_ID,
} from 'appConstants';
import { FOLDER_NAME } from 'containers/Templates/constants';
import { DATASTORE_UTILS } from 'datastore';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import Dialog from 'ugcomponents/Dialog';
import SnakcbarHelper from 'ugcomponents/SnackBar/helpers';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from 'ugcomponents/Icon/index';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import {
  CHECKITEM,
  CHECKLIST,
  EVENT_ACCOMMODATIONS,
  EVENT_ACTIVTIES,
  EVENT_TRANSPORTATIONS,
  TEMPLATE,
} from 'utils/modelConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
import {
  CONFIG,
  GET_BREADCRUMB_TRAIL,
  GET_NEEDED_TRAILS,
  GET_USER_ID,
  GET_USER_ORGS,
  GET_ORG_ID,
} from './config';
import style from './style';
import TemplateActionButtonList from './templateActionButtonList';
import FolderTree from '../../../../../Components/FolderTree';
import FolderExplorerCUD from '../../../../../../../datastore/folderExplorerStore/helpers/CUD';
import { FOLDER_TREE_MOVE_MODE } from '../../../../../Components/FolderTree/constants';

export class TemplateActionButtons extends PureComponent {
  static propTypes = {
    resaga: PropTypes.object.isRequired,
    templateId: PropTypes.number,
  };

  static defaultProps = {
    templateId: 0,
  };

  state = {
    featureDialog: false,
    errorMessage: '',
    isDeleteDialogOpen: false,
    optionOpen: false,
    includeCheckList: false,
    includeEvents: false,
    optionRedirect: false,
    loading: false,
    cloneId: 0,
    closing: false,
    includeEventAttachments: true,
  };

  componentWillUnmount = () => {
    clearTimeout(this.formTimeout);
  };

  onClickDelete = () => {
    this.setState({
      isDeleteDialogOpen: true,
    });
  };

  onCloneSuccess = () => {
    this.setState({ optionRedirect: true, loading: false });
  };

  onDeleteConfirmed = () => {
    const {
      templateId,
      templateParentId,
      rootNodeName,
      rootNodeOrgId,
    } = this.props;

    const orgId = LOGIC_HELPERS.ifElse(
      rootNodeName === FOLDER_NAME.ORG_TOURS,
      rootNodeOrgId,
      DEFAULT_NODE_SHARE_TOUR_ID,
    );

    this.props.resaga.dispatchTo(TEMPLATE_API, REMOVE_TEMPLATE, {
      payload: {
        id: templateId,
        items: [{ id: templateId }],
        sortedIdsKeyPath: `${templateParentId}.calculated.sortedIds`,
        keyPath: `${templateParentId}.children`,
        orgTourKeypath: `${orgId}.children`,
      },
      onSuccess: this.onDeleteSuccess,
      onError: this.handleError,
    });
  };

  onCancelDeleteDialog = () => {
    this.setState({
      isDeleteDialogOpen: false,
    });
  };

  onClickShare = () => {
    this.props.resaga.setValue({ shareDialog: true });
  };

  onClickParticipants = () => {
    this.props.resaga.setValue({ participantListViewOpen: true });
  };

  onClickFollowers = () => {
    this.props.resaga.setValue({ interestedListViewOpen: true });
  };

  onClickAddChecklist = () => {
    const { templateId } = this.props;
    this.props.resaga.setValue({ addChecklistParentId: templateId });
  };

  onClickClone = () => {
    this.setState({ optionOpen: true });
  };

  onCloseCloneOption = () => {
    if (this.state.loading) return;

    this.setState({
      optionOpen: false,
      includeCheckList: false,
      optionRedirect: false,
      closing: false,
    });
  };

  onClickUnderConstruction = () => {
    this.setState({ featureDialog: true });
  };

  onCloseFeatureDialog = () => {
    this.setState({ featureDialog: false });
  };

  onCloseErrorDialog = () => {
    this.setState({ errorMessage: '' });
  };

  onDeleteSuccess = () => {
    const { templateId } = this.props;
    this.props.resaga.setValue({
      stars: DATASTORE_UTILS.removeItemsInArray(templateId),
    });
    this.onSuccessReroute();
  };

  onSuccessReroute = () => {
    this.getUrl();
  };

  onSuccessRoute = () => {
    const { cloneId } = this.state;
    this.props.history.push(`${URL_HELPERS.tours()}/${cloneId}`);
  };

  onSuccessCloneReroute = () => {
    this.getUrl(true);
  };

  onCloneSuccessMethod = result => {
    this.setState({ cloneId: result.cloneId });
    this.onCloneSuccess();
  };

  onConfirmOption = () => {
    const { templateId } = this.props;
    const {
      includeCheckList,
      optionRedirect,
      includeEvents,
      includeEventAttachments: eventAttachments,
    } = this.state;
    const includeEventAttachments = LOGIC_HELPERS.ifElse(
      includeEvents,
      eventAttachments,
      false,
    );
    let ignoreTypes = LOGIC_HELPERS.ifElse(
      !includeCheckList,
      [CHECKITEM, CHECKLIST],
      [],
    );
    ignoreTypes = LOGIC_HELPERS.ifElse(
      !includeEvents,
      [
        ...ignoreTypes,
        ...EVENT_ACCOMMODATIONS,
        ...EVENT_ACTIVTIES,
        ...EVENT_TRANSPORTATIONS,
      ],
      [...ignoreTypes],
    );

    if (optionRedirect) {
      this.setState({ closing: true });
      this.formTimeout = setTimeout(() => {
        this.onCloseCloneOption();
        this.onSuccessRoute();
      }, 1500);
      return;
    }

    this.setState({ loading: true });
    this.props.resaga.dispatchTo(NODE_API, CREATE_CLONE, {
      payload: {
        id: templateId,
        data: { ignoreTypes, includeEvents, includeEventAttachments },
      },
      onSuccess: this.onCloneSuccessMethod,
      onError: this.handleError,
    });
  };

  onChangeCheck = () => {
    const { includeCheckList } = this.state;
    this.setState({
      includeCheckList: !includeCheckList,
    });
  };

  onChangeEvents = () => {
    const { includeEvents } = this.state;
    this.setState({
      includeEvents: !includeEvents,
      includeEventAttachments: !includeEvents,
    });
  };

  onChangeEventAttachments = () => {
    const { includeEventAttachments } = this.state;
    this.setState({
      includeEventAttachments: !includeEventAttachments,
    });
  };

  getUrl = (redirectSharedToMyTours = false) => {
    const trails = this.props.trails;
    const parentId = trails[trails.length - 2];
    const rootNodeName = this.props.rootNodeName;
    const organisationId = this.props.rootNodeOrgId;
    switch (rootNodeName) {
      case FOLDER_NAME.ORG_TOURS: {
        return this.props.history.push(
          `${URL_HELPERS.orgTours(organisationId)}?current=${parentId}`,
        );
      }
      case FOLDER_NAME.SHARED_TOURS: {
        if (redirectSharedToMyTours) {
          return this.props.history.push(`${URL_HELPERS.tours()}`);
        }
        return this.props.history.push(`${URL_HELPERS.sharedTours()}`);
      }
      default: {
        return this.props.history.push(
          `${URL_HELPERS.tours()}?current=${parentId}`,
        );
      }
    }
  };

  handleError = err => {
    if (err.status === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED) {
      SnakcbarHelper.openErrorSnackbar(
        'You are not authorized in doing the action',
        this.props.resaga,
      );
      this.onCancelDeleteDialog();
    }
  };

  errorDialog = () => {
    let dialog = null;
    if (this.state.errorMessage) {
      const { classes } = this.props;
      const customClassnames = {
        headline: classes.headlineText,
      };
      dialog = (
        <Dialog
          button={1}
          template="custom"
          dialogTitle="ERROR"
          headlineIcon="lnr-warning"
          headlineTitle="An Error Occurred"
          headlineText={this.state.errorMessage}
          confirmButton="Go back"
          confirmFunc={this.onCloseErrorDialog}
          cancelFunc={this.onCloseErrorDialog}
          open
          customClassnames={customClassnames}
        />
      );
    }
    return dialog;
  };

  openComment = () => {
    const { templateId } = this.props;
    this.props.resaga.setValue({
      nodeId: templateId,
      nodeStore: 'templates',
    });
  };

  cloneTemplateError = err => {
    this.setState({
      errorMessage: `${err.status ? `HTTP ${err.status}: ` : ''}${
        err.response.error.message
      }`,
    });
  };

  cloneTemplateSuccess = ({ cloneId }) => {
    this.setState({ errorMessage: '' });
    const { tourOwnerAbilities } = this.props;
    if (!tourOwnerAbilities.length) {
      return DO_NOTHING;
    }
    // add owner abilities to newly created `id`
    return this.props.resaga.setValue({
      tours: DATASTORE_UTILS.upsertArray(`${cloneId}`, tourOwnerAbilities),
    });
  };

  underConstruction = () => {
    const { classes } = this.props;
    const customClassnames = {
      headline: classes.headlineText,
    };
    return (
      <Dialog
        button={1}
        template="custom"
        dialogTitle="FEATURE UNAVAILABLE"
        headlineIcon="lnr-construction"
        headlineTitle="This feature is under construction"
        headlineText="So we can make it work great we are still working on it. It will be coming soon. Thank you for your understanding."
        confirmButton="Go back"
        confirmFunc={this.onCloseFeatureDialog}
        cancelFunc={this.onCloseFeatureDialog}
        open={this.state.featureDialog}
        customClassnames={customClassnames}
      />
    );
  };

  openCopyLinkDialog = () => {
    this.props.resaga.setValue({
      showCopyLinkDialog: true,
    });
  };

  checkListOption = () => {
    const { classes } = this.props;
    const { optionRedirect } = this.state;
    if (optionRedirect) return this.renderRedirectOptionSubHeader();
    return (
      <Card className={classes.cardRoot}>
        <GridContainer
          className={classes.option}
          // spacing={0}
          direction="column"
          alignItems="center"
        >
          <GridItem>
            <GridContainer
              className={classes.option}
              spacing={0}
              direction="column"
            >
              <GridItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<Icon icon="lnr-check-square" />}
                      icon={
                        <Icon icon="lnr-square" className={classes.checkBox} />
                      }
                      checked={this.state.includeCheckList}
                      onChange={this.onChangeCheck}
                      classes={{
                        root: classes.checkBoxRoot,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Copy checklist to the new tour"
                  classes={{ label: classes.checkLabel }}
                  className={classes.formLabel}
                />
              </GridItem>
              <GridItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={<Icon icon="lnr-check-square" />}
                      icon={
                        <Icon icon="lnr-square" className={classes.checkBox} />
                      }
                      checked={this.state.includeEvents}
                      onChange={this.onChangeEvents}
                      classes={{
                        root: classes.checkBoxRoot,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Copy events to the new tour"
                  classes={{ label: classes.checkLabel }}
                  className={classes.formLabel}
                />
              </GridItem>
              {this.state.includeEvents && (
                <GridItem>
                  <Box pl={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checkedIcon={<Icon icon="lnr-check-square" />}
                          icon={
                            <Icon
                              icon="lnr-square"
                              className={classes.checkBox}
                            />
                          }
                          checked={this.state.includeEventAttachments}
                          onChange={this.onChangeEventAttachments}
                          classes={{
                            root: classes.checkBoxRoot,
                            checked: classes.checked,
                          }}
                          disabled={!this.state.includeEvents}
                        />
                      }
                      label="Include event attachments"
                      classes={{ label: classes.checkLabel }}
                      className={classes.formLabel}
                    />
                  </Box>
                </GridItem>
              )}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Card>
    );
  };

  renderRedirectOptionSubHeader = () => {
    const { classes } = this.props;
    return (
      <GridContainer className={classes.option}>
        <GridItem>Tour Cloned Successfully</GridItem>
      </GridContainer>
    );
  };

  renderCloneOption = () => {
    const { optionRedirect, loading, optionOpen, closing } = this.state;
    const { classes } = this.props;
    const customClassnames = {
      confirmButton: classes.displayBlock,
    };
    return (
      <Dialog
        customClassnames={customClassnames}
        muiDialogProps={this.muiDialogProps}
        dialogTitle="Copy Option"
        headlineIcon="lnr-papers"
        headlineTitle={this.props.templateTitle}
        headlineText={this.checkListOption()}
        confirmFunc={this.onConfirmOption}
        open={optionOpen}
        cancelFunc={this.onCloseCloneOption}
        template="confirm"
        loading={loading || closing}
        disabled={loading || closing}
        confirmButton={optionRedirect ? 'Go to the cloned tour' : 'Confirm'}
        cancelButton={optionRedirect ? 'Stay in this tour' : 'Cancel'}
        onCloseFunc={this.onCloseCloneOption}
      />
    );
  };

  renderDeleteConfirmationDialog = () => (
    <Dialog
      headlineTitle={this.props.templateTitle}
      headlineText="Are you sure you want to delete this tour? This action cannot be undone"
      dialogTitle="Delete This Tour"
      template="delete"
      open={this.state.isDeleteDialogOpen}
      cancelFunc={this.onCancelDeleteDialog}
      confirmFunc={this.onDeleteConfirmed}
    />
  );

  onFolderTreeReset = () => {
    const { templateId } = this.props;
    this.props.resaga.setValue({
      isOpenFolderTree: false,
      selectedId: -1,
      selectedType: null,
      selectedName: '',
    });

    this.props.resaga.dispatchTo(TEMPLATE_API, FIND_ORGANISATION_ID, {
      payload: { id: templateId },
      onSuccess: this.fetchOrgInfo,
    });
  };

  getOrgSuccess = ({ preferenceData = {} }) => {
    const arrVal = Object.values(preferenceData);
    let paxLabel = null;
    if (Array.isArray(arrVal) && arrVal.length > 0) {
      paxLabel = get(arrVal[0], 'paxLabel');
    }
    return this.props.resaga.setValue({ paxLabel });
  };

  fetchOrgDetails = organisationId => () => {
    this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORGANISATION, {
      payload: { id: organisationId },
      onSuccess: this.getOrgSuccess,
    });
  };

  fetchOrgMembers = organisationId => () => {
    const { organisationIds } = this.props;
    if (organisationId > 0 && organisationIds.indexOf(organisationId) !== -1) {
      this.props.resaga.dispatchTo(ORGANISATION_API, GET_ORG_MEMBERS, {
        payload: { id: organisationId },
        onSuccess: this.fetchOrgDetails(organisationId),
      });
    }
  };

  fetchOrgInfo = ({ id, node }) => {
    const { templateId, rootNodeOrgId } = this.props;
    // ignore result from old request
    const nodeId = templateId;
    if (id !== nodeId) return null;

    const organisationId = get(node, 'calculated.organisationId', -1);
    if (organisationId !== rootNodeOrgId) {
      this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
        payload: {
          nodeId,
          node: { type: TEMPLATE, customData: { organisationId } },
        },
        onSuccess: this.fetchOrgMembers(organisationId),
      });
    }
    return true;
  };

  renderMoveDialog = () => FolderTransactions => {
    const {
      templateId,
      templateTitle,
      templateParentId,
      rootNodeId,
    } = this.props;

    return (
      <FolderTree
        onConfirm={FolderTransactions.onMoveConfirm(
          templateId,
          'template',
          templateParentId,
        )}
        dialogTitle={`Move ${templateTitle}`}
        // disabledFolderId={disabledFolderId}
        onConfirmSuccess={this.onFolderTreeReset}
        rootParentNodeId={rootNodeId}
        folderId={templateParentId}
      />
    );
  };

  onClickMove = () => {
    const { templateId, templateTitle } = this.props;
    this.props.resaga.setValue({
      isOpenFolderTree: true,
      folderTreeMode: FOLDER_TREE_MOVE_MODE,
      selectedId: templateId,
      selectedType: 'template',
      selectedName: templateTitle,
    });
  };

  render = () => {
    const {
      templateId,
      onStiky,
      buttonClassName,
      spacing,
      isPublic,
      timelineId,
      rootNodeOrgId,
      rootNodeId,
      parentNodeId,
    } = this.props;

    return (
      <div>
        {this.underConstruction()}
        {this.errorDialog()}
        {this.renderDeleteConfirmationDialog()}
        {this.renderCloneOption()}
        <TemplateActionButtonList
          onClickDelete={this.onClickDelete}
          openComment={this.openComment}
          showCopyLinkDialog={this.openCopyLinkDialog}
          onClickClone={this.onClickClone}
          onClickShare={this.onClickShare}
          onClickParticipants={this.onClickParticipants}
          onClickFollowers={this.onClickFollowers}
          onClickAddChecklist={this.onClickAddChecklist}
          onClickUnderConstruction={this.onClickUnderConstruction}
          onClickMove={this.onClickMove}
          templateId={templateId}
          onStiky={onStiky}
          buttonClassName={buttonClassName}
          spacing={spacing}
          isPublic={isPublic}
          timelineId={timelineId}
        />
        <FolderExplorerCUD
          folderId={parentNodeId}
          rootNodeId={rootNodeId}
          orgId={rootNodeOrgId}
        >
          {this.renderMoveDialog()}
        </FolderExplorerCUD>
      </div>
    );
  };
}
TemplateActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  // parent props
  templateId: PropTypes.number,
  isPublic: PropTypes.bool,
  // resaga
  templateTitle: PropTypes.string,
  tourOwnerAbilities: PropTypes.array,
  onStiky: PropTypes.bool,
  trails: PropTypes.array,
  rootNodeName: PropTypes.string,
  rootNodeOrgId: PropTypes.number,
  timelineId: PropTypes.number,
  rootNodeId: PropTypes.number,
  parentNodeId: PropTypes.number,
  organisationIds: PropTypes.array,
  // withRouter props
  history: PropTypes.object.isRequired,
  templateParentId: PropTypes.number,

  // custom
  buttonClassName: PropTypes.string,
  spacing: PropTypes.number,
};
TemplateActionButtons.defaultProps = {
  templateId: 0,
  templateTitle: '',
  onStiky: false,
  trails: [],
  rootNodeName: '',
  rootNodeOrgId: 0,
};
export default compose(
  withStyles(style, { name: 'TemplateActionButtons' }),
  resaga(GET_BREADCRUMB_TRAIL),
  resaga(GET_NEEDED_TRAILS),
  resaga(GET_USER_ID),
  resaga(GET_USER_ORGS),
  resaga(GET_ORG_ID),
  resaga(CONFIG),
)(withRouter(TemplateActionButtons));
