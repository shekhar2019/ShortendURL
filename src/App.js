import React from 'react';
import logo from './logo.svg';
import './App.css';
let rebrandlyClient = require("./rebrandly.js")

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGenerated: false,
      url: '',
    };
  }
  componentWillMount() {

  }

  generateURL(url) {
    let rebrandlyClient = require("./rebrandly.js")
    let slashtag = `test-${Math.floor(Math.random() * 999999)}`
    
    let linkDef = {
      "title": "Shortend link",
      "slashtag": slashtag,
      "destination": url
    };

    let onError = (err) => {
      console.log(JSON.stringify(err))
    }

    let onLinkCreated = (link) => {
      //console.log(`Link ID is ${link.id}`)
      let shortUrl = `https://${link.shortUrl}`
      this.setState({ ShortURL: shortUrl }, () => {
        this.render();
      })
      console.log(`Short URL is: https://${link.shortUrl}`)
      //console.log(`Destination URL is: ${link.destination}`)
    }

    rebrandlyClient.createNewLink(linkDef, onLinkCreated, onError);
  }

  generate = () => {
    this.setState({ isGenerated: true }, () => {
      this.generateURL(this.state.url);
    })
    
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  render() {
    return (
      <div className="App">
        <div style={{padding:'30px'}}><b>Enter the url and click on button to get the short Url.</b></div>
        <div style={{padding:'30px'}}>Enter URL: </div><br/><input type="text" name="url" value={this.state.url} onChange={e => this.handleChange(e)}></input>
        <button type="button" onClick={this.generate} style={{marginLeft: '10px'}}>ShortUrl</button>
        <br></br>
        {
          this.state.isGenerated &&
          <div style={{marginTop: '30px'}}> Processed URL : 
          <a
            className="App-link"
            href={this.state.ShortURL}
            target="_blank"
          >
            {this.state.ShortURL}
          </a>
          </div>
        }
      </div>

    );
  }
}

export default App;
