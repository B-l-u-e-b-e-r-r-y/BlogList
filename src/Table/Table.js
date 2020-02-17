import React from 'react';
import { Collapse, Table } from 'antd';
import 'antd/dist/antd.css';
import './Table.css';

const { Panel } = Collapse;

// const columns = [
//     { title: '作者', dataIndex: 'name', key: 'name' },
//     { title: 'Blog', dataIndex: 'blog', key: 'blog' },
//     {
//         title: '收藏',
//         dataIndex: '',
//         key: 'x',
//         render: () => <a>愛心</a>,
//     },
// ];

// const data = [
//     {
//         key: 1,
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//     },
//     {
//         key: 2,
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//         description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//     },
//     {
//         key: 3,
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sidney No. 1 Lake Park',
//         description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
//     },
// ];

const filterBlog = (data, url) => {
    const filtered = data.filter((item) => {
        return item.blogUrl === url;
    });

    return filtered;
}

const BlogTable = (props) => {
    console.log(props.data);
    const url = {};
    for (let i = 0; i < props.data.length; i++) {
        const blogUrl = props.data[i].blogUrl;
        const name = props.data[i].name;
        const updateTime = props.data[i].updateTime;

        if (!url[blogUrl]) {
            url[blogUrl] = {
                name: name,
                updateTime: updateTime
            };
        }
    }

    for (let blogurl in url) {
        const filtered = filterBlog(props.data, blogurl);
        url[blogurl].posts = filtered;
    }

    const allBlog = Object.keys(url);
    return (
        <Collapse defaultActiveKey={['1']}>
            {allBlog.map((item, index) => {
                const title = url[item].name + '｜' + item;
                return (
                    <Panel header={title} key={index}>
                        {url[item].posts.map((post, i) => {
                            const title = post.blogList[0].title;
                            const url = post.blogList[0].url;
                            const update = post.updateTime;
                            return <p key={i}>{title}{url}{update}</p>
                        })}
                    </Panel>
                );
            })}
        </Collapse>
    );
}

export default BlogTable;