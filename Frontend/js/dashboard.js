document.addEventListener("DOMContentLoaded", async () => {
  renderSidebar("Dashboard");
  try {
    const data = await apiFetch("/stats", { headers: authHeaders() });
    const stats = data.stats;
    document.getElementById("totalProducts").textContent = stats.totalProducts;
    document.getElementById("totalStock").textContent = stats.totalStock;
    document.getElementById("totalSales").textContent = stats.totalSales;
    document.getElementById("totalRevenue").textContent = `₹${Math.round(stats.totalRevenue)}`;
    document.getElementById("lowStock").textContent = stats.lowStock;
    document.getElementById("expiringSoon").textContent = stats.expiringSoon;
    document.getElementById("outOfStock").textContent = stats.outOfStock;

    const ctx = document.getElementById("topProductsChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: stats.topProducts.map((item) => item.label),
        datasets: [{ label: "Units sold", data: stats.topProducts.map((item) => item.value) }]
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
    console.error(error);
  }
});
