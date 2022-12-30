import React from "react";
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState } from "react";


function CommentForm(props) {
    const {userId, userName, postId } = props;
    const[text, setText] = useState("");

    const saveComment = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log("err"))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
    }
    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent>
            <OutlinedInput
                id="outlined-adornment-input"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link style={{ textDecoration: 'none' }} to={{ pathname: '/users/' + userId }}>
                            <Avatar style={{
                                background: 'linear-gradient(45deg, #2196F3  30%, #21CBF3 90%)',
                                color: 'white'
                            }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
            
                value = {text}
                style={{ color: "black", backgroundColor: "white" }}
            ></OutlinedInput>
        </CardContent>
    )
}


export default CommentForm;