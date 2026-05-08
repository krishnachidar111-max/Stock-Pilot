let productsCache = [];

function statusBadge(status) {
  if (status === "In Stock") return '<span class="badge success">In Stock</span>';
  if (status === "Low Stock") return '<span class="badge warning">Low Stock</span>';
  if (status === "Out of Stock") return '<span class="badge danger">Out of Stock</span>';
  return '<span class="badge info">Expiring Soon</span>';
}

async function loadProducts() {
  const data = await apiFetch("/products", { headers: authHeaders() });
  productsCache = data.products;
  renderProducts(productsCache);
}

function renderProducts(list) {
  document.getElementById("inventoryTable").innerHTML = list.length
    ? list.map((item) => `
      <tr>
        <td>${item.product}</td>
        <td>${item.category}</td>
        <td>${item.stock}</td>
        <td>${item.sold}</td>
        <td>₹${item.price}</td>
        <td>${item.expiryDate}</td>
        <td>${statusBadge(item.status)}</td>
        <td>
          <button class="btn ghost small" onclick='editProduct(${JSON.stringify("").replace(/"/g,"&quot;")})' style="display:none;"></button>
          <button class="btn ghost small" data-edit="${item.id}">Edit</button>
          <button class="btn ghost small" data-delete="${item.id}">Delete</button>
        </td>
      </tr>
    `).join("")
    : `<tr><td colspan="8">No products found. Add one manually or upload a CSV file.</td></tr>`;

  document.querySelectorAll("[data-edit]").forEach((btn) => btn.addEventListener("click", () => startEdit(btn.dataset.edit)));
  document.querySelectorAll("[data-delete]").forEach((btn) => btn.addEventListener("click", () => removeProduct(btn.dataset.delete)));
}

function openForm(show = true) {
  document.getElementById("productFormCard").style.display = show ? "block" : "none";
}

function resetForm() {
  document.getElementById("formTitle").textContent = "Add Product";
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
}

function startEdit(id) {
  const item = productsCache.find((p) => p.id === id);
  if (!item) return;
  openForm(true);
  document.getElementById("formTitle").textContent = "Edit Product";
  document.getElementById("productId").value = item.id;
  document.getElementById("product").value = item.product;
  document.getElementById("category").value = item.category;
  document.getElementById("stock").value = item.stock;
  document.getElementById("sold").value = item.sold;
  document.getElementById("price").value = item.price;
  document.getElementById("lastSoldDate").value = item.lastSoldDate;
  document.getElementById("expiryDate").value = item.expiryDate;
}

async function removeProduct(id) {
  if (!confirm("Delete this product?")) return;
  try {
    await apiFetch(`/products/${id}`, { method: "DELETE", headers: authHeaders() });
    await loadProducts();
  } catch (error) {
    showMessage("inventoryMessage", error.message, "error");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  renderSidebar("Inventory");
  document.getElementById("openAddForm").addEventListener("click", () => {
    resetForm();
    openForm(true);
  });
  document.getElementById("closeForm").addEventListener("click", () => openForm(false));
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    renderProducts(productsCache.filter((item) => item.product.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)));
  });

  document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("productId").value;
    const payload = {
      product: document.getElementById("product").value,
      category: document.getElementById("category").value,
      stock: document.getElementById("stock").value,
      sold: document.getElementById("sold").value,
      price: document.getElementById("price").value,
      lastSoldDate: document.getElementById("lastSoldDate").value,
      expiryDate: document.getElementById("expiryDate").value
    };

    try {
      const path = id ? `/products/${id}` : "/products";
      const method = id ? "PUT" : "POST";
      const result = await apiFetch(path, {
        method,
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(payload)
      });
      showMessage("inventoryMessage", result.message, "success");
      resetForm();
      openForm(false);
      await loadProducts();
    } catch (error) {
      showMessage("inventoryMessage", error.message, "error");
    }
  });

  await loadProducts();
});
