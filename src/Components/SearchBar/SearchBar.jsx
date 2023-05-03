// import { useEffect, useRef, useState } from "react";
// import { debounce } from "lodash";

// cdc52ab0d52064b3d6a90ba09bf6ed4;

// function SearchBar({ setSearchResult }) {
//   const [accessToken, setAccessToken] = useState();

//   const [queryArtist, setQueryArtist] = useState("Dimension");
//   const [queryTrack, setQueryTrack] = useState("Generator");
//   const [query, setQuery] = useState("");

//   // GET ACCESS TOKEN
//   useEffect(() => {
//     const getAccessToken = async () => {
//       // check if access token is valid
//       const accessTokenExpiration = localStorage.getItem(
//         "accessTokenExpiration"
//       );
//       try {
//         if (accessTokenExpiration && Date.now() < accessTokenExpiration) {
//           setAccessToken(JSON.parse(localStorage.getItem("accessToken")));

//           console.log("AccessToken Valid");
//         }
//         // token expired or invalid, fetch a new one
//         else {
//           const res = await fetch("https://accounts.spotify.com/api/token", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: "grant_type=client_credentials&client_id=d1e5051e198740b2a7ec9a9fe1ef5e2a&client_secret=0c859ecb9488416c99224ee02ff26596",
//           });

//           const data = await res.json();
//           const expirationTime = Date.now() + data.expires_in * 1000;

//           localStorage.setItem("accessToken", JSON.stringify(data));
//           localStorage.setItem("accessTokenExpiration", expirationTime);

//           console.log(data);
//           setAccessToken(data);
//           console.log("NewAccessToken Valid");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getAccessToken();
//   }, []);

//   const searchTrack = async (searchType) => {
//     if (!accessToken || accessToken == " ") {
//       return;
//     }

//     // search album by name
//     try {
//       const res = await fetch(
//         `https://api.spotify.com/v1/search?q=album:${query}&type=album&limit=20`,

//         {
//           headers: {
//             Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
//           },
//         }
//       );
//       const data = await res.json();
//       console.log(data);
//       setSearchResult(data.albums);
//     } catch (error) {
//       console.log("Could not find search" + error);
//     }
//   };

//   // delays fetch after user is done typing
//   useEffect(() => {
//     console.log(query);
//     searchTrack();
//   }, [query]);

//   const handleSearchInput = useRef(
//     debounce((value) => {
//       setQuery(value);
//     }, 500)
//   ).current;

//   const handleInputChange = (event) => {
//     handleSearchInput(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" onChange={handleInputChange} />
//     </div>
//   );
// }

// export default SearchBar;

import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

function SearchBar({ setSearchResult }) {
  const [apiKey, setApiKey] = useState("cdc52dab0d52064b3d6a90ba09bf6ed4");

  const searchAlbum = async (value) => {
    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${value}&api_key=${apiKey}&format=json`
      );
      const data = await res.json();
      console.log(data);
      setSearchResult(data.results.albummatches.album);
    } catch (error) {
      console.log("Could not find search" + error);
    }
  };

//   const searchArtist = async (value) => {
//     try {
//       const res = await fetch(
//         `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${value}&api_key=${apiKey}&format=json`
//       );
//       const data = await res.json();
//       console.log(data);
//       setSearchResult(data.results.albummatches.album);
//     } catch (error) {
//       console.log("Could not find search" + error);
//     }
//   };

  const handleSearchInput = useRef(
    debounce((value) => {
      searchAlbum(value);
    }, 500)
  ).current;

  const handleInputChange = (event) => {
    if (event.target.value.length > 0) {
      handleSearchInput(event.target.value);
    }
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
    </div>
  );
}

export default SearchBar;
