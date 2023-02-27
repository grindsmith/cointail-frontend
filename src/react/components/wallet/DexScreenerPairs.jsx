import React from 'react';

import {
  Button,
  Card,
  DataTable,
  DataTableCell,
  DataTableColumn,
} from '@salesforce/design-system-react';

const DexScreenerPairs = (props) => {
  const CustomDateCell = ({ children }) => {
    return (
      <DataTableCell>
        <Button 
          variant={props.symbol === children ? "outline-brand" : "brand"}
          label={props.symbol === children ? "Selected" : "View"}
          onClick={(e) => { 
            console.log(children)
            return props.setSymbol(children)
          }}
        />
      </DataTableCell>
  )};
  CustomDateCell.displayName = DataTableCell.displayName;
  
  const columns = [
    <DataTableColumn key="chainId" label="Chain" property="chainId" />,
    <DataTableColumn key="dexId" label="DEX" property="dexId" />,
    <DataTableColumn key="baseTokenName" label="Base Token" property="baseTokenName" />,
    <DataTableColumn key="quoteTokenName" label="Quote Token" property="quoteTokenName" />,
    <DataTableColumn key="volume24hr" label="24 Hour Vol" property="volume24hr" />,
    <DataTableColumn key="volume6hr" label="6 Hour Vol" property="volume6hr" />,
    <DataTableColumn key="volume1hr" label="1 Hour Vol" property="volume1hr" />,
    <DataTableColumn key="symbol" label="Select" property="symbol">
      <CustomDateCell />
    </DataTableColumn>,
  ];

  return (
    <Card heading="Dex Screener Pairs" style={{ overflowX: "scroll"}}>
        <DataTable
            items={props.pairs}
            id="DataTableExample-headless"
            striped
        >
            {columns}
        </DataTable>
    </Card>
  );
}

export default DexScreenerPairs;