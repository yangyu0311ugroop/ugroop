import { withStyles } from '@material-ui/core/styles';
import { DO_NOTHING } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import DayHeader from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/Day/components/dayHeader';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Scroll, { scroller } from 'react-scroll';
import { compose } from 'redux';
import resaga from 'resaga';
import Heading from 'smartComponents/Node/parts/Heading';
import { scrollOptions, templateDayIdAnchor } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Checklists from 'smartComponents/Node/components/Checklists';
import { CONFIG } from './config';
import style from './style';

export class Day extends PureComponent {
  state = {
    showBorder: false,
  };

  componentWillMount() {
    this.title = this.props.content;
    this.description = this.props.description;
    this.url = this.props.url;
  }

  componentWillReceiveProps = nextProps => {
    const { selected } = this.props;
    // stop inline editing if the day is not selected
    if (selected && !nextProps.selected && nextProps.editing) {
      this.props.resaga.setValue({ editing: false });
    }

    // show border when start selecting
    if (!selected && nextProps.selected) {
      this.setState({ showBorder: true }, () => {
        this.hideBorder = setTimeout(this.handleHideBorder, 7000);
      });
    }
  };

  componentWillUnmount = () => {
    clearTimeout(this.hideBorder);
  };

  handleHideBorder = () => this.setState({ showBorder: false });

  onScroll = dayId =>
    scroller.scrollTo(templateDayIdAnchor(dayId), scrollOptions);

  onClickDay = () => {
    const { selected, dayId } = this.props;
    if (!selected) {
      this.dispatchSelectRow(dayId);
    }
  };

  dispatchSelectRow = dayId => {
    this.props.resaga.setValue({
      selectDayId: dayId,
    });
  };

  iconToggle = () => DO_NOTHING;

  renderDay = () => {
    const { id, classes, selected, dayId } = this.props;
    const { showBorder } = this.state;

    return (
      <GridContainer spacing={0}>
        <GridItem className={classes.grow}>
          <GridContainer
            elevation={2}
            spacing={0}
            direction="column"
            className={classnames(
              LOGIC_HELPERS.ifElse(
                [selected, showBorder],
                classes.highlightBorder,
              ),
            )}
          >
            <GridItem
              className={classnames(
                classes.day,
                classes.normalWidth,
                classes.paddingZero,
              )}
            >
              <Scroll.Element name={id}>
                <div id={`day${dayId}`}>
                  <Checklists
                    parentNodeId={dayId}
                    renderBlankSlate
                    showChecklists
                    editing
                    showEmpty
                    isLayoutView
                    iconToggle={this.iconToggle}
                    useExpandedState
                  />
                </div>
              </Scroll.Element>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  renderHeading = () => {
    const { index, dayId } = this.props;

    return (
      <Heading
        id={dayId}
        editing={false}
        editable={false}
        component={GridItem}
        first={index === 0}
      />
    );
  };

  render = () => {
    const { index, dayId, classes, tabId, marginLeft } = this.props;

    const refId = templateDayIdAnchor(dayId);
    return (
      <Scroll.Element name={refId} className={classes.relative}>
        <div
          className={classnames(
            LOGIC_HELPERS.ifElse(marginLeft, classes.marginLeft),
          )}
        >
          <GridContainer
            direction="column"
            spacing={0}
            onClick={this.onClickDay}
          >
            {this.renderHeading()}
            <GridItem>
              <DayHeader
                tabId={tabId}
                dayId={dayId}
                index={index}
                toggleEdit={this.iconToggle}
                canEdit={false}
              />
            </GridItem>
            <GridItem className={classes.fullWidth}>
              {this.renderDay()}
            </GridItem>
          </GridContainer>
        </div>
      </Scroll.Element>
    );
  };
}

Day.propTypes = {
  id: PropTypes.string, // for auto scroll purpose.
  dayId: PropTypes.number.isRequired,
  index: PropTypes.number,
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object,
  selected: PropTypes.bool,
  content: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  tabId: PropTypes.number,

  // from resaga
  editing: PropTypes.bool,
  marginLeft: PropTypes.bool,
};

Day.defaultProps = {};

export default compose(
  withStyles(style, { name: 'Day' }),
  resaga(CONFIG),
)(Day);
