import React from 'react';
import './App.css';
import DisplayMessages from './Components/DisplayMessages';
import { useState } from 'react';
import Input from './Components/Input';
import { useEffect } from 'react';

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

  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor()
  });
  console.log(messages);

  const [drone, setDrone] = useState(null);

  useEffect(() => {
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
    setDrone(drone);
  }, [])

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message
    });
  }

  return (
    <div className="App">
      <DisplayMessages messages={messages} currentMember={member}/>
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}
