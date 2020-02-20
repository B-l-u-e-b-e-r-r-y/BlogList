import React, { Component } from 'react';
import common from '../common';
import { Table, PageHeader } from 'antd';
import 'antd/dist/antd.css';

class Collection extends Component {
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

    collectAuthor = (post) => {
        const collects = [];
        const otherCollect = JSON.parse(localStorage.getItem('collect'));
        if (otherCollect.length > 0) {
            otherCollect.forEach((item) => {
                collects.push(item);
            });
        }
        collects.push({
            name: post.name,
            blogurl: post.blogUrl
        });
        localStorage.setItem('collect', JSON.stringify(collects));
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

    getToday = () => {
        const time = new Date();
        const year = time.getFullYear()
        let month = time.getMonth() + 1;
        let date = time.getDate();

        return year + '-' + month + '-' + date + ' 00:00';
    }

    isThisWeek = (td) => {
        const today = new Date(this.getToday());
        const thisWeekday = today.getDay();

        let sunday, monday;
        if (thisWeekday === 0) {
            sunday = today.getTime();
        } else {
            const timeGap = (thisWeekday - 1);
            monday = today.getTime() - (1000 * 60 * 60 * 24 * timeGap);
        }

        sunday = monday + (1000 * 60 * 60 * 24 * 7);
        const d = new Date(td).getTime();
        if (d < sunday && d > monday) {
            return true;
        }

        return false;
    }

    processData = (data) => {
        let posts = [];
        for (let i = 0; i < data.length; i++) {
            for (let p = 0; p < data[i].blogList.length; p++) {
                const name = data[i].name;
                const title = data[i].blogList[p].title;
                const blogurl = data[i].blogUrl;
                const url = data[i].blogList[p].url;
                const updateTime = data[i].updateTime;

                posts.push({
                    key: i + url,
                    name: name,
                    blogurl: blogurl,
                    post: { title, url },
                    updateTime: updateTime
                });
            }
        }

        posts = posts.filter((item) => {
            const updateTime = this.get24HourTime(item.updateTime);
            return this.isThisWeek(updateTime) === true;
        });

        const collects = JSON.parse(localStorage.getItem('collect'));

        if (collects) {
            const collection = [];
            for (let p = 0; p < posts.length; p++) {
                const pkey = posts[p].name + posts[p].blogurl;
                for (let c = 0; c < collects.length; c++) {
                    const ckey = collects[c];
                    if (pkey === ckey) {
                        collection.push(posts[p]);
                    }
                }
            }

            this.setState({
                data: collection
            });
        }
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
                    title='我的收藏'
                    subTitle='顯示已收藏作者的當週文章'
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

export default Collection;