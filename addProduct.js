// --- CONFIGURATION ---
const STORAGE_KEY = 'houser_listings';
// Added a constant for the default image URL since actual file storage is complex with localStorage
const DEFAULT_IMAGE_URL = 'https://placehold.co/400x300/e0e7ff/4338ca?text=Property+Image'; 

// Define the strict order and names of the fields for data mapping
const PRODUCT_FIELDS = [
    'title', 'price', 'property', 'possession',
    'beds', 'baths', 'square', 'description'
];

const toggleButton = document.getElementById('mobile-toggle');
const navLinksContainer = document.querySelector('header nav ul');

// ADD PRODUCT DOM (Inputs & Container)
const mainListContainer = document.querySelector('.products-section'); // Container for the list view
const productsContainer = document.querySelector('.products'); // The grid inside the list view

// New DOM elements for the detail page
const detailContainer = document.querySelector('#detail-view');
// Note: backButton is no longer needed here as the click is handled via inline onClick="showListView()"


// Get all individual input DOM elements
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const property = document.querySelector('#property');
const possession = document.querySelector('#possession');
const beds = document.querySelector('#beds');
const baths = document.querySelector('#baths');
const square = document.querySelector('#square');
const description = document.querySelector('#description');
const submitButton = document.querySelector('#submit');

// Array of input DOM elements, strictly ordered according to PRODUCT_FIELDS
const INPUT_FIELDS = [
    title, price, property, possession,
    beds, baths, square, description
];


// --- LOCALSTORAGE HELPER FUNCTIONS ---

// Gets all stored products from localStorage, or an empty array if none exist.
function getProducts() {
    try {
        const productsJson = localStorage.getItem(STORAGE_KEY);
        return productsJson ? JSON.parse(productsJson) : [];
    } catch (e) {
        console.error("Error retrieving data:", e);
        return [];
    }
}

// Saves the entire list of products back to localStorage.
function saveProducts(productsArray) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(productsArray));
    } catch (e) {
        console.error("Error saving data:", e);
    }
}

// Function to switch view from list to detail
function showDetailView() {
    if (mainListContainer && detailContainer) {
        mainListContainer.style.display = 'none';
        detailContainer.style.display = 'block';
    }
}

// Function to switch view from detail back to list
function showListView() {
    if (mainListContainer && detailContainer) {
        mainListContainer.style.display = 'block';
        detailContainer.style.display = 'none';
    }
}

// Renders the detailed view of a single product
function renderProductDetails(product) {
    const imageUrl = product.images || DEFAULT_IMAGE_URL;
    
    return `
        <div class="p-6 bg-white shadow-lg rounded-xl max-w-4xl mx-auto">
            <button id="back-to-list-button" class="text-blue-600 hover:text-blue-800 font-semibold mb-4" onclick="showListView()">
                &larr; Back to Listings
            </button>
            <div class="relative h-96 rounded-lg overflow-hidden mb-6" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;">
            </div>
            
            <h1 class="text-3xl font-extrabold text-gray-900 mb-2">${product.title}</h1>
            <p class="text-2xl font-bold text-indigo-600 mb-6">$${product.price}</p>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-b py-4 mb-6">
                <div class="stat">
                    <i class="fa-solid fa-bed text-2xl text-indigo-500"></i>
                    <p class="font-bold">${product.beds}</p>
                    <span class="text-sm text-gray-500">Beds</span>
                </div>
                <div class="stat">
                    <i class="fa-solid fa-bath text-2xl text-indigo-500"></i>
                    <p class="font-bold">${product.baths}</p>
                    <span class="text-sm text-gray-500">Baths</span>
                </div>
                <div class="stat">
                    <i class="fa-regular fa-house text-2xl text-indigo-500"></i>
                    <p class="font-bold">${product.square}</p>
                    <span class="text-sm text-gray-500">sqft</span>
                </div>
                <div class="stat">
                    <i class="fa-solid fa-building text-2xl text-indigo-500"></i>
                    <p class="font-bold">${product.property}</p>
                    <span class="text-sm text-gray-500">Type</span>
                </div>
            </div>

            <h2 class="text-xl font-semibold text-gray-800 mb-3">Description</h2>
            <p class="text-gray-600 mb-6">${product.description}</p>
            
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold text-gray-700">Additional Information</h3>
                <p>Status: <span class="text-green-600">${product.possession}</span></p>
                <p class="text-sm text-gray-500">Listing ID: ${product.id}</p>
            </div>
            
        </div>
    `;
}


