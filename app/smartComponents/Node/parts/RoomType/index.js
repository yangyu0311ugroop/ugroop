import {
  ROOM_TYPE,
  DEFAULT,
  HEADING,
  NODE_PROP,
  ROOM_TYPES,
  ROOM_OTHERS,
} from 'appConstants';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Span } from 'viewComponents/Typography';
import { VARIANTS } from 'variantsConstants';
import MenuItem from 'components/Popper/components/MenuItem';
import Icon from 'ugcomponents/Icon';
import Popper from 'components/Popper';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import Button from 'viewComponents/Button';
import { isFunction } from 'lodash';

import { CONFIG } from './config';
import styles from './styles';
import NodeProp from '../../components/NodeProp';
import { EditableSelectForm } from '../../../Editables';
import inputs from './inputs';

export class RoomType extends PureComponent {
  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderTitle = () => {
    const { roomType } = this.props;

    return roomType;
  };

  handleValidSubmit = roomType => () => {
    const { id, handleOnSubmit } = this.props;
    const values = ROOM_TYPES[roomType];
    if (isFunction(handleOnSubmit))
      return handleOnSubmit({ roomType, ...values });

    return NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        node: { customData: { roomType, ...values } },
        onSuccess: this.onSuccessUpdate({ roomType }),
      },
      this.props,
    );
  };

  renderRoomTypeButton = ({ openMenu }) => {
    const { renderLabel } = this.props;
    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>
          <Button
            variant={VARIANTS.BORDERLESS}
            dense
            size="extraSmall"
            onClick={openMenu}
            noPadding
          >
            {isFunction(renderLabel) ? (
              renderLabel()
            ) : (
              <Icon icon="lnr-chevron-down" size="xsmall" />
            )}
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  renderRoomTypeOptions = ({ closeMenu }) => {
    const { roomType, showOthers } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        {Object.keys(ROOM_TYPES)
          .filter(val => val !== ROOM_OTHERS || showOthers)
          .map(key => (
            <GridItem key>
              <MenuItem
                selected={roomType === key}
                closeMenu={closeMenu}
                onClick={this.handleValidSubmit(key)}
                disabled={roomType === key}
              >
                {key}
              </MenuItem>
            </GridItem>
          ))}
      </GridContainer>
    );
  };

  renderDefault = () => {
    const { roomType } = this.props;

    if (!roomType) {
      return null;
    }
    const content = roomType;

    return (
      <span title={this.renderTitle()} className={this.contentClassName()}>
        {content}
      </span>
    );
  };

  onSuccessUpdate = model => () => {
    this.onSave(model);
  };

  handleSubmit = ({ model, onError }) => {
    const { id } = this.props;
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...model,
        onSuccess: this.onSuccessUpdate(model),
        onError,
      },
      this.props,
    );
  };

  rederEditablePopper = () => {
    const { editable, showLabel } = this.props;
    return (
      <GridContainer wrap="nowrap">
        {showLabel && <GridItem>{this.renderNodeProp()}</GridItem>}
        {editable && (
          <GridItem>
            <Popper
              placement="bottom-start"
              renderButton={this.renderRoomTypeButton}
              value={this.props.roomType}
              selectedType
            >
              {this.renderRoomTypeOptions}
            </Popper>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderEditableOptions = () =>
    // const { extraOptions } = this.props;
    [
      ...Object.entries(ROOM_TYPES).map(([key]) => ({
        value: key,
        children: key,
        key,
      })),
    ];

  onSave = formData => {
    const { onSuccess } = this.props;
    if (isFunction(onSuccess)) onSuccess(formData);
  };

  renderNodeProp = () => {
    const {
      id,
      bold,
      component,
      ellipsis,
      ellipsisClassName,
      editable,
    } = this.props;

    // if (isFunction(renderLabel)) return renderLabel();

    return (
      <NodeProp
        id={id}
        bold={bold}
        variant={HEADING}
        valueKey={ROOM_TYPE}
        editable={editable}
        showEmpty
        component={component}
        ellipsis={ellipsis}
        ellipsisClassName={ellipsisClassName}
        isCustomData
        required
        placeholder="Room type"
        onSave={this.onSave}
      />
    );
  };

  renderEditable = () => {
    const { readOnly, roomType } = this.props;
    return (
      <GridItem>
        <EditableSelectForm
          value={roomType}
          {...inputs.base}
          {...inputs.editable}
          options={this.renderEditableOptions()}
          onSubmit={this.handleSubmit}
          readOnly={readOnly}
        />
      </GridItem>
    );
  };

  renderTextOnly = () => {
    const { id, ellipsisClassName } = this.props;
    return (
      <NodeProp
        id={id}
        variant={VARIANTS.TEXT_ONLY}
        valueKey={ROOM_TYPE}
        showEmpty
        ellipsis
        ellipsisClassName={ellipsisClassName}
        isCustomData
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [NODE_PROP]: this.renderNodeProp,
      [VARIANTS.POPPER]: this.rederEditablePopper,
      [VARIANTS.EDITABLE]: this.renderEditable,
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

RoomType.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.node,
  className: PropTypes.string,
  bold: PropTypes.bool,
  ellipsis: PropTypes.bool,
  ellipsisClassName: PropTypes.string,
  editable: PropTypes.bool,
  readOnly: PropTypes.bool,
  renderLabel: PropTypes.func,
  showLabel: PropTypes,
  onSuccess: PropTypes.func,

  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  showOthers: PropTypes.bool,
  handleOnSubmit: PropTypes.func,

  // resaga props
  roomType: PropTypes.string,
};

RoomType.defaultProps = {
  variant: '',
  className: '',

  roomType: '',
  component: Span,
  showLabel: true,
  showOthers: false,
};

export default compose(
  withStyles(styles, { name: 'RoomType' }),
  resaga(CONFIG),
)(RoomType);
