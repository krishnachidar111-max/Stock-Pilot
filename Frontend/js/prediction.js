document.addEventListener("DOMContentLoaded", async () => {
  renderSidebar("Prediction");
  try {
    const data = await apiFetch("/prediction", { headers: authHeaders() });
    document.getElementById("predictionCards").innerHTML = data.predictions.length
      ? data.predictions.slice(0, 6).map((item) => `
        <div class="kpi-row">
          <div>
            <strong>${item.product}</strong>
            <div class="muted small">Weekly demand ${item.predictedWeeklyDemand} • Reorder ${item.reorderQty} • Confidence ${item.confidence}%</div>
          </div>
          <span class="badge ${item.riskLevel === "critical" ? "danger" : item.riskLevel === "high" ? "warning" : "info"}">${item.riskLevel}</span>
        </div>
      `).join("")
      : `<p class="muted">No inventory data yet. Upload products first.</p>`;

    new Chart(document.getElementById("predictionChart"), {
      type: "line",
      data: {
        labels: data.chart.map((item) => item.label),
        datasets: [
          { label: "Predicted weekly demand", data: data.chart.map((item) => item.demand) },
          { label: "Current stock", data: data.chart.map((item) => item.stock) }
        ]
      },
      options: {
        plugins: { legend: { labels: { color: "#eef6ff" } } },
        scales: {
          x: { ticks: { color: "#9bb3d4" }, grid: { color: "rgba(155,179,212,0.08)" } },
          y: { ticks: { color: "#9bb3d4" }, grid: { color: "rgba(155,179,212,0.08)" } }
        }
      }
    });
  } catch (error) {
    document.getElementById("predictionCards").innerHTML = `<p class="muted">${error.message}</p>`;
  }
});
