import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage';
import PublicLayout from 'ugcomponents/Layout/PublicLayout';
import PrintTour from 'containers/PrintPage/Components/PrintTour';
import InterestPage from 'containers/InterestPage';
import PublicTemplatePageIndex from './Template';

function PublicPageIndex({ match, ...props }) {
  return (
    <PublicLayout location={props.location}>
      <Switch>
        <Route exact path={`${match.url}`} component={NotFoundPage} />
        <Route
          path={`${match.url}/template/2/:hashkey`}
          component={PrintTour}
        />
        <Route
          path={`${match.url}/template/:hashkey/interested`}
          component={InterestPage}
        />
        <Route
          path={`${match.url}/template/:hashkey`}
          component={PublicTemplatePageIndex}
        />
      </Switch>
    </PublicLayout>
  );
}

PublicPageIndex.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object.isRequired,
};

PublicPageIndex.defaultProps = {};

export default PublicPageIndex;
