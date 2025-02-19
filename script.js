let hoodiesData=[]
fetch("http://localhost:3000/hoodies")
    .then(response => response.json())
    .then(data => {
    hoodiesData = data.hoodies||data;  // Make sure the data structure matches
        console.log(hoodiesData);  // Check the console to see if the data is correct
        displayHoodies(hoodiesData);  // Display hoodies
    })
    .catch(error => console.error("Error fetching hoodies:", error));


    // Function to display hoodies
    function displayHoodies(hoodies) {
        const hoodiesList = document.getElementById("hoodies-list");
        hoodiesList.innerHTML = hoodies
            .map(hoodie => `
                <li>
                    <div class="img">
                        <img src="${hoodie.image}" alt="${hoodie.name}">
                        <div class="price">
                            <h3>${hoodie.name}</h3>
                            <span>Rs ${hoodie.price}</span>
                        </div>
                    </div>
                </li>
            `)
            .join("");
    }
    

    // Selecting the search input and the sections to hide/show
    const searchInput = document.getElementById("searchInput");
    const flatOffSection = document.querySelector(".flat-off");
    const picturesSection = document.querySelector(".pictures");

    // Event listener for the search input
    searchInput.addEventListener("input", () => {
        // Hide sections when user types something in the search bar
        if (searchInput.value.trim() !== "") {
            flatOffSection.style.display = "none";
            picturesSection.style.display = "none";
        } else {
            // Show sections back when input is cleared
            flatOffSection.style.display = "block";
            picturesSection.style.display = "block";
        }

        // Perform the hoodie search
        const searchTerm = searchInput.value.toLowerCase();
        const filteredHoodies = hoodiesData.filter(hoodie =>
            hoodie.name.toLowerCase().includes(searchTerm)
        );
        displayHoodies(filteredHoodies);  // Update the hoodie list dynamically
    });

