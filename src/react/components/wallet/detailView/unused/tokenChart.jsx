/* eslint-disable react/prop-types */
// TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

function TokenChart(props) {
  const { symbol } = props;
  const onLoadScriptRef = useRef();

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
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

    // eslint-disable-next-line no-return-assign
    return () => onLoadScriptRef.current = null;

    // if uniswap
    // -> "uniswap3eth", "uniswap3arbitrum"
    // if sushiswap
    // -> "sushiswap"
    function createWidget() {
      if (document.getElementById('tradingview_181d0') && 'TradingView' in window) {
        // eslint-disable-next-line no-new, new-cap
        new window.TradingView.widget({
          autosize: true,
          symbol: `uniswap3eth:${symbol}USDT`,
          interval: '30',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '3',
          locale: 'en',
          toolbar_bg: '#d1d3d6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_181d0',
        });
      }
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_181d0" style={{ height: '550px' }} />
      <div className="tradingview-widget-copyright">
        <a href={`https://www.tradingview.com/symbols/${props.symbol}usdt/?exchange=uniswap3eth`} rel="noreferrer" target="_blank">
          <span className="blue-text">
            {symbol}
            USDT chart
          </span>
        </a>
        {' '}
        by TradingView
      </div>
    </div>
  );
}

export default TokenChart;
