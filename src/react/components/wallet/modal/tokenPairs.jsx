import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  DataTable,
  DataTableCell,
  DataTableColumn,
} from '@salesforce/design-system-react';

const CustomChartCell = ({ children, ...props }) => {
  return (
    <DataTableCell {...props}>
      <Button 
        variant="brand"
        label={children}
        data-children={children}
        onClick={(e) => props.setTradingViewSymbol(e.target.dataset.children)}
      />
    </DataTableCell>
)};
CustomChartCell.displayName = DataTableCell.displayName;

const TokenPairs = (props) => {
  console.log(props.tokenPairs)

  return (
    <Card 
      heading="Top Volume Pairs"
      headerActions={<div className="slds-text-title_caps slds-p-top_xx-small">Data from <a href="https://dexscreener.com/">Dexscreener</a></div>}
      style={{ maxHeight: '350px', overflowY: 'scroll'}}
    >
        <DataTable
          items={props.tokenPairs}
          id="DataTableExample-headless"
          striped
        >
          <DataTableColumn key="baseTokenSymbol" label="Base" property="baseTokenSymbol" />,
          <DataTableColumn key="quoteTokenSymbol" label="Quote" property="quoteTokenSymbol" />,
          <DataTableColumn key="volume24hr" label="24hr Vol" property="volume24hr" />,
          <DataTableColumn key="symbolLabel" label="Select" property="symbolLabel">
            <CustomChartCell setTradingViewSymbol={props.setTradingViewSymbol} />
          </DataTableColumn>
        </DataTable>
    </Card>
  );
}


const mapStateToProps = (state) => ({
  tokenPairs: state.app.tokenPairs
});

export default connect(mapStateToProps, null)(TokenPairs);