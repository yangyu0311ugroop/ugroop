import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import {
  GET_ATTACHMENT,
  NODE_API,
  REMOVE_ATTACHMENT,
  UPDATE_NODE,
} from 'apis/constants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Scroll from 'react-scroll';
import { compose } from 'redux';
import resaga from 'resaga';
import Photo from 'smartComponents/Node/parts/Photo';
import Form from 'ugcomponents/Form/index';
import { ACTIVITY } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import Body from './components/Body';
import Header from './components/Header';
import { ATTACHMENT_CONFIG, CONFIG } from './config';
import styles from './styles';

export class Section extends PureComponent {
  componentWillMount = () => {
    const { createdBy } = this.props;

    this.section = { type: ACTIVITY, createdBy };
  };

  componentWillReceiveProps = nextProps => {
    const { editable } = this.props;

    // exiting Edit mode
    if (editable && !nextProps.editable) {
      this.finishEdit();
    }
  };

  handleDataChange = key => value => {
    const { id } = this.props;

    this.props.resaga.setValue({
      editSections: sections.upsert({ id }, { node: { [key]: value } }),
    });
  };

  saveChanges = formData => {
    const {
      id,
      dirty,
      description,
      photo,
      editLocation,
      icon,
      placeId,
      photoId,
      timeZoneId,
      url,
    } = this.props;

    if (dirty) {
      const updateSection = sections.makeSection(id, formData);
      const updateDescription = sections.makeDescription(description);
      const updatePhoto = sections.makePhoto(photo);
      const updateUrl = sections.makeUrl(url);
      const updateLocation = sections.makeLocation({
        editLocation,
        icon,
        placeId,
        timeZoneId,
      });
      const updateAttachment = sections.makeAttachment(
        id,
        formData,
        this.props,
      );

      // nested merge all pieces to make new object
      let payload = sections.mergeAll(
        updateSection,
        updateDescription,
        updateUrl,
        updatePhoto,
        updateLocation,
        updateAttachment,
      );

      if (updatePhoto) {
        payload = { ...payload, oldPhotoId: photoId };
      }

      this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
        payload: {
          nodeId: payload.id,
          node: payload,
        },
        onSuccess: this.handleAttachment(updateAttachment),
        onError: this.finishEdit,
      });
    } else {
      this.finishEdit();
    }
  };

  handleAttachment = ({ canDelete, createAttachment }) => () => {
    const { attachmentId, id } = this.props;

    if (createAttachment) {
      this.props.resaga.dispatchTo(NODE_API, GET_ATTACHMENT, {
        payload: { id },
        onSuccess: this.finishEdit,
        onError: this.finishEdit,
      });
    } else if (attachmentId && canDelete) {
      this.props.resaga.dispatchTo(NODE_API, REMOVE_ATTACHMENT, {
        payload: { id, isSection: true },
        onSuccess: this.finishEdit,
        onError: this.finishEdit,
      });
    } else {
      this.finishEdit();
    }
  };

  finishEdit = () => {
    const { id } = this.props;
    this.props.resaga.setValue({
      editSections: sections.remove(id),
    });
  };

  handleClick = () => {
    const { id } = this.props;

    this.props.resaga.setValue({
      selectedId: id,
    });
  };

  canEdit = () => {
    const { editing, editable } = this.props;

    return (editing || editable) && ability.can('update', this.section);
  };

  renderBody = () => {
    const {
      id,
      classes,
      dirty,
      dragHandleProps,
      tabId,
      isPrint,
      elevation,
      selectedId,
      batchEditing,
      ids,
    } = this.props;

    return (
      <Scroll.Element name={`scroller-node-${id}`}>
        <div
          id={`activity${id}`}
          className={classnames(
            classes.root,
            id === selectedId && classes.active,
            !elevation && classes.elevated,
          )}
        >
          <GridContainer direction="column" wrap="nowrap" spacing={2}>
            <GridItem>
              <GridContainer>
                <GridItem className={classes.grow}>
                  <GridContainer direction="column" spacing={0} wrap="nowrap">
                    <GridItem>
                      <Header
                        tabId={tabId}
                        id={id}
                        ids={ids}
                        dirty={dirty}
                        dragHandleProps={dragHandleProps}
                        isPublic={this.props.isPublic}
                        editable={this.canEdit()}
                        batchEditing={batchEditing}
                        noContent="Enter the section title here"
                        placeholder="Enter the section title here"
                      />
                    </GridItem>
                    <Body
                      id={id}
                      isPublic={this.props.isPublic}
                      isPrint={isPrint}
                      editable={this.canEdit()}
                      batchEditing={batchEditing}
                      onDataChange={this.handleDataChange}
                    />
                  </GridContainer>
                </GridItem>

                <Photo
                  id={id}
                  component={GridItem}
                  size={72}
                  resizeSize={72}
                  editable={this.canEdit()}
                />
              </GridContainer>
            </GridItem>
            {batchEditing && (
              <GridItem>
                <div className={classes.buttons}>
                  <GridContainer alignItems="center" justify="flex-end">
                    <GridItem>
                      <Button size="xs" color="gray" onClick={this.finishEdit}>
                        Cancel
                      </Button>
                    </GridItem>
                    <GridItem>
                      <Button size="xs" color="primary" type="submit">
                        Save
                      </Button>
                    </GridItem>
                  </GridContainer>
                </div>
              </GridItem>
            )}
          </GridContainer>
        </div>
      </Scroll.Element>
    );
  };

  render = () => {
    const { classes, exist, batchEditing, isEmpty, isPublic } = this.props;

    if (!exist || (isEmpty && isPublic)) return null;

    const renderBody = this.renderBody();

    if (!batchEditing) return renderBody;

    return (
      <Form onValidSubmit={this.saveChanges} className={classes.dragSection}>
        {renderBody}
      </Form>
    );
  };
}

Section.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // section id
  selectedId: PropTypes.number,
  tabId: PropTypes.number,
  elevation: PropTypes.number,
  dragHandleProps: PropTypes.object,
  isPrint: PropTypes.bool,

  // resaga props
  dirty: PropTypes.bool,
  exist: PropTypes.number,
  attachmentId: PropTypes.number,
  createdBy: PropTypes.number,
  description: PropTypes.string,
  url: PropTypes.string,
  editLocation: PropTypes.string,
  icon: PropTypes.string,
  placeId: PropTypes.string,
  timeZoneId: PropTypes.string,
  photo: PropTypes.object,
  photoId: PropTypes.string,
  isPublic: PropTypes.bool,
  editable: PropTypes.bool,
  batchEditing: PropTypes.bool,
  editing: PropTypes.any,
  isEmpty: PropTypes.bool,
  ids: PropTypes.number,
  // they are all needed, just not used in here
  // attachmentId: PropTypes.number,
  // attachment: PropTypes.object,
  // attachmentDescription: PropTypes.string,
};

Section.defaultProps = {
  dirty: false,
  exist: 0,
  attachmentId: 0,
  description: '',
  url: '',
  editLocation: '',
  icon: '',
  placeId: '',
  timeZoneId: '',
  photo: {},
  photoId: '',
  editing: false,

  dragHandleProps: {},
  isPublic: false,
  elevation: 0,
};

export default compose(
  withStyles(styles, { name: 'Section' }),
  resaga(CONFIG),
  resaga(ATTACHMENT_CONFIG),
)(Section);
