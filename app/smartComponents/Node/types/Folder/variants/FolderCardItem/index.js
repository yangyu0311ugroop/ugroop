import FolderCard from 'viewComponents/Card/components/FolderCard';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { FOLDER } from 'utils/modelConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Can } from 'apis/components/Ability/components/Can';

import ActionButtons from '../../components/ActionButtons';

import { CONFIG } from './config';

export class FolderCardItem extends PureComponent {
  renderActions = () => {
    const {
      id,
      renderActions,
      type,
      content,
      parentFolderIdsLength,
      isOnMyTours,
      hasNoRootNodeIds,
    } = this.props;

    const hasFolders =
      LOGIC_HELPERS.ifElse(parentFolderIdsLength === 1, false, true) ||
      hasNoRootNodeIds === false;

    const checkFolders = LOGIC_HELPERS.ifElse(
      isOnMyTours,
      parentFolderIdsLength > 1 || !hasNoRootNodeIds,
      hasFolders,
    );

    return LOGIC_HELPERS.ifFunction(
      renderActions,
      [{ id }],
      <Can do="create" on={FOLDER}>
        <ActionButtons
          type={type}
          content={content}
          canMove={checkFolders}
          id={id}
        />
      </Can>,
    );
  };

  render = () => {
    const {
      id,
      content,
      cardImageUrl,
      baseUrl,
      showActions,
      templateQueryParam,
      templateIds,
      folderIds,
      templateContent,
      folderContent,
    } = this.props;

    return (
      <FolderCard
        id={id}
        content={content}
        cardImageUrl={cardImageUrl}
        baseUrl={baseUrl}
        rootClassName="template-entry"
        showActions={showActions}
        templateQueryParam={templateQueryParam}
        folderCount={folderIds.length}
        tourCount={templateIds.length}
        folderIds={folderIds}
        templateIds={templateIds}
        tourContent={templateContent.filter(template => template)}
        folderContent={folderContent.filter(folder => folder)}
        renderActions={this.renderActions}
      />
    );
  };
}

FolderCardItem.propTypes = {
  id: PropTypes.number,
  cardImageUrl: PropTypes.string,
  baseUrl: PropTypes.string,
  showActions: PropTypes.bool,
  templateQueryParam: PropTypes.string,
  templateIds: PropTypes.array,
  folderIds: PropTypes.array,
  templateContent: PropTypes.array,
  folderContent: PropTypes.array,
  renderActions: PropTypes.func,
  parentFolderIdsLength: PropTypes.number,
  isOnMyTours: PropTypes.bool,
  hasNoRootNodeIds: PropTypes.bool,

  // resaga
  content: PropTypes.string,
  type: PropTypes.string,
};

export default compose(resaga(CONFIG))(FolderCardItem);
