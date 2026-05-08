document.addEventListener("DOMContentLoaded", async () => {
  renderSidebar("Reports");
  try {
    const data = await apiFetch("/reports", { headers: authHeaders() });
    const report = data.report;
    document.getElementById("rProducts").textContent = report.totalProducts;
    document.getElementById("rRevenue").textContent = `₹${Math.round(report.totalRevenue)}`;
    document.getElementById("rHealth").textContent = `${report.inventoryHealthScore}%`;
    document.getElementById("avgPrice").textContent = `₹${report.averagePrice}`;
    document.getElementById("topSelling").innerHTML = report.topSelling.length
      ? report.topSelling.map((item) => `<div class="kpi-row"><span>${item.product}</span><strong>${item.sold} sold</strong></div>`).join("")
      : `<p class="muted">No report data yet.</p>`;

    document.getElementById("downloadReport").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "supplyai-report.json";
      link.click();
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    document.getElementById("topSelling").innerHTML = `<p class="muted">${error.message}</p>`;
  }
});
