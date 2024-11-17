export function displayOutput(text, elementId) {
  const outputDiv = document.getElementById(elementId);
  outputDiv.innerHTML = text; // Use innerHTML to support multi-line content
}
