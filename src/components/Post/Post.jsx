const Post = (props) => {
    return (
        <div className="Post">
            <h1 className="Post__title">{props.title}</h1>
            <div className="Post__container">
                <p className="Post__userId">{props.userId}</p>
                <p className="Post__body">{props.body}</p>
            </div>

        </div>
    )
}

export default Post;