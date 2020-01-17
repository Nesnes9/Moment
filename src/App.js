import React, {Component} from 'react';
import './App.css'
import FilmsCollection from './FilmsCollection'
import _ from 'lodash'
import Modal from '@material-ui/core/Modal';
import BottomScrollListener from 'react-bottom-scroll-listener';
//import { AutoComplete } from 'material-ui';

export default class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            modalOpen: false,
            filmModal: {},
            nextPage: 2,
        }
    }

    showFilmModal = (filmId) => {
        const filmToShow = _.find(this.state.films, { id: filmId })
       // alert(filmToShow.title)
        this.setState({
            modalOpen: true,
            filmModal: filmToShow
        })
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=114ce763417eddc9383aaffd90559895', {})
            .then(res => res.json())
            .then(apiResults => {
                const results = apiResults.results
                this.setState({
                    films: results
                })
            })
    }

    fetchMoreFilms() {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=114ce763417eddc9383aaffd90559895&page='+this.state.nextPage, {})
            .then(res => res.json())
            .then(apiResults => {
                const results = apiResults.results
                this.setState({
                    films: _.concat(this.state.films, results),
                    nextPage: this.state.nextPage +1
                })
            })

    }
    
    handleClose = () => {
        this.setState({ modalOpen: false })
    }

    render() {
        const filmModal = this.state.filmModal

        return (
            <div className="App">
                <h1 className="Title">Movies of the Moment</h1>
            

                
                <FilmsCollection data={this.state.films} showFilmModal={this.showFilmModal}/>

                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                >
                    <div style={{
                        backgroundColor:'beige',
                        position: 'relative',
                        width: 400,
                        top: '10%',
                        left: '35%',
                        padding: '15px',

                        

                        }}>

                    <h2 style={{ display: 'flex', justifyContent: 'center', }} >{filmModal.title}</h2>

                    <img
                            src={'https://image.tmdb.org/t/p/w500' + filmModal.poster_path}
                            style={{ 
                            position: 'static',   
                            height: 300,
                            width: 400 }}
                        />

                    
                         <p>

                           <strong>Date de sortie : </strong>  
                        {
                            filmModal.release_date
                        }

                        </p>

                             <p>
                             <strong> Synopsis : </strong>
                             </p>

                        <p>
                        {
                            filmModal.overview
                        }
                        </p>
                    </div>
                </Modal>
                <BottomScrollListener onBottom={() => this.fetchMoreFilms()} />

            </div>
        )
    }

}
