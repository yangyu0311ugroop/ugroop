import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { PERSON_PROFILE_VIEW_STORE } from 'containers/Profile/components/Person/constants';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import resaga from 'resaga';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import PhoneList from 'smartComponents/Person/components/Phones';
import Dietaries from 'smartComponents/Person/parts/Dietaries';
import { GENDER_OPTIONS } from 'smartComponents/Person/parts/Gender/constants';
import Medicals from 'smartComponents/Person/parts/Medicals';
import InsurancePolicies from 'smartComponents/Person/parts/InsurancePolicies';
import ProfilePhoto from 'smartComponents/Person/parts/Photo';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { STRING_HELPERS } from 'utils/stringAdditions';
import { VARIANTS } from 'variantsConstants';
import JButton from 'viewComponents/Button/variants/JButton';
import Birthday from './components/Birthday';
import DietaryRequirements from './components/DietaryRequirements';
import Email from './components/Email';
import Gender from './components/Gender';
import InsurancePolicy from './components/InsurancePolicy';
import MedicalConditions from './components/MedicalConditions';
import Name from './components/Name';
import Password from './components/Password';
import Phones from './components/Phones';
import { CONFIG } from './config';
import styles from './styles';

const breadcrumbNameMap = {
  photo: 'Photo',
  name: 'Name',
  birthday: 'Birthday',
  gender: 'Gender',
  password: 'Password',
  email: 'Email',
  phones: 'Phones',
  'insurance-policy': 'Insurance Policy',
  'medical-conditions': 'Medical Conditions',
  'dietary-requirements': 'Dietary Requirements',
};

export class PersonalInfo extends PureComponent {
  componentWillMount = () => {
    this.personPhotoProps = {
      variant: VARIANTS.EDITABLE,
      size: IMAGE_SIZES_CONSTANTS.MEDIUM,
    };
  };

  renderListItem = ({
    subnav,
    heading,
    content,
    body,
    extras = <Icon size="normal" icon="lnr-chevron-right" />,
    divider = true,
  } = {}) => {
    const { classes, match, smDown } = this.props;

    return (
      <ListItem
        button={!!subnav}
        onClick={LOGIC_HELPERS.ifElse(
          subnav,
          URL_HELPERS.goToUrl(`${match.url}/${subnav}`, this.props),
        )}
        divider={divider}
        className={classes.padding}
      >
        <GridContainer direction="column" spacing={1}>
          <GridItem>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem className={classes.grow}>
                <GridContainer
                  direction={LOGIC_HELPERS.ifElse(smDown, 'column', 'row')}
                  spacing={0}
                >
                  {heading && (
                    <GridItem className={classnames(!smDown, classes.left)}>
                      <JText bold gray sm uppercase>
                        {heading}
                      </JText>
                    </GridItem>
                  )}
                  {content && <GridItem xs>{content}</GridItem>}
                </GridContainer>
              </GridItem>
              {extras && <GridItem>{extras}</GridItem>}
            </GridContainer>
          </GridItem>
          {body && <GridItem>{body}</GridItem>}
        </GridContainer>
      </ListItem>
    );
  };

  renderPhotoExtras = () => {
    const { smDown, userId } = this.props;

    if (smDown) return null;

    return (
      <ProfilePhoto id={userId} editable resizeSize={240} resizeSide="width" />
    );
  };

