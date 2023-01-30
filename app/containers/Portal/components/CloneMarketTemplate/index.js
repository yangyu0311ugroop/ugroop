import React, { useEffect } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Slide } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import JDialog from '../../../../ugcomponents/JDialog';
import JText from '../../../../components/JText';
import GridContainer from '../../../../components/GridContainer';
import GridItem from '../../../../components/GridItem';
import { LOGIC_HELPERS } from '../../../../utils/helpers/logic';
import { makeStyles } from '../../../../components/material-ui';
import { withSMDown } from '../../../../components/material-ui/hocs/withMediaQuery';
import { PORTAL_HELPERS } from '../../helpers';
import { Select } from '../../../../ugcomponents/Inputs';
import {
  makeSelectOrgLists,
  makeSelectUserPersonAccount,
} from '../../../../datastore/stormPathStore/selectors';
import { MARKET_API, USE_TEMPLATE } from '../../../../apis/constants';
import { useMarketplaceContext } from '../../../MarketPlace/context/marketPlaceStateContext';
import { Category } from '../../../../appConstants';

const CONFIG = {
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};

const styles = () => ({
  root: {},
  grow: {
    flex: '1',
  },
  paperRoot: {
    margin: 0,
    borderRadius: 0,
    width: '100%',
  },
  closeDialogButton: {
    padding: '2px 8px',
    zIndex: 2,
    background: 'unset',
    boxShadow: 'unset',
    color: '#607D8B',

    '&:hover': {
      background: '#f6f8fa',
    },
  },
  closeDialog: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  dialogHeader: {
    flex: '0 0 auto',
    margin: 0,
    padding: 16,
  },
  dialogContent: {
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderRadius: 0,
    minHeight: 245,
  },

  borderLeft: {
    borderLeft: '2px solid #58cbff',
    marginLeft: 8,
    marginTop: 2,
    marginBottom: 2,
  },
  paddingLeft: {
    paddingLeft: 8,
  },
  borderTop: {
    borderTop: '1px solid #ececec',
  },
  red: {
    color: 'red',
  },
  dayDiff: {
    color: 'red',
  },
  time: {
    fontSize: 18,
    fontWeight: 400,
  },
  header: {
    background: '#f6f8fa',
    margin: -4,
    boxShadow: '0 0px 3px 0px #607D8B',
  },
  gray: {
    color: '#5f6368',
    fontSize: 14,
  },
  map: {
    width: '100%',
    height: 120,
  },
  marginTop16: {
    marginTop: 16,
  },

  marker: {
    borderRadius: '50%',
    background: 'white',
    transform: 'translate(-50%, -50%)',
    width: 22,
    height: 23,
    paddingLeft: 1,
    paddingTop: 2,
    boxShadow: '0 1px 5px 1px #5d5d5d',
  },

  heading: {
    background: '#f6f6f6',
    paddingLeft: 8,
  },

  rte: {
    padding: 8,
    margin: -4,
    minHeight: 70,
    borderTop: 'none',
  },
});

const useStyles = makeStyles(styles);
/* eslint-disable no-param-reassign,no-return-assign */
function CloneMarketTemplate(props) {
  const [, dispatchCtx] = useMarketplaceContext();
  const [state, setState] = useImmer({
    sourceId: 0,
    sourceOrgId: 0,
    loading: false,
  });

  useEffect(() => {
    if (props.adminAboveOrgLists && props.adminAboveOrgLists.length > 0) {
      setState(draft => {
        // eslint-disable-next-line no-param-reassign
        draft.sourceId = props.adminAboveOrgLists[0].rootNodeId;
        draft.sourceOrgId = props.adminAboveOrgLists[0].id
          ? props.adminAboveOrgLists[0].id
          : -1;
      });
    }
  }, []);
  const { smDown, adminAboveOrgLists, category, id } = props;
  const classes = useStyles();

  const handleValidSubmit = () => {
    setState(draft => {
      // eslint-disable-next-line no-param-reassign
      draft.loading = true;
    });
    let payload;
    if (category === 'checklist') {
      payload = {
        id,
        data: {
          filter: 'checklist',
          parentNodeId: state.sourceId,
        },
      };
    } else {
      payload = {
        id,
        data: {
          ignoreTypes: [],
          includeEvents: true,
          parentNodeId: state.sourceId,
        },
      };
    }
    props.resaga.dispatchTo(MARKET_API, USE_TEMPLATE, {
      payload,
      onSuccess: props.cb({
        orgId: state.sourceOrgId,
        sourceId: state.sourceId,
        category: props.category,
      }),
    });
    dispatchCtx.setNewlyAppliedTemplateRedirectUrl('pending');
    PORTAL_HELPERS.close(props);
  };
  const handleCloseDialog = () => PORTAL_HELPERS.close(props);
  const orgLists = () => {
    let filterOrgLists = adminAboveOrgLists;
    if (props.category === Category.CheckList) {
      filterOrgLists = adminAboveOrgLists.filter(o => o.role !== 'member');
    }
    const data = filterOrgLists.map(o => ({
      children: `${o.name} (${o.role})`,
      value: o.rootNodeId,
    }));
    // add the person account
    data.push({
      children: `${props.user.knownAs} (Personal)`,
      value: props.user.rootnodeid,
    });
    return data;
  };

  const mobileProps = LOGIC_HELPERS.ifElse(
    smDown,
    {
      fullScreen: true,
      TransitionComponent: Slide,
      TransitionProps: { direction: 'up' },
    },
    {},
  );

  const handleChangeOrgs = data => {
    const rootNodeId = parseInt(data, 10);
    const d = props.adminAboveOrgLists.find(o => o.rootNodeId === rootNodeId);
    setState(draft => {
      draft.sourceId = parseInt(data, 10);
      draft.sourceOrgId = d ? d.id : -1;
    });
  };

  return (
    <JDialog
      maxWidth="xs"
      open
      loading={state.loading}
      disabled={false}
      fullWidth
      onValidSubmit={handleValidSubmit}
      onButtonClose={handleCloseDialog}
      header={<JText xl>Use this Template</JText>}
      notesTextWrap={false}
      notes="Please choose in which organisation you would like to use this template"
      {...mobileProps}
    >
      <GridContainer spacing={3}>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer direction="column">
            <GridItem>
              <GridContainer alignItems="center" className={classes.heading}>
                <GridItem xs={12} sm={12} md={12}>
                  <Select
                    name="iconOverride"
                    label="Organisations"
                    options={orgLists()}
                    onChange={handleChangeOrgs}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </JDialog>
  );
}

CloneMarketTemplate.propTypes = {
  user: PropTypes.object,
  category: PropTypes.string,
  id: PropTypes.number,
  adminAboveOrgLists: PropTypes.array,
  smDown: PropTypes.bool,
  cb: PropTypes.func,
  resaga: PropTypes.object,
};

CloneMarketTemplate.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  adminAboveOrgLists: makeSelectOrgLists,
  user: makeSelectUserPersonAccount,
});

export default compose(
  connect(
    mapStateToProps,
    null,
  ),
  resaga(CONFIG),
  withSMDown,
)(React.memo(CloneMarketTemplate));
