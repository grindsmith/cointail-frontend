import React, { useState } from 'react';
import { Input, Modal, Button } from 'antd';
const { TextArea } = Input;

import Axios from 'axios';

const CreateGroupModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const createGroup = async () => {
    await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/group`, {
      name: '',
      description: '',
      ownerId: ''
    });
  }

  return (
    <>
    <Button type="primary" onClick={() => setIsOpen(true)}>Create New Group</Button>
    <Modal
      open={isOpen}
      footer={[
        <Button onClick={() => setIsOpen(true)}>Cancel</Button>,
        <Button type="primary" onClick={createGroup}>Save</Button>,
      ]}
      onCancel={() => setIsOpen(false)}
      title="Create New Group"
    >
      <section style={{ padding: '.75rem'}}>
        <Input 
          placeholder="Group Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <TextArea 
          placeholder="Group Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ marginTop: '.75rem'}}
          rows={4}
        />
        <Input 
          placeholder="Owner Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          style={{ marginTop: '.75rem'}}
        />
      </section>
    </Modal>
    </>
  )
}

export default CreateGroupModal;