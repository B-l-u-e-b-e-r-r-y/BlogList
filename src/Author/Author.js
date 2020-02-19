import React, { Component } from 'react';
import common from '../common';
import Post from './Posts';
import { Table, PageHeader, Input } from 'antd';
import 'antd/dist/antd.css';
import './Author.css';
const { Search } = Input;

class Author extends Component {
    constructor() {
        super();

        this.state = {
            data: []
        }

        this.columns = [
            { title: '作者', dataIndex: 'name', key: 'name', width: '15%' },
            {
                title: 'Blog',
                dataIndex: 'blogUrl',
                key: 'blogUrl',
                width: '75%',
                render: (text) => {
                    return (
                        <a href={text} target='_blank'>{new common().subLongString(text, 100)}</a>
                    )
                },
            },
            {
                title: '',
                dataIndex: 'collect',
                key: 'collect',
                width: '10%',
                render: (text, record) => {
                    return (<a onClick={this.collectAuthor.bind(this, record)}>{text}</a>);
                },
                align: 'right'
            },
        ];

        this.fetch();
    }

    isAuthorAdded = (collects, key) => {
        const isAdded = collects.filter((item) => {
            return item === key;
        });

        if (isAdded.length > 0) {
            return true;
        }

        return false;
    }

    deleteAuthor = (key) => {
        const otherCollect = JSON.parse(localStorage.getItem('collect'));
        otherCollect.splice(otherCollect.findIndex((item) => {
            return item === key;
        }), 1);
        localStorage.setItem('collect', JSON.stringify(otherCollect));
    }

    collectAuthor = (post) => {
        const collects = [];
        const key = post.name + post.blogUrl;
        const otherCollect = JSON.parse(localStorage.getItem('collect'));
        if (otherCollect) {
            const isAdded = this.isAuthorAdded(otherCollect, key);
            if (isAdded) {
                this.deleteAuthor(key);
                window.location.reload();
                return;
            }

            otherCollect.forEach((item) => {
                collects.push(item);
            });
        }

        collects.push(key);
        localStorage.setItem('collect', JSON.stringify(collects));
        window.location.reload();
    }

    filterAuthor = (author) => {
        const filtered = this.state.data.filter((item) => {
            return item.name.indexOf(author) > -1;
        });

        this.setState({
            data: filtered
        });
    }

    processData = (res) => {
        const collects = JSON.parse(localStorage.getItem('collect'));
        const data = JSON.parse(JSON.stringify(res));
        for (let i = 0; i < data.length; i++) {
            const name = data[i].name;
            const blogUrl = data[i].blogUrl;
            const key = name + blogUrl;
            const isAdded = collects.filter((item) => {
                return item === key;
            });

            if (isAdded.length > 0) {
                data[i].collect = '取消收藏';
            } else {
                data[i].collect = '收藏';
            }

            data[i].key = i;
        }

        this.setState({
            data: data
        });
    }

    fetch = () => {
        const api = 'https://raw.githubusercontent.com/hexschool/w3hexschool-API/master/data.json';
        new common().fetchData(api)
            .then((res) => {
                // const data = JSON.parse(JSON.stringify(res));
                // data.forEach((item, index) => item.key = index);
                // this.setState({
                //     data: data
                // });
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
                    title='所有作者'
                    subTitle='按下作者左邊的 + 可查看作者的所有文章'
                />
                <Search
                    className='search'
                    placeholder='搜尋作者'
                    onSearch={
                        (value) => {
                            this.filterAuthor(value);
                        }
                    }
                    style={{ width: 200 }}
                />
                <Table
                    columns={this.columns}
                    expandedRowRender={(item) => <Post item={item} />}
                    dataSource={this.state.data}
                    size='small'
                />
            </div>
        );
    }
}

export default Author;