  renderPhotoBody = () => {
    const { smDown, userId } = this.props;

    if (!smDown) return null;

    return (
      <GridContainer alignItems="center" direction="column" spacing={0}>
        <GridItem>
          <ProfilePhoto
            id={userId}
            editable
            resizeSize={240}
            resizeSide="width"
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderNameContent = () => {
    const { firstName, lastName, knownAs } = this.props;

    const fullName = `${firstName} ${lastName}`;

    return (
      <GridContainer direction="column" spacing={1}>
        <GridItem>
          <JText bold dark nowrap={false} capitalize>
            {knownAs}
          </JText>
        </GridItem>
        {fullName !== knownAs && (
          <GridItem>
            <JText dark nowrap={false} capitalize>
              {firstName} {lastName}
            </JText>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderBirthDate = () => {
    const { birthDate } = this.props;

    if (!birthDate) return null;

    const birthDay = moment.utc(birthDate);

    const ms = moment.utc().diff(birthDay);
    const duration = moment.duration(ms);

    const years = duration.years();
    const months = duration.months();

    const age = LOGIC_HELPERS.ifElse(
      years > 0,
      `${years} ${STRING_HELPERS.pluralise('year', years)} old`,
      `${months} ${STRING_HELPERS.pluralise('month', months)} old`,
    );

    return (
      <GridItem>
        <GridContainer alignItems="center">
          <GridItem>
            <JText bold dark>
              {birthDay.format('D MMMM YYYY')}
            </JText>
          </GridItem>
          <GridItem>
            <JText gray>({age})</JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderBirthDayContent = () => {
    const { birthDate, birthPlace } = this.props;

    if (!birthDate && !birthPlace) return null;

    return (
      <GridContainer direction="column" spacing={1}>
        {this.renderBirthDate()}
        {birthPlace && (
          <GridItem>
            <JText dark>From {birthPlace}</JText>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderProfile = () => {
    const { gender } = this.props;

    return (
      <GridItem>
        <GridContainer card highlight direction="column" spacing={2}>
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <JText dark lg>
                  Profile
                </JText>
              </GridItem>
              <GridItem>
                <JText gray nowrap={false}>
                  Some info may be visible to other people using uGroop.
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <List component="nav">
              {this.renderListItem({
                heading: 'Photo',
                content: (
                  <JText gray nowrap={false}>
                    A photo helps personalise your account
                  </JText>
                ),
                extras: this.renderPhotoExtras(),
                body: this.renderPhotoBody(),
              })}
              {this.renderListItem({
                subnav: 'name',
                heading: 'Name',
                content: this.renderNameContent(),
              })}
              {this.renderListItem({
                subnav: 'birthday',
                heading: 'Birthday',
                content: this.renderBirthDayContent(),
              })}
              {this.renderListItem({
                subnav: 'gender',
                heading: 'Gender',
                content: (
                  <JText bold dark capitalize>
                    {
                      GENDER_OPTIONS[
                        LOGIC_HELPERS.ifElse(gender, gender, 'unknown')
                      ]
                    }
                  </JText>
                ),
              })}
              {this.renderListItem({
                subnav: 'password',
                heading: 'Password',
                content: (
                  <JText bold dark>
                    ********
                  </JText>
                ),
                divider: false,
              })}
            </List>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderEmailContent = () => {
    const { email, secondaryEmail } = this.props;

    return (
      <GridContainer direction="column" spacing={1}>
        <GridItem>
          <JText bold dark>
            {email}
          </JText>
        </GridItem>
        {secondaryEmail && (
          <GridItem>
            <JText dark>{secondaryEmail}</JText>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderContact = () => {
    const { userId } = this.props;

    return (
      <GridItem>
        <GridContainer card highlight direction="column" spacing={2}>
          <GridItem>
            <JText dark lg>
              Contact info
            </JText>
          </GridItem>
          <GridItem>
            <List component="nav">
              {this.renderListItem({
                subnav: 'email',
                heading: 'Email',
                content: this.renderEmailContent(),
              })}
              {this.renderListItem({
                subnav: 'phones',
                heading: 'Phones',
                content: (
                  <GridContainer direction="column" spacing={1}>
                    <PhoneList
                      id={userId}
                      viewStore={PERSON_PROFILE_VIEW_STORE}
                      variant={VARIANTS.LIST_ONLY}
                      showSimple
                      component={GridItem}
                    />
                  </GridContainer>
                ),
                divider: false,
              })}
            </List>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderInsuranceContent = () => {
    const { insurancePolicy } = this.props;

    if (!insurancePolicy) return null;

    return (
      <JText bold dark capitalize>
        {insurancePolicy}
      </JText>
    );
  };

  renderOthers = () => {
    const { personId } = this.props;

    return (
      <GridItem>
        <GridContainer card highlight direction="column" spacing={2}>
          <GridItem>
            <JText dark lg>
              Health records
            </JText>
          </GridItem>
          <GridItem>
            <List component="nav">
              {this.renderListItem({
                subnav: 'insurance-policy',
                heading: 'Insurance Policy',
                content: (
                  <InsurancePolicies
                    id={personId}
                    variant={VARIANTS.TEXT_ONLY}
                  />
                ),
              })}
              {this.renderListItem({
                subnav: 'medical-conditions',
                heading: 'Medical Conditions',
                content: (
                  <Medicals id={personId} variant={VARIANTS.TEXT_ONLY} />
                ),
              })}
              {this.renderListItem({
                subnav: 'dietary-requirements',
                heading: 'Dietary Requirements',
                divider: false,
                content: (
                  <Dietaries id={personId} variant={VARIANTS.TEXT_ONLY} />
                ),
              })}
            </List>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderPersonalInfo = () => {
    const { classes } = this.props;

    return (
      <div className={classes.offsetGrid}>
        <GridContainer direction="column" spacing={4}>
          <GridItem>
            <GridContainer direction="column" spacing={0} alignItems="center">
              <GridItem>
                <JText xl dark>
                  Personal Info
                </JText>
              </GridItem>
              <GridItem className={classes.textCenter}>
                <JText gray nowrap={false}>
                  Basic info, like your name and photo, that you use on uGroop
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.renderProfile()}
          {this.renderContact()}
          {this.renderOthers()}
        </GridContainer>
      </div>
    );
  };

  renderBreadcrumbs = () => {
    const { location } = this.props;

    const pathnames = location.pathname.split('/');
    if (pathnames.length < 4) return null;

    const lastItem = pathnames.pop();
    const goBack = pathnames.join('/');

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={1} wrap="nowrap">
          <GridItem>
            <JButton onClick={URL_HELPERS.goToUrl(goBack, this.props)}>
              <Icon icon="lnr-arrow-left" size="normal" />
            </JButton>
          </GridItem>
          <GridItem>
            <JText dark xl>
              {breadcrumbNameMap[lastItem]}
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderName = routeProps => (
    <Name {...routeProps} userId={this.props.userId} />
  );

  renderBirthday = routeProps => (
    <Birthday {...routeProps} userId={this.props.userId} />
  );

  renderGender = routeProps => (
    <Gender {...routeProps} userId={this.props.userId} />
  );

  renderPassword = routeProps => (
    <Password {...routeProps} userId={this.props.userId} />
  );

  renderEmail = routeProps => (
    <Email {...routeProps} userId={this.props.userId} />
  );

  renderPhones = routeProps => (
    <Phones {...routeProps} userId={this.props.userId} />
  );

  renderInsurancePolicy = routeProps => (
    <InsurancePolicy {...routeProps} userId={this.props.userId} />
  );

  renderMedicalConditions = routeProps => (
    <MedicalConditions {...routeProps} userId={this.props.userId} />
  );

  renderDietaryRequirements = routeProps => (
    <DietaryRequirements {...routeProps} userId={this.props.userId} />
  );

  render = () => {
    const { classes, match } = this.props;

    return (
      <div className={classes.root}>
        <GridContainer direction="column" spacing={1}>
          {this.renderBreadcrumbs()}

          <GridItem>
            <Switch>
              <Route path={`${match.url}/name`} render={this.renderName} />
              <Route
                path={`${match.url}/birthday`}
                render={this.renderBirthday}
              />
              <Route path={`${match.url}/gender`} render={this.renderGender} />
              <Route
                path={`${match.url}/password`}
                render={this.renderPassword}
              />
              <Route path={`${match.url}/email`} render={this.renderEmail} />
              <Route path={`${match.url}/phones`} render={this.renderPhones} />
              <Route
                path={`${match.url}/insurance-policy`}
                render={this.renderInsurancePolicy}
              />
              <Route
                path={`${match.url}/medical-conditions`}
                render={this.renderMedicalConditions}
              />
              <Route
                path={`${match.url}/dietary-requirements`}
                render={this.renderDietaryRequirements}
              />

              <Route path="*" render={this.renderPersonalInfo} />
            </Switch>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

PersonalInfo.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  userId: PropTypes.number,

  // resaga props
  personId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  knownAs: PropTypes.string,
  gender: PropTypes.string,
  birthDate: PropTypes.string,
  birthPlace: PropTypes.string,
  email: PropTypes.string,
  secondaryEmail: PropTypes.string,
  insurancePolicy: PropTypes.string,
};

PersonalInfo.defaultProps = {
  firstName: '',
  lastName: '',
  knownAs: '',
  gender: 'unknown',
};

export default compose(
  withStyles(styles, { name: 'PersonalInfo' }),
  withSMDown,
  resaga(CONFIG),
)(PersonalInfo);
