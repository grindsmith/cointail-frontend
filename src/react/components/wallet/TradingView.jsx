// TradingViewWidget.jsx
import DexScreenerPairs from './DexScreenerPairs';
import React, { useEffect, useRef, useState } from 'react';

let tvScriptLoadingPromise;

const TradingViewWidget = (props) => {
  const [symbol, setSymbol] = useState('sushiswap:wethusdc');

  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => onLoadScriptRef.current = null;

    // if uniswap
    // -> "uniswap3eth", "uniswap3arbitrum"
    // if sushiswap
    // -> "sushiswap"
    function createWidget() {
      if (document.getElementById('tradingview_181d0') && 'TradingView' in window) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "30",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#d1d3d6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_181d0"
        });
      }
    }
  }, [symbol]);

  return (
    <div>
      <div className='tradingview-widget-container' >
        <div id='tradingview_181d0' style={{ height: '500px'}} />
        <div className="tradingview-widget-copyright">
          <a href={"https://www.tradingview.com/symbols/wethusdc/?exchange=uniswap3eth"} rel="noreferrer" target="_blank"><span className="blue-text">IPORWETH chart</span></a> by TradingView
        </div>
      </div>
      <DexScreenerPairs 
        pairs={props.pairs} 
        symbol={symbol}
        setSymbol={setSymbol} 
      />
    </div>

  );
}

export default TradingViewWidget;