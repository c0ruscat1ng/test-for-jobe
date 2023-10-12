import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useGetPostsQuery} from "../../../store/api.js";
import classes from './PostDetail.module.scss'


const PostDetail = () => {
    const {data=[]}=useGetPostsQuery();
    const {id}=useParams();
    const post=data[id];

    return (
        <div className={classes.post__container}>
            <p className={classes.post__number}>Пост номер: {post.id} </p>
            <p className={classes.post__title}>Название: {post.title}</p>
            <p className={classes.post__text}>Содержание: {post.body}</p>
            <Link className={classes.post__button} to="/">Назад</Link>
        </div>
    );
};

export default PostDetail;