import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { 
    Button,
    Card,
    Icon,
    IconSettings
} from '@salesforce/design-system-react';
import { getAllGroups } from '../../redux/actions';

import AppHeader from '../components/headers/appHeader';
import GroupDataTable from '../components/data-tables/groupTable';
import CreateGroupModal from "../components/modals/createGroupModal";

const Groups = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    props.getAllGroups();
  }, []);

  return (
    <div>
      <AppHeader />
      <div style={{ marginTop: '0px', height: '87vh' }}>
        <Card 
          heading="Groups" 
          icon={<Icon category="standard" name="groups" size="small" />}
          className="slds-m-around_small"
          headerActions={
            <Button 
              label="Create Group" 
              onClick={() => setIsOpen(true)} 
              variant="brand"
            />
          }
        >
          <GroupDataTable
            groups={props.allGroups}
          />
        </Card>
      </div>
      <CreateGroupModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
};

const mapStateToProps = (state) => ({
  allGroups: state.app.allGroups
});
const mapDispatchToProps = (dispatch) => ({
  getAllGroups: () => 
    dispatch(getAllGroups()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
