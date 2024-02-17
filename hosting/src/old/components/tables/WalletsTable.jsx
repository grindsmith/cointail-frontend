// Libraries
import Moment from 'moment';
import { useRouter } from 'next/router';

// Components
import { Button, Space, Table, Tag  } from 'antd';

const WalletsTable = (props) => {
  const router = useRouter();

  const columns = [{
    title: '',
    dataIndex: 'address',
    key: 'address',
    render: (address) => {
      return(<Button type="primary" onClick={() => {
        router.push(`/wallet/${address}`)
      }}>View</Button>)
    }
  },{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, _) => {
      return(<Button type="link" onClick={() => {
        router.push(`/wallet/${_.address}`)
      }}>{name}</Button>)
    }
  },{
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },{
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (date) => {
      return(<div>{Moment(date).format('L')}</div>)
    }
  }];

  return (
    <Table columns={columns} dataSource={props.wallets} />
  );
}

export default WalletsTable;
