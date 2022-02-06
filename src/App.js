import React, { Fragment, useEffect, useState } from "react";
import './App.css';
import { createApi } from "unsplash-js";

function App() {
  const api = createApi({
    accessKey: "0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23"
  });

  function searchOnEnterPress(event) {
    if (event.keyCode == '13')
      setQuery(event.target.value );
  }

  const PhotoComp = ({ photo }) => {
    const { user, urls } = photo;

    return (
      <Fragment>
        <div className="img" style={{backgroundImage: "url("+urls.regular+")"}}></div>
        <figcaption>
          <a
            className="credit"
            target="_blank"
            href={`https://unsplash.com/@${user.username}`}
          >
            {user.name}
          </a>
        </figcaption>
      </Fragment>
    );
  };

  const [feedSearch, setQuery] = useState('');
  const [data, setPhotosResponse] = useState(null);

  useEffect(() => {
    const searchRequest = feedSearch.length != 0 ? api.search.getPhotos({ query: feedSearch, perPage: 12, orientation: "landscape" }) : api.photos.getRandom({ count: 12, orientation: "landscape" });
    searchRequest
      .then(result => {
        setPhotosResponse(result);
     })
      .catch((error) => {
        console.log(error);
      });
  }, [feedSearch]);

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    //An error has occured
    return (
      <div>
        <div>{data.errors[0]}</div>
      </div>
    );
  } else {
    //Show photos
    const photoArray = data.response.results != undefined ? data.response.results : data.response;
    return (
      <div className="feed">
        <input placeholder="Search for images..." id="feedSearchBar" type="search" onKeyUp={(e) => searchOnEnterPress(e)}/>
        <button onClick={(e) => setQuery(e.target.previousElementSibling.value)}>Search</button>
        <br />
        <ul className="columnUl">
          {photoArray.map(photo => (
            <li key={photo.id} className="li">
              <PhotoComp photo={photo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
