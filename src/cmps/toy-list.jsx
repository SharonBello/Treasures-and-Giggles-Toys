import { ToyPreview } from "./toy-preview.jsx"
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export function ToyList({ toys, onRemoveToy }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(toys).map((toy, index) => (
                <ul className="toy-list">
                 <ToyPreview  toy={toy} key={toy._id}  onRemoveToy={onRemoveToy}/>
                </ul>
                    ))}
            </Grid>
        </Box>
    )
}