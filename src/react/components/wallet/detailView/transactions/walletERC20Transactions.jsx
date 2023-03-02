import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import {
    Button, 
    ButtonGroup, 
    Card,
    DataTable,
    DataTableCell,
    DataTableColumn,
    PageHeaderControl
} from '@salesforce/design-system-react';
import { useParams, useNavigate } from 'react-router-dom';

const WalletERC20Transactions = (props) => {
    const navigate = useNavigate()

    const filterForERC20 = (tx) => {
        let filter = true;

        Object.values(props.walletTransactions[tx]).map((item) => {
            if (item.category === 'erc721')
                filter = false;
        })

        return filter
    }

    return (
        <div>
            <Card heading="ETH & ERC20 Transactions" />
            {Object.keys(props.walletTransactions).filter((tx) => filterForERC20(tx)).map((tx, i) => {
                return (
                    <Card 
                        key={i} 
                        hasNoHeader
                        className="slds-p-top_small slds-p-left_small"
                    >
                        <div className="slds-grid">
                            <div className="slds-size_10-of-12">
                                {Object.values(props.walletTransactions[tx]).map((item, i) => {
                                    if(Object.values(props.walletTransactions[tx]).length > 1) {
                                        if (i < 1) {
                                            return (
                                                <span><span className="slds-text-title_caps">{Moment(item.blockTimestamp).format('LL')} * {'SWAP'}</span><br/><a href={"/wallet/" + item.to}>0x{item.to.substr(item.to.length - 6)}</a>  recieved {item.value} {item.asset}</span>
                                            )
                                        } else if (i < 2) {
                                            return (
                                                <span> and sent {item.value} {item.asset} to <a href={"/wallet/" + item.to}>0x{item.to.substr(item.to.length - 6)} {item.category}</a></span>
                                            )
                                        } else {
                                            return (
                                                <span><br/>Other: {item.value} {item.asset} to <a href={"/wallet/" + item.to}>0x{item.to.substr(item.to.length - 6)}</a></span>
                                            )
                                        }
                                    } else {
                                        return (
                                            <span><span className="slds-text-title_caps">{Moment(item.blockTimestamp).format('LL')} * {'MINT'}</span><br/><a href={"/wallet/" + item.to}>0x{item.to.substr(item.to.length - 6)}</a>  recieved {item.value} {item.asset} from <a href={"/wallet/" + item.from}>0x{item.from.substr(item.to.length - 6)}</a></span>
                                        )
                                    }
                                })}
                            </div>
                            <div className="slds-size_2-of-12">
                                <ButtonGroup>
                                    <Button label="View" onClick={() => navigate("https://etherscan.io/tx/" + tx)} />
                                </ButtonGroup>
                            </div>
                        </div>
                    </Card>
                )
                
            })}
        </div>
    );
}

// Redux is case sensitive
const mapStateToProps = (state) => ({
    walletTransactions: state.app.walletTransactions,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalletERC20Transactions);