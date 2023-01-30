import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { CONFIG } from './config';
import styles from './styles';
import { DEFAULT } from '../../../../appConstants';
import { VARIANTS } from '../../../../variantsConstants';

export class DeleteNode extends PureComponent {
  state = {};

  deleteSuccess = () => {
    const { onSuccess } = this.props;
    const { confirmDeleteDialogId } = this.state;

    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);

    LOGIC_HELPERS.ifFunction(onSuccess);
  };

  handleDelete = () => {
    const { id, parentId, childKey } = this.props;

    return NODE_API_HELPERS.deleteNode(
      {
        nodeId: id,
        parent: parentId,
        childKey,
        onSuccess: this.deleteSuccess,
      },
      this.props,
    );
  };

  confirmDelete = () => {
    const confirmDeleteDialogId = PORTAL_HELPERS.confirmDelete(
      {
        title: 'Delete',
        message: 'Are you sure you want to delete this?',
        onConfirm: this.handleDelete,
      },
      this.props,
    );

    this.setState({ confirmDeleteDialogId });
  };

  renderDefault = () => {
    const { classes, noText, tooltip, label, buttonClass } = this.props;

    return (
      <Button
        size="xs"
        color="black"
        onClick={this.confirmDelete}
        className={classnames(
          LOGIC_HELPERS.ifElse(buttonClass, buttonClass, classes.button),
        )}
        title={tooltip}
      >
        <GridContainer alignItems="center" spacing={0} noWrap>
          <GridItem>
            <Icon icon="lnr-trash2" size="xsmall" paddingRight />
          </GridItem>
          {!noText && <GridItem className="j-text-ellipsis">{label}</GridItem>}
        </GridContainer>
      </Button>
    );
  };

  renderProp = () => {
    const { children } = this.props;
    return LOGIC_HELPERS.ifFunction(children, [
      { onClick: this.confirmDelete },
    ]);
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderDefault,
    });
  };
}

DeleteNode.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  parentId: PropTypes.number,
  childKey: PropTypes.string,
  onSuccess: PropTypes.func,
  noText: PropTypes.bool,
  tooltip: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.func,
  buttonClass: PropTypes.any,

  // resaga props
};

DeleteNode.defaultProps = {
  label: 'Delete',
};

export default compose(
  withStyles(styles, { name: 'DeleteNode' }),
  resaga(CONFIG),
)(DeleteNode);
