import { NODE_API, REMOVE_NODE_AND_LINKS } from 'apis/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import { RATINGS } from 'utils/modelConstants';
import Button from 'viewComponents/Button';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class DeleteRating extends PureComponent {
  state = {
    loading: false,
  };

  handleRemoveSuccess = () => {
    const { onClose } = this.props;
    this.setState({ loading: false });

    onClose();
  };

  handleClick = () => {
    const { participantId, parentNodeId, id } = this.props;
    this.setState({ loading: true });
    this.props.resaga.dispatchTo(NODE_API, REMOVE_NODE_AND_LINKS, {
      payload: {
        id,
        fk: participantId,
        parentNodeId,
        childKey: RATINGS,
        nextNodeChildKey: RATINGS,
      },
      onSuccess: this.handleRemoveSuccess,
    });
  };

  render = () => {
    const { loading } = this.props;
    const { loading: deleteLoading } = this.state;

    return (
      <Button
        dense
        color="alert"
        onClick={this.handleClick}
        loading={loading || deleteLoading}
      >
        <M {...m.button} />
      </Button>
    );
  };
}

DeleteRating.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  onClose: PropTypes.func,
  loading: PropTypes.bool,

  // resaga props
  parentNodeId: PropTypes.number,
  participantId: PropTypes.number,
};

DeleteRating.defaultProps = {
  id: 0,
  parentNodeId: 0,
  participantId: 0,
  loading: false,
};

export default compose(
  withStyles(styles, { name: 'DeleteRating' }),
  resaga(CONFIG),
)(DeleteRating);
