import { DEFAULT, ROOM_TYPES, ROOM_OTHERS } from 'appConstants';
import classNames from 'classnames';
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
import { first } from 'lodash';
import MenuItem from 'components/Popper/components/MenuItem';
import Rooms from 'smartComponents/Node/components/Rooms';
import Room from 'smartComponents/Node/types/Room';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import Button from 'viewComponents/Button';
import { FormattedMessage as M } from 'react-intl';
import PopoverForm from 'viewComponents/PopoverForm';
import InlineButton from 'ugcomponents/Buttons/InlineButton';
import { EditableLabel, EditablePlaceholder } from 'viewComponents/Editable';
import { CONFIG, CONFIG2 } from './config';
import styles from './styles';
import m from './messages';

export class PaxRoom extends PureComponent {
  state = {
    editing: false,
    loading: false,
    anchorEl: null,
  };

  getRoomdId = () => first(this.props.participantRooms);

  handleValidSubmit = roomType => () => {
    const { id } = this.props;
    return NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        node: { customData: { roomType } },
      },
      this.props,
    );
  };

  renderRoomTypeOptions = ({ closeMenu }) => {
    const { roomId } = this.props;
    return (
      <GridContainer direction="column" spacing={0}>
        {Object.keys(ROOM_TYPES)
          .filter(val => val !== ROOM_OTHERS)
          .map(key => (
            <GridItem key>
              <MenuItem
                selected={roomId === key}
                closeMenu={closeMenu}
                onClick={this.handleValidSubmit(key)}
              >
                {key}
              </MenuItem>
            </GridItem>
          ))}
      </GridContainer>
    );
  };

  handleSubmit = ({ model, onSuccess, onError }) => {
    const { id } = this.props;
    NODE_API_HELPERS.updateNode(
      {
        nodeId: id,
        ...model,
        onSuccess,
        onError,
      },
      this.props,
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

  renderEditableLabel = () => (
    <GridContainer wrap="nowrap">
      <GridItem xs>
        <EditableLabel>
          <M {...m.label} />
        </EditableLabel>
      </GridItem>
    </GridContainer>
  );

  renderEditablePlaceholder = () => (
    <EditablePlaceholder>
      <M
        {...LOGIC_HELPERS.ifElse(
          this.props.readOnly,
          m.emptyPlaceholder,
          m.placeholder,
        )}
      />
    </EditablePlaceholder>
  );

  handleCreateClick = () => {
    this.setState({ editing: true });
  };

  handleCreateButtonRef = ref => {
    this.setState({ anchorEl: ref });
  };

  getPopoverProps = () => {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return {
      anchorEl,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      PaperProps: {
        classes: { root: classes.paperRoot },
      },
    };
  };

  handlePopoverClose = () => {
    this.setState({ editing: false });
  };

  renderForm = () => {
    const { templateId, id } = this.props;
    const selectedId = this.getRoomdId();
    return (
      <GridContainer direction="column">
        <GridItem>
          <Rooms
            variant={VARIANTS.SELECT_FIELD}
            id={templateId}
            selectedId={selectedId}
            participantId={id}
          />
        </GridItem>
        <GridItem>{this.renderFormActions()}</GridItem>
      </GridContainer>
    );
  };

  renderFormActions = () => {
    const { loading } = this.state;
    return (
      <GridContainer wrap="nowrap">
        <GridItem xs />
        <GridItem>
          <Button
            size="small"
            color="black"
            variant="outline"
            dense
            disabled={loading}
            onClick={this.handlePopoverClose}
          >
            <M {...m.cancelButtonLabel} />
          </Button>
        </GridItem>
      </GridContainer>
    );
  };

  renderPopOver = () => {
    const { classes } = this.props;
    const { editing, loading } = this.state;
    return (
      <React.Fragment>
        <PopoverForm
          open={editing}
          popoverProps={this.getPopoverProps()}
          // onValidSubmit={this.handleValidSubmit('')}
          onClose={this.handlePopoverClose}
          disabled={loading}
          formClassName={classes.popover}
        >
          {this.renderForm()}
        </PopoverForm>
      </React.Fragment>
    );
  };

  renderEditable = () => {
    const { classes, id, readOnly } = this.props;
    const roomId = this.getRoomdId();
    const contentStyle = classNames(classes.content, classes.fullWidth);
    return (
      <GridItem>
        <GridContainer direction="column" spacing={0} wrap="nowrap">
          <GridItem>{this.renderEditableLabel()}</GridItem>
          <GridItem>
            <InlineButton
              // onClick={onClick}
              onClick={this.handleCreateClick}
              buttonRef={this.handleCreateButtonRef}
              className={contentStyle}
              component="div"
              spanBlock
              isEllipsis
              disabled={readOnly}
            >
              {!roomId && this.renderEditablePlaceholder()}
              {!!roomId && (
                <Room
                  id={roomId}
                  variant={VARIANTS.TEXT_ONLY}
                  participantId={id}
                />
              )}
            </InlineButton>
          </GridItem>
          <GridItem>{this.renderPopOver()}</GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderEditable,
    });
  };
}

PaxRoom.propTypes = {
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

  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),

  // resaga props
  templateId: PropTypes.number,
  roomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  participantRooms: PropTypes.array,
};

PaxRoom.defaultProps = {
  variant: '',
  className: '',

  roomId: '',
  component: Span,
  editable: true,
  participantRooms: [],
};

export default compose(
  withStyles(styles, { name: 'PaxRoom' }),
  resaga(CONFIG),
  resaga(CONFIG2),
)(PaxRoom);
