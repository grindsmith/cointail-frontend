import React, { useState } from "react";
import { Accordion, AccordionPanel, Button, ButtonGroup, Card } from '@salesforce/design-system-react';
import WalletTokenStatsBox from "./walletTokenStatsBox";

const WalletToken = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card hasNoHeader>
            <Accordion id="base-example-accordion">
                <AccordionPanel 
                    id={props.token.name}
                    key={props.token.name}
                    expanded={isOpen}
                    onTogglePanel={() => setIsOpen(!isOpen)}
                    summary={props.token.name}
                    panelContentActions={
                        <ButtonGroup>
                            <Button
                                variant="outline-brand"
                                label="Stats"
                                onClick={(e) => setIsOpen(true)}
                            />
                            <Button
                                variant="outline-brand"
                                label="Chart"
                                data-token-symbol={props.token.symbol}
                                data-token-number={props.tokenNumber}
                                onClick={(e) => {
                                    props.setSymbol(e.target.dataset.tokenSymbol);
                                    props.setTokenNumber(e.target.dataset.tokenNumber)
                                }}
                            />
                        </ButtonGroup>
                    }
                > 
                    <div className="slds-grid slds-wrap">
                        <div className="slds-size_1-of-2">
                            <WalletTokenStatsBox
                                label={'Balance'}
                                stat={'$' + (props.token.walletBalance * parseFloat(props.token.stats?.priceUsd)).toFixed(2)}
                                unit={''}
                            />
                        </div>
                        <div className="slds-size_1-of-2" />
                        <div className="slds-size_2-of-6"> 
                            <WalletTokenStatsBox
                                label={'Price'}
                                stat={'$' + (parseFloat(props.token.stats?.priceUsd)).toFixed(2)}
                                unit={''}
                            />
                        </div> 
                        <div className="slds-size_1-of-6">
                            <WalletTokenStatsBox
                                label={'5M'}
                                stat={props.token.stats?.priceChange.m5}
                                unit={'%'}
                            />
                        </div>
                        <div className="slds-size_1-of-6">
                            <WalletTokenStatsBox
                                label={'1HR'}
                                stat={props.token.stats?.priceChange.h1}
                                unit={'%'}
                            />
                        </div>
                        <div className="slds-size_1-of-6">
                            <WalletTokenStatsBox
                                label={'6HR'}
                                stat={props.token.stats?.priceChange.h6}
                                unit={'%'}
                            />
                        </div>
                        <div className="slds-size_1-of-6">
                            <WalletTokenStatsBox
                                label={'24HR'}
                                stat={props.token.stats?.priceChange.h24}
                                unit={'%'}
                            />
                        </div>                       
                        <div className="slds-size_2-of-6"> 
                            <WalletTokenStatsBox
                                label={'FDV'}
                                stat={'$' + (props.token.stats?.fdv / 1000000).toFixed(2)}
                                unit={'M'}
                            />
                        </div> 
                        <div className="slds-size_1-of-6">
                            <WalletTokenStatsBox
                                label={'5M'}
                                stat={(props.token.stats?.volume.m5 / 1000).toFixed(2)}
                                unit={'K'}
                            />
                        </div>
                        <div className="slds-size_1-of-6">
                            <WalletTokenStatsBox
                                label={'1HR'}
                                stat={props.token.stats?.volume.h1 > 100000 ? (props.token.stats?.volume.h1 / 1000000).toFixed(2) :(props.token.stats?.volume.h1 / 1000).toFixed(2)}
                                unit={props.token.stats?.volume.h1 > 1000000 ? 'M' : 'K'}
                            />
                        </div>
                        <div className="slds-size_1-of-6">
                            <WalletTokenStatsBox
                                label={'6HR'}
                                stat={props.token.stats?.volume.h6 > 100000 ? (props.token.stats?.volume.h6 / 1000000).toFixed(2) :(props.token.stats?.volume.h6 / 1000).toFixed(2)}
                                unit={props.token.stats?.volume.h6 > 1000000 ? 'M' : 'K'}
                            />
                        </div>
                        <div className="slds-size_1-of-6">
                            <WalletTokenStatsBox
                                label={'24HR'}
                                stat={props.token.stats?.volume.h24 > 100000 ? (props.token.stats?.volume.h24 / 1000000).toFixed(2) :(props.token.stats?.volume.h24 / 1000).toFixed(2)}
                                unit={props.token.stats?.volume.h24 > 1000000 ? 'M' : 'K'}
                            />
                        </div>                       
                    </div>
                </AccordionPanel>
            </Accordion>
        </Card>
        )
};

export default WalletToken;
