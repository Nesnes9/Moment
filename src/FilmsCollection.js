import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { relative } from 'path';
import color from '@material-ui/core/colors/blue';

class FilmsCollection extends Component {
    cardClicked = (filmId) => {
        this.props.showFilmModal(filmId)
    }

    render() {
        return (
            <div style={styles.container}>
                {
                    this.props.data.map((film) => <Card onClick={() => this.cardClicked(film.id)} style={styles.card} elevation={24}>
                        <CardHeader
                            title={film.title}
                            
                        />
                        <CardMedia 
                            image={'https://image.tmdb.org/t/p/w500' + film.poster_path}
                            title={film.title}
                            style={styles.media}
                        />
                    </Card>)
                }
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    card: {
        width: 200,
        height: 300,
        margin: 20,
        flexBasis: '20%',
        
        
       
    },
    media: {
       height : '50%',
       border : '30%',
    
       
        
    },
}

export default FilmsCollection;
