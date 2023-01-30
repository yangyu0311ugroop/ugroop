import { Can } from 'apis/components/Ability/components/Can';
import { GET_FOLDER_IMAGE } from 'apis/constants';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import dotProp from 'dot-prop-immutable';
import resaga from 'resaga';
import FolderCard from 'ugcomponents/Card/FolderCard';
import { CONFIG as FOLDER_CONFIG } from 'apis/components/Folder/config';
import { FOLDER } from 'utils/modelConstants';

import ActionButtons from './components/ActionButtons';
import { CONFIG } from './config';
import util from '../GridView/util';

export class UGTemplateFolder extends PureComponent {
  componentDidMount = () => {
    const { id, cardImageUrl } = this.props;

    if (!cardImageUrl) {
      util.dispatch(FOLDER_CONFIG, GET_FOLDER_IMAGE, {
        payload: {
          id,
        },
        onSuccess: this.getFolderImageSuccess,
      });
    }
  };

  getFolderImageSuccess = result => {
    this.props.resaga.setValue({
      cardImageList: (list = {}) =>
        dotProp.set(list, `${this.props.id}`, result.imageUrl),
    });
  };

  renderActions = () => {
    const {
      id,
      onDelete,
      onEnableEdit,
      onMove,
      onCopy,
      hasFolders,
    } = this.props;

    return (
      <Can do="create" on={FOLDER}>
        <ActionButtons
          onMove={onMove}
          onCopy={onCopy}
          onDelete={onDelete}
          onEdit={onEnableEdit(id)}
          canMove={hasFolders}
        />
      </Can>
    );
  };

  render = () => {
    const {
      id,
      folderItems,
      content,
      baseUrl,
      isLoading,
      classes,
      rootClassName,
      cardImageUrl,
      showActions,
      onEditSubmit,
      onEditCancel,
      isEditable,
      templateQueryParam,
    } = this.props;

    return (
      <FolderCard
        id={id}
        folderItems={folderItems}
        content={content}
        baseUrl={baseUrl}
        isLoading={isLoading}
        classes={classes}
        rootClassName={rootClassName}
        cardImageUrl={cardImageUrl}
        showActions={showActions}
        onEditSubmit={onEditSubmit}
        onEditCancel={onEditCancel}
        isEditable={isEditable}
        templateQueryParam={templateQueryParam}
        renderActions={this.renderActions()}
      />
    );
  };
}

UGTemplateFolder.propTypes = {
  folderItems: PropTypes.array,
  content: PropTypes.string,
  id: PropTypes.number.isRequired,
  baseUrl: PropTypes.string,
  onDelete: PropTypes.func,
  isLoading: PropTypes.bool,
  classes: PropTypes.object,
  rootClassName: PropTypes.string,
  resaga: PropTypes.object.isRequired,
  cardImageUrl: PropTypes.string,
  showActions: PropTypes.bool,
  onEnableEdit: PropTypes.func,
  onEditSubmit: PropTypes.func,
  onEditCancel: PropTypes.func,
  onMove: PropTypes.func,
  onCopy: PropTypes.func,
  isEditable: PropTypes.bool,
  templateQueryParam: PropTypes.string,
  hasFolders: PropTypes.bool,
};

UGTemplateFolder.defaultProps = {
  folderItems: [],
  content: '',
  rootClassName: '',
  cardImageUrl: null,
  showActions: true,
  onEnableEdit: null,
  isEditable: false,
  onEditSubmit: null,
  onMove: null,
  onCopy: null,
  onEditCancel: null,
  templateQueryParam: '',
};

export default compose(resaga(CONFIG))(UGTemplateFolder);
