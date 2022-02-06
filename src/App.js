import React, { Fragment, useEffect, useState } from "react";
import './App.css';
import { createApi } from "unsplash-js";

function App() {
  const api = createApi({
    accessKey: "0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23"
  });

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

  const [data, setPhotosResponse] = useState(null);

  useEffect(() => {
    api.photos
      .getRandom({ count: 12, orientation: "landscape" })
      .then(result => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

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
    return (
      <div className="feed">
        <ul className="columnUl">
          {data.response.map(photo => (
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
