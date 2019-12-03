import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import InterventionCard from "../components/InterventionCard";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    }
}));

const mockIntervention = {
        "name": "Anthracycline Antineoplastic Antibiotic",
        "codes": [
            "C1594"
        ],
        "synonyms": [
            "Anthracyclines",
            "Chemotherapy, Cancer, Anthracyclines"
        ],
        "category": "agent category",
        "count": 435
    }

export default function TrialSearch() {
    const classes = useStyles();


    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Search Interventions
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                InputProps={{
                                    endAdornment: <InputAdornment><SearchIcon /></InputAdornment>,
                                }}
                                name="keywords"
                                variant="outlined"
                                required
                                fullWidth
                                id="keywords"
                                label="Keywords"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                InputProps={{
                                    endAdornment: <InputAdornment><FilterListIcon /></InputAdornment>,
                                }}
                                name="category"
                                variant="outlined"
                                required
                                fullWidth
                                id="category"
                                label="Category"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.cardsGrid}>
                            <InterventionCard {...mockIntervention}/>
                            <InterventionCard {...mockIntervention}/>
                            <InterventionCard {...mockIntervention}/>
                            <InterventionCard {...mockIntervention}/>
                            <InterventionCard {...mockIntervention}/>
                            <InterventionCard {...mockIntervention}/>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
