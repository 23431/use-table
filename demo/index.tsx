import React from 'react';
import ReactDOM from 'react-dom';
import useTable, {HttpResult} from '../src';
import {Table} from "antd";

const App = () => {

    const getData = (): Promise<HttpResult> => {
        return Promise.resolve({list: [{name: '1'}], total: 1})
    }

    const {data, loading, pagination, submit, reset} = useTable<{ name: string }>(getData);

    return <div>
        <Table dataSource={data} columns={[{dataIndex: 'name',}]} pagination={pagination} loading={loading}/>
    </div>
}

ReactDOM.render(<App/>, document.getElementById('app'));
