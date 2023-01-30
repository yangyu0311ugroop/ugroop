import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import resaga from 'resaga';

import FolderListItem from './variants/FolderListItem';
import FolderCardItem from './variants/FolderCardItem';
import EditableFolderCard from './components/EditableFolderCard';
import {
  USER_ID_CONFIG,
  CONFIG,
  PHOTO_METAINFO_CONFIG,
  ITEMS_CONTENT_CONFIG,
} from './config';
import styles from './styles';

export class Folder extends PureComponent {
  renderDefault = () => this.renderCardView();

  renderCardView = () => {
    const {
      id,
      cardImageUrl,
      baseUrl,
      showActions,
      templateQueryParam,
      templateIds,
      folderIds,
      templateContent,
      folderContent,
      renderActions,
      isEditable,
      content,
      parentFolderIds,
      memberIds,
      isOnMyTours,
      parentParentNodeId,
      searchTemplateView,
      childrenContent,
    } = this.props;

    if (typeof searchTemplateView === 'string' && searchTemplateView) {
      const lcSearchTemplateView = searchTemplateView.toLowerCase();
      const lcContentTemplateView = content.toLowerCase();
      if (childrenContent) {
        const checkChildren = childrenContent.map(item => {
          const childContent = item.toLowerCase();
          if (childContent.indexOf(lcSearchTemplateView) === -1) return false;
          return true;
        });

        if (checkChildren.includes(true)) {
          return (
            <FolderCardItem
              id={id}
              cardImageUrl={cardImageUrl}
              baseUrl={baseUrl}
              showActions={showActions}
              renderActions={renderActions}
              templateQueryParam={templateQueryParam}
              folderIds={folderIds}
              templateIds={templateIds}
              templateContent={templateContent}
              folderContent={folderContent}
              hasNoRootNodeIds={!parentParentNodeId}
              isOnMyTours={isOnMyTours}
              parentFolderIdsLength={parentFolderIds.length}
              memberIdsLength={memberIds.length}
            />
          );
        }
      }
      if (lcContentTemplateView.indexOf(lcSearchTemplateView) === -1)
        return null;
    }

    if (isEditable) {
      return (
        <Grid item xs={12} md={4} className={classnames('template-entry')}>
          <EditableFolderCard id={id} content={content} />
        </Grid>
      );
    }

    return (
      <FolderCardItem
        id={id}
        cardImageUrl={cardImageUrl}
        baseUrl={baseUrl}
        showActions={showActions}
        renderActions={renderActions}
        templateQueryParam={templateQueryParam}
        folderIds={folderIds}
        templateIds={templateIds}
        templateContent={templateContent}
        folderContent={folderContent}
        hasNoRootNodeIds={!parentParentNodeId}
        isOnMyTours={isOnMyTours}
        parentFolderIdsLength={parentFolderIds.length}
        memberIdsLength={memberIds.length}
      />
    );
  };

  renderListItemView = () => {
    const {
      classes,
      id,
      showActions,
      checkboxProps,
      baseUrl,
      currentRoute,
      isEditable,
      parentFolderIds,
      memberIds,
      isOnMyTours,
      parentParentNodeId,
      content,
      searchTemplateView,
      childrenContent,
    } = this.props;

    if (typeof searchTemplateView === 'string' && searchTemplateView) {
      const lcSearchTemplateView = searchTemplateView.toLowerCase();
      const lcContentTemplateView = content.toLowerCase();
      if (childrenContent) {
        const checkChildren = childrenContent.map(item => {
          const childContent = item.toLowerCase();
          if (childContent.indexOf(lcSearchTemplateView) === -1) return false;
          return true;
        });

        if (checkChildren.includes(true)) {
          return (
            <FolderListItem
              showActions={showActions}
              checkboxProps={checkboxProps}
              classes={classes}
              isEditable={isEditable}
              id={id}
              hasNoRootNodeIds={!parentParentNodeId}
              isOnMyTours={isOnMyTours}
              parentFolderIdsLength={parentFolderIds.length}
              memberIdsLength={memberIds.length}
              currentRoute={currentRoute}
              baseUrl={baseUrl}
            />
          );
        }
      }
      if (lcContentTemplateView.indexOf(lcSearchTemplateView) === -1)
        return null;
    }

    return (
      <FolderListItem
        showActions={showActions}
        checkboxProps={checkboxProps}
        classes={classes}
        isEditable={isEditable}
        id={id}
        hasNoRootNodeIds={!parentParentNodeId}
        isOnMyTours={isOnMyTours}
        parentFolderIdsLength={parentFolderIds.length}
        memberIdsLength={memberIds.length}
        currentRoute={currentRoute}
        baseUrl={baseUrl}
      />
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.LIST_ITEM]: this.renderListItemView,
      [VARIANTS.CARD]: this.renderCardView,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Folder.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  baseUrl: PropTypes.string,
  showActions: PropTypes.bool,
  renderActions: PropTypes.func,
  templateQueryParam: PropTypes.string,
  checkboxProps: PropTypes.object,
  currentRoute: PropTypes.string,
  parentFolderIds: PropTypes.array,
  memberIds: PropTypes.array,
  isOnMyTours: PropTypes.bool,

  // resaga
  content: PropTypes.string,
  cardImageUrl: PropTypes.string,
  searchTemplateView: PropTypes.string,
  templateIds: PropTypes.array,
  folderIds: PropTypes.array,
  templateContent: PropTypes.array,
  childrenContent: PropTypes.array,
  folderContent: PropTypes.array,
  isEditable: PropTypes.bool,
  parentParentNodeId: PropTypes.number,
};

Folder.defaultProps = {
  showActions: true,
  templateIds: [],
  folderIds: [],
  templateContent: [],
  childrenContent: [],
  folderContent: [],
  isEditable: false,
  parentFolderIds: [],
  memberIds: [],
  searchTemplateView: '',
};

export default compose(
  withStyles(styles, { name: 'FolderNode' }),
  resaga(USER_ID_CONFIG),
  resaga(CONFIG),
  resaga(PHOTO_METAINFO_CONFIG),
  resaga(ITEMS_CONTENT_CONFIG),
)(Folder);
