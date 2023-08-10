import FaceRecognition from '../Components/FaceRecognition/FaceRecognition.js'
import Navigation from '../Components/Navigation/Navigation.js';
import Register from '../Components/Register/Register.js'
import Img_url from '../Components/Img_url/Img_url.js'
import React, {Component ,useCallback} from 'react';
import Signin from '../Components/Signin/Signin.js'
import Logo from '../Components/Logo/Logo.js'
import Rank from '../Components/Rank/Rank.js'
import './App.css';



 




 



const initialState={
  input: '',
  imageUrl: '',
  box: {},
  route: 'signout',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 2,
    joined: ''
  }
}









class App extends Component {

  constructor()
  {
    
    super();
    this.state = initialState;
     
  }

  componentDidMount()
  {
    fetch('http://localhost:5000')
    .then(response=>response.json())
    .then(console.log);
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {


    if (!data || !data.outputs || data.outputs.length === 0) {
      // Invalid data, return empty object or handle the error case
      return {};
    }
  
    const regions = data.outputs[0].data.regions;
    if (!regions || regions.length === 0) {
      // No face detected, return empty object or handle the error case
      return {};
    }
  
    const clarifaiFace = regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
   
    fetch('http://localhost:5000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input 
      })
    })
    .then(response=>response.json())
      .then(response => {
      
        if (response) {
          fetch('http://localhost:5000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)


        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  




  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render(){
  return (
    <div className="App">


      




      
      
     
      
     
       
      <Navigation isSignedIn={this.state.isSignedIn}  onRouteChange={this.onRouteChange}/>
       {this.state.route === 'home'
       ? <div>
       <Logo/>
      <Rank userName={this.state.user.name}
       userEntries={this.state.user.entries}/>
      <Img_url 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}
       />


            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
   </div>
       : (
        this.state.route==='signin'
       ?<Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      
      
       )
         
  }
            </div>
          


  

    
   
  );
}
}

export default App;
  