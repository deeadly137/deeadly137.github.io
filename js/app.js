(() => {
  const layer = document.createElement("div");
  layer.className = "click-layer";
  document.body.appendChild(layer);

  const createClickEffect = (x, y) => {
    const effect = document.createElement("div");
    effect.className = "click-effect";
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;

    const star = document.createElement("div");
    star.className = "click-star";
    effect.appendChild(star);

    const sparkleCount = 10;
    for (let i = 0; i < sparkleCount; i += 1) {
      const sparkle = document.createElement("span");
      sparkle.className = "click-sparkle";
      const angle = Math.random() * Math.PI * 2;
      const distance = 26 + Math.random() * 34;
      const size = 3 + Math.random() * 4;
      const delay = Math.random() * 80;
      sparkle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      sparkle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
      sparkle.style.setProperty("--size", `${size}px`);
      sparkle.style.setProperty("--delay", `${delay}ms`);
      effect.appendChild(sparkle);
    }

    layer.appendChild(effect);
    window.setTimeout(() => {
      effect.remove();
    }, 700);
  };

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }
      createClickEffect(event.clientX, event.clientY);
    },
    { passive: true }
  );
})();
