import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ListItem from 'viewComponents/ListItem';
import { compose } from 'redux';
import resaga from 'resaga';
import TextTruncate from 'react-text-truncate';
import UGLink from 'components/Link';
import ListItemSubtitle from 'smartComponents/Node/types/Template/components/ListItemSubtitle';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import ActionButtonsCell from '../../components/ActionButtonsCell';
import EditableFolderListItem from '../../components/EditableFolderListItem';
import { CONFIG } from './config';

export class FolderListItem extends PureComponent {
  renderLink = () => {
    const { classes, baseUrl, content, id } = this.props;
    return (
      <UGLink className={classes.linkItem} to={`${baseUrl}?current=${id}`}>
        {content}
      </UGLink>
    );
  };

  renderSubtitle = () => {
    const { id, lastModifiedBy } = this.props;
    return (
      <ListItemSubtitle
        id={id}
        lastModifiedBy={lastModifiedBy}
        type="lastModifiedBy"
      />
    );
  };

  renderDescription = () => {
    const { shortDescription } = this.props;
    const renderDescription = shortDescription || '';
    return (
      <TextTruncate lines={1} text={renderDescription} maxCalculateTimes={1} />
    );
  };

  renderSecondColumn = () => {
    const { id, createdBy } = this.props;
    return <ListItemSubtitle id={id} createdBy={createdBy} type="createdBy" />;
  };

  renderActionButtons = () => {
    const {
      id,
      type,
      content,
      parentFolderIdsLength,
      memberIdsLength,
      isOnMyTours,
      hasNoRootNodeIds,
    } = this.props;

    const hasFolders =
      LOGIC_HELPERS.ifElse(parentFolderIdsLength === 1, false, true) ||
      (memberIdsLength > 0 && hasNoRootNodeIds === false);

    const checkFolders = LOGIC_HELPERS.ifElse(
      isOnMyTours,
      parentFolderIdsLength > 1,
      hasFolders,
    );

    return (
      <ActionButtonsCell
        id={id}
        type={type}
        content={content}
        canMove={checkFolders}
      />
    );
  };

  render = () => {
    const {
      showActions,
      checkboxProps,
      classes,
      isEditable,
      content,
      id,
    } = this.props;

    if (isEditable) {
      return <EditableFolderListItem id={id} content={content} />;
    }

    return (
      <ListItem
        hasCheckbox={showActions}
        checkboxProps={checkboxProps}
        icon="folder"
        className={classes.item}
        title={this.renderLink()}
        subtitle={this.renderSubtitle()}
        description={this.renderDescription()}
        secondColumn={this.renderSecondColumn()}
        action={this.renderActionButtons()}
      />
    );
  };
}

FolderListItem.propTypes = {
  showActions: PropTypes.bool,
  checkboxProps: PropTypes.object,
  classes: PropTypes.object,
  isEditable: PropTypes.bool,
  id: PropTypes.number,
  type: PropTypes.string,
  content: PropTypes.string,
  shortDescription: PropTypes.string,
  createdBy: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  lastModifiedBy: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  baseUrl: PropTypes.string,
  parentFolderIdsLength: PropTypes.number,
  memberIdsLength: PropTypes.number,
  isOnMyTours: PropTypes.bool,
  hasNoRootNodeIds: PropTypes.bool,
};

export default compose(resaga(CONFIG))(FolderListItem);
