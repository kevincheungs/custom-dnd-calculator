// Import helper functions
import { displayOutput } from "./utils.js";
import {
  getAndUpdateStressLimit,
  addToEnergySpentTurn,
  calculateStrainedEnergy,
} from "./helpers/helper.js";

// Attach event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("submitButton");
  button.addEventListener("click", handleSubmit);

  const spendEnergyButton = document.getElementById("spendEnergyButton");
  spendEnergyButton.addEventListener("click", spendEnergy);
});
function handleSubmit() {
  getAndUpdateStressLimit();
  // Get input values
  const spellcastingModifier =
    parseFloat(document.getElementById("spellcastingModifier").value) || 0;
  const proficiencyBonus =
    parseFloat(document.getElementById("proficiencyBonus").value) || 0;
  const constitutionModifier =
    parseFloat(document.getElementById("constitutionModifier").value) || 0;
  const maxEnergyLevel =
    parseFloat(document.getElementById("maxEnergyLevel").value) || 0;
  const currentEnergyLevel =
    parseFloat(document.getElementById("currentEnergyLevel").value) || 0;

  // Perform calculations (example: calculate total power)
  const totalPower =
    spellcastingModifier + proficiencyBonus + constitutionModifier;

  // Display results
  const result = `
    Total Power: ${totalPower} <br>
  `;
  displayOutput(result, "output");
}

// Handle spending energy
function spendEnergy() {
  getAndUpdateStressLimit();

  let currentEnergyLevel =
    parseFloat(document.getElementById("currentEnergyLevel").value) || 0;
  const spendEnergyInput =
    parseFloat(document.getElementById("spendEnergyInput").value) || 0;

  if (spendEnergyInput > 0 && currentEnergyLevel >= spendEnergyInput) {
    currentEnergyLevel -= spendEnergyInput;
    const currentEnergyLevelField =
      document.getElementById("currentEnergyLevel");
    currentEnergyLevelField.value = currentEnergyLevel;

    addToEnergySpentTurn(spendEnergyInput);

    displayOutput(
      `Energy spent: ${spendEnergyInput}<br>Remaining Energy: ${currentEnergyLevel}`,
      "spendEnergyOutput"
    );

    calculateStrainedEnergy();
  } else if (spendEnergyInput > currentEnergyLevel) {
    displayOutput("Not enough energy to spend!", "spendEnergyOutput");
  } else {
    displayOutput("Please enter a valid amount to spend.", "spendEnergyOutput");
  }
}
