import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TabHeader from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabHeader';

export class TabHeaderContainer extends PureComponent {
  state = {
    sticky: false,
  };

  render = () => (
    <TabHeader
      data={this.props.data}
      activeTab={this.props.activeTab}
      sticky={this.state.sticky}
      templateId={this.props.templateId}
      isPublicView
      tabIds={this.props.tabIds}
    />
  );
}

TabHeaderContainer.propTypes = {
  // from parent
  activeTab: PropTypes.number,
  data: PropTypes.array,
  templateId: PropTypes.number,
  tabIds: PropTypes.array,
};

TabHeaderContainer.defaultProps = {
  data: [],
  activeTab: 0,
  tabIds: [],
};

export default TabHeaderContainer;
