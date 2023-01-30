import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import withTemplateViewActions from 'smartComponents/Node/hoc/withTemplateViewActions';
import { ability } from 'apis/components/Ability/ability';
import { TEMPLATE } from 'utils/modelConstants';
import resaga from 'resaga';

import m from './messages';
import styles from './styles';
import { CONFIG } from '../ActionButtons/config';

export class ActionButtonsCell extends PureComponent {
  canDelete = () =>
    ability.can('delete', { type: TEMPLATE, createdBy: this.props.createdBy });

  onDeleteItem = onClose => () => {
    const { id, type, content, templateViewActions } = this.props;
    const form = {
      type,
      id,
      title: content,
    };
    onClose();
    this.handleEvents(templateViewActions.onDelete(form));
  };

  handleEvents = (event, onClose) => () => {
    onClose();
    event();
  };

  renderButton = ({ openMenu }) => {
    const { sizeOptionBtn } = this.props;
    return (
      <div className={this.props.classes.menuBtn}>
        <Button
          variant={VARIANTS.INLINE}
          // color="gray"
          size={sizeOptionBtn}
          onClick={openMenu}
          tooltipProps={{
            title: 'Options',
          }}
        >
          <div className={this.props.classes.option}>OPTIONS</div>
        </Button>
      </div>
    );
  };

  renderPopperOptions = ({ closeMenu }) => {
    const { classes, canMove, templateViewActions } = this.props;

    return (
      <>
        {this.canDelete() && (
          <MenuItem
            button
            onClick={this.onDeleteItem(closeMenu)}
            className={classes.item}
          >
            <Icon icon="trash2" className={classes.icon} />
            <M {...m.deleteLabel} />
          </MenuItem>
        )}
        {canMove && this.canDelete() && (
          <MenuItem
            button
            onClick={this.handleEvents(templateViewActions.onMove, closeMenu)}
            className={classes.item}
          >
            <Icon icon="compare" className={classes.icon} />
            <M {...m.moveLabel} />
          </MenuItem>
        )}
        <MenuItem
          button
          onClick={this.handleEvents(templateViewActions.onCopy, closeMenu)}
          className={classes.item}
        >
          <Icon icon="copy" className={classes.icon} />
          <M {...m.copyLabel} />
        </MenuItem>
      </>
    );
  };

  render = () => (
    <React.Fragment>
      <Popper
        placement="bottom-center"
        stopPropagation
        renderButton={this.renderButton}
      >
        {this.renderPopperOptions}
      </Popper>
    </React.Fragment>
  );
}

ActionButtonsCell.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  templateViewActions: PropTypes.object,

  // parent props
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  content: PropTypes.string,
  canMove: PropTypes.bool,

  // resaga
  createdBy: PropTypes.number,
  sizeOptionBtn: PropTypes.string,
};

ActionButtonsCell.defaultProps = {
  sizeOptionBtn: 'small',
};

export default compose(
  withStyles(styles, { name: 'TemplateActionButtonsCell' }),
  withTemplateViewActions,
  resaga(CONFIG),
)(ActionButtonsCell);
