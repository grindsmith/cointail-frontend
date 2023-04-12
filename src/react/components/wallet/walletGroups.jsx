import React from 'react';
import { connect } from 'react-redux';
import WalletLinkCell from './walletLinkCell';
import { 
    DataTable,
    DataTableColumn,
} from '@salesforce/design-system-react';

const WalletGroups = (props) => {
  const { wallet } = props;

  return (
    <DataTable
      items={props.walletGroups}
      id="DataTableExample-headless"
      striped
      fixedLayout
    >
      <DataTableColumn key="name" label="Group Name" property="name" />
      <DataTableColumn key="description" label="Description" property="description" />
      <DataTableColumn key="id" label="View" property="id">
        <WalletLinkCell
          prefix={`/wallet/${wallet}/group`} 
          linkLabel={true}
          sameTab={true}
        />
      </DataTableColumn>
    </DataTable>
  );
}

const mapStateToProps = (state) => ({
  walletGroups: state.wallet.groups,
});

export default connect(mapStateToProps, null)(WalletGroups);