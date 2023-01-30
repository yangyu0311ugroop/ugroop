import PropTypes from 'prop-types';
import { Component } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class ButtonActions extends Component {
  onOpenAddTemplateModal = () =>
    this.props.resaga.setValue({ isAddTemplateModalOpen: true });

  onAddFolderBtnClicked = () =>
    this.props.resaga.setValue({ folderFormOpen: true });

  onCloseFolderBtnClicked = () =>
    this.props.resaga.setValue({ folderFormOpen: false });

  onCloseAddTemplateModal = () =>
    this.props.resaga.setValue({ isAddTemplateModalOpen: false });

  render = () =>
    this.props.children({
      onOpenAddTemplateModal: this.onOpenAddTemplateModal,
      onAddFolderBtnClicked: this.onAddFolderBtnClicked,
      onCloseAddTemplateModal: this.onCloseAddTemplateModal,
      onCloseFolderBtnClicked: this.onCloseFolderBtnClicked,
    });
}

ButtonActions.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,

  // parent props

  // resaga props
};

ButtonActions.defaultProps = {};

export default compose(resaga(CONFIG))(ButtonActions);
