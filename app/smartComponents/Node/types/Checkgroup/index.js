import { DEFAULT, OPTION, CHECK_INPUT, DOUBLE_CARD } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { Checkbox } from 'components/material-ui/index';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import { CONFIG } from './config';
import styles from './styles';
import Icon from '../../../../viewComponents/Icon';
import CheckGroupDoubleCard from './variants/DoubleCard';

export class Checkgroup extends PureComponent {
  gridProps = LOGIC_HELPERS.ifElse(
    this.props.minimise,
    { xs: 12 },
    { xs: 12, sm: 6, md: 4, lg: 3 },
  );

  renderBody = () => {
    const { renderBody } = this.props;

    return LOGIC_HELPERS.ifFunction(renderBody, [this.props, this.state]);
  };

  renderOption = () => {
    const { id, content } = this.props;

    return (
      <Fragment>
        <option disabled value={id}>
          {content}
        </option>
        {this.renderBody()}
      </Fragment>
    );
  };

  renderCheckOption = () => {
    const {
      id,
      content,
      selectedChecklists,
      onChange,
      classes,
      checklists,
    } = this.props;
    const checked = selectedChecklists.some(val => val.id === id);

    return (
      <GridContainer alignItems="right" wrap="nowrap" direction="column">
        <GridItem>
          <GridContainer alignItems="top" wrap="nowrap">
            <GridItem>
              <Checkbox
                noMargin
                name={id}
                label={content}
                color="default"
                checked={checked}
                onChange={onChange({
                  id,
                  label: content,
                  groupId: id,
                  checklists,
                })}
                disabled={!checklists.length}
                className={classes.checkBoxRoot}
                checkedIcon={<Icon size="small" icon="lnr-check-square" />}
                icon={<Icon size="small" icon="lnr-square" />}
              />
            </GridItem>
            <GridItem className={classes.contentVal}>{content}</GridItem>
          </GridContainer>
        </GridItem>
        <GridItem className={classes.content}>{this.renderBody()}</GridItem>
      </GridContainer>
    );
  };

  renderTableRow = () => null;

  renderDoubleCard = () => (
    <GridItem {...this.gridProps}>
      <CheckGroupDoubleCard {...this.props} />
    </GridItem>
  );

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [OPTION]: this.renderOption,
      [CHECK_INPUT]: this.renderCheckOption,
      [VARIANTS.TABLE]: this.renderTableRow,
      [DEFAULT]: this.renderBody,
      [DOUBLE_CARD]: this.renderDoubleCard,
    });
  };
}

Checkgroup.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderBody: PropTypes.func,
  variant: PropTypes.string,
  selectedChecklists: PropTypes.array,
  onChange: PropTypes.func,

  // resaga props
  content: PropTypes.string, // < use in renderBody
  checklists: PropTypes.array,
  minimise: PropTypes.bool,
  // isLoading
};

Checkgroup.defaultProps = {
  selectedChecklists: [],
  id: 0,
  variant: '',
  checklists: [],
  minimise: false,
};

export default compose(
  withStyles(styles, { name: 'Checkgroup' }),
  resaga(CONFIG),
)(Checkgroup);
