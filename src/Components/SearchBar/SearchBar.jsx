import { useEffect } from "react";
import { useState } from "react";

import { debounce } from "lodash";


function SearchBar() {
  const [accessToken, setAccessToken] = useState();

  const [queryArtist, setQueryArtist] = useState("Dimension");
  const [queryTrack, setQueryTrack] = useState("Generator");
  const [query, setQuery] = useState("")
    
  // debounce the search function to delay the API request until the user has finished typing
  const debouncedSearch = debounce(handleSearch, 500);

  // GET ACCESS TOKEN
  useEffect(() => {
    const getAccessToken = async () => {
      // check if access token is valid
      const accessTokenExpiration = localStorage.getItem(
        "accessTokenExpiration"
      );
      try {
        if (accessTokenExpiration && Date.now() < accessTokenExpiration) {
          setAccessToken(JSON.parse(localStorage.getItem("accessToken")));

          console.log("AccessToken Valid");
        }
        // token expired or invalid, fetch a new one
        else {
          const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials&client_id=d1e5051e198740b2a7ec9a9fe1ef5e2a&client_secret=0c859ecb9488416c99224ee02ff26596",
          });

          const data = await res.json();
          const expirationTime = Date.now() + data.expires_in * 1000;

          localStorage.setItem("accessToken", JSON.stringify(data));
          localStorage.setItem("accessTokenExpiration", expirationTime);

          console.log(data);
          setAccessToken(data);
          console.log("NewAccessToken Valid");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAccessToken();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=track:${queryTrack}%20artist:${queryArtist}&type=track`,
        {
          headers: {
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("Could not find search" + error);
    }
  };

  const handleSearchInput = (event) => {
    setQuery(event.target.value)
    debouncedSearch()
  }



  return (
    <div>
      <input type="text" onChange={handleSearchInput} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
