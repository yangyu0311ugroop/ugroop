import H1 from 'components/H1';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import { DATASTORE_UTILS } from 'datastore';
import resaga from 'resaga';
import { parseQueryParam, stringifyParam } from 'utils/helpers/url';
import TemplateSearchField from 'containers/Templates/Components/TemplateSearchField';
import GroupButton from 'ugcomponents/Buttons/GroupButton';
import Icon from 'viewComponents/Icon';
import { NODE_SHARE_API, GET_SHARED_TEMPLATES } from 'apis/constants';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export function Header(props) {
  const { classes, searchValue, pageSelected } = props;
  useEffect(
    () => () => {
      clearSearch();
    },
    [],
  );
  const onSwitchPage = selected => {
    props.resaga.setValue({
      switchLoading: true,
    });
    props.resaga.dispatchTo(NODE_SHARE_API, GET_SHARED_TEMPLATES, {
      payload: {
        pageSelected: selected,
        offset: 0,
        sortOrder: props.sortOrder,
        sortField: props.sortField,
      },
      onSuccess: onSwitchSuccess(selected),
    });
  };

  const onSwitchSuccess = selected => result => {
    resetPageCount();
    const currResultCount = result.children
      ? Object.keys(result.children).length
      : 0;
    props.resaga.setValue({
      id: result.id,
      folder: result.folder,
      children: result.children,
      switchLoading: false,
      pageSelected: selected,
      currResultCount,
      people: DATASTORE_UTILS.upsertObject(result.person),
    });
  };

  const onSearchTextChange = value => {
    props.resaga.setValue({ search: value });
  };

  const clearSearch = () => {
    props.resaga.setValue({ search: '' });
  };

  const onPressEnter = () => {
    // eslint-disable-next-line
    alert('Under construction');
  };

  const resetPageCount = () => {
    const parsed = parseQueryParam(props.search);
    const { location } = props;
    delete parsed.page;
    if (Object.keys(parsed).length > 0) {
      props.history.replace(`${location.pathname}?${stringifyParam(parsed)}`);
    } else {
      props.history.replace(`${location.pathname}`);
    }
  };

  const renderContent = () => (
    <div>
      <GridContainer
        spacing={0}
        className={classes.listHeaderContainer}
        alignItems="flex-end"
      >
        <GridItem xs={12} sm={8} md={8} container spacing={0}>
          <H1 className={classes.listHeader}>
            <Icon className={classes.icon} icon="ug-shared-tour" />
            <M {...m.title} />
          </H1>
          <GroupButton
            noMargin
            middleBorderOnly
            btnItems={[
              { label: <M {...m.byMeBtn} />, value: 'shareByMe' },
              { label: <M {...m.byOthersBtn} />, value: 'shareToMe' },
            ]}
            initSelected={pageSelected}
            onClick={onSwitchPage}
          />
        </GridItem>
        <GridItem xs={12} sm={4} md={4}>
          <TemplateSearchField
            value={searchValue}
            onChange={onSearchTextChange}
            onPressEnter={onPressEnter}
            clearSearch={clearSearch}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
  return renderContent();
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

  // parent props

  // resaga props
  pageSelected: PropTypes.string,
  sortOrder: PropTypes.string,
  sortField: PropTypes.string,
  search: PropTypes.string,
  searchValue: PropTypes.string,
};

Header.defaultProps = {
  pageSelected: 'shareByMe',
  sortOrder: 'asc',
  sortField: 'content',
  search: '',
  searchValue: '',
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'Header' }),
  resaga(CONFIG),
)(React.memo(Header));
