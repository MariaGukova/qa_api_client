import React from "react";
import axios from 'axios';

function Analysis({ onLogin }){
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName)  {
      return alert('Incorrect input!');
    }
    const obj = {
      roomId,
      userName,
    };
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
        <div className="join-block">
          <input type="text" placeholder="RoomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
          <input type="text" placeholder="Ваше имя" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <button disabled={isLoading} onClick={onEnter} className="btn btn-success">
            {isLoading ? 'Вход...': 'ВОЙТИ'}
          </button>
        </div>
    );
}

export default Analysis;