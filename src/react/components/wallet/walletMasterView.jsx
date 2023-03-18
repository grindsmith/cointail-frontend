import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SplitViewListbox } from '@salesforce/design-system-react';
import { useNavigate } from 'react-router-dom';
import { getAppWallets } from '../../../redux/actions';

function WalletMasterView(props) {
  const { appWallets } = props;
  const navigate = useNavigate();

  useEffect(() => {
    getAppWallets();
  }, []);

  return [
    <SplitViewListbox
      key="2"
      labels={{
        header: `${appWallets.length} Wallet(s)`,
      }}
      options={appWallets}
      events={{
        onSelect: async (event, { item }) => {
          navigate(`/wallet/${item.address}`);
        },
      }}
      selection={props.selected}
      unread={[]}
    />,
  ];
}

const mapStateToProps = (state) => ({
  appWallets: state.app.appWallets,
});

const mapDispatchToProps = (dispatch) => ({
  getAppWallets: () => dispatch(getAppWallets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletMasterView);
