document.addEventListener("DOMContentLoaded", async () => {
  renderSidebar("Upload Data");
  const progress = document.getElementById("uploadProgress");

  document.getElementById("uploadBtn").addEventListener("click", async () => {
    const file = document.getElementById("fileInput").files[0];
    if (!file) {
      showMessage("uploadMessage", "Please choose a CSV file first.", "error");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      progress.style.width = "45%";
      const result = await apiFetch("/upload", {
        method: "POST",
        headers: authHeaders(),
        body: formData
      });
      progress.style.width = "100%";
      showMessage("uploadMessage", result.message, "success");
      loadUploads();
      setTimeout(() => (progress.style.width = "0%"), 900);
    } catch (error) {
      progress.style.width = "0%";
      showMessage("uploadMessage", error.message, "error");
    }
  });

  async function loadUploads() {
    try {
      const data = await apiFetch("/uploads", { headers: authHeaders() });
      document.getElementById("uploadHistory").innerHTML = data.uploads.length
        ? data.uploads.map((item) => `<tr><td>${item.fileName}</td><td>${item.count}</td><td>${new Date(item.uploadedAt).toLocaleString()}</td></tr>`).join("")
        : `<tr><td colspan="3">No uploads yet.</td></tr>`;
    } catch (error) {
      document.getElementById("uploadHistory").innerHTML = `<tr><td colspan="3">Could not load upload history.</td></tr>`;
    }
  }

  loadUploads();
});
