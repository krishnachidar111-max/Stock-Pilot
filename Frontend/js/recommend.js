document.addEventListener("DOMContentLoaded", async () => {
  renderSidebar("Recommendations");
  try {
    const data = await apiFetch("/recommendations", { headers: authHeaders() });
    document.getElementById("recommendGrid").innerHTML = data.recommendations.length
      ? data.recommendations.map((item) => `
        <article class="recommend-card">
          <div class="toolbar"><strong>${item.product}</strong><span class="badge ${item.urgency === "Critical" ? "danger" : item.urgency === "High" ? "warning" : item.urgency === "Medium" ? "info" : "success"}">${item.urgency}</span></div>
          <p class="muted">${item.action}</p>
          <div class="kpi-list">
            <div class="kpi-row"><span>Current stock</span><strong>${item.stock}</strong></div>
            <div class="kpi-row"><span>Predicted weekly demand</span><strong>${item.predictedWeeklyDemand}</strong></div>
            <div class="kpi-row"><span>Suggested reorder</span><strong>${item.reorderQty}</strong></div>
          </div>
        </article>
      `).join("")
      : `<div class="panel"><p class="muted">No recommendations available yet.</p></div>`;
  } catch (error) {
    document.getElementById("recommendGrid").innerHTML = `<div class="panel"><p class="muted">${error.message}</p></div>`;
  }
});
