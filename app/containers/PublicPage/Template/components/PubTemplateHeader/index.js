import { withStyles } from '@material-ui/core/styles';
import TemplateHeader from 'containers/Templates/TemplateManagement/components/TemplateHeader';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import styles from './styles';

export class PubTemplateHeader extends PureComponent {
  render = () => {
    const { templateId, activeTab } = this.props;
    return (
      <TemplateHeader activeTabId={activeTab} id={templateId} publicView />
    );
  };
}

PubTemplateHeader.propTypes = {
  // hoc props
  templateId: PropTypes.number,

  // parent props
  activeTab: PropTypes.number,
  // resaga props
};

PubTemplateHeader.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'PubTemplateHeader' }),
  // resaga(CONFIG),
  // resaga(METAINFO_CONFIG),
)(PubTemplateHeader);
