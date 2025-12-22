document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".product-item"));
  const ratingChecks = Array.from(document.querySelectorAll(".rating-filter"));

  // 1) Render sao cho mỗi card từ data-rating
  function renderStarsForCards() {
    items.forEach((item) => {
      const starsWrap = item.querySelector(".stars");
      if (!starsWrap) return;

      const rating = Number(item.dataset.rating || 0); // ví dụ 4.5
      const full = Math.floor(rating);
      const half = rating - full >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;

      let html = "";
      for (let i = 0; i < full; i++) html += `<i class="fas fa-star"></i>`;
      if (half) html += `<i class="fas fa-star-half-alt"></i>`;
      for (let i = 0; i < empty; i++) html += `<i class="far fa-star"></i>`;

      starsWrap.innerHTML = html;
    });
  }

  // 2) Lọc theo rating (checkbox 5,4,3,2,1) kiểu “& Up”
  function applyRatingFilter() {
    const selected = ratingChecks
      .filter((cb) => cb.checked)
      .map((cb) => Number(cb.value)); // [5,4,...]

    // nếu không tick gì -> hiện tất cả
    if (selected.length === 0) {
      items.forEach((item) => (item.style.display = ""));
      return;
    }

    items.forEach((item) => {
      const rating = Number(item.dataset.rating || 0);
      // Ví dụ tick 4 nghĩa là >=4; tick 3 nghĩa là >=3
      const ok = selected.some((min) => rating >= min);
      item.style.display = ok ? "" : "none";
    });
  }

  // chạy lần đầu
  renderStarsForCards();
  applyRatingFilter();

  // nghe sự kiện tick/untick
  ratingChecks.forEach((cb) => cb.addEventListener("change", applyRatingFilter));
});
