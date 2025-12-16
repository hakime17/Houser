
const toggleButton = document.getElementById('mobile-toggle');
const navLinksContainer = document.querySelector('header nav ul'); 
console.log(toggleButton)

// Homepage elements
const productsContainer = document.querySelector('.products');
const allProductsContainer = document.querySelector('#allProductsContainer .products');
const noProductsMessage = document.getElementById('no-products-message'); 

// home / product page
const productDetails = document.querySelector('.product-details');
const closeButton = productDetails.querySelector('.close');
const cardTop = productDetails.querySelector('.product .card-top p');
const detailPossession = productDetails.querySelector('.product .detail-possession');
const detailTitle = productDetails.querySelector('.product .detail-title');
const detailPrice = productDetails.querySelector('.product .detail-price');
const detailBed = productDetails.querySelector('.product .bed');
const detailBath = productDetails.querySelector('.product .bath');
const detailHouse = productDetails.querySelector('.product .house');
const detailDescription = productDetails.querySelector('.product .detail-description');

// Input Form elements
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const property = document.querySelector('#property');
const possession = document.querySelector('#possession');
const beds = document.querySelector('#beds');
const baths = document.querySelector('#baths');
const square = document.querySelector('#square');
const description = document.querySelector('#description');
const submitButton = document.querySelector('#submit');
const successModal = document.getElementById('success-modal');
const modalCloseButton = document.getElementById('modal-close');


// --- Utility Functions for Local Storage ---

function getInputs() {
    try{
        const inputStorage = localStorage.getItem('productInfo');
        return inputStorage ? JSON.parse(inputStorage) : [];
    } catch (e) {
        console.error('Error retrieving inputs from localStorage', e); 
        return [];
    }
}

function saveInputs(inputs) {
    try{
        localStorage.setItem('productInfo', JSON.stringify(inputs));
    } catch (e) {
        console.error('Error saving inputs to localStorage', e);
    }
}

function clearInputs() {
    // Added null checks for safety
    if (title) title.value = '';
    if (price) price.value = '';
    if (property) property.value = 'Apartment';
    if (possession) possession.value = 'Ready to Move';
    if (beds) beds.value = '';
    if (baths) baths.value = '';
    if (square) square.value = '';
    if (description) description.value = '';
}


// --- Rendering Function (Runs only on the homepage) ---
function deleteProduct(index) {
    const inputs = getInputs();
    inputs.find(p => p === inputs[index]);
    inputs.splice(index, 1);
    saveInputs(inputs);
    renderProducts();
}

function detailsView(details) {
    productDetails.classList.add('active')
    const productsData = getInputs();
    const detailsData = productsData.find((data) => data === productsData[details]);
    cardTop.textContent = detailsData.property;
    detailPossession.textContent = detailsData.possession;
    detailTitle.textContent = detailsData.title;
    detailPrice.textContent = detailsData.price;
    detailBed.textContent = detailsData.beds;
    detailBath.textContent = detailsData.baths;
    detailHouse.textContent = detailsData.square;
    detailDescription.textContent = detailsData.description;
}

closeButton.addEventListener('click', () => {
    productDetails.classList.remove('active')
})

function renderAllProduct() {
    if(!allProductsContainer) return; 

    const storedInputs = getInputs();
    
    // CRITICAL: Always clear the container before adding items to prevent duplicates
    allProductsContainer.innerHTML = ''; 
    
    // Handle "No Listings" message
    if (storedInputs.length === 0) {
        if (noProductsMessage) noProductsMessage.classList.remove('hidden');
        return;
    } else {
        if (noProductsMessage) noProductsMessage.classList.add('hidden');
    }

    storedInputs.forEach((inputs, index) => {
        // Use a template literal to define the HTML structure for a single product card
        allProductsContainer.innerHTML += `
                <div class="product">
                    <div class="close-product" onClick="deleteProduct(${index})">
                    <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="card-top">
                        <p>${inputs.property}</p>
                    </div>
                    <div class="details">
                        <span>${inputs.possession}</span>
                        <p>${inputs.title}</p>
                        <price>$${inputs.price}</price>
                        <div class="contains">
                            <div class="bed">
                                <i class="fa-solid fa-bed"></i>
                                <span>${inputs.beds} Beds</span>
                            </div>
                            <div class="bath">
                                <i class="fa-solid fa-bath"></i>
                                <span>${inputs.baths} Baths</span>
                            </div>
                            <div class="house">
                                <i class="fa-regular fa-house"></i>
                                <span>${inputs.square} sqft</span>
                            </div>
                        </div>
                        <p>${inputs.description}</p>
                        <button onClick="detailsView(${index})">View Details & Chat</button>
                    </div>
                </div>
        `;
    });

}

function renderProducts() {
    if(!productsContainer) return; 

    const storedInputs = getInputs();
    
    // CRITICAL: Always clear the container before adding items to prevent duplicates
    productsContainer.innerHTML = ''; 
    
    // Handle "No Listings" message
    if (storedInputs.length === 0) {
        if (noProductsMessage) noProductsMessage.classList.remove('hidden');
        return;
    } else {
        if (noProductsMessage) noProductsMessage.classList.add('hidden');
    }

    storedInputs.slice(0, 6).forEach((inputs, index) => {
        // Use a template literal to define the HTML structure for a single product card
        productsContainer.innerHTML += `
                <div class="product">
                    <div class="close-product" onClick="deleteProduct(${index})">
                    <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="card-top">
                        <p>${inputs.property}</p>
                    </div>
                    <div class="details">
                        <span>${inputs.possession}</span>
                        <p>${inputs.title}</p>
                        <price>$${inputs.price}</price>
                        <div class="contains">
                            <div class="bed">
                                <i class="fa-solid fa-bed"></i>
                                <span>${inputs.beds} Beds</span>
                            </div>
                            <div class="bath">
                                <i class="fa-solid fa-bath"></i>
                                <span>${inputs.baths} Baths</span>
                            </div>
                            <div class="house">
                                <i class="fa-regular fa-house"></i>
                                <span>${inputs.square} sqft</span>
                            </div>
                        </div>
                        <p>${inputs.description}</p>
                        <button onClick="detailsView(${index})">View Details & Chat</button>
                    </div>
                </div>
        `;
    });

}

// --- Event Listener for Submission (Only runs on Add Product page) ---

if (submitButton) {
    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        // Basic validation
        if (!title.value || !price.value || !property.value) {
            console.error("Please fill out all required fields.");
            return;
        }

        // 1. Create the new product as a single OBJECT
        const newProduct = { 
            title: title.value,
            price: price.value,
            property: property.value,
            possession: possession.value,
            beds: beds.value,
            baths: baths.value,
            square: square.value,
            description: description.value
        };
        
        // 2. RETRIEVE existing products
        const existingInputs = getInputs();
        
        // 3. APPEND the new OBJECT directly to the existing array (THE CRUCIAL FIX)
        existingInputs.push(newProduct);
        
        // 4. SAVE the complete, updated list back to localStorage
        saveInputs(existingInputs); 
        
        // 5. Update the view and clear the form
        clearInputs();
        renderProducts(); 
        renderAllProduct();        
        // Show success message 
        if (successModal) {
            successModal.classList.remove('hidden');
        }
    });
}

// --- Other Event Listeners ---

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        if (navLinksContainer) {
            navLinksContainer.classList.toggle('active');
        }
    });
}

if (modalCloseButton) {
    modalCloseButton.addEventListener('click', () => {
        if (successModal) {
            successModal.classList.add('hidden');
        }
        // Navigate to home page after successful submission
        window.location.hash = '#home-page'; 
    });
}


// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderAllProduct();
});