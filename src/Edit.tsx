import React, {useState} from 'react';
import Axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {

    TextField,
    Stack,

    ButtonGroup,
    IconButton
} from '@mui/material';


type props ={
    id:number
}
const Edit = (props:props) => {
    const [review, setReview] = useState("");
    const [edit, setEdit] = useState(false);

    const changeRequest = () => {
        if (review != "") {
            Axios.post("http://localhost:3001/api/alter", {id:props.id, review:review})
            window.location.reload();

        }
    }
    const deleteRequest = (id: number) => {
        Axios.post(`http://localhost:3001/api/delete/${id}`
        ).then(() => {

        })
        window.location.reload();


    }
    const handleClick = (id: number) => {
        deleteRequest(id)
    }

    return (
        <Stack direction="row" sx={{width: "100%"}}>

            {edit ? <TextField sx={{marginRight: "auto", width: "75%"}}
                               onChange={(e) => setReview(e.target.value)}/> : ""
            }
            {edit ? <IconButton onClick={changeRequest}>
                <SendIcon/>
            </IconButton> : ""}

            <ButtonGroup sx={{marginLeft: "auto"}}>
                <IconButton>
                    <EditIcon className="editIcon" onClick={() => {
                        setEdit(!edit)
                    }}/>
                </IconButton>
                <IconButton onClick={() => handleClick(props.id)}>
                    <DeleteOutlineIcon className="deleteIcon"/>
                </IconButton>
            </ButtonGroup>
        </Stack>
    );
};

export default Edit;