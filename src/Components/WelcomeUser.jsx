import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import SearchBar from "./SearchBar/SearchBar";

import AlbumCard from "./AlbumCard";

function WelcomeUser() {
  const { auth, setAuth } = useContext(AuthContext);
  const [searchResult, setSearchResult] = useState();

  return (
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Welcome</Card.Title>
        <Card.Text></Card.Text>
        <SearchBar setSearchResult={setSearchResult}></SearchBar>
        <Button variant="primary">Go somewhere</Button>
        {searchResult && (
          <section
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            {console.log(searchResult)}
            {searchResult.map((album) => {
              return (
                <AlbumCard
                  key={album.mbid}
                  imgSrc={album.image[2]["#text"]}
                  albumName={album.name}
                ></AlbumCard>
              );
            })}
          </section>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}

export default WelcomeUser;
