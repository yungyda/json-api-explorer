/// Get DOM elements
const fetchButton = document.getElementById('fetchButton');
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('titleInput');
const bodyInput = document.getElementById('bodyInput');
const postList = document.getElementById('postList');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');
const errorDiv = document.getElementById('error');

// Fetch and display posts from the API
const fetchPosts = async () => {
    // Clear previous error and content
    errorDiv.textContent = 'Loading posts...';
    postList.innerHTML = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

        // Display posts in the DOM
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;
            postList.appendChild(postElement);
        });

        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = 'Failed to load posts. Please try again later.';
    }
};

// Submit a new post via POST request
const submitPost = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const title = titleInput.value;
    const body = bodyInput.value;

    if (!title || !body) {
        formError.textContent = 'Please fill in both fields.';
        formSuccess.textContent = '';
        return;
    }

    formError.textContent = '';
    formSuccess.textContent = 'Submitting post...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1 // Static user ID, as per JSONPlaceholder
            })
        });

        const newPost = await response.json();

        formSuccess.textContent = `Post submitted successfully! New post ID: ${newPost.id}`;
        titleInput.value = '';
        bodyInput.value = '';
    } catch (error) {
        formError.textContent = 'Failed to submit post. Please try again later.';
        formSuccess.textContent = '';
    }
};

// Event listeners
fetchButton.addEventListener('click', fetchPosts);
postForm.addEventListener('submit', submitPost);

