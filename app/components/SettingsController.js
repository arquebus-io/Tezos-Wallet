// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ms } from '../styles/helpers';

import Button from './Button';
import settingsIcon from '../../resources/settings.png';
import logoutIcon from '../../resources/logout.png';
import { goHomeAndClearState } from '../reducers/walletInitialization.duck';

const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Icon = styled.img`
  cursor: pointer;
`;

const SettingsIcon = styled(Icon)`
  height: ${ms(8)};
`;

const LogoutIcon = styled(Icon)`
  height: ${ms(7)};
`;

const Separator = styled.div`
  border-right: 2px solid #a8b6d5;
  margin-right: 8px;
  height: 50px;
`;

type Props = {
  goHomeAndClearState: Function
};

class SettingsController extends Component<Props> {
  render() {
    const { goHomeAndClearState } = this.props;
    return (
      <Container>
        <SettingsIcon alt="Settings" src={settingsIcon} />
        <Separator />
        <Button onClick={goHomeAndClearState} buttonTheme="plain">
          <LogoutIcon alt="Logout" src={logoutIcon} />
        </Button>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goHomeAndClearState }, dispatch);

export default connect(null, mapDispatchToProps)(SettingsController);
