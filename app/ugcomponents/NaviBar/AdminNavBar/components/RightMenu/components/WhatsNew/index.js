import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { URL_HELPERS } from 'appConstants';
import NavItem from 'ugcomponents/NaviBar/AdminNavBar/components/NavItem';
import classnames from 'classnames';
// import { NOTIFICATION_API, WHATS_NEW } from 'apis/constants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { makeStyles } from 'components/material-ui';
import { useGlobalContext } from 'containers/App/globalStateContext';

import { CONFIG, CONFIG_USER_ID } from './config';

const DATA = [
  {
    id: 1,
    link:
      'https://intercom.help/ugroop/en/articles/5459777-what-s-new#h_7837ad6446',
    updateDate: '2021-08-10',
    title: 'Enhancements and New Features',
    version: '3.7.0',
  },
];

const styles = {
  root: {},
  active: {
    color: '#1a2b49',

    '&:hover': {
      color: '#1a2b49',
    },

    '&:hover $badge': {
      color: 'white',
    },
  },
  badge: {
    zIndex: 9,
    position: 'absolute',
    top: 4,
    right: '-5px',
    backgroundColor: 'red',
    borderRadius: 2,
    fontSize: 9,
    padding: '1px 3px',
    lineHeight: 1.1,
    '-webkit-font-smoothing': 'subpixel-antialiased',
    pointerEvents: 'none',
    color: 'white',
  },
};

const useStyles = makeStyles(styles);
function WhatsNew(props) {
  const [state, globalDispatch] = useGlobalContext();
  const whatsNew = state.WhatsNewContext.ugroopUpdates;
  const { userId, readUpdates } = props;
  /*  const userId = useSelector(state =>
    makeSingleSelect(selectAccountAttribute)(state, {
      attribute: 'id',
    }),
  ); */

  const classes = useStyles();

  const getWhatsNewApi = async () => {
    const data = await fetch(URL_HELPERS.whatsNew(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    })
      .then(parseReadableStreamToJson)
      .catch(error => {
        console.error({ error });
      });
    return data;
  };

  const parseReadableStreamToJson = async response => {
    const data = (await response.body.getReader().read()).value;
    const str = String.fromCharCode(...data);
    let parseData = DATA;
    try {
      parseData = JSON.parse(str);
    } catch (err) {
      console.log(err);
    }
    if (data && typeof data === 'object') {
      globalDispatch.setWhatsNew(parseData);
    }
    return parseData;
  };

  useEffect(() => {
    if (!whatsNew.length) {
      getWhatsNewApi();
    }
  }, []);

  const openSystemUpdate = () => {
    PORTAL_HELPERS.showSystemUpdate({ userId }, props);
  };

  const getCount = () => {
    const ids = whatsNew.map(val => val.id);
    return ids.filter(id => !readUpdates.includes(id)).length;
  };

  const renderCount = () => (
    <div className={classnames(classes.badge, classes.active)}>NEW</div>
  );

  return (
    <NavItem
      title="Whats New"
      icon="lnr-news"
      count={getCount()}
      onClick={openSystemUpdate}
      renderCount={renderCount}
    />
  );
}

WhatsNew.propTypes = {
  userId: PropTypes.number,
  readUpdates: PropTypes.array,
  // hoc props
  // eslint-disable-next-line react/no-unused-prop-types
  resaga: PropTypes.object.isRequired,

  // parent props

  // resaga props
};

WhatsNew.defaultProps = {
  readUpdates: [],
};

export default compose(
  resaga(CONFIG_USER_ID),
  resaga(CONFIG),
)(WhatsNew);
