import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Form, { TextField } from 'ugcomponents/Form';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ACTIVITY, DAY } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import { isEmptyString } from 'utils/stringAdditions';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { CONFIG } from './config';
import styles from './styles';

export class Heading extends PureComponent {
  state = {
    collapsed: false,
  };

  componentWillMount = () => {
    const { type, createdBy } = this.props;

    this.node = { type, createdBy };
  };

  startEditing = () => {
    this.setState({ edit: true });
  };

  finishEditing = () => {
    this.setState({ edit: false });
  };

  clearHeading = () => {
    this.handleUpdateHeading({ heading: '', subheading: '' });
  };

  handleUpdateHeading = customData => {
    const { id, type } = this.props;

    const node = {
      customData,
      type,
    };

    if (id) {
      return NODE_API_HELPERS.updateNode(
        {
          nodeId: id,
          node,
          onSuccess: this.finishEditing,
          onError: this.finishEditing,
        },
        this.props,
      );
    }

    return false;
  };

  canAddHeading = () => {
    const { type, editable, editing } = this.props;

    if (!editable && !editing) return false;

    return (
      ability.can('update', this.node) && [ACTIVITY, DAY].indexOf(type) !== -1
    );
  };

  renderSaveCancelButton = () => {
    const { typeLabelHeader } = this.props;
    return (
      <GridContainer alignItems="center">
        <GridItem>
          <Button
            size="extraSmall"
            dense
            square
            color="alert"
            onClick={this.clearHeading}
          >
            Clear {typeLabelHeader} Heading
          </Button>
        </GridItem>
        <GridItem xs />
        <GridItem>
          <Button
            color="primary"
            type="submit"
            size="extraSmall"
            dense
            square
            iconButton
            icon="check"
          />
        </GridItem>
        <GridItem>
          <Button
            size="extraSmall"
            dense
            square
            color="gray"
            onClick={this.finishEditing}
            iconButton
            icon="cross"
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderForm = () => {
    const { heading, subheading, cardFormStyle, typeLabelHeader } = this.props;

    const HEADING = {
      id: 'heading',
      name: 'heading',
      label: isEmptyString(typeLabelHeader)
        ? 'Heading'
        : `${typeLabelHeader} Heading`,
      type: 'text',
      required: true,
      autoFocus: true,
    };
    const SUB_HEADING = {
      id: 'subheading',
      name: 'subheading',
      label: 'Short description (optional)',
      type: 'text',
    };

    return (
      <Form onValidSubmit={this.handleUpdateHeading}>
        <GridContainer direction="column" className={cardFormStyle}>
          <GridItem>
            <TextField {...HEADING} value={heading} />
          </GridItem>
          <GridItem>
            <TextField {...SUB_HEADING} value={subheading} />
          </GridItem>
          <GridItem>{this.renderSaveCancelButton()}</GridItem>
        </GridContainer>
      </Form>
    );
  };

  renderEmpty = () => {
    const { classes, xs, typeLabelHeader } = this.props;

    if (xs) return null;

    if (!this.canAddHeading()) return null;

    return (
      <GridContainer alignItems="center">
        <GridItem xs />
        <GridItem>
          <Button
            block
            dense
            noPadding
            size="extraSmall"
            color="black"
            textAlign="left"
            variant={VARIANTS.BORDERLESS}
            className={classnames(classes.editableButton, classes.marginTop)}
            onClick={this.startEditing}
          >
            <i>Add a {typeLabelHeader} Heading</i>
          </Button>
        </GridItem>
        <GridItem xs />
      </GridContainer>
    );
  };

  renderHeading = () => {
    const { classes, heading, subheading, xs, type } = this.props;
    const { collapsed } = this.state;

    return (
      <GridContainer
        direction="column"
        className={classnames(
          classes.root,
          LOGIC_HELPERS.ifElse(!xs, classes.normal),
        )}
        spacing={0}
      >
        <GridItem>
          <div
            className={classnames(
              classes.title,
              LOGIC_HELPERS.ifElse(
                [xs, type === ACTIVITY],
                classes.titleXs,
                undefined,
                true,
              ),
              LOGIC_HELPERS.ifElse(collapsed, classes.titleCollapsed),
            )}
          >
            {heading}
          </div>
        </GridItem>
        {!xs && subheading && (
          <GridItem>
            <div className={classes.description}>{subheading}</div>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  render = () => {
    const {
      classes,
      heading,
      xs,
      first,
      children,
      className,
      component: Component,
      noHeading,
      smDown,
    } = this.props;
    const { edit } = this.state;

    if (noHeading) return null;

    const marginTop = LOGIC_HELPERS.ifElse(
      xs,
      classes.marginTopXs,
      classes.marginTop,
    );

    const classNames = classnames(
      LOGIC_HELPERS.ifElse([heading, !first], marginTop),
      className,
    );

    let renderHeading;

    if (edit) {
      renderHeading = this.renderForm();
    } else if (!heading) {
      renderHeading = this.renderEmpty();

      if (!renderHeading) return null;
    } else if (!this.canAddHeading()) {
      renderHeading = (
        <div className={classnames(classNames)}>{this.renderHeading()}</div>
      );
    } else {
      renderHeading = (
        <div className={classnames(classNames)}>
          <Button
            block
            dense
            noPadding
            size="extraSmall"
            color="black"
            textAlign="left"
            variant={VARIANTS.BORDERLESS}
            className={classnames(classes.editableButton)}
            onClick={this.startEditing}
          >
            <GridContainer alignItems="center">
              <GridItem xs>{this.renderHeading()}</GridItem>
              <GridItem>
                <div className={classes.icon}>
                  <Icon icon="lnr-pencil" size="xsmall" />
                </div>
              </GridItem>
            </GridContainer>
          </Button>
        </div>
      );
    }

    if (Component) {
      renderHeading = (
        <Component
          className={
            smDown ? classes.marginTopHeaderXS : classes.marginTopHeader
          }
        >
          {renderHeading}
        </Component>
      );
    }

    return LOGIC_HELPERS.ifFunction(children, [renderHeading], renderHeading);
  };
}

Heading.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  xs: PropTypes.bool,
  editing: PropTypes.bool,
  id: PropTypes.number,
  children: PropTypes.func,

  // custom props
  noHeading: PropTypes.bool,
  first: PropTypes.bool,
  className: PropTypes.string,
  component: PropTypes.any,

  // resaga props
  editable: PropTypes.bool,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  type: PropTypes.string,
  createdBy: PropTypes.bool,
  cardFormStyle: PropTypes.string,
  typeLabelHeader: PropTypes.string,
  smDown: PropTypes.bool,
};

Heading.defaultProps = {
  typeLabelHeader: '',
};

export default compose(
  withStyles(styles, { name: 'Heading' }),
  resaga(CONFIG),
  withSMDown,
)(Heading);
