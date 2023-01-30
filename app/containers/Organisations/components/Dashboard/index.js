import { URL_HELPERS } from 'appConstants';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';
import styles from './styles';

// currently we don't have a dashboard for organisation, so just redirect to organisation tours page
export class Dashboard extends PureComponent {
  componentDidMount = () => {
    const { organisationIdFromURL } = this.props;

    this.goToTourPage(organisationIdFromURL);
  };

  goToTourPage = id => {
    const { history } = this.props;

    return history.push(URL_HELPERS.orgTours(id));
  };

  render = () => null;
}

Dashboard.propTypes = {
  // hoc props
  history: PropTypes.object.isRequired,

  // parent props

  // resaga props
  organisationIdFromURL: PropTypes.number,
};

Dashboard.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Dashboard' }),
  withRouter,
  resaga(CONFIG),
)(Dashboard);
