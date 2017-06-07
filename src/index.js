import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import _ from 'lodash'

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyDgIx-NDgh8tJl9AHotRlUNJMxthQSC0QM'


class App extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            videos: [],
            selectedVideo: ''
        }

        this.videoSearch('starcraft 2')
    }

    videoSearch(term) {
        YTSearch({ 'key': API_KEY, term: term }, videos => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            })
        })

    }

    render() {
        const videoSearch = _.debounce( (term) => { this.videoSearch(term) }, 800)
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList onVideoSelect={ selectedVideo => this.setState({selectedVideo}) } videos={this.state.videos} />
            </div>
        )
    }
}

React.render(<App/>, document.querySelector('.container')) 

