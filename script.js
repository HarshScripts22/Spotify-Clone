console.log("here is javascript code");

(async () => {
  const clientId = "62bae43f0ce643908462467b7e2878e9";
  const clientSecret = "c7670e3f95d64a03a063b6cd3c31f362";
  const authUrl = "https://accounts.spotify.com/api/token";
  const playlistId = "6rCCsPnvnf8AzIrlsQ2vYj";

  async function getAccessToken() {
    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });
    const data = await response.json();
    return data.access_token;
  }

  async function fetchPlaylist(playlistId) {
    const accessToken = await getAccessToken();
    const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;

    const response = await fetch(playlistUrl, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const playlistData = await response.json();
    return playlistData;
  }
  //*******************************************************************************
  // fetchPlaylist(playlistId)
  //   .then((playlist) => {
  //     console.log(playlist);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching playlist:", error);
  //   });

  //*******************************************************************************
  // fetchPlaylist(playlistId)
  //   .then((playlist) => {
  //     console.log("Playlist Name:", playlist.name);
  //     console.log("Description:", playlist.description);
  //     console.log("Number of Followers:", playlist.followers.total);
  //     console.log("Tracks:");
  //     playlist.tracks.items.forEach((item) => {
  //       console.log(
  //         `- ${item.track.name} by ${item.track.artists
  //           .map((artist) => artist.name)
  //           .join(", ")}`
  //       );
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching playlist:", error);
  //   });

  // fetchPlaylist(playlistId)
  //   .then((playlist) => {
  //     // Populate the tracks into the library div
  //     const libraryContainer = document.querySelector(".container3");
  //     const tracklist = document.querySelector(".track-list");
  //     const trackListContainer = document.createElement("div");
  //     trackListContainer.className = "track-list";

  //     playlist.tracks.items.forEach((item) => {
  //       const musicp = document.createElement("img");
  //       musicp.className = "inverto";
  //       musicp.src = "music.svg";
  //       trackListContainer.appendChild(musicp);
  //       const trackElement = document.querySelector(".songinfo");
  //       trackElement.className = "track";
  //       trackElement.innerText = `${item.track.name} by ${item.track.artists
  //         .map((artist) => artist.name)
  //         .join(", ")}`;
  //       trackListContainer.appendChild(trackElement);
  //     });

  //     libraryContainer.appendChild(trackListContainer);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching playlist:", error);
  //   });
  fetchPlaylist(playlistId)
    .then((playlist) => {
      const libraryContainer = document
        .querySelector(".container3")
        .getElementsByTagName("ul")[0];
      libraryContainer.innerHTML = "";
      playlist.tracks.items.forEach((item) => {
        libraryContainer.innerHTML =
          libraryContainer.innerHTML +
          `<li><img src="music.svg " class="inverto" srcset="" />
                  <div class="songinfo">${item.track.name} </div>
                   <div class="playnow">
                              
                                <img width="34" src="play.svg" alt="">
                            </div>
                  
                 </li>`;
        //     by ${item.track.artists
        // .map((artist) => artist.name)
        // .join(", ")} for artist name
      });
    })
    .catch((error) => {
      console.log("Error fetching playlist: ", error);
    });
})();
