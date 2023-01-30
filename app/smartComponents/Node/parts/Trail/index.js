import { DEFAULT, LINK, URL_HELPERS } from 'appConstants';
import classnames from 'classnames';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import UGLink from 'components/Link';
import TrailData from 'smartComponents/Node/logics/TrailData';
import Content from 'smartComponents/Node/parts/Content';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import styles from './styles';

export class Trail extends PureComponent {
  contentClassName = () => {
    const { classes, className } = this.props;

    return classnames(classes.default, className);
  };

  renderTemplate = id => {
    const { classes } = this.props;

    if (!id) {
      return null;
    }

    return <Content id={id} variant={LINK} linkClassName={classes.link} />;
  };

  renderTrailData = ({ dayId, dayIndex, templateId }) => {
    const { classes, showDayTrail } = this.props;
    const renderTemplate = this.renderTemplate(templateId);

    if (!dayId || !showDayTrail) {
      return (
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>{renderTemplate}</GridItem>
        </GridContainer>
      );
    }

    return (
      <GridContainer alignItems="center" spacing={0}>
        <GridItem>
          in&nbsp;
          {renderTemplate}
          :&nbsp;
          <UGLink
            to={`${URL_HELPERS.tours(
              templateId,
            )}?dayView=day&selectedDay=${dayId}`}
            className={classes.link}
          >
            Day {dayIndex}
          </UGLink>
        </GridItem>
      </GridContainer>
    );
  };

  renderDefault = () => {
    const { id } = this.props;

    if (!id) {
      return null;
    }

    return (
      <span className={this.contentClassName()}>
        <TrailData id={id}>{this.renderTrailData}</TrailData>
      </span>
    );
  };

  render = () => {
    const { variant } = this.props;

    // pass in your custom variant if you need a different UI rendering
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

Trail.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number,
  variant: PropTypes.node,
  className: PropTypes.string,
  showDayTrail: PropTypes.bool,

  // resaga props
};

Trail.defaultProps = {
  id: 0,
  variant: '',
  className: '',
  showDayTrail: true,
};

export default compose(withStyles(styles, { name: 'Trail' }))(Trail);
