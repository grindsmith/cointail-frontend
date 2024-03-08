// Libraries
import Moment from 'moment';

// Components
import {  Button, Space, Table, Tag  } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Chart',
    dataIndex: 'label',
    key: 'label',
    fixed: 'left',
    render: (label, _) => {
      console.log(label, _)
      return (
        <Button icon={<LineChartOutlined />} onClick={() => window.open(`https://dexscreener.com/${_.chain}/${_.contractAddress}`, '_blank')}>{label}</Button>
      )
    }
  },
  {
    title: 'Holdings',
    dataIndex: 'holdings',
    key: 'holdings',
    render: (value) => (`$${value}`)
  },
  {
    title: 'Price',
    dataIndex: 'priceUSD',
    key: 'priceUSD',
    render: (value) => (`$${value}`)
  },
  {
    title: '1hr %',
    dataIndex: 'priceChange1hr',
    key: 'priceChange1hr',
    render: (value) => (<span style={(parseFloat(value) > 0) ? { color: 'green' } : { color : 'red'}}>{value}</span>)
  },
  {
    title: '24hr %',
    dataIndex: 'priceChange24hr',
    key: 'priceChange24hr',
    render: (value) => (<span style={(parseFloat(value) > 0) ? { color: 'green' } : { color : 'red'}}>{value}</span>)
  }
];

const TokensTable = (props) => {
  return (
    <Table columns={columns} dataSource={props.tokens} />
  )
}

export default TokensTable;
