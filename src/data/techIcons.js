const files = import.meta.glob('/src/assets/img/tech-icon/*', { eager: true });

const techIcons = Object.fromEntries(
  Object.entries(files).map(([key, value]) => {
    const name = key.split('/').pop().replace(/\..+$/, '');
    return [name, value.default];
  })
);

export default techIcons;
