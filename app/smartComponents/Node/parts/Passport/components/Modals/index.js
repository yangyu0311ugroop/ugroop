import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { CONFIG } from './config';
import CreateModal from './components/Create';
import ViewModal from './components/View';

// TODO: Move this completely independent passport modal container up hierarchy as needed + move to /containers
export class PassportModals extends React.PureComponent {
  handleClosePassportCreateModal = ({ createdId } = {}) => {
    this.props.resaga.setValue({
      passportCreateOpen: false,
      passportCreateCreatedId: createdId,
    });
  };

  handleClosePassportViewModal = ({ deletedId } = {}) => {
    this.props.resaga.setValue({
      passportViewOpen: false,
      passportViewDeletedId: deletedId,
    });
  };

  renderPassportCreateModal = () => {
    const { passportCreateOpen, passportCreatePersonId } = this.props;
    return (
      <CreateModal
        open={passportCreateOpen}
        personId={passportCreatePersonId}
        onClose={this.handleClosePassportCreateModal}
      />
    );
  };

  renderPassportViewModal = () => {
    const {
      passportViewOpen,
      passportViewId,
      passportViewReadOnly,
    } = this.props;
    return (
      <ViewModal
        open={passportViewOpen}
        id={passportViewId}
        onClose={this.handleClosePassportViewModal}
        readOnly={passportViewReadOnly}
      />
    );
  };

  render = () => (
    <React.Fragment>
      {this.renderPassportCreateModal()}
      {this.renderPassportViewModal()}
    </React.Fragment>
  );
}

PassportModals.propTypes = {
  // hoc
  resaga: PropTypes.object.isRequired,

  // resaga value
  passportCreateOpen: PropTypes.bool,
  passportCreatePersonId: PropTypes.number,
  passportViewOpen: PropTypes.bool,
  passportViewId: PropTypes.number,
  passportViewReadOnly: PropTypes.bool,
};

PassportModals.defaultProps = {
  passportCreateOpen: false,
  passportCreatePersonId: null,
  passportViewOpen: false,
  passportViewId: null,
  passportViewReadOnly: false,
};

export default resaga(CONFIG)(PassportModals);
