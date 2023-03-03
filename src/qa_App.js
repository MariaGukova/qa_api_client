import React from 'react';
import reducer from './qa_Tester';
import axios from 'axios';

import Analysis from './components/Analysis';
import socket from './socket';
import Bug from './components/Bug';

function Qa_App() {
  const [state, dispatch] = React.useReducer(reducer, {
      joined: false,
      roomId: null,
      userName: null,
      users: [],
      messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type:'NEW_MESSAGE',
      payload: message,
    });
  };

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined ? <Analysis onLogin={onLogin} /> : <Bug {...state} onAddMessage={addMessage} />}
    </div>
  );
}

export default Qa_App;
