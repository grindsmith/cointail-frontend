import React from 'react';
import LinkDataCell from './linkDataCell';
import { 
    DataTable,
    DataTableColumn,
    Spinner
} from '@salesforce/design-system-react';

const GroupDataTable = (props) => {
  const { groups } = props;

  return (
    <div>
      {groups.length > 0 ? (
        <DataTable
          items={groups}
          id="DataTableExample-headless"
          striped
          fixedLayout
        >
          <DataTableColumn key="name" label="Group Name" property="name" />
          <DataTableColumn key="description" label="Description" property="description" />
          <DataTableColumn key="id" label="View" property="id">
            <LinkDataCell
              prefix={`/group`} 
              linkLabel={true}
              sameTab={true}
            />
          </DataTableColumn>
        </DataTable>
      ):(
        <div className="slds-m-vertical_xx-large">
          <Spinner
            size="medium"
            variant="base"
            assistiveText={{ label: 'Main Frame Loading...' }}
          />
        </div>
      )}
    </div>
  );
}

export default GroupDataTable;