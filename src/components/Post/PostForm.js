import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from "react-router-dom";
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function PostForm(props) {
    const { userId, userName, refreshPost } = props;
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("")
        refreshPost();
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <div className="postContainer">
            <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your Post is sent!
                </Alert>
            </Snackbar>
            <Card style={{ width: 800, textAlign: 'left', margin: 20 }}>
                <CardHeader
                    avatar={
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{
                                background: 'linear-gradient(45deg, #2196F3  30%, #21CBF3 90%)',
                                color: 'white'
                            }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput
                        id="outlined-adornment-input"
                        multiline
                        placeholder="Title"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={(i) => handleTitle(i.target.value)}
                    >
                    </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {<OutlinedInput
                            id="outlined-adornment-input"
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        style={{
                                            background: 'linear-gradient(45deg, #2196F3  30%, #21CBF3 90%)',
                                            color: 'white'
                                        }}
                                        onClick={handleSubmit}
                                    >Post</Button>
                                </InputAdornment>}
                        >
                        </OutlinedInput>}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )

}

export default PostForm;