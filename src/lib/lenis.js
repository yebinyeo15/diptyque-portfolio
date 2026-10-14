let activeLenis = null;

export function getLenis() {
  return activeLenis;
}

export function registerLenis(instance) {
  activeLenis = instance;

  return () => {
    if (activeLenis === instance) {
      activeLenis = null;
    }
  };
}
