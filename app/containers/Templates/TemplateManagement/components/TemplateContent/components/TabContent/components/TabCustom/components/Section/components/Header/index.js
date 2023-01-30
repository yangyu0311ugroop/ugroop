import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { CONTENT } from 'appConstants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { Hidden } from 'components/material-ui';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import ValidationTextField from 'ugcomponents/Inputs/ValidationTextField/index';
import { ACTIVITY } from 'utils/modelConstants';
import ActionButtons from './components/ActionButtons';
import { CONFIG } from './config';
import styles from './styles';

export class Header extends PureComponent {
  handleChange = key => value => {
    const { id } = this.props;

    this.props.resaga.setValue({
      editSections: sections.upsert({ id }, { node: { [key]: value } }),
    });
  };

  canUpdate = () =>
    this.props.editable &&
    ability.can('update', { type: ACTIVITY, createdBy: this.props.createdBy });

  renderContent = () => {
    const {
      id,
      classes,
      batchEditing,
      content,
      noContent,
      placeholder,
    } = this.props;

    if (batchEditing) {
      return (
        <GridItem>
          <ValidationTextField
            name="editContent"
            type="text"
            label="Title for this section"
            onChange={this.handleChange('content')}
            value={content}
            className={classes.inputSectionLabel}
            autoFocus
            required
          />
        </GridItem>
      );
    }

    const editable = this.canUpdate();

    return (
      <NodeProp
        id={id}
        valueKey={CONTENT}
        component={GridItem}
        editable={editable}
        showEmpty={editable}
        bold
        isCustomData={false}
        noContent={noContent}
        placeholder={placeholder}
      />
    );
  };

  renderButtons = () => {
    const {
      id,
      content,
      editing,
      dirty,
      dragHandleProps,
      tabId,
      editable,
      ids,
    } = this.props;

    if (!editable) {
      return null;
    }

    return (
      <ActionButtons
        empty={!content}
        tabId={tabId}
        id={id}
        ids={ids}
        editing={editing}
        dirty={dirty}
        dragHandleProps={dragHandleProps}
      />
    );
  };

  render = () => {
    const { classes, dragHandleProps } = this.props;

    const content = this.renderContent();

    const body = (
      <GridContainer
        direction="column"
        wrap="nowrap"
        spacing={0}
        className={classes.header}
      >
        {content}
      </GridContainer>
    );
    const buttons = this.renderButtons();

    return (
      <GridContainer spacing={0} {...dragHandleProps}>
        <Hidden mdUp>
          <GridItem xs={12}>{buttons}</GridItem>
          <GridItem xs={12}>{body}</GridItem>
        </Hidden>
        <Hidden smDown>
          <GridItem className={classes.grow}>{body}</GridItem>
          <GridItem>{buttons}</GridItem>
        </Hidden>
      </GridContainer>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  dirty: PropTypes.bool,
  dragHandleProps: PropTypes.object,
  tabId: PropTypes.number,
  batchEditing: PropTypes.bool,
  noContent: PropTypes.string,
  // resaga props
  editing: PropTypes.any,
  content: PropTypes.string,
  location: PropTypes.string,
  icon: PropTypes.string,
  placeId: PropTypes.string,
  timeZoneId: PropTypes.string,
  createdBy: PropTypes.number,
  editable: PropTypes.bool,
  ids: PropTypes.number,
  placeholder: PropTypes.string,
};

Header.defaultProps = {
  editing: 0,
  dirty: false,
  dragHandleProps: {},
  content: '',
  location: '',
  icon: '',
  placeId: '',
  timeZoneId: '',
  createdBy: 0,
};

export default compose(
  withStyles(styles, { name: 'Header' }),
  resaga(CONFIG),
)(Header);
