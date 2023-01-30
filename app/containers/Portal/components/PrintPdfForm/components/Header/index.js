import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import Logo from 'shareAssets/NewLogoPlanePNG.png';
import styles from './styles';

export class Header extends PureComponent {
  renderTopHeader = () => {
    const { photo, travelBy } = this.props;
    return (
      <View fixed style={styles.headerTop}>
        <View>
          <Image style={styles.image} source={photo || Logo} />
        </View>
        <View style={styles.gridRow}>
          <Text style={styles.labelTop}>Travel by</Text>
          <Text style={styles.fieldTop}>{travelBy}</Text>
        </View>
      </View>
    );
  };

  subTitle = () => {
    const { startDate, showLegend } = this.props;
    if (!showLegend)
      return (
        <View style={styles.gridRow}>
          <Text style={styles.label}> Travel Date: </Text>
          <Text style={styles.field}> {startDate} </Text>
        </View>
      );
    return (
      <View
        style={{
          ...styles.gridRow,
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <View style={styles.gridRow}>
          <Text style={styles.label}> Travel Date: </Text>
          <Text style={styles.field}> {startDate} </Text>
        </View>
        <View style={{ ...styles.gridRow }}>
          <View style={{ ...styles.gridRow, alignItems: 'baseline' }}>
            <Text style={{ ...styles.knob, backgroundColor: '#aab20c' }} />
            <Text style={{ ...styles.legend }}> - Medical Conditions </Text>
          </View>
          <View style={{ ...styles.gridRow, alignItems: 'baseline' }}>
            <Text style={{ ...styles.knob, backgroundColor: '#55cd3d' }} />
            <Text style={{ ...styles.legend, width: '100px' }}>
              {' '}
              - Dietary Requirements{' '}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderHeader = () => {
    const { content, reportTitle } = this.props;
    return (
      <React.Fragment>
        {this.renderTopHeader()}
        <View fixed style={styles.header}>
          <Text style={styles.reportTitle}> {reportTitle} </Text>
          <Text style={styles.reportTitle}> {content} </Text>
          {this.subTitle()}
        </View>
      </React.Fragment>
    );
  };

  render = () => this.renderHeader();
}

Header.propTypes = {
  // hoc props
  // parent props
  // resaga props,
  content: PropTypes.string,
  travelBy: PropTypes.string,
  startDate: PropTypes.string,
  reportTitle: PropTypes.string,
  photo: PropTypes.string,
  showLegend: PropTypes.bool,
};

Header.defaultProps = {
  showLegend: true,
};

export default Header;
