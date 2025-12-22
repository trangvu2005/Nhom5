document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.getElementById("sortSelect");
  const displaySelect = document.getElementById("displaySelect");
  const grid = document.querySelector(".shop-p__collection .row.is-grid-active");

  if (!grid) return;

  const parseNumber = (v) =>
    Number.parseFloat(String(v ?? "").replace(/[^\d.]/g, "")) || 0;

  const parseDate = (v) => Date.parse(v) || 0;

  let allItems = Array.from(grid.querySelectorAll(".product-item"));

  // ===== SẮP XẾP =====
  function sortItems(items) {
    const mode = sortSelect?.value || "newest";

    return items.sort((a, b) => {
      const priceA = parseNumber(a.dataset.price);
      const priceB = parseNumber(b.dataset.price);
      const ratingA = parseNumber(a.dataset.rating);
      const ratingB = parseNumber(b.dataset.rating);
      const dateA = parseDate(a.dataset.date);
      const dateB = parseDate(b.dataset.date);

      switch (mode) {
        case "rating":
          return ratingB - ratingA;
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "newest":
        default:
          return dateB - dateA;
      }
    });
  }

  // ===== HIỂN THỊ =====
  function applyDisplay(items) {
    const limit = parseInt(displaySelect?.value || items.length, 10);

    items.forEach((item, index) => {
      item.style.display = index < limit ? "" : "none";
    });
  }

  // ===== RENDER =====
  function render() {
    let items = [...allItems];
    items = sortItems(items);

    const frag = document.createDocumentFragment();
    items.forEach((el) => frag.appendChild(el));
    grid.appendChild(frag);

    applyDisplay(items);
  }

  // ===== EVENTS =====
  sortSelect?.addEventListener("change", render);
  displaySelect?.addEventListener("change", render);

  // render lần đầu
  render();
});
