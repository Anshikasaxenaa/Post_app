import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Feed = () => {

    const [posts, setPosts]= useState([{
        _id:"1",
        image: "https://images.unsplash.com/photo-1448973460843-358384db68c7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMzIxNDg3fHxlbnwwfHx8fHw%3D",
        caption:"Men on the bridge"
    }
    ])

    useEffect(()=>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            setPosts(res.data.posts)
            
        })
    })

  return (
    <section className='feed-section'>
        {
            posts.length>0?(
                posts.map( (post) =>(
                    <div key={post._id} className='post-card'>
                        <img src={post.image} alt={post.caption} />
                        <p>{post.caption}</p>
                    </div>
                ))
            ) : (
                <h3>No post available</h3>
            )
        }
    </section>
  )
}

export default Feed
