/*
 *
 * SharedTemplates
 *
 */
import Container from 'components/Container';
import UGTemplateListHR from 'containers/Templates/Components/HR/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS, DEFAULT_SORT_BY, DEFAULT_ORDER } from 'appConstants';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

import Header from './components/Header';
import Body from './components/Body';

export class SharedTemplates extends PureComponent {
  componentWillMount = () => {
    const pageSelected = 'shareToMe';
    this.props.resaga.setValue({
      pageSelected,
      currResultCount: 0,
      sortOrder: DEFAULT_ORDER,
      sortField: DEFAULT_SORT_BY,
    });
  };

  componentWillUnmount = () => {
    this.props.resaga.setValue({
      pageSelected: null,
      sortOrder: null,
      sortField: null,
      viewSelected: 'card',
      id: null,
      isOpenFolderTree: false,
      folderTreeMode: null,
      selectedId: null,
      selectedType: null,
      selectedName: null,
    });
  };

  render = () => (
    <div>
      <Helmet
        title={PAGE_HELMETS.SHARED_TOURS}
        meta={[
          { name: 'description', content: 'Contains all shared templates' },
        ]}
      />
      <Container>
        <Header />
        <UGTemplateListHR />
        <Body />
      </Container>
    </div>
  );
}

SharedTemplates.propTypes = {
  resaga: PropTypes.object.isRequired,
};

export default compose(resaga(CONFIG))(SharedTemplates);
