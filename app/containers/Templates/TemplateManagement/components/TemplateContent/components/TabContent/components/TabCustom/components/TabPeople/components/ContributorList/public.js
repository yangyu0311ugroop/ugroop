import React from 'react';
import { useSelector } from 'react-redux';
import GridContainer from '../../../../../../../../../../../../../components/GridContainer';
import GridItem from '../../../../../../../../../../../../../components/GridItem';
import { makeStyles } from '../../../../../../../../../../../../../components/material-ui';
import styles from './styles';
import { makeSingleSelect } from '../../../../../../../../../../../../../datastore/selectUtility';
import {
  CustomDataOrgId,
  NODE_STORE_RESELECTORS,
} from '../../../../../../../../../../../../../datastore/nodeStore/selectorsViaConnect';
import PeoplePublic from '../../../../../../../../../../../Modals/ShareList/components/People/peoplepublic';
const useStyles = makeStyles(styles);
function ContributorPublicList(props) {
  const { templateId } = props;
  const classes = useStyles();
  const orgId = useSelector(store =>
    makeSingleSelect(NODE_STORE_RESELECTORS.selectNodeAttribute)(store, {
      id: templateId,
      attribute: CustomDataOrgId,
    }),
  );

  const renderPublicView = () => (
    <GridContainer direction="column">
      <GridItem>
        <GridContainer card className={classes.root}>
          <GridItem xs={12}>
            <PeoplePublic
              id={templateId}
              orgId={orgId}
              selectedRole={['tour_organizer']}
              containerDirection="row"
            />
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
  return renderPublicView();
}

export default ContributorPublicList;
