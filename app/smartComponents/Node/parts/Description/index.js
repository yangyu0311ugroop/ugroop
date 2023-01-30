import { withStyles } from '@material-ui/core/styles';
import { DESCRIPTION, EMPTY_RTE } from 'appConstants';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import SimpleRTE, { StyledSimpleRTE } from 'ugcomponents/Inputs/SimpleRTE';
import omit from 'lodash/omit';
import { CONFIG, CONFIG_2 } from './config';
import styles from './styles';
import EditableRTE from '../EditableRTE';

export class Description extends PureComponent {
  componentWillMount = () => {
    this.nodePath = ['customData', 'description'];
  };

  isEmpty = value => !value || value === EMPTY_RTE;

  renderView = ({ value = '' }) => {
    const {
      noPadding,
      editing,
      renderSeeMore,
      isCollapeSeeMore,
      updatingTour,
      editingParent,
      isMinHeightCollapse,
      wrapperClassName,
      userId,
    } = this.props;

    if (this.isEmpty(value)) return null;

    return (
      <StyledSimpleRTE
        renderSeeMore={renderSeeMore}
        isCollapeSeeMore={isCollapeSeeMore}
        editing={editing || updatingTour || editingParent}
        readOnly
        value={value}
        noPaddingBottom={this.props.noPaddingBottom}
        noPadding={noPadding}
        isMinHeightCollapse={isMinHeightCollapse}
        wrapperClassName={wrapperClassName}
        userId={userId}
      />
    );
  };

  renderEdit = ({ value = '', valueKey }, { mode }) => {
    const {
      id,
      placeholder,
      noPaddingBottom,
      noPadding,
      updatingTour,
      wrapperClassName,
    } = this.props;
    return (
      <SimpleRTE
        id={id}
        mode={mode}
        value={value}
        name={valueKey}
        autoFocus
        placeholder={placeholder}
        noPaddingBottom={noPaddingBottom}
        noPadding={noPadding}
        updatingTour={updatingTour}
        wrapperClassName={wrapperClassName}
      />
    );
  };

  renderEditableRTE = () => (
    <EditableRTE
      nodePath={this.nodePath}
      headingIcon="lnr-register"
      headingLabel="Description"
      typeLabel="description"
      emptyPlaceholder="Click here to add more detail about this task"
      placeholder="Describe the task more fully"
      advancedMode
      {...omit(this.props, ['classes'])}
    />
  );

  render = () => {
    const {
      classes,
      id,
      valueKey,
      component,
      editable,
      showEmpty,
      placeholder,
      noContent,
      advancedMode,
      onModeChange,
      editingViewModeClassName,
      className,
      children,
      componentProps,
      useEditableRTE,
      isTitleAttrb,
      wrapperClassName,
    } = this.props;

    if (useEditableRTE) return this.renderEditableRTE();

    return (
      <NodeProp
        id={id}
        valueKey={valueKey}
        component={component}
        showEmpty={showEmpty || editable}
        editable={editable}
        isCustomData
        placeholder={placeholder}
        noContent={noContent}
        renderView={this.renderView}
        renderEdit={this.renderEdit}
        makeNode={this.makeNode}
        isEmpty={this.isEmpty}
        editGridClassName={classes.editGridClassName}
        advancedMode={advancedMode}
        onModeChange={onModeChange}
        className={className}
        editingViewModeClassName={editingViewModeClassName}
        actionBtnClassName={classes.actionBtnClassName}
        componentProps={componentProps}
        isTitleAttrb={isTitleAttrb}
        wrapperClassName={wrapperClassName}
      >
        {children}
      </NodeProp>
    );
  };
}

Description.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  userId: PropTypes.number,
  valueKey: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  editingViewModeClassName: PropTypes.string,
  showEmpty: PropTypes.bool,
  advancedMode: PropTypes.bool,
  editing: PropTypes.bool,
  onModeChange: PropTypes.func,
  children: PropTypes.func,
  useEditableRTE: PropTypes.bool,
  componentProps: PropTypes.object,
  noContent: PropTypes.node,
  noPaddingBottom: PropTypes.bool,
  noPadding: PropTypes.bool,
  isTitleAttrb: PropTypes.bool,
  renderSeeMore: PropTypes.bool,
  isCollapeSeeMore: PropTypes.bool,
  // resaga props
  editable: PropTypes.bool,
  updatingTour: PropTypes.bool,
  editingParent: PropTypes.bool,
  isMinHeightCollapse: PropTypes.bool,
  wrapperClassName: PropTypes.string,

  // customisable props
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

Description.defaultProps = {
  id: 0,
  valueKey: DESCRIPTION,
  advancedMode: true,
  placeholder: 'Add a description',
  component: GridItem,
  useEditableRTE: false,
  componentProps: {},
  noPaddingBottom: false,
  noContent: 'Add a description',
  isTitleAttrb: false,
  isMinHeightCollapse: false,
};

export default compose(
  withStyles(styles, { name: 'Description' }),
  resaga(CONFIG),
  resaga(CONFIG_2),
)(Description);
