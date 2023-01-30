import { withStyles } from '@material-ui/core/styles';
import {
  FOLDER_API,
  GET_FOLDER_CHILDREN_WITH_PAGINATION,
} from 'apis/constants';

import { PERSONAL } from 'appConstants';
import GridItem from 'components/GridItem/index';
import ButtonActions from 'containers/Templates/Components/ButtonActions/index';

import EditableFolderCard from 'containers/Templates/Components/EditableFolderCard/index';
import {
  FOLDER_TREE_COPY_MODE,
  FOLDER_TREE_MOVE_MODE,
} from 'containers/Templates/Components/FolderTree/constants';
import FolderTree from 'containers/Templates/Components/FolderTree/index';
import GridView from 'containers/Templates/Components/GridView/index';

import ListView from 'containers/Templates/Components/ListView/index';
import NoContent from 'containers/Templates/Components/TemplateNoContent/index';
import {
  DEFAULT_LIMIT,
  DEFAULT_VIEW_TOUR_INDEX,
} from 'containers/Templates/constants';
import FolderExplorerCUD from 'datastore/folderExplorerStore/helpers/CUD/index';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';

import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import Dialog from 'ugcomponents/Dialog/index';
import Content from 'smartComponents/Node/parts/Content';
import get from 'lodash/get';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import { isEmptyString, pluralizeText } from 'utils/stringAdditions';
import { TEMPLATE } from 'utils/modelConstants';
import Box from '@material-ui/core/Box';
import TemplatePageActions from 'containers/Templates/Components/PageActions';
import { useImmer } from 'use-immer';
import ShowMore from './components/ShowMore/index';
import { CONFIG, RELATED_IDS_CONFIG, TYPE_CONFIG } from './config';
import styles from './styles';

