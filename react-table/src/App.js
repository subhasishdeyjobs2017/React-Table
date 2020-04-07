import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      postsData: [],
      pageIndex: 0,
      allData: [],
    }
  }

  componentDidMount() {
    let counter = 0;
    setInterval(() => {
      fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${counter}`, {
        mode: 'cors',
      }).then(resp=> resp.json())
      .then(res => {
        //let newData = this.state.postsData.concat(res.hits)
        this.setState(prevState => ({
          postsData:  prevState.postsData.concat(res.hits),
        }))})
        counter++;
    }, 10000)
    
  }

  render() {
    console.log(this.state.postsData);
    return(
    <div className="main">
    <div className="row">
      <div className="column">
        Title
      </div>

      <div className="column">
        URL
      </div>
      <div className="column">
        Created_at
      </div>
      <div className="column">
        Author
      </div>
    </div>
    {this.state.postsData.map(elem => 
      <div className="childRow">
        <div className="column">
        {elem.title}
      </div>
      <div className="column">
      {elem.url}
      </div>
      <div className="column">
      {elem.created_at}
      </div>
      <div className="column">
      {elem.author}
      </div>
      </div>
    )}
    </div> 
    )

  }


}

export default App;
