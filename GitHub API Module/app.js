const form = document.querySelector('form');
const input = document.querySelector('input');
const resultContainer = document.querySelector('.result-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = input.value;
  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("User not found");
      }
    })
    .then((data) => {
      // Display the fetched data on the page
      resultContainer.innerHTML = `
        <h2>${data.name}</h2>
        <p>Repositories: ${data.public_repos}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
        <p>Bio: ${data.bio}</p>
        <p>Email: ${data.email}</p>
      `;
    })
    .catch((error) => {
      // Handle any errors that occurred during fetching
      resultContainer.textContent = error.message;
    });
});