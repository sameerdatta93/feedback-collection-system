const form = document.getElementById('feedback-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get values from the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form data
    if (!name || !email || !message) {
        alert('Please fill in all fields!');
        return;
    }

    // Create a feedback object to send to the backend
    const feedback = {
        name,
        email,
        message
    };

    // Send the feedback data to the backend API (POST request)
    try {
        const response = await fetch('http://your-alb-dns-name/submit-feedback', {  // Update with your ALB DNS
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        });

        // Handle the response from the backend
        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show success message
            form.reset(); // Reset the form
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`); // Show error message
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('There was an error submitting your feedback. Please try again later.');
    }
});
