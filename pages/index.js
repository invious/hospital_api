import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import InterventionCard from "../components/InterventionCard";
import useDebounce from "../hooks/useDebounce";
import * as queryString from "query-string";

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

function searchInterventions(name, category) {
    const params = {
        ...(name && { name }),
        ...(category && { category }),
    }
    const query = queryString.stringify(params);
    return fetch(
        `https://clinicaltrialsapi.cancer.gov/v1/interventions?${query}`,
        {
            method: 'GET'
        }
    )
        .then(r => r.json())
        .then(r => r.terms)
        .catch(error => {
            console.error(error);
            return [];
        });
}

export default function TrialSearch() {
    const classes = useStyles();
    const [keywordTerm, setKeywordTerm] = useState('');
    const [categoryTerm, setCategoryTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [debouncedKeywordTerm, debouncedCategoryTerm] = useDebounce(keywordTerm, categoryTerm, 500);

    useEffect(
        () => {
            if (debouncedKeywordTerm || debouncedCategoryTerm) {
                setIsSearching(true);
                searchInterventions(debouncedKeywordTerm, debouncedCategoryTerm).then(results => {
                    setIsSearching(false);
                    setResults(results);
                });
            } else {
                setResults([]);
            }
        },
        [debouncedKeywordTerm, debouncedCategoryTerm]
    );


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
                                placeholder="Intervention Keywords"
                                onChange={e => setKeywordTerm(e.target.value)}
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
                                placeholder="Intervention Category"
                                onChange={e => setCategoryTerm(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.cardsGrid}>
                            {results && results ? results.map(result => <InterventionCard {...result}/>) : null}
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
