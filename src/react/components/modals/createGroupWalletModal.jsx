import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Combobox,
  Modal,
} from '@salesforce/design-system-react';
import { 
  getAllWallets,
  postGroupWallet 
} from '../../../redux/actions';

const CreateGroupWalletModal = (props) => {
  const { isOpen, setIsOpen } = props;

  useEffect(() => {
    props.getAllWallets();
  }, []);

  const createGroupWallet = async () => {
    
  }

  return (
    <Modal
      isOpen={isOpen}
      footer={[
        <Button label="Cancel" onClick={() => setIsOpen(true)} />,
        <Button label="Save" variant="brand" onClick={createGroupWallet} />,
      ]}
      onRequestClose={() => setIsOpen(false)}
      heading="Add Wallet to Group"
    >
      <section className="slds-p-around_large slds-m-vertical_xx-large">
      </section>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  allWallets: state.app.allWallets,
});
const mapDispatchToProps = (dispatch) => ({
  getAllWallets: () => 
    dispatch(getAllWallets()),
  postGroupWallet: (walletId, groupId) => 
    dispatch(postGroupWallet(walletId, groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupWalletModal);