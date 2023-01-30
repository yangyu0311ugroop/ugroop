import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import MyChecklists from './components/MyChecklists';
import AssignedChecklists from './components/AssignedChecklists';

export class ChecklistsRoute extends PureComponent {
  render = () => {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={match.url} component={MyChecklists} />
        <Route path={`${match.url}/my`} component={MyChecklists} />
        <Route path={`${match.url}/assigned`} component={AssignedChecklists} />
      </Switch>
    );
  };
}

ChecklistsRoute.propTypes = {
  // hoc props
  match: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

ChecklistsRoute.defaultProps = {};

export default compose()(ChecklistsRoute);
