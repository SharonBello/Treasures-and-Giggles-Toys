import { Link } from 'react-router-dom'

import { utilService } from '../services/util.service.js'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArticleIcon from '@mui/icons-material/Article';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export function ToyPreview({ toy, onRemoveToy }) {

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#ffb2c9',
        },
        '& .MuiRating-iconHover': {
            color: '#E78EA9',
        },
    })

    return (
        <li className="toy-preview">
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={require(`../assets/img/${toy.name}.jpg`)}
                        alt="toys"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {toy.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>Description:</b><br></br>
                            {utilService.makeLorem()}
                        </Typography><br></br>
                        <Typography variant="body1" >
                            <b>Price: $</b>{toy.price}
                        </Typography>
                        <Typography variant="body1">
                            <b>Type: </b><span>{toy.labels.map((label, idx) => {
                                return (idx === toy.labels.length - 1) ? label : label + ', '
                            })}</span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Stack direction="row" spacing={2}>
                        <ButtonGroup color="secondary" aria-label="medium secondary button group">
                            <Button onClick={() => onRemoveToy(toy._id)} variant="outlined" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>

                            <Link to={`/toy/edit/${toy._id}`}><Button variant="contained" startIcon={<EditIcon />}>
                                Edit
                            </Button>
                            </Link>
                            <Link to={`/toy/${toy._id}`}><Button variant="contained" startIcon={<ArticleIcon />}>
                                Details
                            </Button>
                            </Link>
                        </ButtonGroup>
                    </Stack>

                </CardActions>
                <CardContent>
                    <Box
                        sx={{ '& > legend': { mt: 2 }, }}>
                        <StyledRating
                            name="customized-color"
                            fullWidth
                            defaultValue={2}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                    </Box>
                </CardContent>
            </Card>
        </li>
    )
}
