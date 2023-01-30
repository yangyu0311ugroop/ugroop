import { GET_PASSPORTS_FACADE, PERSON_DETAIL_API } from 'apis/constants';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { PERSON_PROFILE_VIEW_STORE } from 'containers/Profile/components/Person/constants';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Helmet } from 'react-helmet';
import { PAGE_HELMETS } from 'appConstants';
import PassportList from 'smartComponents/Person/components/Passports';
import { CONFIG } from './config';
import styles from './styles';

export class Passports extends PureComponent {
  componentDidMount = () => {
    const { id } = this.props;
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, GET_PASSPORTS_FACADE, {
      payload: {
        userId: id,
      },
    });
  };

  render = () => {
    const { classes, id } = this.props;
    return (
      <GridContainer className={classes.root} justify="center" card>
        <Helmet
          title={PAGE_HELMETS.PASSPORTS}
          meta={[{ name: 'description', content: 'Description of Passports' }]}
        />
        <GridItem xs={12}>
          <GridContainer direction="column" className={classes.container}>
            <GridItem>
              <PassportList viewStore={PERSON_PROFILE_VIEW_STORE} id={id} />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}
/** <PassportList viewStore={PERSON_PROFILE_VIEW_STORE} id={id} /> * */
Passports.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,

  // resaga props
};

Passports.defaultProps = {
  id: 0,
};

export default compose(
  withStyles(styles, { name: 'Passports' }),
  resaga(CONFIG),
)(Passports);
