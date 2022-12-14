import React from "react";
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from "react-router-dom";


function CommentForm(props){
    const {text, userId, userName} = props;

    return(
        <CardContent>
            <OutlinedInput 
                disabled
                id="outlined-adornment-input"
                multiline
                inputProps={{ maxLength: 25 }}
                fullWidth
                value = {text}
                startAdornment = {
                    <InputAdornment position = "start">
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
            style = {{ color:"black", backgroundColor:"white"}}    
            ></OutlinedInput>
        </CardContent>
    )
}


export default CommentForm;