import { DO_NOTHING, PERSONAL, ORGANISATION_TOURS, ICON } from 'appConstants';
import { FOLDER_TREE_MOVE_MODE } from 'containers/Templates/Components/FolderTree/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import _ from 'lodash';
import {
  BATCH_GET_FOLDER_TREE,
  FOLDER_API,
  GET_FOLDER_TREE,
} from 'apis/constants';
import TreeView from 'ugcomponents/TreeView';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
// import { URL_CHECKER } from 'utils/helpers/url';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import { isEmptyString } from 'utils/stringAdditions';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { LoadingText } from 'ugcomponents/Progress';
import { VARIANTS } from 'variantsConstants';
import { H4 } from 'viewComponents/Typography';
import Content from 'smartComponents/Node/parts/Content';
import Status from 'smartComponents/Node/parts/Status';
import Name from 'smartComponents/Organisation/parts/Name';
import get from 'lodash/get';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from 'ugcomponents/Icon/index';
import JDialog from 'ugcomponents/JDialog';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import {
  CONFIG,
  CONFIG_ORGANISATION_ID,
  KNOWNAS_CONFIG,
  CONFIG_USER_ORGANISATIONS,
  CONFIG_ORG_MEMBERS,
} from './config';
import m from './messages';
import styles from './styles';
import JText from '../../../../components/JText';
import KnownAs from '../../../../smartComponents/Person/parts/KnownAs';
// import TourCount from '../../../../smartComponents/Organisation/parts/TourCount';
import PersonPhoto from '../../../../smartComponents/Person/parts/Photo';

export class FolderTree extends PureComponent {
  state = {
    items: [],
    selected: -1,
    selectedTitle: null,
    isFetchLoading: true,
    errStatusCode: null,
    includeCheckList: false,
  };

