const files = import.meta.glob("../content/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});
