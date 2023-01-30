import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { Text } from 'ugcomponents/Inputs';
import Form from 'ugcomponents/Form';
import Button from 'viewComponents/Button';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { DO_NOTHING } from 'appConstants';
import { GET_PERSON, TEMPLATE_API } from 'apis/constants';
import { CONFIG, CONFIG2 } from './config';
import styles from './styles';
import inputs from './inputs';
import utils from './utils';

export class TransferByEmail extends PureComponent {
  componentWillMount = () => {
    const { myEmail, ownerEmail } = this.props;
    this.validations = {
      isEmail: true,
      inviteYourself: utils.inviteYourself(myEmail),
      transToOwner: utils.transToOwner(ownerEmail),
    };
  };

  handleValid = () => DO_NOTHING;

  handleInvalidSubmit = () => DO_NOTHING;

  getPersonSuccess = ({ inviteeId }, result) => {
    this.props.resaga.setValue({
      transferToEmail: result.email,
      transferToUserId: inviteeId,
    });
  };

  handleFetchEmailInfo = ({ email }) => {
    const { id } = this.props;

    if (email) {
      return this.props.resaga.dispatchTo(TEMPLATE_API, GET_PERSON, {
        payload: { email, id },
        onSuccess: this.getPersonSuccess,
      });
    }

    return DO_NOTHING;
  };

  renderFindBuntton = () => (
    <GridItem>
      <Button
        type="submit"
        dense
        size="small"
        color="primary"
        loading={this.props.fetching}
      >
        Find
      </Button>
    </GridItem>
  );

  renderInvite = () => {
    const { classes } = this.props;
    return (
      <GridContainer direction="column">
        <GridItem>
          <Form
            onValid={this.handleValid}
            onValidSubmit={this.handleFetchEmailInfo}
            onInvalidSubmit={this.handleInvalidSubmit}
          >
            <GridContainer direction="column" className={classes.root}>
              <GridItem xs={12}>
                <Text {...inputs.EMAIL} validations={this.validations} />
              </GridItem>
              <GridItem>
                <GridContainer direction="row">
                  {this.renderFindBuntton()}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </Form>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => <React.Fragment>{this.renderInvite()}</React.Fragment>;
}

TransferByEmail.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  myEmail: PropTypes.string,
  fetching: PropTypes.bool,
  // parent props
  email: PropTypes.string,
  userId: PropTypes.number,
  id: PropTypes.number,
  // resaga
  ownerEmail: PropTypes.string,
};

TransferByEmail.defaultProps = {
  email: '',
  userId: 0,
  fetching: false,
};

export default compose(
  withStyles(styles, { name: 'TransferByEmail' }),
  resaga(CONFIG),
  resaga(CONFIG2),
)(TransferByEmail);
