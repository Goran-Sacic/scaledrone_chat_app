import React from 'react';
import './App.css';
import DisplayMessages from './Components/DisplayMessages';
import { useState } from 'react';
import Input from './Components/Input';
import { useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LogOut from './Components/LogOut';

function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: '',
    color: randomColor()
  });
  
  const [activeMembers, setActiveMembers] = useState([])

  const [drone, setDrone] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    setMember({ ...member, username: username });
  } 

  useEffect(() => {
    if (loggedIn) {
      const drone = new window.Scaledrone("eA7DyJASg2dxabND", {
        data: member
      });
      drone.on('open', error => {
        if (error) {
          return console.error(error);
        }
        const updatedMember = {...member};
        updatedMember.id = drone.clientId;
        setMember(updatedMember)
        }) 
        const room = drone.subscribe("observable-room");
        room.on('data', (data, member) => {
          setMessages(messages => [...messages, {member, text: data}])
        })
        room.on('members', (members) => {
          const allMembers = members;
          setActiveMembers(allMembers);
        })
        room.on('member_join', member => {
          const allMembers = (activeMembers) => [...activeMembers, member];
          setActiveMembers(allMembers);
          console.log(member.clientData.username);
          console.log(member.clientData.color);
          console.log(activeMembers);
        })
        room.on('member_leave', member => {
          setActiveMembers((activeMembers) =>
            activeMembers.filter((m) => m.id !== member.id))
        })
      
      setDrone(drone);
    }
    }, [loggedIn])

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message
    });
  }

  if (!loggedIn) {
    return (
      <div className="App-input-username">
        <div className="input-container">
          <div className="Input">
            <h1>Bla bla - ChatApp</h1>
            <form className="form-log-in" onSubmit = {handleSubmit}>
              <input className="input-username" onChange={handleChange} placeholder="Unesi username i odaberi boju..."/>
              <input className="colorpicker" type="color" value={member.color} onChange={(e) => setMember({...member, color: e.target.value})}/>
              <button className="button-active3" type="submit">LOG IN</button>
            </form>
            <p>N7 Technologies</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="App">  
        <Header />
        <DisplayMessages messages={messages} currentMember={member}/>
        <Input onSendMessage={onSendMessage} />
        <LogOut setLoggedIn={setLoggedIn} setActiveMembers={setActiveMembers} member={member}/>
        <Footer />
        <div className="display-aktivnih-korisnika">
        <p>Trenutno logiran kao: <span style={{color: member.color}}>{username}</span></p> 
        <p>Korisnici online:</p>
          <ul>
            {activeMembers.map((member, index) => (<li style={{color:member.clientData.color}} key={index}>{member.clientData.username}</li>))}
          </ul>
        </div> 
      </div>
    </div>
  );
}