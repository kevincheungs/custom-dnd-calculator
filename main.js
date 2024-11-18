import { displayOutput } from "./utils.js";
import {
  getAndUpdateStressLimit,
  updateEnergySpentTurn,
  calculateStrainedEnergy,
  addToEnergySpentHistory,
} from "./helpers/helper.js";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("calculateButton");
  button.addEventListener("click", calculate);

  const spendEnergyButton = document.getElementById("spendEnergyButton");
  spendEnergyButton.addEventListener("click", spendEnergy);
});

function calculate() {
  const result = `
    Calculated stress Limit<br>
  `;
  displayOutput(result, "output");
  getAndUpdateStressLimit();
}

function spendEnergy() {
  let currentEnergyLevel =
    parseFloat(document.getElementById("currentEnergyLevel").value) || 0;
  const spendEnergyInput =
    parseFloat(document.getElementById("spendEnergyInput").value) || 0;

  if (spendEnergyInput > 0 && currentEnergyLevel >= spendEnergyInput) {
    currentEnergyLevel -= spendEnergyInput;
    const currentEnergyLevelField =
      document.getElementById("currentEnergyLevel");
    currentEnergyLevelField.value = currentEnergyLevel;

    displayOutput(
      `Energy spent: ${spendEnergyInput}<br>
      Remaining Energy: ${currentEnergyLevel}`,
      "spendEnergyOutput"
    );

    getAndUpdateStressLimit();

    addToEnergySpentHistory(spendEnergyInput);
    updateEnergySpentTurn();
    calculateStrainedEnergy();
  } else if (spendEnergyInput > currentEnergyLevel) {
    displayOutput("Not enough energy to spend!", "spendEnergyOutput");
  } else {
    displayOutput("Please enter a valid amount to spend.", "spendEnergyOutput");
  }
}
