// Select new comment
const commentForm = document.querySelector('.new-comment');

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
   // Get content
  const content = document.querySelector('textarea[name="content"]').value;
   try {
    // Send POST
    const response = await fetch(`/blog/${event.target.dataset.id}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      throw new Error('Failed to create new comment');
    }
     // Reload the page to see the new comment
    location.reload();
   } catch (err) {
    console.error(err);
  }
});