import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { SIZE_CONSTANTS } from 'sizeConstants';
import DialogForm, { Title } from 'ugcomponents/DialogForm/Complex';
import { RATING } from 'utils/modelConstants';

import DeleteRating from '../DeleteRating';
import RatingForm from '../RatingForm';
import { CONFIG } from './config';
import styles from './styles';

export class EditRatingDialog extends PureComponent {
  state = {
    loading: false,
  };

  handleUpdateSuccess = () => {
    this.setState({ loading: false });
    const { onClose } = this.props;

    onClose();
  };

  handleSubmit = model => {
    this.setState({ loading: true });
    const { id } = this.props;
    const node = { ...model, type: RATING };

    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        node,
        onSuccess: this.handleUpdateSuccess,
      },
      this.props,
    );
  };

  renderDialogHeader = ({ renderCloseButton }) => (
    <>
      <Title heading="Edit a review" />
      {renderCloseButton()}
    </>
  );

  renderDialogContent = () => <RatingForm id={this.props.id} />;

  renderDialogFooter = () => ({
    renderActions,
    renderSubmitButton,
    renderCancelButton,
  }) =>
    renderActions(
      <>
        <GridItem>
          <GridContainer>
            <GridItem>
              <DeleteRating
                loading={this.state.loading}
                onClose={this.props.onClose}
                id={this.props.id}
              />
            </GridItem>
            <GridItem>{renderCancelButton()}</GridItem>
            <GridItem>{renderSubmitButton()}</GridItem>
          </GridContainer>
        </GridItem>
      </>,
    );

  render = () => {
    const { open, onClose } = this.props;
    const { loading } = this.state;

    return (
      <DialogForm
        open={open}
        onClose={onClose}
        onCancel={onClose}
        renderFooter={this.renderDialogFooter()}
        onValidSubmit={this.handleSubmit}
        renderHeader={this.renderDialogHeader}
        submitButtonContent="Post"
        size={SIZE_CONSTANTS.XS}
        loading={loading}
      >
        {this.renderDialogContent()}
      </DialogForm>
    );
  };
}

EditRatingDialog.propTypes = {
  // hoc props

  // parent props
  id: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,

  // resaga props
};

EditRatingDialog.defaultProps = {
  open: false,
  id: 0,
};

export default compose(
  withStyles(styles, { name: 'EditRatingDialog' }),
  resaga(CONFIG),
)(EditRatingDialog);
