import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';

export class TourFetching extends PureComponent {
  componentWillMount = () => {
    this.updateTourFetching(this.props);
  };

  componentWillReceiveProps = nextProps => {
    const {
      id,
      getTemplateDetail,
      batchRecentActivity,
      getPeople,
      getHashKey,
      findOrganisationId,
      getOrgMembers,
      getOrganisation,
      initTemplateSettings,
      getTemplateTabDetail,
      getTree,
      getTimes,
      fetchEvents,
    } = this.props;

    if (
      id !== nextProps.id ||
      getTemplateDetail !== nextProps.getTemplateDetail ||
      getPeople !== nextProps.getPeople ||
      batchRecentActivity !== nextProps.batchRecentActivity ||
      getHashKey !== nextProps.getHashKey ||
      findOrganisationId !== nextProps.findOrganisationId ||
      getOrgMembers !== nextProps.getOrgMembers ||
      getOrganisation !== nextProps.getOrganisation ||
      initTemplateSettings !== nextProps.initTemplateSettings ||
      getTemplateTabDetail !== nextProps.getTemplateTabDetail ||
      getTree !== nextProps.getTree ||
      getTimes !== nextProps.getTimes ||
      fetchEvents !== nextProps.fetchEvents
    ) {
      this.updateTourFetching(nextProps);
    }
  };

  updateTourFetching = ({
    getTemplateDetail,
    batchRecentActivity,
    getPeople,
    getHashKey,
    findOrganisationId,
    getOrgMembers,
    getOrganisation,
    initTemplateSettings,
    getTemplateTabDetail,
    getTree,
    getTimes,
    fetchEvents,
  }) => {
    const fetching =
      getTemplateDetail ||
      batchRecentActivity ||
      getPeople ||
      getHashKey ||
      findOrganisationId ||
      getOrgMembers ||
      getOrganisation ||
      initTemplateSettings ||
      getTemplateTabDetail ||
      getTree ||
      getTimes ||
      fetchEvents;

    return this.props.resaga.setValue({
      fetching,
    });
  };

  render = () => null;
}

TourFetching.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
  getTemplateDetail: PropTypes.bool,
  batchRecentActivity: PropTypes.bool,
  getPeople: PropTypes.bool,
  getHashKey: PropTypes.bool,
  findOrganisationId: PropTypes.bool,
  getOrgMembers: PropTypes.bool,
  getOrganisation: PropTypes.bool,
  initTemplateSettings: PropTypes.bool,
  getTemplateTabDetail: PropTypes.bool,
  getTree: PropTypes.bool,
  getTimes: PropTypes.bool,
  fetchEvents: PropTypes.bool,
};

TourFetching.defaultProps = {};

export default compose(resaga(CONFIG))(TourFetching);