export function TemplateView(props) {
  const [state, setState] = useImmer({
    selected: {},
    openDialog: false,
    deleteType: '',
    hook: {},
    isSorting: false,
    shouldRedirect: false,
  });

  const {
    location,
    folderId,
    deleteType,
    sortOrder,
    sortField,
    folderTreeMode,
    selectedId,
    folderStatus,
    selectedType,
    folderIds,
    isOpenDeleteDialog,
    isBatchDeleteLoading,
    selectedItem,
    isFetchingContent,
  } = props;
  // Functions for ListView : Start
  const onClose = () => {
    props.resaga.setValue({
      folderFormOpen: false,
    });
  };

  const onSaveSuccess = () => {
    props.resaga.setValue({
      folderFormOpen: false,
    });
  };

  const onConfirmDeleteBatch = FolderTransactions => () => {
    const checkedItems = state.checkedItems;
    const hook = state.hook.hook;
    const onSuccess = onBatchDeleteSuccess(hook);
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.openDialog = false;
    });
    FolderTransactions.onBatchDelete(checkedItems, {
      onSuccess,
      onError: onDeleteError,
    });
  };

  const onBatchDeleteSuccess = hook => () => {
    hook();
    onDeleteSuccess();
  };

  const onSortChange = (sortOrderParm, sortFieldParm) => {
    const parsedSearch = parseQueryParam(location.search);
    const page = parsedSearch.page ? parsedSearch.page : 0;

    const numPage = parseInt(page, 10);
    const limit = DEFAULT_LIMIT * (numPage + 1);
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.isSorting = true;
    });

    props.resaga.dispatchTo(FOLDER_API, GET_FOLDER_CHILDREN_WITH_PAGINATION, {
      payload: {
        id: folderId,
        sortOrder: sortOrderParm,
        sortField: sortFieldParm,
        limit,
      },
      onSuccess: onSortFetchSuccess,
    });
  };

  const onSortFetchSuccess = (result, payload) => {
    onSortChangeQuery(payload.sortField, payload.sortOrder);
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.isSorting = false;
    });
    props.resaga.setValue({
      id: result.id,
      sortField: payload.sortField,
      sortOrder: payload.sortOrder,
    });
  };

  const onSortChangeQuery = (sortFieldParm, sortOrderParm) => {
    const parsedSearch = parseQueryParam(location.search);
    parsedSearch.sortOrder = sortOrderParm;
    parsedSearch.sortField = sortFieldParm;
    const param = stringifyParam(parsedSearch);
    props.history.replace(`${location.pathname}?${param}`);
  };
  // Functions for ListView : End

  // Dialog Functions for Delete : Start
  const onDialogClose = () => {
    if (deleteType === 'singleDelete') {
      return props.resaga.setValue({
        deleteType: 'singleDelete',
        isOpenDeleteDialog: false,
        selectedItem: {},
      });
    }
    return setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.openDialog = false;
      // eslint-disable-next-line no-param-reassign
      draft.deleteType = '';
    });
  };

  const onDelete = (item, shouldRedirect = false) => {
    props.resaga.setValue({
      isOpenDeleteDialog: true,
      selectedItem: item,
      deleteType: 'singleDelete',
      shouldRedirect,
    });
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.shouldRedirect = shouldRedirect;
    });
  };

  const onBatchDelete = (checkedItems, hook) => {
    const items = checkedItems || [];
    const dialogText = getBatchDeleteDialogText(items);
    const title = dialogText.dialogTitle;
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.openDialog = true;
      // eslint-disable-next-line no-param-reassign
      draft.selected = {
        checkedItems,
        title,
        type: 'Tour and Folder',
        bodyText: dialogText.bodyText,
      };
      // eslint-disable-next-line no-param-reassign
      draft.deleteType = 'batch';
      // eslint-disable-next-line no-param-reassign
      draft.hook = { hook };
    });
  };

  const onDeleteSuccess = () => {
    if (state.deleteType !== 'batch') {
      props.resaga.setValue({
        isOpenDeleteDialog: false,
        selectedItem: {},
        deleteType: '',
      });
    }
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.loading = false;
      // eslint-disable-next-line no-param-reassign
      draft.deleteType = '';
    });

    shouldRedirectToParent();
  };

  const onDeleteError = () => {
    if (state.deleteType !== 'batch') {
      props.resaga.setValue({
        isOpenDeleteDialog: false,
        selectedItem: {},
        deleteType: '',
      });
    }
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.loading = false;
      // eslint-disable-next-line no-param-reassign
      draft.deleteType = '';
    });
  };

  const onConfirmDeleteItem = FolderTransactions => () => {
    // const { selectedItem } = props;
    FolderTransactions.onDelete(selectedItem.id, selectedItem.type, {
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
    });
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.loading = true;
    });
  };

  const onFolderTreeReset = () => {
    props.resaga.setValue({
      isOpenFolderTree: false,
      selectedId: -1,
      selectedType: null,
      selectedName: '',
    });
  };

  /**
   * Get the text for tour (pluralization)
   * @param {Array} completeItemInfo
   * @return {{tourList: Array, tourTextPlural: string}}
   */
  const getTourText = completeItemInfo => {
    const tourList = completeItemInfo.filter(item => item.type === 'template');
    const tourTextPlural = pluralizeText('Tour', tourList.length);

    return { tourList, tourTextPlural };
  };

  /**
   * Get the text for folder (pluralization)
   * @param {Array} completeInfo
   * @return {{folderList: Array, folderTextPlural: string}}
   */
  const getFolderText = completeInfo => {
    const folderList = completeInfo.filter(item => item.type === 'folder');
    const folderTextPlural = pluralizeText('Folder', folderList.length);
    return { folderList, folderTextPlural };
  };

  /**
   * Get the text needed for the dialog
   * @param {Array} completeItemInfo
   * @return {{dialogTitle: string, bodyText: string}}
   */
  const getBatchDeleteDialogText = completeItemInfo => {
    const tour = getTourText(completeItemInfo);
    const folder = getFolderText(completeItemInfo);
    const middleman =
      isEmptyString(tour.tourTextPlural) ||
      isEmptyString(folder.folderTextPlural)
        ? ''
        : ' and ';

    const dialogTitle = `${tour.tourTextPlural}${middleman}${
      folder.folderTextPlural
    }`;
    const bodyText = `Are you sure you want to delete the selected ${dialogTitle.toLowerCase()}? This action cannot be undone.`;
    return { dialogTitle, bodyText };
  };
  // Dialog Function for Delete : End

  const shouldRedirectToParent = () => {
    if (state.shouldRedirect || props.shouldRedirect) {
      const pathname = props.location.pathname;
      const queryParam = parseQueryParam(props.location.search);
      queryParam.current = props.folderParentId;
      const stringifiedParam = stringifyParam(queryParam);
      props.history.replace(`${pathname}?${stringifiedParam}`);
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.shouldRedirect = false;
      });
      props.resaga.setValue({ shouldRedirect: false });
    }
  };

  const handleNoContentDelete = () => {
    onDelete(
      {
        id: folderId,
        title: props.folderName,
        type: props.folderType,
      },
      true,
    );
  };

  const renderNoContent = folderIdParm => buttonActions => (
    <NoContent
      isLoading={false}
      emptyMessage="No Tours Found..."
      onAddFolderClicked={buttonActions.onAddFolderBtnClicked}
      onAddTemplateClicked={buttonActions.onOpenAddTemplateModal}
      onDelete={handleNoContentDelete}
      canDelete={folderIdParm > 0 && props.folderStatus !== PERSONAL}
      folderId={folderId}
      loading={isFetchingContent}
    />
  );

  const renderListView = () => FolderTransactions => {
    const { folderFormOpen, currentRoute } = props;
    return (
      <ListView
        onClose={onClose}
        addMode={folderFormOpen}
        baseUrl={currentRoute}
        sortOrderValue={sortOrder}
        sortFieldValue={sortField}
        onSave={FolderTransactions.onCreate({
          onSuccess: onSaveSuccess,
        })}
        onSortChange={onSortChange}
        onBatchDelete={onBatchDelete}
        isBatchDeleteLoading={isBatchDeleteLoading}
        isSortFetchLoading={state.isSorting}
        renderPagination={<ShowMore folderId={folderId} />}
        folderId={folderId}
        folderIds={folderIds}
      />
    );
  };

  const renderGridView = () => () => {
    const { folderFormOpen, currentRoute, organisationId } = props;
    const editableFormCard = folderFormOpen ? (
      <GridItem xs={12} md={4}>
        <EditableFolderCard />
      </GridItem>
    ) : (
      ''
    );
    return (
      <GridView
        baseUrl={currentRoute}
        folderFormOpen={folderFormOpen}
        renderPagination={<ShowMore folderId={folderId} />}
        folderId={folderId}
        sortOrderValue={sortOrder}
        sortFieldValue={sortField}
        onSortChange={onSortChange}
        folderIds={folderIds}
        organisationId={organisationId}
      >
        {editableFormCard}
      </GridView>
    );
  };

  const renderDialog = () => FolderTransactions => {
    const isDeleteTypeBatch = state.deleteType === 'batch';
    const title =
      state.deleteType === 'batch'
        ? get(state, 'selected.title', '')
        : selectedItem.title;
    const selectedTitle =
      folderStatus === PERSONAL ? (
        <Content id={folderId} mapping={NODE_STORE_HELPERS.translateContent} />
      ) : (
        title
      );

    return (
      <Dialog
        template="delete"
        open={isDeleteTypeBatch ? state.openDialog : isOpenDeleteDialog}
        type={isDeleteTypeBatch ? state.selected.type : selectedItem.type}
        headlineTitle={
          isDeleteTypeBatch ? `Delete ${selectedTitle}` : selectedTitle
        }
        confirmButton={
          isDeleteTypeBatch ? `Delete ${selectedTitle}` : undefined
        }
        disabled={state.loading}
        dialogTitle={
          isDeleteTypeBatch ? `Delete the selected ${selectedTitle}` : undefined
        }
        headlineText={isDeleteTypeBatch ? state.selected.bodyText : undefined}
        confirmFunc={
          isDeleteTypeBatch
            ? onConfirmDeleteBatch(FolderTransactions)
            : onConfirmDeleteItem(FolderTransactions)
        }
        cancelFunc={onDialogClose}
      />
    );
  };

  const renderMoveDialog = () => FolderTransactions => {
    const { selectedName, rootNodeId } = props;
    const disabledFolderId = selectedId;

    if (folderTreeMode === FOLDER_TREE_COPY_MODE) {
      return (
        <FolderTree
          onConfirm={FolderTransactions.onCopyConfirm(selectedId, selectedType)}
          dialogTitle={`Clone ${selectedName}`}
          confirmButtonText="Clone"
          disabledFolderId={disabledFolderId}
          onConfirmSuccess={onFolderTreeReset}
          showOption={selectedType === TEMPLATE}
          rootParentNodeId={rootNodeId}
          folderId={folderId}
        />
      );
    }

    return (
      <FolderTree
        onConfirm={FolderTransactions.onMoveConfirm(
          selectedId,
          selectedType,
          folderId,
        )}
        dialogTitle={`Move ${selectedName}`}
        disabledFolderId={disabledFolderId}
        onConfirmSuccess={onFolderTreeReset}
        rootParentNodeId={rootNodeId}
        folderId={folderId}
      />
    );
  };

  const {
    folderFormOpen,
    layout,
    rootNodeId,
    sortedIds,
    folderParentId,
    organisationId,
    currentRoute,
  } = props;

  // if (isFetchingInitialContent) return 'Loading...';
  let content =
    layout === 'list' ? (
      <FolderExplorerCUD
        rootNodeId={rootNodeId}
        folderId={folderId}
        orgId={organisationId}
      >
        {renderListView()}
      </FolderExplorerCUD>
    ) : (
      <FolderExplorerCUD
        rootNodeId={rootNodeId}
        folderId={folderId}
        orgId={organisationId}
      >
        {renderGridView()}
      </FolderExplorerCUD>
    );

  if (sortedIds.length === 0 && folderFormOpen !== true) {
    content = (
      <ButtonActions>
        {renderNoContent(LOGIC_HELPERS.ifElse(folderParentId, folderId, null))}
      </ButtonActions>
    );
  }

  return (
    <React.Fragment>
      <Box pb={4}>
        <TemplatePageActions
          folderId={folderId}
          currentRoute={currentRoute}
          location={location}
          onSortChange={onSortChange}
          organisationId={organisationId}
        />
      </Box>
      {content}
      <FolderExplorerCUD folderId={folderId} orgId={organisationId}>
        {renderDialog()}
      </FolderExplorerCUD>
      <FolderExplorerCUD
        folderId={folderId}
        rootNodeId={rootNodeId}
        orgId={organisationId}
      >
        {renderMoveDialog()}
      </FolderExplorerCUD>
    </React.Fragment>
  );
}