  componentDidMount = () => {
    this.fetchFolders();
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.XXS,
    };
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isOpen !== this.props.isOpen && this.props.isOpen === true) {
      this.fetchFolders();
      this.setState({
        selected: this.props.currentOrgRootNodeId,
      });
    }
  };

  onSelect = (selected, selectedTitle) => {
    this.setState({
      selected,
      selectedTitle,
    });
  };

  onConfirmSuccess = () => {
    this.resetState();
    this.fetchFolders(this.props.rootNodeId);
    this.props.resaga.setValue({
      isOpen: false,
    });
    this.props.onConfirmSuccess();
  };

  onConfirm = () => {
    this.props.onConfirm(this.state.selected, {
      includeCheckList: this.state.includeCheckList,
      onSuccess: this.onConfirmSuccess,
      onError: this.onConfirmSuccess,
    });
  };

  onClose = () => {
    this.props.resaga.setValue({
      isOpen: false,
    });
    this.resetState();
  };

  onChangeCheck = () =>
    this.setState(prevProps => ({
      includeCheckList: !prevProps.includeCheckList,
    }));

  getRootNodeIds = ids =>
    Array.isArray(this.props.rootNodeId)
      ? [...ids, ...this.props.rootNodeId]
      : [...ids, this.props.rootNodeId];

  getTreeIds = () => {
    const {
      orgNodeIds,
      // orgToursId,
      myToursId,
      // folderTreeMode,
      // location,
    } = this.props;

    return this.getRootNodeIds([...orgNodeIds, myToursId]);

    // const pathname = get(location, 'pathname', null);

    /* if (URL_CHECKER.isOnMyToursPage(pathname)) {
      return folderTreeMode === FOLDER_TREE_COPY_MODE
        ? this.getRootNodeIds([...orgNodeIds, myToursId])
        : this.getRootNodeIds([myToursId]);
    } */
    /* if (
      folderTreeMode === FOLDER_TREE_COPY_MODE ||
      (folderTreeMode === FOLDER_TREE_MOVE_MODE && this.canMoveToOtherOrg())
    ) {
      return this.getRootNodeIds([...orgNodeIds, myToursId]);
    }

    let ids = [orgToursId];
    ids = this.getRootNodeIds(ids);
    return ids; */
  };

  getErrorDisplay = statusCode => {
    switch (statusCode) {
      case HTTP_STATUS_CODE.STATUS_UNAUTHORIZED: {
        return <H4 error>You are unauthorized for doing the action</H4>;
      }

      default: {
        return <H4 error>Something went wrong... Please try again</H4>;
      }
    }
  };

  getChildrenForEachParentNode = rawResults =>
    rawResults.reduce(
      (acc, folder) => [
        ...acc,
        get(folder, 'children', []).filter(child => child.status !== PERSONAL),
      ],
      [],
    );

  assignNewChildrenToParentNode = (rootFolders, newChildren) =>
    rootFolders.map((item, index) => {
      if (item.content === ORGANISATION_TOURS) {
        return {
          children: newChildren[index],
          content: item.content,
          id: item.id,
          status: item.status,
        };
      }
      return item;
    });

  handleFetchArrayFolderSuccess = result => {
    const rawResults = get(result, 'raw', []);

    const children = this.getChildrenForEachParentNode(rawResults);

    const arr = children.map(child => _.difference(child, [null]));

    const newItems = this.assignNewChildrenToParentNode(result.raw, arr);

    this.setState({
      items: newItems,
      isFetchLoading: false,
    });
  };

  handleFetchFolderError = err => {
    if (this.props.isOpen) {
      const statusCode = err.response.error.statusCode;
      if (statusCode === HTTP_STATUS_CODE.STATUS_UNAUTHORIZED) {
        this.setState({
          errStatusCode: statusCode,
          items: [],
          isFetchLoading: false,
        });
        return SnackbarHelper.openErrorSnackbar(
          'You are not authorized to do the action',
          this.props.resaga,
        );
      }
      this.setState({
        errStatusCode: statusCode,
        items: [],
        isFetchLoading: false,
      });
      return SnackbarHelper.openErrorSnackbar(
        'Something went wrong... Please try again',
        this.props.resaga,
      );
    }

    return DO_NOTHING;
  };

  fetchFolders = () => {
    if (this.props.isOpen) {
      this.setState({
        isFetchLoading: true,
        errStatusCode: null,
      });
      const ids = this.getTreeIds();

      if (Array.isArray(ids)) {
        this.props.resaga.dispatchTo(FOLDER_API, BATCH_GET_FOLDER_TREE, {
          payload: { ids },
          onSuccess: this.handleFetchArrayFolderSuccess,
          onError: this.handleFetchFolderError,
        });
      } else {
        this.props.resaga.dispatchTo(FOLDER_API, GET_FOLDER_TREE, {
          payload: { id: ids },
          onSuccess: this.fetchFoldersSuccess,
          onError: this.handleFetchFolderError,
        });
      }
    }
  };

  fetchFoldersSuccess = result => {
    const itemList = result;
    itemList.content = this.props.intl.formatMessage(m.rootFolder);
    const items = [itemList];
    this.setState({
      items,
      isFetchLoading: false,
    });
  };

  resetState = () =>
    this.setState({
      selected: -1,
      selectedTitle: '',
    });

  customClassnames = {
    action: this.props.classes.actionClass,
    dialog: this.props.classes.dialog,
    content: this.props.classes.dialogContent,
    actionContainer: this.props.classes.dialogAction,
    confirmButton: this.props.classes.confirmButton,
  };

  muiDialogProps = {
    fullWidth: true,
  };

  cloneOption = () => {
    const { classes, showOption } = this.props;

    return (
      showOption && (
        <GridContainer spacing={0} direction="column">
          {/* <GridItem>
            <H5 className={classes.optionTextLabel}>Clone Option:</H5>
          </GridItem> */}
          <GridItem>
            <FormControlLabel
              control={
                <Checkbox
                  checkedIcon={<Icon icon="lnr-check-square" />}
                  icon={<Icon icon="lnr-square" className={classes.checkBox} />}
                  checked={this.state.includeCheckList}
                  onChange={this.onChangeCheck}
                  classes={{ root: classes.checkBoxRoot }}
                />
              }
              label="Copy checklist to the new tour"
              classes={{ label: classes.checkLabel }}
              className={classes.formLabel}
            />
          </GridItem>
        </GridContainer>
      )
    );
  };

  renderItem = (id, textOnly = false) => {
    const {
      id: orgId,
      orgNodeIds,
      userOrgs,
      userId,
      myToursId,
      folderId,
      folderTreeMode,
    } = this.props;
    const orgRootNodeIndex = orgNodeIds.indexOf(id);
    const itmDisabled =
      id === folderId && folderTreeMode === FOLDER_TREE_MOVE_MODE;

    if (orgRootNodeIndex !== -1) {
      const filtered = userOrgs.filter(org => org !== -1);
      const organisationId = filtered[orgRootNodeIndex];
      const name = <Name id={organisationId} variant={VARIANTS.STRING_ONLY} />;
      const avtar = (
        <Name id={organisationId} variant={VARIANTS.AVATAR_ONLY} letterAvatar />
      );

      if (textOnly)
        return (
          <GridItem>
            <JText bold dark ellipsis md>
              {name}
            </JText>
          </GridItem>
        );
      return (
        <GridContainer noWrap>
          <GridItem>{avtar}</GridItem>
          <GridItem>
            <JText bold dark ellipsis md>
              {name}
            </JText>
          </GridItem>
        </GridContainer>
      );
    }

    if (id === myToursId) {
      if (textOnly)
        return (
          <GridItem>
            <KnownAs
              id={userId}
              variant={VARIANTS.STRING_ONLY}
              className="j-text-ellipsis"
            />
          </GridItem>
        );
      return (
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem>
            <PersonPhoto id={userId} {...this.photoProps} />
          </GridItem>
          <GridItem>
            <KnownAs
              id={userId}
              variant={VARIANTS.STRING_ONLY}
              className="j-text-ellipsis"
            />
          </GridItem>
          <GridItem>(Personal)</GridItem>
        </GridContainer>
      );
    }
    if (textOnly)
      return (
        <GridItem>
          folder{' '}
          <Content
            id={id}
            orgId={orgId}
            mapping={NODE_STORE_HELPERS.translateContent}
          />
        </GridItem>
      );
    return (
      <GridContainer noWrap>
        <GridItem>
          <Icon size="normal" bold icon="lnr-folder" />
        </GridItem>
        <GridItem>
          <JText gray={itmDisabled} italic={itmDisabled}>
            <Content
              id={id}
              orgId={orgId}
              mapping={NODE_STORE_HELPERS.translateContent}
            />
          </JText>
        </GridItem>
      </GridContainer>
    );
  };

  renderIcon = (id, classNames) => (
    <Status id={id} type={ICON} className={classNames} />
  );

  render = () => {
    const {
      classes,
      isOpen,
      dialogTitle,
      confirmButtonText,
      disabledFolderId,
      isCopyLoading,
      isMoveLoading,
      currentOrgRootNodeId,
      folderTreeMode,
      folderId,
    } = this.props;

    const { selectedTitle, selected } = this.state;

    const selectedText = !isEmptyString(selectedTitle) ? 'to ' : '';

    let content = this.state.isFetchLoading ? (
      <div className={classes.treeContainer}>
        <LoadingText splash hideLogo />
      </div>
    ) : (
      <div className={classes.treeContainer}>
        <TreeView
          selected={this.state.selected}
          onSelect={this.onSelect}
          isOpenedFirstLevel
          rootNodeId={this.getTreeIds()}
          items={this.state.items}
          icon="folder"
          renderItem={this.renderItem}
          disabledFolderId={disabledFolderId}
          renderIcon={this.renderIcon}
          defaultExpanded={[currentOrgRootNodeId]}
        />
      </div>
    );

    content = this.state.errStatusCode ? (
      <div className={classes.treeContainer}>
        {this.getErrorDisplay(this.state.errStatusCode)}
      </div>
    ) : (
      content
    );

    const footer = this.cloneOption();

    // const customChildren = { content, footer };
    const actionButton = (
      <GridContainer justify="center" noWrap>
        <GridItem>
          <JText nowrap>{`${confirmButtonText} ${selectedText}`}</JText>
        </GridItem>
        {this.renderItem(selected, true)}
      </GridContainer>
    );

    return (
      <JDialog
        maxWidth="xs"
        open={isOpen}
        fullWidth
        fullScreen={false}
        onValidSubmit={this.onConfirm}
        onButtonClose={this.onClose}
        header={<JText xl ellipsis>{`${dialogTitle}`}</JText>}
        notesTextWrap={false}
        dividers
        fullWidthNotes
        headerNoWrap
        loading={isCopyLoading || isMoveLoading}
        disabled={
          !selected ||
          (selected === folderId && folderTreeMode === FOLDER_TREE_MOVE_MODE)
        }
        submitButton={actionButton}
        notes={footer}
      >
        <GridContainer direction="column" spacing={0}>
          <GridItem>{content}</GridItem>
        </GridContainer>
      </JDialog>
    );
  };
}

