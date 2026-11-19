function changeText() {
  document.getElementById('msg').textContent = '现在不用举起右手，你也可以清除所有不开心';

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    launchFireworks();
  }
}

function launchFireworks() {
  const radius = Math.min(innerWidth * 0.25, innerHeight * 0.35, 225);
  const bursts = [
    { x: 27, y: 42, color: '#e14b78', delay: 0 },
    { x: 50, y: 36, color: '#df861c', delay: 150 },
    { x: 73, y: 42, color: '#6754df', delay: 300 },
  ];

  for (const { x, y, color, delay } of bursts) {
    for (let i = 0; i < 24; i++) {
      const angle = i * Math.PI / 12;
      const distance = radius * (0.48 + Math.random() * 0.52);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const spark = document.createElement('span');
      spark.setAttribute('aria-hidden', 'true');
      spark.style.cssText = `
        position: fixed; left: ${x}vw; top: ${y}vh; z-index: 1;
        width: ${7 + Math.random() * 8}px; height: 3px; border-radius: 50%;
        background: ${color}; box-shadow: 0 0 7px ${color};
        pointer-events: none; opacity: 0;
      `;
      document.body.append(spark);

      const rotation = `rotate(${angle}rad)`;
      const animation = spark.animate([
        { transform: `translate(0, 0) ${rotation} scale(0.4)`, opacity: 0.9 },
        { transform: `translate(${dx}px, ${dy}px) ${rotation}`, opacity: 1, offset: 0.52 },
        { transform: `translate(${dx * 1.2}px, ${dy * 1.2 + 34}px) ${rotation} scale(0.25)`, opacity: 0 },
      ], { delay, duration: 850, easing: 'ease-out' });
      animation.onfinish = () => spark.remove();
      animation.oncancel = () => spark.remove();
    }
  }
}
