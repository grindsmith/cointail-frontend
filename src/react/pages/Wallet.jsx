import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Axios from 'axios';
import { ConnectWallet, useAddress, useBalance } from "@thirdweb-dev/react";
import {
    Card,
    Icon,
    IconSettings,
    SplitView,
    SplitViewListbox,
    SplitViewHeader
} from '@salesforce/design-system-react';
import { 
    PieChart, 
    Pie, 
    Tooltip, 
} from 'recharts';

import Header from "../components/app/AppHeader";
import DexScreenerPairs from "../components/wallet/DexScreenerPairs";
import TradingViewWidget from "../components/wallet/TradingView";
import TokenHeader from "../components/wallet/TokenHeader";

const Wallet = (props) => {
    const address = useAddress();
    const [pairs, setPairs] = useState([]);
    const [tokenBalances, setTokenBalances] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState([]);

    const searchToken = async (contract) => {
        try {
            let data = await Axios.get('http://localhost:8080/api/token/pairs/' + contract);
            console.log(data);
            setPairs(data.data.pairs);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (address !== undefined) {
            Axios.get('http://localhost:8080/api/wallet/tokens/' + address).then((result) => {
                console.log(result.data);
                setTokenBalances(result.data);

                if (tokenBalances.length > 0) {
                    setSelected([tokenBalances[0]])
                }
            });
        }
    },[address]);

    console.log(tokenBalances.data)

    const masterView = () => {
        return [
            <SplitViewHeader
				key="1"
				icon={
					<Icon
						assistiveText={{ label: 'User' }}
						category="standard"
						name="lead"
                        size="small"
                    />
				}
				info={tokenBalances.length + ' Token(s)'}
				title={'Wallet Tokens'}
				truncate
				variant="object-home"
			/>,
            <SplitViewListbox
                key="1"
                labels={{
                    header: 'Wallet Tokens',
                }}
                options={tokenBalances}
                events={{
                    onSelect: (event, { selectedItems, item }) => {
                        setSelected([item])
                        searchToken(item.contractAddress);
                    },
                }}
                selection={selected}
                unread={[]}
            />
        ]
    }

    const detailView = () => {
        return (
            <div className="slds-p-horizontal_small slds-p-top_small">
                <TokenHeader selected={selected} />
                <div className="slds-grid slds-p-top_small">
                    <div className="slds-size_2-of-3">
                        <TradingViewWidget />
                        <DexScreenerPairs pairs={pairs} />
                    </div>
                    <div className="slds-size_1-of-3 slds-p-left_small">
                        <Card heading="24 hour Volume">
                            <PieChart width={400} height={225}>
                                <Pie
                                    dataKey="volume24hr"
                                    isAnimationActive={true}
                                    data={pairs}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                />
                                <Tooltip />
                            </PieChart>
                        </Card>
                        <Card heading="6 hour Volume">
                            <PieChart width={400} height={225}>
                                <Pie
                                    dataKey="volume6hr"
                                    isAnimationActive={true}
                                    data={pairs}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                />
                                <Tooltip />
                            </PieChart>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <IconSettings iconPath="/icons">
            <Header />
            <div style={{ marginTop: '0px'}}>
                <div style={{ height: '95vh' }}>
					<SplitView
						events={{
							onClose: () => setIsOpen(false),
							onOpen: () => setIsOpen(true),
						}}
						id="base-example"
						isOpen={isOpen}
						master={masterView()}
						detail={detailView()}
					/>
				</div>
            </div>
        </IconSettings>
    )
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
