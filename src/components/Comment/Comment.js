import React from "react";
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from "react-router-dom";


function Comment(props){
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
                    
                }
            style = {{ color:"black", backgroundColor:"white"}}    
            ></OutlinedInput>
        </CardContent>
    )
}


export default Comment;