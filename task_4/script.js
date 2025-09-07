// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        description: "Learn how to use React Hooks to manage state and side effects in your functional components. This comprehensive guide covers useState, useEffect, and custom hooks.",
        category: "tech",
        date: "2025-08-15",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 2,
        title: "Exploring the Streets of Tokyo",
        description: "A wonderful journey through the bustling streets of Tokyo, discovering hidden gems, local cuisine, and cultural experiences that make this city unique.",
        category: "travel",
        date: "2025-08-10",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 3,
        title: "JavaScript ES6 Features You Should Know",
        description: "Explore the most important ES6 features including arrow functions, destructuring, template literals, and modules that every JavaScript developer should master.",
        category: "tech",
        date: "2025-07-30",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 4,
        title: "Backpacking Through Southeast Asia",
        description: "Tips and experiences from a month-long backpacking adventure through Thailand, Vietnam, and Cambodia. Budget-friendly travel guide with essential information.",
        category: "travel",
        date: "2025-07-25",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 5,
        title: "Mastering French Pastry Techniques",
        description: "Learn the art of French pastry making with detailed techniques for creating croissants, macarons, and éclairs. Professional tips from a pastry chef.",
        category: "food",
        date: "2025-07-20",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 6,
        title: "Building RESTful APIs with Node.js",
        description: "Complete guide to creating robust RESTful APIs using Node.js and Express. Cover authentication, validation, error handling, and best practices.",
        category: "tech",
        date: "2025-07-15",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 7,
        title: "Hidden Gems of the Mediterranean",
        description: "Discover lesser-known beautiful destinations across the Mediterranean Sea. From secluded beaches to charming coastal towns off the beaten path.",
        category: "travel",
        date: "2025-07-10",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 8,
        title: "Farm-to-Table Cooking Philosophy",
        description: "Understanding the farm-to-table movement and how to incorporate fresh, local ingredients into your daily cooking for better health and sustainability.",
        category: "food",
        date: "2025-07-05",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 9,
        title: "CSS Grid vs Flexbox: When to Use Which",
        description: "Comprehensive comparison between CSS Grid and Flexbox layout systems. Learn when to use each one with practical examples and best practices.",
        category: "tech",
        date: "2025-06-30",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 10,
        title: "Solo Travel Safety Tips for Women",
        description: "Essential safety tips and practical advice for women traveling solo. Build confidence and stay safe while exploring the world independently.",
        category: "travel",
        date: "2025-06-25",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop&crop=face"
    },
    {
        id: 11,
        title: "Fermentation: Ancient Technique, Modern Kitchen",
        description: "Explore the world of fermentation with recipes for kimchi, kombucha, and sourdough. Health benefits and step-by-step fermentation guide.",
        category: "food",
        date: "2025-06-20",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop&crop=face"
    }
];

// State management
let currentPage = 1;
const postsPerPage = 6;
let filteredPosts = [...blogPosts];
let currentCategory = 'all';
let searchQuery = '';

// DOM elements
const postsContainer = document.getElementById('postsContainer');
const categoryFilters = document.querySelectorAll('.category-filter');
const searchInput = document.getElementById('searchInput');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

// Initialize the blog
document.addEventListener('DOMContentLoaded', function() {
    renderPosts();
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Category filter listeners
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.dataset.category;
            setActiveCategory(category);
            filterPosts();
        });
    });

    // Search input listener
    searchInput.addEventListener('input', function() {
        searchQuery = this.value.toLowerCase().trim();
        filterPosts();
    });

    // Pagination listeners
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
        }
    });
}

// Set active category
function setActiveCategory(category) {
    currentCategory = category;
    categoryFilters.forEach(filter => {
        filter.classList.remove('active');
        filter.style.backgroundColor = '';
        filter.style.color = '';
        filter.className = 'category-filter px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors';
        
        if (filter.dataset.category === category) {
            filter.classList.add('active');
            filter.style.backgroundColor = '#2c3e50';
            filter.style.color = 'white';
        }
    });
}

// Filter posts based on category and search
function filterPosts() {
    filteredPosts = blogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = searchQuery === '' || post.title.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
    
    currentPage = 1; // Reset to first page when filtering
    renderPosts();
}

// Render posts
function renderPosts() {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    // Clear container
    postsContainer.innerHTML = '';

    // Show loading state briefly for better UX
    postsContainer.innerHTML = '<div class="col-span-full flex justify-center items-center py-12"><div class="loading"></div><span class="ml-2 text-gray-600">Loading posts...</span></div>';

    setTimeout(() => {
        postsContainer.innerHTML = '';

        if (postsToShow.length === 0) {
            postsContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="text-gray-500 text-lg mb-2">No posts found</div>
                    <p class="text-gray-400">Try adjusting your filters or search terms</p>
                </div>
            `;
        } else {
            postsToShow.forEach((post, index) => {
                const postCard = createPostCard(post);
                postsContainer.appendChild(postCard);
                
                // Add fade-in animation with slight delay
                setTimeout(() => {
                    postCard.classList.add('fade-in');
                }, index * 100);
            });
        }

        updatePagination();
    }, 300);
}

// Create post card element
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer';
    
    const formattedDate = formatDate(post.date);
    const categoryClass = `category-${post.category}`;
    
    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
        <div class="p-6">
            <div class="flex items-center justify-between mb-3">
                <span class="category-badge ${categoryClass} px-2 py-1 rounded-full">${post.category}</span>
                <span class="text-sm text-gray-500">${formattedDate}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 hover:text-gray-700 transition-colors">${post.title}</h3>
            <p class="text-gray-600 post-description">${post.description}</p>
            <div class="mt-4 pt-4 border-t border-gray-100">
                <button class="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                    Read More →
                </button>
            </div>
        </div>
    `;

    // Add click event to the card
    card.addEventListener('click', () => {
        // In a real application, this would navigate to the full post
        alert(`Opening post: "${post.title}"\n\nIn a real blog, this would take you to the full article page.`);
    });

    return card;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    if (totalPages === 0) {
        pageInfo.textContent = 'No pages';
    } else {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
}

// Utility function to add more posts (for demonstration)
function addSamplePost() {
    const newPost = {
        id: blogPosts.length + 1,
        title: "New Blog Post",
        description: "This is a new blog post added dynamically to demonstrate the functionality.",
        category: "tech",
        date: new Date().toISOString().split('T')[0],
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop&crop=face"
    };
    
    blogPosts.unshift(newPost);
    filterPosts();
}

// Smooth scroll to top when pagination changes
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top functionality to pagination buttons
prevBtn.addEventListener('click', scrollToTop);
nextBtn.addEventListener('click', scrollToTop);
