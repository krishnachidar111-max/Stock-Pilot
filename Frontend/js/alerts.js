document.addEventListener("DOMContentLoaded", async () => {
  renderSidebar("Alerts");
  try {
    const data = await apiFetch("/alerts", { headers: authHeaders() });
    document.getElementById("alertsGrid").innerHTML = data.alerts.length
      ? data.alerts.map((item) => `
        <article class="alert-card ${item.severity.toLowerCase()}">
          <div class="toolbar"><strong>${item.type}</strong><span class="badge ${item.severity === "Critical" ? "danger" : item.severity === "High" ? "warning" : "info"}">${item.severity}</span></div>
          <p>${item.message}</p>
        </article>
      `).join("")
      : `<div class="panel"><p class="muted">No alerts right now. Good job.</p></div>`;
  } catch (error) {
    document.getElementById("alertsGrid").innerHTML = `<div class="panel"><p class="muted">${error.message}</p></div>`;
  }
});
