import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Axios from 'axios';
import { useAddress, useBalance } from "@thirdweb-dev/react";
import {
    Card,
    IconSettings,
    SplitView,
    SplitViewListbox,
    SplitViewHeader,
    Button
} from '@salesforce/design-system-react';
import { 
    PieChart, 
    Pie, 
    Tooltip, 
} from 'recharts';

import Header from "../components/app/AppHeader";
import TradingViewWidget from "../components/wallet/TradingView";
import TokenHeader from "../components/wallet/TokenHeader";

const Wallet = (props) => {
    const address = useAddress();
    const [pairs, setPairs] = useState([]);
    const [tokenBalances, setTokenBalances] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState([]);

    const searchToken = async (symbol) => {
        try {
            let data = await Axios.get('http://localhost:8080/api/token/pairs/' + symbol);
            console.log(data.data)
            setPairs(data.data.pairs);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (address !== undefined) {
            Axios.get('http://localhost:8080/api/wallet/tokens/' + address).then((result) => {
                setTokenBalances(result.data);

                if (tokenBalances.length > 0) {
                    setSelected([tokenBalances[0]])
                }
            });
        }
    },[address]);

    const masterView = () => {
        return [
            <SplitViewHeader
				key="1"
				info={tokenBalances.length + ' Token(s)'}
				title={'Wallet Tokens'}
				truncate
				variant="object-home"
			/>,
            <SplitViewListbox
                key="2"
                labels={{
                    header: 'Wallet Tokens',
                }}
                options={tokenBalances}
                events={{
                    onSelect: (event, { selectedItems, item }) => {
                        setSelected([item])
                        searchToken(item.symbol);
                    },
                }}
                selection={selected}
                unread={[]}
            />
        ]
    }

    const detailView = () => {
        console.log(selected);
        return (
            <div className="slds-p-horizontal_small slds-p-top_small">
                <TokenHeader selected={selected} />
                <div className="slds-grid slds-p-top_small">
                    <div className="slds-size_2-of-3">
                        <TradingViewWidget 
                            selected={selected}
                            pairs={pairs} 
                        />
                    </div>
                    <div className="slds-size_1-of-3 slds-p-left_small">
                        <Card 
                            heading="24 hour Volume"
                            headerActions={
                                <Button label="Dex" />
                            }
                        >
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
                <div style={{ height: '93vh' }}>
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
