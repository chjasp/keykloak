import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

const Secured = () => {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [greet, setGreet] = useState("");

  useEffect(() => {
    let _kc = Keycloak("/keycloak.json");

    _kc.init({ onLoad: "login-required" }).then((authenticated) => {
      setKeycloak(_kc);
      setAuthenticated(authenticated);
      let _username = _kc.tokenParsed?.preferred_username;
      setUsername(_username);
      if (authenticated) {
        window.accessToken = _kc.token;
      }
    });
  }, []);

  const fetchCmd = async () => {
    let getgreet = await fetch(`http://localhost:3000/test/user`, {
      method: "GET",
      withCredentials: true,
      // credentials: 'include',
      headers: {
        Authorization: "Bearer " + window.accessToken,
        "Content-Type": "application/json",
        "access-control-allow-origin": "http://localhost:3000/*",
      },
    });
    let ff = await getgreet.json();
    setGreet(ff.message);
    console.log(ff.message);
  };

  return (
    <div>
      {keycloak ? (
        authenticated ? (
          <div>
            SECURED{username}<button onClick={fetchCmd}>FETCH</button>
          </div>
        ) : (
          <div>UNABLE TO AUTHENTICATE</div>
        )
      ) : (
        <div>Initializing Keycloak</div>
      )}
    </div>
  );
};

export default Secured;
