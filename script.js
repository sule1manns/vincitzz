
  let hoodiesData = [];  // Global variable to store hoodie data

// Fetch hoodie data from the server
fetch("http://localhost:3000/hoodies")
    .then(response => response.json())
    .then(data => {
        hoodiesData = data.hoodies || data;  // Handle different data structures
        console.log("Fetched data:", hoodiesData);  
        displayHoodies(hoodiesData);         // Display hoodies after fetching
    })
    .catch(error => console.error("Error fetching hoodies:", error));


// Function to display hoodies with responsive columns
function displayHoodies(hoodies) {
    const hoodiesList = document.getElementById("hoodies-list");

    // Responsive column setup: Mobile (2), Tablet (3), Desktop (4)
    const columns = window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4;
    hoodiesList.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    hoodiesList.style.display = "grid";

    // Render hoodie cards or show a message if none found
    hoodiesList.innerHTML = hoodies.length
    ? hoodies
        .map(
          (hoodie) => `
        <li>
            <div class="img">
                <a href="details.html?id=${hoodie.id}">  <!-- Link wrapping the image -->
                    <img src="${hoodie.image}" alt="${hoodie.name}">
                </a>
                <div class="price">
                    <a href="details.html?id=${hoodie.id}"> <!-- Link wrapping the name -->
                        <h3>${hoodie.name}</h3>
                    </a>
                    <a href="details.html?id=${hoodie.id}"> <!-- Link wrapping the price -->
                        <span>Rs ${hoodie.price}</span>
                    </a>
                </div>
            </div>
        </li>
    `
        )
        .join("")
    : `<li>No hoodies found.</li>`;
}
  
// Search functionality
const searchInput = document.getElementById("searchInput");

// Event listener for search input
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredHoodies = hoodiesData.filter(hoodie =>
        hoodie.name.toLowerCase().includes(searchTerm)
    );

    displayHoodies(filteredHoodies);  // Update hoodie list dynamically
});


// Responsive column update on window resize
function updateLayout() {
    if (hoodiesData.length) displayHoodies(hoodiesData);  // Recalculate grid columns
}

window.addEventListener('resize', updateLayout);  // Adjust layout when window is resized
