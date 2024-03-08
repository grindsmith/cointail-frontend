// Libraries
import Moment from 'moment';

// Components
import {  Button, Space, Table, Tag  } from 'antd';

import { LineChartOutlined } from '@ant-design/icons';

const TransactionsTable = (props) => {
  const columns = [
  {
    title: 'Transaction',
    key: 'action',
    render: (_, record) => {
      return (
        <Space>
          <Button onClick={() => window.open(_.chain === 'ethereum' ? `https://etherscan.io/tx/${_.hash}` : `https://arbiscan.io/tx/${_.hash}`)}>{'0x' + _.hash.substr(_.hash.length - 6)}</Button>
        </Space>
      );
    }
  },
  {
    title: 'Time Stamp',
    dataIndex: 'blockTimestamp',
    key: 'blockTimestamp',
    render: (date) => {
      return(<div>{Moment(date).format('L')}</div>)
    }
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
  {
    title: 'Summary',
    dataIndex: 'summary',
    key: 'summary',
  },
  {
    title: 'Gas Fee',
    dataIndex: 'gas',
    key: 'gas',
  },
  {
    title: 'Charts',
    key: 'action',
    render: (_, record) => {
      console.log(_, record)
      return (
        <Space>
          <Button icon={<LineChartOutlined style={{ color: "#1890ff" }} />} onClick={() => window.open(`https://dexscreener.com/${_.chain}/${_.contractAddress}`, '_blank')}>{_.asset}</Button>
          {_.assetTwo ? (<Button icon={<LineChartOutlined style={{ color: "#1890ff" }} />} onClick={() => window.open(`https://dexscreener.com/${_.chain}/${_.contractAddressTwo}`, '_blank')}>{_.assetTwo}</Button>): null}
        </Space>
      );
    }
  }];

  return (<Table columns={columns} dataSource={props.transactions} />)
}

export default TransactionsTable;