import React from 'react';
import { render } from 'react-dom';
import './index.css';

import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  componentDidMount() {
    this.giphyApi();
  }

  render () {
    console.log(this.state.gifUrlList);
    return <div>{this.renderImageList(this.state.gifUrlList)}</div>
  }

  giphyApi() {
    const search = 'cat';
    const key = process.env.REACT_APP_GIPHY_TOKEN;
    const limit = 3;
    
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      const data = res.data.data;

      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });    
    });
  }

  renderImageList(list) {
    const imageList = list.map(url => {
      return <li key={url}><img src={url} alt="cat" /></li>;
    });

    return <ul>{imageList}</ul>
  }
}

render(<App />, document.getElementById('root'));