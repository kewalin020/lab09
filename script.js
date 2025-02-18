document.addEventListener("DOMContentLoaded", async () => {
  const userList = document.getElementById("user-list");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    users.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.classList.add("user-list");
      userElement.setAttribute("onclick", `viewUser(${user.id})`);

      // แสดงชื่อและอีเมล
      userElement.innerHTML = `
          <h3>${user.name}</h3>
          <p>${user.email}</p>
        `;

      userList.appendChild(userElement);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});

// ฟังก์ชันนำทางไปที่หน้ารายละเอียดผู้ใช้
function viewUser(userId) {
  window.location.href = `user-detail.html?userId=${userId}`;
}
