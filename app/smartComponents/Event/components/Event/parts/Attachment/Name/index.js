import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { EVENT_ATTACHMENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HOC } from 'datastore/eventStore/hoc';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import last from 'lodash/last';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import styles from './styles';

export class Name extends PureComponent {
  renderTextOnly = () => {
    const { name } = this.props;
    return <span>{name}</span>;
  };

  renderProp = () => {
    const { name, children } = this.props;

    return LOGIC_HELPERS.ifFunction(children, [name]);
  };

  renderThumbnailDefault = () => {
    const { classes } = this.props;

    return (
      <div className={classes.eventIcon}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <div className={classes.eventHeight}>&nbsp;</div>
          </GridItem>
          <GridItem xs>
            <GridContainer direction="column">
              <GridItem>
                <Icon icon="lnr-paperclip" color="blue" />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  renderThumbnail = () => {
    const { classes, name } = this.props;

    if (!name) {
      return this.renderThumbnailDefault();
    }

    const fileExtension = last(name.split('.'));

    return (
      <div className={classes.eventIcon}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <div className={classes.eventHeight}>&nbsp;</div>
          </GridItem>
          <GridItem xs>
            <GridContainer direction="column">
              <GridItem>
                <JText uppercase gray lg ellipsis>
                  {fileExtension.substr(0, 4)}
                </JText>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [VARIANTS.THUMBNAIL]: this.renderThumbnail,
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

Name.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  variant: PropTypes.string,
  children: PropTypes.func,

  // resaga props
  name: PropTypes.string,
};

Name.defaultProps = {
  name: '',
  variant: '',
};

export default compose(
  withStyles(styles, { name: 'Name' }),
  EVENT_STORE_HOC.selectAttachmentProp({
    path: EVENT_ATTACHMENT_PATHS.name,
    outputProp: 'name',
  }),
)(Name);
