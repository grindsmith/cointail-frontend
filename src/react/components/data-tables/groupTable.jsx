import React from 'react';
import WalletLinkCell from './linkDataCell';
import { 
    DataTable,
    DataTableColumn,
} from '@salesforce/design-system-react';

const GroupDataTable = (props) => {
  const { groups } = props;

  return (
    <DataTable
      items={groups}
      id="DataTableExample-headless"
      striped
      fixedLayout
    >
      <DataTableColumn key="name" label="Group Name" property="name" />
      <DataTableColumn key="description" label="Description" property="description" />
      <DataTableColumn key="id" label="View" property="id">
        <WalletLinkCell
          prefix={`/group`} 
          linkLabel={true}
          sameTab={true}
        />
      </DataTableColumn>
    </DataTable>
  );
}

export default GroupDataTable;