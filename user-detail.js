// user-detail.js - โหลดรายละเอียดผู้ใช้
const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");

document.addEventListener("DOMContentLoaded", async () => {
  const userDetail = document.getElementById("user-detail");

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const user = await response.json();

    userDetail.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>อีเมล<br></strong> ${user.email}</p>
      <p><strong>ชื่อผู้ใช้<br></strong> ${user.username}</p>
      <p><strong>เบอร์โทรศัพท์<br></strong> ${user.phone}</p>
      <p><strong>เว็บไซต์<br></strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
      <p><strong>ที่อยู่<br></strong> ${user.address.street}, ${user.address.city}</p>
      <p><strong>บริษัท<br></strong> ${user.company.name}</p>
    `;

    document.getElementById("view-posts").addEventListener("click", () => {
      window.location.href = `user-posts.html?userId=${userId}`;
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
});
