document.addEventListener("DOMContentLoaded", async () => {
  renderSidebar("Profile");
  try {
    const data = await apiFetch("/profile", { headers: authHeaders() });
    document.getElementById("profileName").value = data.user.name;
  } catch (error) {
    console.error(error);
  }

  document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: document.getElementById("profileName").value,
        password: document.getElementById("profilePassword").value
      };
      if (!payload.password) delete payload.password;
      const result = await apiFetch("/profile", {
        method: "PUT",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(payload)
      });
      const user = getUser();
      if (user && payload.name) {
        user.name = payload.name;
        localStorage.setItem("supplyai_user", JSON.stringify(user));
        setUserBadge();
      }
      showMessage("profileMessage", result.message, "success");
      document.getElementById("profilePassword").value = "";
    } catch (error) {
      showMessage("profileMessage", error.message, "error");
    }
  });
});
