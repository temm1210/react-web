import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import NavBarImage from 'assets/images/navbar.jpg';

const styles = {
    cardWrap: {
        // maxWidth: 300,
        display: 'flex',
        flexFlow:'row wrap',
        margin:40,
        // alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        flexGrow:1,
        flexShrink:1,
        flexBasis:400,
        // minWidth:400,
        margin:10
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    textElipse: {
        flex:1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    username: {
        flex:3,
        paddingTop:10,
        paddingLeft:10,
        color:'rgba(150,150,150,.8)'
    },
    date: {
        paddingTop:10,
        color:'rgba(150,150,150,.8)'
    },
    iconSize: {
        fontSize:20
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'row-reverse'
    }
};

const tileData = [
    {
        img     : require('../../../assets/images/join.png'),
        title   : 'join Image',
        author  : 'author1',
        date    : 2018,
        content : 'jafdijaioewjfoijwafiojaoijdfiojdsafiodsafoijdsafiosajdfiosajdfiojasfiojasdifojasdfo'
    },
    {
        img     : require('../../../assets/images/login.jpg'),
        title   : 'login Image',
        author  : 'author2',
        date    : 2017,
        content : 'jafdijaioewjfoijwafiojaoijdfiojdsafiodsafoijdsafiosajdfiosajdfiojasfiojasdifojasdfo'
    },
    {
        img     : require('../../../assets/images/navbar.jpg'),
        title   : 'navbar Image',
        author  : 'author3',
        date    : 2016,
        content : 'jafdijaioewjfoijwafiojaoijdfiojdsafiodsafoijdsafiosajdfiosajdfiojasfiojasdifojasdfo'
    },
    {
        img     : require('../../../assets/images/question.png'),
        title   : 'question Image',
        author  : 'author4',
        date    : 2015,
        content : 'jafdijaioewjfoijwafiojaoijdfiojdsafiodsafoijdsafiosajdfiosajdfiojasfiojasdifojasdfo'
    },
    {
        img     : require('../../../assets/images/question2.png'),
        title   : 'question2 Image',
        author  : 'author5',
        date    : 2014,
        content : 'jafdijaioewjfoijwafiojaoijdfiojdsafiodsafoijdsafiosajdfiosajdfiojasfiojasdifojasdfo'
    },
]

function ImgMediaCard(props) {

    const { classes } = props;
    return (
        <div className={classes.cardWrap}>
        {
            tileData.map((data, index) => (
                <Card className={classes.card} key={index}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            className={classes.media}
                            height="140"
                            image={data.img}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <div style={{display:'flex'}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {data.title}
                                </Typography>
                                <Typography component="span" className={classes.username}>
                                    {data.author}
                                </Typography>

                                <Typography component="span" className={classes.date}>
                                    {data.date}
                                </Typography>
                            </div>
                            <Typography component="p" className={classes.textElipse}>
                                {data.content}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}>
                        <Button size="small" color="primary" disabled>
                            <VisibilityIcon className={classes.iconSize}/>
                        </Button>
                        <Button size="small" color="primary" disabled>
                            <CommentIcon className={classes.iconSize}/>
                        </Button>
                    </CardActions>
                </Card>
            ))
        }
        </div>
    );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);