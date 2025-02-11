document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);
    // Parallax Layers
    document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });
      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];
      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    });
  });
  /* Lenis */
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
  
  
  
  
  
  
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollToPlugin);
  
    // Scroll down to the bottom
    gsap.to(window, {
      duration: 4, // Adjust speed (3 seconds)
      scrollTo: { y: "max", autoKill: false },
      ease: "power2.inOut",
      onComplete: () => {
        // Once scrolled to the bottom, wait 2 seconds, then scroll back up
        setTimeout(() => {
          gsap.to(window, {
            duration: 3,
            scrollTo: { y: 0, autoKill: false },
            ease: "power2.inOut"
          });
        }, 2000); // 2-second delay before scrolling back up
      }
    });
  });
  