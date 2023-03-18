import React from 'react';
import PropTypes from 'prop-types';

function WalletTokenStatsBox(props) {
  const { stat, unit, label } = props;

  const textColor = () => {
    if (stat > 0 && unit === '%') {
      return { color: 'green' };
    } if (stat <= 0 && unit === '%') {
      return { color: 'red' };
    }
    return { color: 'gray' };
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '5px',
      }}
      className="slds-m-around_xx-small slds-truncate"
    >
      <div className="slds-align_absolute-center">{label}</div>
      <div
        style={textColor()}
        className="slds-align_absolute-center"
      >
        {stat}
        {unit}
      </div>
    </div>
  );
}

WalletTokenStatsBox.propTypes = {
  unit: PropTypes.string.isRequired,
  stat: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default WalletTokenStatsBox;
