import React from 'react';
import { Collapse } from 'antd';
import 'antd/dist/antd.css';
import './Table.css';

const { Panel } = Collapse;

const filterBlog = (data, url) => {
    const filtered = data.filter((item) => {
        return item.blogUrl === url;
    });

    return filtered;
}

const Table = (props) => {
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
                const title = url[item].name + '｜' + item + '｜' + url[item].updateTime;
                return (
                    <Panel header={title} key={index}>
                        { url[item].posts.map((post, i) => {
                            const title = post.blogList[0].title;
                            const url = post.blogList[0].url;
                            return <p key={i}>{title}{url}</p>
                        }) }
                    </Panel>
                );
            })}
        </Collapse>
    );
}

export default Table;