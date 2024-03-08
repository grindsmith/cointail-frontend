// Libraries
import Moment from 'moment';
import { useRouter } from 'next/router';

// Components
import { Button, Space, Table, Tag  } from 'antd';

const GroupsTable = (props) => {
  const router = useRouter();

  const columns = [{
    title: '',
    dataIndex: 'id',
    key: 'id',
    render: (id) => {
      return(<Button type="primary" onClick={() => {
        router.push(`/group/${id}`)
      }}>View</Button>)
    }
  },{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => {
      return(<span style={{ fontWeight: '600', fontSize: '16px' }}>{text}</span>)
    }
  },{
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },{
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (date) => {
      return(<div>{Moment(date).format('L')}</div>)
    }
  }];

  return (<Table columns={columns} dataSource={props.groups} />)
}

export default GroupsTable;
