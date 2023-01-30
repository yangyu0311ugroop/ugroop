import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { ACTIVITY } from 'utils/modelConstants';
import AddSection from './components/AddSection';
import { CONFIG } from './config';
import styles from './styles';

export class Empty extends PureComponent {
  handleEditing = () => {
    this.props.resaga.setValue({
      editable: true,
    });
  };

  renderLoading = () => {
    const { classes } = this.props;
    return (
      <GridItem>
        <div className={classes.subTitle}>
          <LoadingText />
        </div>
      </GridItem>
    );
  };

  renderEmpty = () => {
    const { classes, id } = this.props;

    return (
      <GridItem>
        <GridContainer direction="column" alignItems="center">
          <GridItem>
            <GridContainer alignItems="center" spacing={2}>
              <GridItem>
                <Icon icon="lnr-papers" size="mediumXPlus" color="grey" />
              </GridItem>
              <GridItem>
                <Icon icon="lnr-map-marker" size="mediumXPlus" color="grey" />
              </GridItem>
              <GridItem>
                <Icon icon="lnr-link" size="mediumXPlus" color="grey" />
              </GridItem>
              <GridItem>
                <Icon icon="lnr-picture" size="mediumXPlus" color="grey" />
              </GridItem>
              <GridItem>
                <Icon icon="lnr-paperclip" size="mediumXPlus" color="grey" />
              </GridItem>
            </GridContainer>
          </GridItem>

          {ability.can('create', ACTIVITY) ? (
            <>
              <GridItem>
                <div className={classes.subTitle}>
                  Add a section to enter content, location, url, photo or
                  attachment
                </div>
              </GridItem>
              <GridItem>
                <AddSection parent={id} onSuccess={this.handleEditing} />
              </GridItem>
            </>
          ) : (
            <GridItem>
              <div className={classes.subTitle}>There are no sections yet</div>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { classes, fetching } = this.props;

    const content = fetching ? this.renderLoading() : this.renderEmpty();

    return (
      <GridContainer
        direction="column"
        alignItems="center"
        className={classes.root}
        spacing={2}
        card
        dashed
      >
        {content}
      </GridContainer>
    );
  };
}

Empty.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  fetching: PropTypes.bool,

  // resaga props
};

Empty.defaultProps = {
  fetching: false,
};

export default compose(
  withStyles(styles, { name: 'Empty' }),
  resaga(CONFIG),
)(Empty);
