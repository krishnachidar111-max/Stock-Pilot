const API_BASE = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("supplyai_token");
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("supplyai_user") || "null");
  } catch {
    return null;
  }
}

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    ...extra,
    Authorization: token ? `Bearer ${token}` : ""
  };
}

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);
  let data;
  try {
    data = await response.json();
  } catch {
    data = { success: false, message: "Invalid server response." };
  }
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}

function requireAuth() {
  if (!getToken()) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("supplyai_token");
  localStorage.removeItem("supplyai_user");
  window.location.href = "login.html";
}

function setUserBadge() {
  const user = getUser();
  document.querySelectorAll("[data-user-name]").forEach((el) => el.textContent = user?.name || "Guest");
  document.querySelectorAll("[data-user-email]").forEach((el) => el.textContent = user?.email || "guest@example.com");
}

function setActiveNav() {
  const page = location.pathname.split("/").pop();
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });
}

function bindLogout() {
  document.querySelectorAll("[data-logout]").forEach((btn) => btn.addEventListener("click", logout));
}

function showMessage(targetId, message, type = "info") {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.textContent = message;
  el.className = `message ${type}`;
}

function renderSidebar(currentTitle = "Dashboard") {
  const sidebar = document.querySelector("#sidebar-shell");
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="brand-card">
      <div class="brand-icon">AI</div>
      <div>
        <h2>SupplyAI</h2>
        <p>Smart retail command center</p>
      </div>
    </div>
    <nav class="nav-links">
      <a data-nav href="index.html">Dashboard</a>
      <a data-nav href="upload.html">Upload Data</a>
      <a data-nav href="inventory.html">Inventory</a>
      <a data-nav href="prediction.html">Prediction</a>
      <a data-nav href="recommend.html">Recommendations</a>
      <a data-nav href="alerts.html">Alerts</a>
      <a data-nav href="reports.html">Reports</a>
      <a data-nav href="profile.html">Profile</a>
      <button class="logout-btn" data-logout>Logout</button>
    </nav>
  `;

  const topbar = document.querySelector("#topbar-shell");
  if (topbar) {
    topbar.innerHTML = `
      <div>
        <p class="eyebrow">Supply chain intelligence</p>
        <h1>${currentTitle}</h1>
      </div>
      <div class="topbar-user">
        <div class="avatar-mini"></div>
        <div>
          <strong data-user-name>User</strong>
          <p data-user-email>user@email.com</p>
        </div>
      </div>
    `;
  }

  setActiveNav();
  bindLogout();
  setUserBadge();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!location.pathname.endsWith("login.html") && !location.pathname.endsWith("register.html")) {
    requireAuth();
  }
  setUserBadge();
  setActiveNav();
  bindLogout();
});
