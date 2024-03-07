// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
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

      function createWidget() {
        if (document.getElementById('tradingview_fb78d') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BITSTAMP:ETHUSD",
            interval: "240",
            timezone: "Etc/UTC",
            theme: "light",
            style: "3",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            hide_top_toolbar: true,
            withdateranges: true,
            save_image: false,
            container_id: "tradingview_fb78d"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_fb78d' style={{ height: '550px' }} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/symbols/ETHUSD/?exchange=BITSTAMP" rel="noopener" target="_blank"><span className="blue-text">Ethereum chart</span></a> by TradingView
      </div>
    </div>
  );
}
