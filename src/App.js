import React from 'react';
import Navigation from './components/navigitaion/navigationJs';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { Component } from 'react/cjs/react.production.min';
import Particles from "react-tsparticles";
import SignIn from './components/SignIn/SignIn';

const app = new Clarifai.App({
  apiKey: '7a161886765f4a21bb00d854313cc233'
 });



const particlesInit = (main) => {
      
  
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    };
const particlesLoaded = (container) => {
      console.log(container);
    };

class App extends Component {
  constructor(){
    super();
    this.state ={
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row* height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height- (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox =(box) => {
    console.log(box);
    this.setState({box: box});
  }


  onInputChange =(event) =>{
    this.setState({input: event.target.value});
  }
  onButtonSubmit =() => {
    this.setState({imageUrl:this.state.input });
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log('error', err));
      }
  //   const raw = JSON.stringify({
  //     "user_app_id": {
  //       "user_id": "{YOUR_USER_ID}",
  //       "app_id": "{YOUR_APP_ID}"
  //     },
  //     "inputs": [
  //       {
  //         "data": {
  //           "image": {
  //             "url": "https://samples.clarifai.com/metro-north.jpg"
  //           }
  //         }
  //       }
  //     ]
  //   });
    
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Authorization': 'Key {YOUR_PERSONAL_TOKEN}'
  //     },
  //     body: raw
  //   };
    
  //   // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  //   // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  //   // this will default to the latest version_id
    
  //   fetch("https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/versions/{MODEL_VERSION_ID}/outputs", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data))
  //     .catch(error => console.log('error', error));
  // }
  onRouteChange =(route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  render(){
  return (
    <div className="App">
<Particles className='particels'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 6,
          },
        },
        detectRetina: true,
      }}
    />        
         <Navigation isSignedIn ={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
         { this.state.route ==='home'

         ?<div>       
          <Logo />
         <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
         </div>
        :(
          this.state.route ==='SignIn' ?
         <SignIn onRouteChange={this.onRouteChange} />
        : <Register onRouteChange={this.onRouteChange} />
        )
        }
    </div>
  );
  }
}

export default App;