// ** CORE FUNCTION: Collects ID, Finds Data, and Renders Details **
function viewProductDetails(productId) {
    const productsList = getProducts();
    // Use .find() to locate the product by its unique ID
    // Note: productId from the button is a number, but values from localStorage are strings, 
    // so we use the loose equality (==) or ensure comparison against a number. 
    // Since Date.now() returns a number, we use the strict comparison here.
    const product = productsList.find(p => p.id === productId);

    if (product && detailContainer) {
        // 1. Render the detailed HTML into the detail container
        detailContainer.innerHTML = renderProductDetails(product);

        // 2. Switch the view
        showDetailView();
    } else {
        console.error("Product not found or detail container missing.", productId);
    }
}


// Renders a single product object into the HTML card structure for the list view.
function renderProductCard(product) {
    const imageUrl = product.images || DEFAULT_IMAGE_URL;
    
    // We pass the product ID to the globally available function viewProductDetails
    // We use parseInt() here to ensure the ID is passed as a number, matching the product.id type.
    const clickHandler = `viewProductDetails(${product.id})`;
    
    return `<div class="product">
                <div class="card-top" style="
                    background-image: url('${imageUrl}');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    height: 200px; 
                    display: flex;
                    align-items: flex-end; 
                    padding: 10px;
                    color: white; 
                    font-weight: bold;
                    text-shadow: 0 0 5px rgba(0,0,0,0.8);
                ">
                    <p>${product.property}</p>
                </div>
                <div class="details">
                    <span>${product.possession}</span>
                    <p>${product.title}</p>
                    <price>$${product.price}</price>
                    <div class="contains">
                        <div class="bed">
                            <i class="fa-solid fa-bed"></i>
                            <span>${product.beds} Beds</span>
                        </div>
                        <div class="bath">
                            <i class="fa-solid fa-bath"></i>
                            <span>${product.baths} Baths</span>
                        </div>
                        <div class="house">
                            <i class="fa-regular fa-house"></i>
                            <span>${product.square} sqft</span>
                        </div>
                    </div>
                    <p>${product.description}</p>
                    <button onClick="${clickHandler}" >View Details & Chat</button>
                </div>
            </div>`;
}

// Loads all products from storage and updates the DOM.
function loadAndRenderProducts() {
    // We assume the main list container exists and is initially visible
    if (!productsContainer) return;
    
    const productsList = getProducts();
    let allProductsHtml = '';
    
    // Loop through stored data (reversed to show newest first) and build the HTML
    productsList.slice().reverse().forEach(product => {
        allProductsHtml += renderProductCard(product);
    });

    productsContainer.innerHTML = allProductsHtml;
    showListView(); // Ensure the list is shown on initial load
}

// --- EVENT LISTENER FOR SUBMISSION (Save Data) ---
if (submitButton) {
    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // <-- Stops the page from reloading.

        // 1. Create a product OBJECT from input values using the defined order
        const newProduct = {
            id: Date.now(), // Unique ID
        };

        // Use the ordered lists to map values to field names
        INPUT_FIELDS.forEach((inputElement, index) => {
            const fieldName = PRODUCT_FIELDS[index];
            newProduct[fieldName] = inputElement.value;
        });
        
        // 1b. Manually inject the placeholder image URL
        newProduct.images = DEFAULT_IMAGE_URL; // Consistent with renderProductCard

        // 2. Get the current list, add the new product, and save the whole list
        const productsList = getProducts();
        productsList.push(newProduct);
        saveProducts(productsList);

        // 3. Clear inputs (optional but good UX)
        INPUT_FIELDS.forEach(inputElement => inputElement.value = '');

        // 4. Clear existing DOM content and re-render everything from the new saved list
        if (productsContainer) {
            loadAndRenderProducts();
        }
        
        console.log("Product saved and DOM updated:", newProduct);
    });
}


// --- INITIAL LOAD: RENDER SAVED DATA ---
window.addEventListener('DOMContentLoaded', loadAndRenderProducts);

// --- MOBILE TOGGLE (Original Logic) ---
toggleButton.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});