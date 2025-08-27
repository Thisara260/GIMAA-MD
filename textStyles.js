const styles = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
];

function randomStyle() {
  return styles[Math.floor(Math.random() * styles.length)];
}

module.exports = { randomStyle };
