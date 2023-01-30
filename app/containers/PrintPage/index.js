import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage';
import PrintLayout from 'ugcomponents/Layout/PrintLayout';
import PrintTour from './Components/PrintTour';

function PrintPageIndex({ match, ...props }) {
  return (
    <PrintLayout location={props.location}>
      <Switch>
        <Route exact path={`${match.url}`} component={NotFoundPage} />
        <Route path={`${match.url}/tour/:id`} component={PrintTour} />
      </Switch>
    </PrintLayout>
  );
}

PrintPageIndex.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

PrintPageIndex.defaultProps = {
  location: { pathname: '' },
};

export default PrintPageIndex;
