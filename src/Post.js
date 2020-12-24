import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
function Post({username, image, caption}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar alt="saddam" src="/static/images/avatar/l.jpg" className="post__avatar"/>
                <h3>{username}</h3>
            </div>
            <img 
            className="post__image"
                src={image}
                alt=""
            />
            <p className="post__text"><strong>{username}</strong>{caption}</p>
        </div>
    )
}

export default Post