FolderTree.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  location: PropTypes.object,

  // parent props
  disabledFolderId: PropTypes.number,
  onConfirm: PropTypes.func.isRequired,
  dialogTitle: PropTypes.node,
  confirmButtonText: PropTypes.node,
  onConfirmSuccess: PropTypes.func,
  showOption: PropTypes.bool,

  // resaga props
  id: PropTypes.number,
  isOpen: PropTypes.bool,
  orgToursId: PropTypes.number,
  rootNodeId: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  orgNodeIds: PropTypes.array,
  userOrgs: PropTypes.array,
  folderTreeMode: PropTypes.string,
  myToursId: PropTypes.number,
  userId: PropTypes.number,
  currentOrgRootNodeId: PropTypes.number,
  folderId: PropTypes.number,

  // resaga loading props
  isCopyLoading: PropTypes.bool,
  isMoveLoading: PropTypes.bool,
};

FolderTree.defaultProps = {
  isOpen: false,
  dialogTitle: '',
  confirmButtonText: 'Move',
  disabledFolderId: -1,
  isCopyLoading: false,
  isMoveLoading: false,
  onConfirmSuccess: () => {},
  orgToursId: 0,
  id: 0,
  rootNodeId: [],
  orgNodeIds: [],
  userOrgs: [],
  folderTreeMode: '',
  myToursId: 0,
  location: {},
  showOption: false,
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'FolderTree' }),
  withRouter,
  resaga(CONFIG_ORGANISATION_ID),
  resaga(CONFIG_USER_ORGANISATIONS),
  resaga(CONFIG_ORG_MEMBERS),
  resaga(CONFIG),
  resaga(KNOWNAS_CONFIG),
)(FolderTree);
