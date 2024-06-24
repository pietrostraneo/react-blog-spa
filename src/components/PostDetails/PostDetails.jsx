import postStyle from './PostDetails.module.scss'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { MdEditNote, MdDelete } from "react-icons/md";
import axios from 'axios'

export default function PostDetails() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)

    const userData = localStorage.getItem('user')
    const user = userData ? JSON.parse(userData) : null


    useEffect(() => {
        async function fetchPost() {
            try {
                let response = await axios.get(`http://localhost:3000/posts/${slug}`);
                let { data } = response.data;
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        }

        fetchPost()

    }, [slug])

    function getFormattedDate(p) {
        const date = new Date(p.createdAt)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate
    }

    async function deletePost(id) {
        try {
            await axios.delete(`http://localhost:3000/posts/${slug}`);
            window.location.href('/');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    return (
        <>
            {post && (
                <>
                    <div className="container">
                        <div className="row mt-5 justify-content-center text-white">

                            <div className="col-12 col-md-8">
                                <article>

                                    <section className='d-flex justify-content-between'>
                                        <div className="titles">
                                            <h2 className={`fw-bold`}>{post.title}</h2>
                                            <p className={`${postStyle.sub_color}`}>by {post.User.username}</p>
                                            <p className={`${postStyle.sub_color}`}>{getFormattedDate(post)}</p>
                                        </div>

                                        {user && post.User.username === user.username && (
                                            <div className="buttons">
                                                <Link to={`/edit/${slug}`} className={`mx-2 ${postStyle.buttons}`}><MdEditNote /></Link>
                                                <button onClick={() => deletePost(post.id)} className={`${postStyle.buttons}`}><MdDelete /></button>
                                            </div>
                                        )}
                                    </section>

                                    <figure>
                                        <img src={post.image} alt="" className='img-fluid' />
                                    </figure>

                                    <section>
                                        <p>{post.content}</p>
                                    </section>
                                </article>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
