import { ability } from 'apis/components/Ability/ability';
import { FIXED_TABS } from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabHeader/constants';
import React, { PureComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { LINK } from 'utils/modelConstants';

import CONFIG from './config';
import Tab from './tab';

export class UGTabContainer extends PureComponent {
  componentWillMount = () => {
    // Date: May 15th 18 - Jay
    // This is a hack
    // it should be this.link = { type: 'link', createdBy };
    // but it's unnecessary as of our current bussiness rules
    this.link = { type: LINK };
  };

  isDragDisabled = () =>
    !(this.props.editable && ability.can('update', this.link));

  renderDraggable = props => provided => (
    <div>
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <Tab {...props} {...provided.dragHandleProps} />
      </div>
      {provided.placeholder}
    </div>
  );

  render = () => {
    const { resaga: hoc, editable, ...props } = this.props;
    const { accessible, label } = props;

    if (!accessible) return <div />;

    // Some tabs can't be re-ordered
    if (FIXED_TABS.indexOf(label) !== -1)
      return (
        <div>
          <Tab {...props} />{' '}
        </div>
      );

    return (
      <Draggable
        draggableId={props.tabId}
        type="tabItem"
        index={props.index}
        isDragDisabled={this.isDragDisabled()}
      >
        {this.renderDraggable(props)}
      </Draggable>
    );
  };
}

UGTabContainer.propTypes = {
  resaga: PropTypes.object.isRequired,
  tabId: PropTypes.number,
  index: PropTypes.number,
  label: PropTypes.string,
  className: PropTypes.string,
  privateTab: PropTypes.bool,
  accessible: PropTypes.bool,
  editable: PropTypes.bool,
};
UGTabContainer.defaultProps = {
  tabId: 0,
  index: 0,
  label: '',
  className: '',
  privateTab: false,
  accessible: true,
};

// TODO: Move this else where since we might be using this same Tab in other places as well
// TODO: Remove resaga once we move successfully the CONFIG elsewhere
export default resaga(CONFIG)(UGTabContainer);
