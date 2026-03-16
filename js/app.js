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

(() => {
  const icon = document.querySelector("#noibat-icon");
  if (!icon) {
    return;
  }

  const nameEl = document.querySelector("#noibat-name");
  const stage = icon.closest(".evolve-stage");
  const particleLayer = document.createElement("div");
  particleLayer.className = "noibat-particle-layer";
  document.body.appendChild(particleLayer);
  let clicks = 0;

  icon.addEventListener("click", (event) => {
    if (icon.dataset.swapped === "true") {
      return;
    }

    const particleCount = 4 + Math.floor(Math.random() * 13);
    const rect = icon.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    for (let i = 0; i < particleCount; i += 1) {
      const particle = document.createElement("span");
      particle.className = "noibat-particle";
      const angle = Math.random() * Math.PI * 2;
      const distance = 22 + Math.random() * 32;
      const size = 5 + Math.random() * 5;
      const spread = 16;
      particle.style.left = `${originX + (Math.random() * spread - spread / 2)}px`;
      particle.style.top = `${originY + (Math.random() * spread - spread / 2)}px`;
      particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--size", `${size}px`);
      particleLayer.appendChild(particle);
      window.setTimeout(() => {
        particle.remove();
      }, 700);
    }

    clicks += 1;
    if (clicks >= 3) {
      icon.dataset.swapped = "true";
      if (stage) {
        const existing = stage.querySelector(".evolve-orb");
        if (existing) {
          existing.remove();
        }
        const orb = document.createElement("span");
        orb.className = "evolve-orb";
        stage.appendChild(orb);

        window.setTimeout(() => {
          orb.classList.add("orb-animate");
        }, 300);

        window.setTimeout(() => {
          orb.remove();
        }, 2900);
      }

      window.setTimeout(() => {
        icon.src = "img/noivern.png";
        icon.alt = "Noivern";
        if (nameEl) {
          nameEl.textContent = "Noivern";
        }
      }, 2000);
    }
  });
})();
