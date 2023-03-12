import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  DataTable,
  DataTableCell,
  DataTableColumn,
} from '@salesforce/design-system-react';

const TokenPairs = (props) => {
  const CustomDateCell = ({ children }) => {
    return (
      <DataTableCell>
        <Button 
          variant={props.symbol === children ? "outline-brand" : "brand"}
          label={props.symbol === children ? "Selected" : "View"}
          onClick={(e) => { 
            return props.setSymbol(children)
          }}
        />
      </DataTableCell>
  )};
  CustomDateCell.displayName = DataTableCell.displayName;
  
  const columns = [
    <DataTableColumn key="baseTokenSymbol" label="Base" property="baseTokenSymbol" />,
    <DataTableColumn key="quoteTokenSymbol" label="Quote" property="quoteTokenSymbol" />,
    <DataTableColumn key="volume24hr" label="24hr Vol" property="volume24hr" />,
    <DataTableColumn key="symbol" label="Select" property="symbol">
      <CustomDateCell />
    </DataTableColumn>,
    <DataTableColumn key="dexId" label="DEX" property="dexId" />,
  ];

  return (
    <Card 
      heading="Top Volume Pairs"
      headerActions={<div className="slds-text-title_caps slds-p-top_xx-small">Data from <a href="https://dexscreener.com/">Dexscreener</a></div>}
      style={{ maxHeight: '275px', overflowY: 'scroll'}}
    >
        <DataTable
          items={props.tokenPairs}
          id="DataTableExample-headless"
          striped
        >
            {columns}
        </DataTable>
    </Card>
  );
}


const mapStateToProps = (state) => ({
  tokenPairs: state.app.tokenPairs
});

export default connect(mapStateToProps, null)(TokenPairs);