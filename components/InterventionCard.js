import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 284,
        margin: 7.25,
    },
    cardContent: {
        padding: 0,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    list: {
        padding: '1%', // 16:9
    },
    listItemText: {
        margin: 0
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function InterventionCard({name, category, count, synonyms, codes}) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                action={
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b>COUNT: </b>{count}
                    </Typography>
                }
                title={name}
                subheader={category}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="textSecondary" component="p">
                    <List className={classes.list}>
                        {synonyms.map(syn => (
                            <ListItem dense>
                                <ListItemText className={classes.listItemText}
                                    primary={syn}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="body2" color="textSecondary" component="p">
                    <b>CODES: </b>{codes.join(', ')}
                </Typography>
            </CardActions>
        </Card>
    );
}
