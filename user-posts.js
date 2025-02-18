document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");

  const postsList = document.getElementById("posts-list");

  try {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await userResponse.json();
    document.getElementById("user-name").textContent = user.name;

    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    const posts = await postsResponse.json();

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <button class="toggle-comments" data-post-id="${post.id}">ดูความคิดเห็น</button>
          <div class="comments" id="comments-${post.id}" style="display: none;"></div>
        `;
      postsList.appendChild(postElement);
    });

    // เพิ่ม Event Listener ให้ปุ่ม "ดูความคิดเห็น"
    document.querySelectorAll(".toggle-comments").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const postId = event.target.dataset.postId;
        const commentsDiv = document.getElementById(`comments-${postId}`);

        if (commentsDiv.style.display === "none") {
          try {
            const commentsResponse = await fetch(
              `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
            );
            const comments = await commentsResponse.json();

            commentsDiv.innerHTML = comments
              .map(
                (comment) => `
                <p><strong>${comment.email}</strong>: ${comment.body}</p>
              `
              )
              .join("");

            commentsDiv.style.display = "block";
            event.target.textContent = "ซ่อนความคิดเห็น";
          } catch (error) {
            console.error("Error fetching comments:", error);
          }
        } else {
          commentsDiv.style.display = "none";
          event.target.textContent = "ดูความคิดเห็น";
        }
      });
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});
