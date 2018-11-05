import React from 'react';
import { render } from 'react-dom';
import './index.css';
import './App.css';

import axios from 'axios';
import { Search } from './components/Search';

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
    return (
      <div>
        <Search search={this.giphyApi} />
        {this.renderImageList(this.state.gifUrlList)}
      </div>
    );
  }

  giphyApi = target =>  {
    const search = target;
    const key = process.env.REACT_APP_GIPHY_TOKEN;
    const limit = 50;
    
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      const data = res.data.data;

      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });    
    });
  }

  renderImageList(list) {
    const imageList = list.map((url, index) => {
      return (
        <li key={url} className="item">
          <img className="image" src={url} alt={`giphyImage-${index}`} />
        </li>
      )
    });

    return <ul className="list">{imageList}</ul>
  }
}

render(<App />, document.getElementById('root'));