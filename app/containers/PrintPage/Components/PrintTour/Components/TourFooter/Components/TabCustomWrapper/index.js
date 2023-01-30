import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import TabCustom from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabCustom';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { PUBLIC } from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import Hr from 'components/Hr';
import Container from 'components/Container';
import styles from './styles';
import { CONFIG } from './config';
import JText from '../../../../../../../../components/JText';

export class TabCustomWrapper extends PureComponent {
  componentDidMount = () => this.setChildren();

  setChildren = () => {
    const children = this.props.tabChildIds;
    this.props.resaga.setValue({
      tabsData: children,
    });
  };

  renderCustom = () => (
    <GridItem>
      <TabCustom id={this.props.tabId} isPrint isPublic />
    </GridItem>
  );

  isVisible = shareWith => !shareWith || shareWith === PUBLIC; // && (printMode === SHOW || !printMode);

  render = () => {
    const {
      classes,
      tabChildIds,
      sharedWith,
      tabPrintOnly,
      content,
    } = this.props;
    if ((!tabChildIds || !this.isVisible(sharedWith)) && !tabPrintOnly)
      return '';
    const showTab = tabChildIds.length > 0;
    return showTab ? (
      <GridContainer spacing={0} direction="column">
        <GridItem>
          <Hr />
        </GridItem>
        <GridItem>
          <Container>
            <GridContainer spacing={0} className={classes.textContainer}>
              <GridItem className={classes.content}>
                <JText ellipsis nowrap className={classes.dividerText}>
                  {content}
                </JText>
              </GridItem>
            </GridContainer>
          </Container>
        </GridItem>
        <GridItem>
          <Container>
            <GridContainer spacing={0}>{this.renderCustom()}</GridContainer>
          </Container>
        </GridItem>
      </GridContainer>
    ) : (
      ''
    );
  };
}

TabCustomWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  tabId: PropTypes.number,
  resaga: PropTypes.object,
  tabChildIds: PropTypes.array,
  content: PropTypes.string,
  sharedWith: PropTypes.string,
  // printMode: PropTypes.string,
  tabPrintOnly: PropTypes.bool,
};

TabCustomWrapper.defaultProps = {
  tabId: 0,
  tabChildIds: [],
  content: '',
};

export default compose(
  withStyles(styles, { name: 'TabCustomWrapper' }),
  resaga(CONFIG),
)(TabCustomWrapper);
