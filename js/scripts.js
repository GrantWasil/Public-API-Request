const usersUrl =
  "https://randomuser.me/api/?results=12&inc=picture,name,email,location,dob,cell&nat=us";
const gallery = document.getElementById("gallery");
const body = document.getElementsByTagName("BODY")[0];

// Handle all fetch request and throw errors
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Takes the JSON data and breaks it into promises to be itterated through
async function getUserProfiles(url) {
  const userJSON = await getJSON(url);

  const users = userJSON.results.map(async user => {
    return user;
  });
  return Promise.all(users);
}

// Generate a card for each user
function generateUserHTML(data) {
  data.map(user => {
    const card = document.createElement("div");
    card.className = "card";
    gallery.appendChild(card);
    card.innerHTML = `
      <div class="card-img-container">
        <img class="card-img" src=${user.picture.large} alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
      </div>
      `;

    // Add event listener to each card to create a modal when they are clicked on
    card.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.className = "modal-container";
      body.appendChild(modal);
      modal.innerHTML = `
      <div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src=${
                    user.picture.large
                  } alt="profile picture">
                  <h3 id="name" class="modal-name cap">${user.name.first} ${
        user.name.last
      }</h3>
                  <p class="modal-text">${user.email}</p>
                  <p class="modal-text cap">${user.location.city}</p>
                  <hr>
                  <p class="modal-text">${user.cell}</p>
                  <p class="modal-text">${user.location.street}, ${
        user.location.city
      }, ${user.location.state} ${user.location.postcode}</p>
                  <p class="modal-text">Birthday: ${user.dob.date
                    .toString()
                    .slice(0, 10)}</p>
              </div>
          </div>
      `;
      // Add an event listener to each modal's close "X" to remove the modal when clicked
      modal
        .querySelector("button")
        .addEventListener("click", () => modal.remove());
    });
  });
}

// Runs the functions to create the page
getUserProfiles(usersUrl)
  .then(generateUserHTML)
  .catch(e => {
    gallery.innerHTML = "<h3>This wasn't supposed to happen!</h3>";
    console.log(e);
  });
