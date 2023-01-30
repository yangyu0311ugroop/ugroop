import PublicTabContent from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class PublicTabPage extends PureComponent {
  render() {
    const { activeTabIndex, tabId, hashkey, templateId } = this.props;

    return (
      <React.Fragment>
        {/* <Header isPublic id={templateId} tabId={tabId} /> */}
        <PublicTabContent
          isPublic
          tabId={tabId}
          activeTab={activeTabIndex}
          templateId={templateId}
          hashkey={hashkey}
          pathname={`/tours/${templateId}`}
        />
      </React.Fragment>
    );
  }
}

PublicTabPage.propTypes = {
  // hoc props
  hashkey: PropTypes.string,
  activeTabIndex: PropTypes.number,
  // resaga
  tabId: PropTypes.number,
  templateId: PropTypes.number.isRequired,
};

PublicTabPage.defaultProps = {
  hashkey: '',
  tabId: -1,
};

export default compose(resaga(CONFIG))(PublicTabPage);
