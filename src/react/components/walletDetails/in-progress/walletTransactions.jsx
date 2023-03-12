import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import {
    Button, 
    ButtonGroup, 
    Card,
} from '@salesforce/design-system-react';

const WalletERC20Transactions = (props) => {
    return (
        <div>
            <Card hasNoHeader>
            {Object.keys(props.walletTransactions)
            // .filter((tx) => filterForERC20(tx))
            .map((tx, i) => {
                return (
                    <div
                        key={i} 
                        className="slds-p-left_small slds-p-vertical_x-small"
                        style={{ borderBottom: '1px solid #ddd'}}
                    >
                        {Object.values(props.walletTransactions[tx])
                        .map((item, i) => {
                            if(Object.values(props.walletTransactions[tx]).length > 1) {
                                if (i < 1) {
                                    return (
                                        <span>{Moment(props.walletTransactions[tx][0].blockTimestamp).format('LL')}<br/>Recieved {item.value} <strong>{item.asset}</strong> from <a href={"/wallet/" + item.from}>0x{item.from.substr(item.from.length - 6)}</a></span>
                                    )
                                } else if (i < 2) {
                                    return (
                                        <span> for {item.value} <strong>{item.asset}</strong></span>
                                    )
                                } else {
                                    return (
                                        <span><br/>Other: {item.value} {item.asset} to <a href={"/wallet/" + item.to}>0x{item.to.substr(item.to.length - 6)}</a></span>
                                    )
                                }
                            } else {
                                return (
                                    <span>{Moment(props.walletTransactions[tx][0].blockTimestamp).format('LL')}<br/>Recieved {item.value} {item.asset} from <a href={"/wallet/" + item.from}>0x{item.from.substr(item.from.length - 6)}</a></span>
                                )
                            }
                        })}
                        <br/>
                        <ButtonGroup>
                            <Button label="Etherscan" onClick={() => window.open("https://etherscan.io/tx/" + tx, '_blank')} />
                            <Button 
                                label="Dexscreener" 
                                variant="brand" 
                                data-current-asset={props.walletTransactions[tx][0].asset}
                                data-quote-asset={props.walletTransactions[tx].length > 1 ? props.walletTransactions[tx][1].asset : "USDT"}
                                onClick={(e) => props.setTokenPair(e)} />
                        </ButtonGroup>     
                    </div>
                )
            })}
            </Card>
        </div>
    );
}

// Redux is case sensitive
const mapStateToProps = (state) => ({
    walletTransactions: state.app.walletTransactions,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalletERC20Transactions);