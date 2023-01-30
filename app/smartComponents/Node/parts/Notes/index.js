import { withStyles } from '@material-ui/core/styles';
import { NOTES, EMPTY_RTE } from 'appConstants';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import NodeProp from 'smartComponents/Node/components/NodeProp';
import SimpleRTE, { StyledSimpleRTE } from 'ugcomponents/Inputs/SimpleRTE';
import omit from 'lodash/omit';
import { CONFIG } from './config';
import styles from './styles';
import EditableRTE from '../EditableRTE';

export class Notes extends PureComponent {
  componentWillMount = () => {
    this.nodePath = ['customData', 'notes'];
  };

  isEmpty = value => !value || value === EMPTY_RTE;

  renderView = ({ value = '' }) => {
    if (this.isEmpty(value)) return null;
    return (
      <StyledSimpleRTE
        readOnly
        value={value}
        noPaddingBottom={this.props.noPaddingBottom}
      />
    );
  };

  renderEdit = ({ value = '', valueKey }, { mode }) => {
    const { id, placeholder, noPaddingBottom } = this.props;
    return (
      <SimpleRTE
        id={id}
        mode={mode}
        value={value}
        name={valueKey}
        autoFocus
        placeholder={placeholder}
        noPaddingBottom={noPaddingBottom}
      />
    );
  };

  renderEditableRTE = () => (
    <EditableRTE
      nodePath={this.nodePath}
      headingIcon="lnr-bubble-text"
      typeLabel="notes"
      {...omit(this.props, ['classes'])}
    />
  );

  render = () => {
    const {
      classes,
      id,
      component,
      editable,
      placeholder,
      advancedMode,
      onModeChange,
      editingViewModeClassName,
      className,
      children,
      componentProps,
      useEditableRTE,
    } = this.props;

    if (useEditableRTE) return this.renderEditableRTE();

    return (
      <NodeProp
        id={id}
        valueKey={NOTES}
        component={component}
        showEmpty={editable}
        editable={editable}
        isCustomData
        noContent={placeholder}
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
      >
        {children}
      </NodeProp>
    );
  };
}

Notes.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  editingViewModeClassName: PropTypes.string,
  advancedMode: PropTypes.bool,
  onModeChange: PropTypes.func,
  children: PropTypes.func,
  useEditableRTE: PropTypes.bool,
  componentProps: PropTypes.object,
  noContent: PropTypes.string,
  headingLabel: PropTypes.string,
  emptyPlaceholder: PropTypes.string,
  noPaddingBottom: PropTypes.bool,

  // resaga props
  editable: PropTypes.bool,

  // customisable props
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

Notes.defaultProps = {
  id: 0,
  advancedMode: true,
  headingLabel: 'Notes',
  emptyPlaceholder: 'Click here to record anything special about this task',
  placeholder: 'Record any extra information about this task',
  component: GridItem,
  useEditableRTE: true,
  componentProps: {},
  noPaddingBottom: false,
};

export default compose(
  withStyles(styles, { name: 'Notes' }),
  resaga(CONFIG),
)(Notes);
