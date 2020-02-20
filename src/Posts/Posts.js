import React, { Component } from 'react';
import common from '../common';
import { Table, PageHeader, Input, Icon } from 'antd';
import 'antd/dist/antd.css';
const { Search } = Input;

class Posts extends Component {
    constructor() {
        super();

        this.state = {
            data: []
        }

        this.columns = [
            { title: '作者', dataIndex: 'name', key: 'name', width: '15%' },
            {
                title: '文章',
                dataIndex: 'post',
                key: 'post',
                width: '65%',
                render: (post) => {
                    return (
                        <a href={post.url} target='_blank'>{new common().subLongString(post.title, 80)}</a>
                    )
                },
            },
            {
                title: '更新時間',
                dataIndex: 'updateTime',
                key: 'updateTime',
                width: '20%'
            },
        ];

        this.fetch();
    }

    filterPost = (title) => {
        const filtered = this.state.data.filter((item) => {
            return item.post.title.indexOf(title) > -1;
        });

        this.setState({
            data: filtered
        });
    }

    get24HourTime = (time) => {
        let millisecond;
        if (time.indexOf('上午') > -1) {
            const timeString = time.replace('上午', '');
            millisecond = new Date(timeString).getTime();
        } else if (time.indexOf('下午') > -1) {
            const timeString = time.replace('下午', '');
            millisecond = new Date(timeString).getTime() + (12 * 60 * 60 * 1000);
        }

        return millisecond;
    }

    processData = (data) => {
        let posts = [];
        for (let i = 0; i < data.length; i++) {
            for (let p = 0; p < data[i].blogList.length; p++) {
                const name = data[i].name;
                const title = data[i].blogList[p].title;
                const url = data[i].blogList[p].url;
                const updateTime = data[i].updateTime;

                posts.push({
                    key: i + url,
                    name: name,
                    post: { title, url },
                    updateTime: updateTime
                });
            }
        }

        posts = posts.sort((a, b) => {
            const aTime = this.get24HourTime(a.updateTime);
            const bTime = this.get24HourTime(b.updateTime);
            return aTime > bTime ? -1 : 1;
        });

        this.setState({
            data: posts
        });
    }

    fetch = () => {
        const api = 'https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json';
        new common().fetchData(api)
            .then((res) => {
                this.processData(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render = () => {
        return (
            <div className='Table'>
                <PageHeader
                    style={{
                        border: '1px solid rgba(0,0,0,0.08)',
                    }}
                    title='所有文章'
                    subTitle=''
                />
                <Search
                    className='search'
                    placeholder='搜尋文章'
                    onSearch={
                        (value) => {
                            this.filterPost(value);
                        }
                    }
                    style={{ width: 200 }}
                />
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    size='small'
                />
            </div>
        );
    }
}

export default Posts;