import React, {useEffect, useState} from 'react';
import './App.css';
import {
    Typography,
    TextField,
    Stack,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    ButtonGroup,
    IconButton
} from '@mui/material';
import Axios from "axios"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from "@mui/icons-material/Send";
import Edit from "./Edit";


function App() {
    const [movieName, setMovieName] = useState("");
    const [review, setReview] = useState("");
    const [movieReviewList, setMovieReviewList] = useState([])


    function getData() {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            console.log(response.data)
            setMovieReviewList(response.data)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const submit = () => {
        if (!(movieName == "" || review == "")) {
            Axios.post("http://localhost:3001/api/insert", {movieName: movieName, movieReview: review}
            )
            window.location.reload();
        }

    }


    return (
        <div className="App">
            <Typography>CRUD app</Typography>
            <Stack spacing={2}>
                <TextField label="Movie Name" onChange={(e) => setMovieName(e.target.value)}/>
                <TextField label="review" onChange={(e) => setReview(e.target.value)}/>
                <Button variant="contained" onClick={submit}>Submit</Button>

                <Grid container spacing={2}>
                    {movieReviewList.map((movie: any) => {
                        return (
                            <Grid item xs={10} lg={6} sx={{margin: "auto"}}>
                                <Card sx={{maxWidth: "80%", margin: "auto"}}>
                                    <CardContent>
                                        <Typography variant="h6">{movie.movieName}</Typography>
                                        <Typography variant="body2">{movie.movieReview}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Edit id={movie.id}/>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )

                    })}
                </Grid>

            </Stack>


        </div>
    );
}

export default App;
