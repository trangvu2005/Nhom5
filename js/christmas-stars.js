document.addEventListener("DOMContentLoaded", () => {
    const wrap = document.querySelector(".christmas-stars");
    if (!wrap) return;
  
    const STAR_COUNT = 40; // tăng/giảm số sao
    const STAR_EMOJIS = ["⭐", "✨", "🌟"];
  
    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement("span");
  
      star.textContent =
        STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)];
  
      // vị trí ngẫu nhiên
      star.style.left = Math.random() * 100 + "vw";
      star.style.top = Math.random() * -100 + "vh";
  
      // kích thước ngẫu nhiên
      const size = Math.random() * 14 + 14;
      star.style.fontSize = size + "px";
  
      // tốc độ rơi & xoay ngẫu nhiên
      const fallTime = Math.random() * 6 + 6;
      const spinTime = Math.random() * 4 + 4;
  
      star.style.animationDuration = `${fallTime}s, ${spinTime}s`;
      star.style.animationDelay = Math.random() * 5 + "s";
  
      wrap.appendChild(star);
    }
  });
  