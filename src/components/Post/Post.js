import React, { useState, useEffect, useRef } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function Post(props) {
    const { userId, userName, title, text, postId, likes} = props;

    const [expanded, setExpanded] = React.useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const[isLiked, setIsLiked] = useState(false);
    const isInitialMount = useRef(true);
    const[likeCount, setLikeCount] = useState(likes.length);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked)
            setLikeCount(likeCount+1);
        else    
            setLikeCount(likeCount-1);
    }

    const refreshComments = () => {
        fetch("/comments?postId=" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result);
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error);
                }
            )
    }

    const checkLikes = () =>{
        var likeControl = likes.find((like=>like.userId === userId));
        if(likeControl != null)
            setIsLiked(true);
    }

    useEffect(() => {
        if (isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
    }, [commentList])

    useEffect(() =>{checkLikes()},[])
    return (
        <div className="postContainer">
            <Card style={{ width: 800, textAlign: 'left', margin: 20 }}>
                <CardHeader
                    avatar={

                        <Link style={{ textDecoration: 'none' }} to={{ pathname: '/users/' + userId }}>
                            <Avatar style={{
                                background: 'linear-gradient(45deg, #2196F3  30%, #21CBF3 90%)',
                                color: 'white'
                            }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites">
                        <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                    </IconButton>
                    {likeCount}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed>
                        {error ? "error" :
                            isLoaded ? commentList.map(comment => (
                                <Comment userId={1} userName={"User"} text={comment.text}></Comment>
                            )) : "Loading"}
                        <CommentForm userId={1} userName={"User"} postId={postId}></CommentForm>
                    </Container>
                </Collapse>
            </Card>
        </div>
    )
}

export default Post;