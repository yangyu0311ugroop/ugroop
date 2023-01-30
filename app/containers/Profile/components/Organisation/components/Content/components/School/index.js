import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
// import { Helmet } from 'react-helmet';
import { URL_HELPERS } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ORGANISATION_SETTING } from 'utils/modelConstants';
import { ability } from 'apis/components/Ability/ability';
import { VARIANTS } from 'variantsConstants';
// parts

import { Route, Switch, withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classnames from 'classnames';

import JButton from 'viewComponents/Button/variants/JButton';
import Icon from 'ugcomponents/Icon';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import SchoolGender from 'smartComponents/Organisation/parts/Details/parts/SchoolGender';
import SchoolType from 'smartComponents/Organisation/parts/Details/parts/SchoolType';

// input
import GenderField from './components/Gender';
import TypeField from './components/Type';
import { CONFIG } from './config';
import styles from './styles';

const breadcrumbNameMap = {
  type: 'SchoolType',
  gender: 'School Gender',
};

export class School extends PureComponent {
  renderBreadcrumbs = () => {
    const { location } = this.props;

    const pathnames = location.pathname.split('/');
    if (pathnames.length < 6) return null;

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

  hasAccess = () => ability.can('execute', ORGANISATION_SETTING);

  renderListItem = ({
    subnav,
    heading,
    content,
    body,
    extras = LOGIC_HELPERS.ifElse(
      this.hasAccess(),
      <Icon size="normal" icon="lnr-chevron-right" />,
      <Icon size="normal" icon="lnr-lock" />,
    ),
    divider = true,
  } = {}) => {
    const { classes, match, smDown } = this.props;

    return (
      <ListItem
        button={!!subnav && this.hasAccess()}
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

  renderTypeContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <SchoolType
            id={this.props.detailsId}
            variant={VARIANTS.STRING_ONLY}
          />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderGenderContent = () => (
    <GridContainer direction="column" spacing={1}>
      <GridItem>
        <JText bold dark nowrap={false}>
          <SchoolGender
            id={this.props.detailsId}
            variant={VARIANTS.STRING_ONLY}
            simple
          />
        </JText>
      </GridItem>
    </GridContainer>
  );

  renderSchool = () => (
    <GridItem>
      <GridContainer card highlight direction="column" spacing={2}>
        <GridItem>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <JText dark lg>
                School
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
              subnav: 'type',
              heading: 'School Type',
              content: this.renderTypeContent(),
            })}
            {this.renderListItem({
              subnav: 'gender',
              heading: 'School Gender',
              content: this.renderGenderContent(),
            })}
          </List>
        </GridItem>
      </GridContainer>
    </GridItem>
  );

  renderSchoolInfo = () => {
    const { classes } = this.props;

    return (
      <div className={classes.offsetGrid}>
        <GridContainer direction="column" spacing={4}>
          <GridItem>
            <GridContainer direction="column" spacing={0} alignItems="center">
              <GridItem>
                <JText xl dark>
                  School
                </JText>
              </GridItem>
              <GridItem className={classes.textCenter}>
                <JText gray nowrap={false}>
                  Basic info to know more about your school
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
          {this.renderSchool()}
        </GridContainer>
      </div>
    );
  };

  renderType = routeProps => (
    <TypeField
      {...routeProps}
      id={this.props.id}
      readOnly={!this.hasAccess()}
    />
  );

  renderGender = routeProps => (
    <GenderField
      {...routeProps}
      id={this.props.id}
      readOnly={!this.hasAccess()}
    />
  );

  render = () => {
    const { classes, match } = this.props;
    return (
      <div className={classes.root}>
        <GridContainer direction="column" spacing={1}>
          {this.renderBreadcrumbs()}
          <GridItem>
            <Switch>
              <Route path={`${match.url}/type`} render={this.renderType} />
              <Route path={`${match.url}/gender`} render={this.renderGender} />
              <Route path="*" render={this.renderSchoolInfo} />
            </Switch>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

School.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  id: PropTypes.number.isRequired,

  // resaga props
  detailsId: PropTypes.number,
};

School.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'School' }),
  withSMDown,
  withRouter,
  resaga(CONFIG),
)(School);
