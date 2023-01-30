import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import classnames from 'classnames';
import TransferStatus from 'containers/Templates/Modals/TransferTourOwner/Components/TransferStatus';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  IMAGE_SIZES_CONSTANTS,
  IMAGE_VARIANTS_CONSTANTS,
} from 'smartComponents/File/types/Photo/constants';
import Name from 'smartComponents/Organisation/parts/Name';
import OrganisationPhoto from 'smartComponents/Organisation/parts/Photo';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import PersonPhoto from 'smartComponents/Person/parts/Photo';
import Headx from 'ugcomponents/Headx';
import PeopleLink from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/PeopleCard/components/PeopleLink';
import { VARIANTS } from 'variantsConstants';
import { TOUR_CONTRIBUTOR } from 'utils/modelConstants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import { pluralizeText } from 'utils/stringAdditions';
import Hr from 'components/Hr';
import { CONFIG } from './config';
import styles from './styles';

export class AboutCard extends PureComponent {
  componentWillMount = () => {
    this.personPhotoProps = {
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.SMALL,
    };
    this.photoProps = {
      shape: IMAGE_VARIANTS_CONSTANTS.SQUARE,
      variant: VARIANTS.READ_ONLY,
      size: IMAGE_SIZES_CONSTANTS.SMALL,
    };
  };

  renderOrganisation = () => {
    const { classes, organisationId, peopleTabIndex, createdBy } = this.props;

    return (
      <React.Fragment>
        <GridItem>
          <GridContainer alignItems="center" wrap="nowrap">
            <OrganisationPhoto
              id={organisationId}
              {...this.photoProps}
              component={GridItem}
            />
            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem className={classes.header}>
                  <Headx className={classes.orglabel}>Travel By</Headx>
                </GridItem>

                <GridItem>
                  <PeopleLink
                    peopleTabIndex={peopleTabIndex}
                    label="See All"
                    view={TOUR_CONTRIBUTOR}
                    filterView={{ peopleTabOptionSelected: 'allContributors' }}
                  >
                    <div
                      className={classnames('j-text-ellipsis', classes.tourBy)}
                    >
                      <Name
                        id={organisationId}
                        variant={VARIANTS.STRING_ONLY}
                      />
                    </div>
                  </PeopleLink>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <Hr half />
        <GridItem>
          <GridContainer wrap="nowrap">
            <GridItem
              className={classnames(classes.noPaddingRight, classes.orglabel)}
            >
              Organised by
            </GridItem>
            <GridItem>
              <PeopleLink
                peopleTabIndex={peopleTabIndex}
                label="See All"
                view={TOUR_CONTRIBUTOR}
              >
                <GridContainer wrap="nowrap">
                  <GridItem
                    className={classnames(
                      classes.title,
                      classes.name,
                      classes.noPaddingRight,
                    )}
                  >
                    <KnownAs id={createdBy} variant={VARIANTS.STRING_ONLY} />
                  </GridItem>
                  {this.peopleCount()}
                </GridContainer>
              </PeopleLink>
            </GridItem>
          </GridContainer>
        </GridItem>
      </React.Fragment>
    );
  };

  renderPersonal = () => {
    const { classes, createdBy, peopleTabIndex } = this.props;

    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem>
            <PersonPhoto id={createdBy} {...this.personPhotoProps} />
          </GridItem>
          <GridItem>
            <GridContainer direction="column" spacing={0} wrap="nowrap">
              <GridItem>
                <Headx xs className={classes.personalHeader}>
                  Personal travel by
                </Headx>
              </GridItem>
              <GridItem>
                <PeopleLink
                  peopleTabIndex={peopleTabIndex}
                  label="See All"
                  view={TOUR_CONTRIBUTOR}
                >
                  <GridContainer wrap="nowrap">
                    <GridItem
                      className={classnames(
                        classes.title,
                        classes.name,
                        classes.noPaddingRight,
                      )}
                    >
                      <KnownAs id={createdBy} variant={VARIANTS.STRING_ONLY} />
                    </GridItem>
                    {this.peopleCount()}
                  </GridContainer>
                </PeopleLink>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  peopleCount = () => {
    const { people, classes } = this.props;
    if (!people.length) return null;
    return (
      <GridItem className={classnames(classes.title, classes.noPaddingLeft)}>
        &nbsp;{`and ${people.length} ${pluralizeText('other', people.length)}`}
      </GridItem>
    );
  };

  render = () => {
    const { classes, organisationId, id } = this.props;

    return (
      <GridContainer
        card
        direction="column"
        wrap="nowrap"
        className={classes.root}
      >
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            {organisationId ? this.renderOrganisation() : this.renderPersonal()}
          </GridContainer>
        </GridItem>

        <TransferStatus id={id} />
      </GridContainer>
    );
  };
}

AboutCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  people: PropTypes.array,

  // parent props
  id: PropTypes.number, // template id

  // resaga props
  createdBy: PropTypes.number,
  organisationId: PropTypes.number,
  peopleTabIndex: PropTypes.number,
};

AboutCard.defaultProps = {
  people: [],
};

export default compose(
  withStyles(styles, { name: 'AboutCard' }),
  INVITATION_STORE_HOC.selectUserNodeUserIds({
    nodeIds: 'id',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
    outputProp: 'people',
  }),
  resaga(CONFIG),
)(AboutCard);
