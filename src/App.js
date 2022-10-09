import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  function handlesignout() {
    setUser(null);
    document.getElementById('my-signin2').style.display = 'block';
  }
  function handlecallbackresponse(res) {
    console.log(res.credential);
    // decode the jwt token
    const decoded = jwt_decode(res.credential);
    console.log(decoded);
    setUser(decoded);
    document.getElementById('my-signin2').style.display = 'none';
  }
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: '177076594074-ngcmd7sdqrebg7bsa8pllq048g18shs2.apps.googleusercontent.com',
      callback: handlecallbackresponse
    })
    // render the button
    google.accounts.id.renderButton(
      document.getElementById('my-signin2'),
      { theme: 'dark', size: 'large', longtitle: true }
    )
    // google prompt
    google.accounts.id.prompt();
  }, []);
  return (
    <div className="App">
      <div id="my-signin2"></div>
      {user &&
        <div>
          <div>
            <button onClick={() => {
              handlesignout();
            }}>
              logout
            </button>
          </div>
          <div>
            <h1>Hi {user.name}</h1>
            <h2>Your email is {user.email}</h2>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
