import React, { Fragment } from 'react';
import { Dialog, TextField } from 'material-ui';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import classNames from 'classnames';
import styled from 'styled-components'
import { lighten } from 'polished'
import { shell } from 'electron'
import { ms } from '../styles/helpers'

import Button from './Button';
import { H4 } from './Heading'
import ADD_ADDRESS_TYPES from '../constants/AddAddressTypes';
import Loader from './Loader';

import Tooltip from './Tooltip';
import styles from './AddAddressModal.css';
import TezosIcon from "./TezosIcon";

type Props = {
  open: boolean,
  activeTab: string,
  closeModal: Function,
  setActiveTab: Function,
  importAddress: Function,
  seed: string,
  pkh: string,
  activationCode: string,
  username: string,
  passPhrase: string,
  isLoading: boolean,
  updateUsername: Function,
  updatePassPhrase: Function,
  confirmPassPhrase: Function,
  updateSeed: Function,
  updatePkh: Function,
  updateActivationCode: Function,
  selectedAccountHash: string
};

const InputWithTooltip = styled.div`
  position: relative;
  
  & button {
    position: absolute;
    top: 50%;
    right: ${ms(-2)};
  }
`

const FormTitle = styled(H4)`
  font-size: ${ms(1)};
`

const HelpIcon = styled(TezosIcon)`
  padding: 0 0 0 ${ms(-4)};
`;

const TooltipContainer = styled.div`
  font-size: ${ms(-1)};
  color: ${({ theme: { colors } }) => colors.primary };
  max-width: ${ms(15.5)};
  font-weight: ${({theme: {typo}}) => typo.weights.light };
`

const TooltipTitle = styled.p`
  font-weight: ${({theme: {typo}}) => typo.weights.bold };
  margin: 0 0 ${ms(-1)} 0;
`

const Row = styled.div`
  display: grid;
  grid-column-gap: ${ms(1)};
`

const FirstRowInputs = styled(Row)`
  grid-template-columns: 1fr 2fr;
`

const SecondRowInputs = styled(Row)`
  grid-template-columns: 3fr 4fr;
`

const ImportButton = styled(Button)`
  margin: ${ms(6)} 0 0 0;
`

const StyledTooltip = styled(Tooltip)`
  &__tooltip-inner {
    background-color: ${({theme: {colors}}) => lighten(0.2, colors.secondary)};
  }
`

const Link = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: ${ ({ theme: { colors } }) => colors.blue2 };
`

const PasswordTooltip = () => {
  return (
    <TooltipContainer>
      <TooltipTitle>Fundraiser Password</TooltipTitle>
      This is the password that you used when generating a Tezos paper wallet to participate in the Fundraiser.
    </TooltipContainer>
  )
}

const EmailTooltip = () => {
  return (
    <TooltipContainer>
      <TooltipTitle>Fundraiser Email Address</TooltipTitle>
      This is the email address that you used when generating a Tezos paper wallet to participate in the Fundraiser
    </TooltipContainer>
  )
}

const ActivationTooltip = () => {
  const openLink = () => shell.openExternal('https://verification.tezos.com/')
  return (
    <TooltipContainer>
      <TooltipTitle>Activation Code</TooltipTitle>
      This is the activation code that you received after completing the KYC/AML process. An activation code corresponds
      to a public key hash and is required if you participated in the Fundraiser.
      You may complete the process at <Link onClick={openLink}>verification.tezos.com</Link> if you have not done so already.
    </TooltipContainer>
  )
}

const PkhTooltip = () => {
  return (
    <TooltipContainer>
      <TooltipTitle>Public key hash</TooltipTitle>
      This is the public key hash as provided in the paper wallet.
    </TooltipContainer>
  )
}

const ActivationTooltipStyled = styled(ActivationTooltip)`
  max-width: ${ms(14)}
