function AlbumCard({ imgSrc, albumName }) {
  return (
    <div>
      <h3>{albumName}</h3>
      <img src={imgSrc} alt="" />
    </div>
  );
}

export default AlbumCard;
