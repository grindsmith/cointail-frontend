import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Input,
  Modal
} from '@salesforce/design-system-react';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { postGroup } from '../../../redux/actions';

const GroupCreateModal = (props) => {
  const { isOpen, setIsOpen } = props;

  const address = useAddress();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createGroup = async () => {
    if (name !== '' && description !== '' && address !== '' && address !== null) {
      await props.postGroup(name, description, address);
    
      setIsOpen(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      footer={[
        <Button label="Cancel" onClick={() => setIsOpen(true)} />,
        <Button label="Save" variant="brand" onClick={createGroup} />,
      ]}
      onRequestClose={() => setIsOpen(false)}
      heading="Create New Group"
    >
      <section className="slds-p-around_large">
        <Input label="Group Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Group Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <ConnectWallet accentColor="#fff" colorMode="dark" />
      </section>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  groupInfo: state.group.info,
  groupWallets: state.group.wallets
});
const mapDispatchToProps = (dispatch) => ({
  postGroup: (name, description, address) => 
    dispatch(postGroup(name, description, address))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupCreateModal);