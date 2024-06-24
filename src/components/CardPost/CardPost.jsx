import postStyle from './CardPost.module.scss'
import feedStyle from '../Feed/Feed.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CardPost({ p }) {
    const [saved, setSaved] = useState([]);

    const handleSave = () => {
        if (!saved.includes(p.id)) {
            setSaved([...saved, p.id]);
        } else {
            setSaved(saved.filter((id) => id !== p.id));
        }
    }

    console.log(saved)

    return (
        <div className={`col-12 col-md-8 d-flex mb-5 ${feedStyle.post_feed}`}>
            <div className="img me-4">
                <img src={p.image} alt="" className={`img-fluid ${feedStyle.poster}`} />
            </div>
            <div className={feedStyle.summary}>
                <h4>{p.title}</h4>
                <p className="text-secondary-emphasis mt-2">{p.content.substring(0, 100)}...</p>
                <div className={`d-flex align-items-center mt-3 gap-3`}>
                    {p.published ? (
                        <>
                            <Link to={`/post/${p.slug}`}><button className="btn btn-outline-success p-1">Read more</button></Link>
                            <i className={`fas fa-bookmark ${feedStyle.fa_bookmark}`} onClick={() => {
                                handleSave()
                            }}></i>
                        </>
                    ) : (<p>Not published yet</p>)}

                </div>
            </div>
        </div >
    )
}