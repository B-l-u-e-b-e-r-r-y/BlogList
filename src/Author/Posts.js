import React from 'react';
import { Table } from 'antd';

const columns = [
    { 
        title: '文章',
        dataIndex: 'post',
        key: 'post',
        width: '80%',
        render: (post) => {
            return (
                <a href={post.url} target='_blank'>{post.title}</a>
            )
        }
    },
    { title: '更新日期', dataIndex: 'date', key: 'date', width: '20%' },
];

const Post = (props) => {
    const data = [];
    for (let i = 0; i < props.item.blogList.length; i++) {
        const title = props.item.blogList[i].title;
        const url = props.item.blogList[i].url;
        const updateTime = props.item.updateTime;

        data.push({
            key: i,
            post: {
                title: title,
                url: url
            },
            date: updateTime,
        });
    }

    return (<Table columns={columns} dataSource={data} pagination={false} size='small' />);
}

export default Post;