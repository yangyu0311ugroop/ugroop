import React, { PureComponent } from 'react';
import Logo from 'shareAssets/NewLogoPlanePNG.png';
import { Text, View, Image } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import styles from './styles';

export class Footer extends PureComponent {
  renderFooterPage = ({ pageNumber, totalPages }) =>
    `Page ${pageNumber} of ${totalPages}`;

  renderFooter = () => (
    <View fixed style={styles.footer}>
      <View fixed style={styles.footerBadge}>
        <Text style={styles.poweredText} fixed>
          Powered by
        </Text>
        <Image source={Logo} style={styles.logo} fixed />
        <Text style={styles.footerSubLabel} fixed>
          uGroop
        </Text>
      </View>
      <View style={{ ...styles.gridRow }}>
        <Text style={styles.secRow}>{`Printed By ${
          this.props.printedBy
        }`}</Text>
        <Text
          style={{ ...styles.secRow, textAlign: 'center' }}
          render={this.renderFooterPage}
          fixed
        />
        <Text style={{ ...styles.secRow, textAlign: 'right' }}>{`Printed Date ${
          this.props.printDate
        }`}</Text>
      </View>
    </View>
  );

  render = () => this.renderFooter();
}

Footer.propTypes = {
  printedBy: PropTypes.string,
  printDate: PropTypes.string,
};

Footer.defaultProps = {
  printedBy: '',
};

export default Footer;
