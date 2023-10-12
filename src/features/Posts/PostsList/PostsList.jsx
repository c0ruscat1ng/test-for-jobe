import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import { useGetPostsQuery } from './../../../store/api.js';
import {NavLink} from "react-router-dom";
import classes from './PostsList.module.scss'

const PostsList = () => {
    const {data=[]}=useGetPostsQuery();
    const [scrollTop,setScrollTop]=useState(0);
    const containerHeight=650;
    const itemHeight=100;
    const overscan=3;

    const scrollElementRef=useRef(null);

    useLayoutEffect(()=>{
        const scrollElement=scrollElementRef.current;

        if(!scrollElement){
            return;
        }

        const handleScroll=()=>{
            const scrollTop=scrollElement.scrollTop;

            setScrollTop(scrollTop);
        }

        handleScroll();

        scrollElement.addEventListener('scroll',handleScroll);
        return()=>scrollElement.removeEventListener('scroll',handleScroll)
    },[])

    const virtualItems = useMemo(()=>{
        let rangeStart= scrollTop;
        let rangeEnd= scrollTop + containerHeight;

        let startIndex=Math.floor(rangeStart / itemHeight);
        let endIndex=Math.ceil(rangeEnd / itemHeight);

        startIndex=Math.max(0,startIndex-overscan);
        endIndex=Math.min(data.length,endIndex + overscan);

        const virtualItems=[];

        for(let index=startIndex; index < endIndex; index++){
            virtualItems.push({
                index,
                offsetTop:index*itemHeight,
            })
        }
        return virtualItems;
    },[scrollTop,data.length])
    console.log(data.length)
    const totalListHeight=itemHeight*data.length;

    return (
        <div ref={scrollElementRef} className={classes.posts__list}>
            <div style={{height:totalListHeight}} className={classes.posts__container}>
                {
                    virtualItems?.map((virtualItem=>
                    {
                        const post=data[virtualItem.index];
                        return(
                            <div className={classes.posts__item}
                                 key={post.id}
                                 style={{transform:`translateY(${virtualItem.offsetTop}px)`}}
                            >
                                <p className={classes.posts__number}>{post.id}</p>
                                <p className={classes.posts__title}>{post.title}</p>
                                <p className={classes.posts__content}>{post.body}</p>
                                <NavLink className={classes.post__btn} to={`/post/${post.id-1}`}>Просмотреть</NavLink>
                            </div>
                        )
                    }
                    ))
                }
            </div>
        </div>
    );
};

export default PostsList;