TemplateView.propTypes = {
  // eslint-disable react/no-unused-prop-types
  // hoc props
  resaga: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props
  folderId: PropTypes.number.isRequired,

  // resaga props
  folderFormOpen: PropTypes.bool,
  layout: PropTypes.string,
  sortOrder: PropTypes.string,
  sortField: PropTypes.string,
  rootNodeId: COGNITO_STORE_SELECTOR.rootNodeId.type,
  folderTreeMode: PropTypes.string,
  selectedId: PropTypes.number,
  // eslint-disable-next-line react/no-unused-prop-types
  selectedName: PropTypes.string,
  currentRoute: PropTypes.string,
  folderName: PropTypes.string,
  folderType: PropTypes.string,
  folderParentId: PropTypes.number,
  folderStatus: PropTypes.string,
  selectedType: PropTypes.string,
  folderIds: PropTypes.array,
  sortedIds: PropTypes.array,

  // delete single item props
  isOpenDeleteDialog: PropTypes.bool,
  selectedItem: PropTypes.object,
  deleteType: PropTypes.string,
  shouldRedirect: PropTypes.bool,

  // resaga loading
  isBatchDeleteLoading: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  isFetchingInitialContent: PropTypes.bool,
  organisationId: PropTypes.number,
  isFetchingContent: PropTypes.bool,
};

TemplateView.defaultProps = {
  folderFormOpen: false,
  layout: DEFAULT_VIEW_TOUR_INDEX,
  sortOrder: '',
  sortField: '',
  isBatchDeleteLoading: false,
  rootNodeId: COGNITO_STORE_SELECTOR.rootNodeId.defaultValue,
  folderTreeMode: FOLDER_TREE_MOVE_MODE,
  selectedId: 0,
  selectedName: '',
  isFetchingInitialContent: false,
  folderName: '',
  folderType: '',
  folderParentId: 0,
  folderStatus: '',
  folderIds: [],
  sortedIds: [],

  isOpenDeleteDialog: false,
  selectedItem: {
    title: '',
    id: 0,
    type: '',
  },
  deleteType: '',
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'TemplateView' }),
  resaga(CONFIG),
  resaga(RELATED_IDS_CONFIG),
  resaga(TYPE_CONFIG),
)(React.memo(TemplateView));