`

export default function AddAddress(props: Props) {
  const {
    open,
    activeTab,
    closeModal,
    setActiveTab,
    importAddress,
    seed,
    pkh,
    activationCode,
    updatePkh,
    updateActivationCode,
    username,
    passPhrase,
    isLoading,
    updateUsername,
    updatePassPhrase,
    confirmPassPhrase,
    updateSeed,
    selectedAccountHash
  } = props;

  function renderAppBar() {
    return (
      <div className={styles.titleContainer}>
        <div>Add an Account</div>
          <CloseIcon
            className={styles.closeIcon}
            style={{ fill: 'white' }}
            onClick={closeModal}
          />
      </div>
    );
  }

  function renderTab(tabName) {
    const tabClasses = classNames({
      [styles.tab]: true,
      [styles.inactiveTab]: tabName !== activeTab,
      [styles.activeTab]: tabName === activeTab
    });

    return (
      <div
        key={tabName}
        className={tabClasses}
        onClick={() => setActiveTab(tabName)}
      >
        {tabName}
      </div>
    );
  }

  function renderTabController() {
    return (
      <div className={styles.tabContainer}>
        {Object.values(ADD_ADDRESS_TYPES).map(renderTab)}
      </div>
    );
  }

  function renderAddBody() {
    switch (activeTab) {
      case ADD_ADDRESS_TYPES.GENERATE_MNEMONIC:
        return (
          <div>
            <TextField
              floatingLabelText="Seed Words"
              style={{ width: '100%' }}
              value={seed}
              disabled={activeTab === ADD_ADDRESS_TYPES.GENERATE_MNEMONIC}
              onChange={(_, newSeed) => updateSeed(newSeed)}
            />
            <div className={styles.fundraiserPasswordContainer}>
              <TextField
                floatingLabelText="Pass Phrase"
                type="password"
                style={{ width: '45%' }}
                value={passPhrase}
                onChange={(_, newPassPhrase) => updatePassPhrase(newPassPhrase)}
              />
              <TextField
                floatingLabelText="Confirm Pass Phrase"
                type="password"
                style={{ width: '45%' }}
                onChange={(_, newPassPhrase) =>
                  confirmPassPhrase(newPassPhrase)
                }
              />
            </div>
          </div>
        );
      case ADD_ADDRESS_TYPES.FUNDRAISER:
      default:
        return (
          <Fragment>
            <FormTitle>Please refer to the PDF document that you created during the Fundraiser.</FormTitle>
            <TextField
              floatingLabelText="15 Word Secret Key"
              style={{ width: '100%' }}
              value={seed}
              onChange={(_, newSeed) => updateSeed(newSeed)}
              />
            <FirstRowInputs>
              <InputWithTooltip>
                <TextField
                  floatingLabelText="Fundraiser Password"
                  type="password"
                  style={{ width: '100%', padding: `0 ${ms(3)} 0 0` }}
                  value={passPhrase}
                  onChange={(_, newPassPhrase) => updatePassPhrase(newPassPhrase)}
                />

                <StyledTooltip position="bottom" content={PasswordTooltip}>
                  <Button buttonTheme="plain">
                    <HelpIcon
                      iconName="help"
                      size={ms(0)}
                      color="secondary"
                    />
                  </Button>
                </StyledTooltip>
              </InputWithTooltip>

              <InputWithTooltip>
                <TextField
                  floatingLabelText="Public key hash"
                  style={{ width: '100%', padding: `0 ${ms(3)} 0 0` }}
                  value={ pkh }
                  onChange={(_, newPkh) => updatePkh(newPkh)}
                />
                <StyledTooltip position="bottom" content={PkhTooltip}>
                  <Button buttonTheme="plain">
                    <HelpIcon
                      iconName="help"
                      size={ms(0)}
                      color="secondary"
                    />
                  </Button>
                </StyledTooltip>
              </InputWithTooltip>
            </FirstRowInputs>

            <SecondRowInputs>
              <InputWithTooltip>
                <TextField
                  floatingLabelText="Fundraiser Email Address"
                  style={{ width: '100%', padding: `0 ${ms(3)} 0 0` }}
                  value={username}
                  onChange={(_, newUsername) => updateUsername(newUsername)}
                />

                <StyledTooltip position="bottom" content={EmailTooltip}>
                  <Button buttonTheme="plain">
                    <HelpIcon
                      iconName="help"
                      size={ms(0)}
                      color="secondary"
                    />
                  </Button>
                </StyledTooltip>
              </InputWithTooltip>

              <InputWithTooltip>
                <TextField
                  floatingLabelText="Activation Code"
                  style={{ width: '100%', padding: `0 ${ms(3)} 0 0` }}
                  value={activationCode}
                  onChange={(_, newActivationCode) => updateActivationCode(newActivationCode)}
                />
                <StyledTooltip position="bottom" content={ActivationTooltip}>
                  <Button buttonTheme="plain">
                    <HelpIcon
                      iconName="help"
                      size={ms(0)}
                      color="secondary"
                    />
                  </Button>
                </StyledTooltip>
              </InputWithTooltip>
            </SecondRowInputs>
          </Fragment>
        );
    }
  }

  return (
    <Dialog modal open={open} bodyStyle={{ padding: '0px' }}>
      {renderAppBar()}
      {renderTabController()}
      <div className={styles.addAddressBodyContainer}>
        {renderAddBody()}
        <Fragment>
          <ImportButton
            buttonTheme="primary"
            onClick={importAddress}
            disabled={isLoading}
          >
            Import
          </ImportButton>
          {isLoading && <Loader />}
        </Fragment>
      </div>
    </Dialog>
  );
}
