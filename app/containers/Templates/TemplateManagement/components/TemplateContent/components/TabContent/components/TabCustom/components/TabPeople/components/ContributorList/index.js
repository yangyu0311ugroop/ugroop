import { ability } from 'apis/components/Ability/ability';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React from 'react';
import People from 'containers/Templates/Modals/ShareList/components/People';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { NODE_SHARE } from 'utils/modelConstants';
import P from 'viewComponents/Typography';
import { DEFAULT, PEOPLE_TAB_OPTIONS } from 'appConstants';
import { useSelector } from 'react-redux';
import Invitation from './components/Invitation';
import styles from './styles';
import { makeStyles } from '../../../../../../../../../../../../../components/material-ui';
import { makeSingleSelect } from '../../../../../../../../../../../../../datastore/selectUtility';
import {
  CustomDataOrgId,
  NODE_STORE_RESELECTORS,
} from '../../../../../../../../../../../../../datastore/nodeStore/selectorsViaConnect';
import { TEMPLATE_VIEWSTORE_RESELECTORS } from '../../../../../../../../../../../../../datastore/templateManagementStore/selectorsViaConnect';
const useStyles = makeStyles(styles);
function ContributorList(props) {
  const { templateId } = props;
  const classes = useStyles();
  const orgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: CustomDataOrgId,
    }),
  );

  const peopleTabOptionSelected = useSelector(store =>
    makeSingleSelect(TEMPLATE_VIEWSTORE_RESELECTORS.getTemplateViewStoreKey)(
      store,
      {
        key: 'shareList.filter',
      },
    ),
  );

  const getTabSelected = () =>
    LOGIC_HELPERS.switchCase(peopleTabOptionSelected, {
      [PEOPLE_TAB_OPTIONS.ONLY_ORGANISERS]: 'Organisers',
      [PEOPLE_TAB_OPTIONS.ONLY_VIEWERS]: 'Viewers',
      [PEOPLE_TAB_OPTIONS.ONLY_CONTRIBUTORS]: 'Collaborators',
      [DEFAULT]: 'All Contributors',
    });

  const renderDefault = () => {
    const invitation = LOGIC_HELPERS.ifElse(
      ability.can('execute', { type: NODE_SHARE }),
      <Invitation showIcon={false} />,
      null,
    );

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer
            justify="space-between"
            alignItems="center"
            card
            spacing={1}
            noWrap
            className={classes.noWrap}
          >
            <GridItem>
              <GridContainer noWrap className={classes.noWrap}>
                <GridItem>
                  <P dense color="gray">
                    Contributors:
                  </P>
                </GridItem>
                <GridItem>
                  <P dense weight="bold" color="black">
                    {getTabSelected()}
                  </P>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>{invitation}</GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <GridContainer card className={classes.root}>
            <GridItem xs={12}>
              <People id={templateId} orgId={orgId} />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  return renderDefault();
}

ContributorList.propTypes = {
  variant: PropTypes.string,
  templateId: PropTypes.number,
};

ContributorList.defaultProps = {};

export default React.memo(ContributorList);
