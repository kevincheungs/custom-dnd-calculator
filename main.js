import { displayOutput } from "./utils.js";
import {
  getAndUpdateStressLimit,
  updateEnergySpentTurn,
  calculateStrainedEnergy,
  addToEnergySpentHistory,
  getEnergySpentHistory,
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

    console.log(document.getElementById("undoEnergySpend"));

    // Create undo energy button if it does not exist
    if (!document.getElementById("undoEnergySpend")) {
      const undoEnergySpendButton = document.createElement("button");
      undoEnergySpendButton.id = "undoEnergySpend";
      undoEnergySpendButton.textContent = "Undo Energy Spend";

      undoEnergySpendButton.addEventListener("click", undoEnergySpend);
      const container = document.getElementById("energyColumn");
      container.appendChild(undoEnergySpendButton);
    }

    // Update Stats
    getAndUpdateStressLimit();

    addToEnergySpentHistory(spendEnergyInput);
    // uses energy spent history to calculate
    updateEnergySpentTurn();
    // needs stress limit and energy spent turn to calculate
    calculateStrainedEnergy();
  } else if (spendEnergyInput > currentEnergyLevel) {
    displayOutput("Not enough energy to spend!", "spendEnergyOutput");
  } else {
    displayOutput("Please enter a valid amount to spend.", "spendEnergyOutput");
  }
}

function undoEnergySpend() {
  const energySpentHistory = getEnergySpentHistory();
  const energyUndidValue = energySpentHistory.pop();
  energySpentHistoryDiv.textContent = JSON.stringify(energySpentHistory);

  console.log("energySpentHistory ", energySpentHistory);

  if (energySpentHistory && energySpentHistory.length == 0) {
    const undoEnergySpendButton = document.getElementById("undoEnergySpend");
    undoEnergySpendButton.remove();
  }

  const totalEnergySpent = energySpentHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const energySpentTurnDiv = document.getElementById("energySpentTurnDiv");
  energySpentTurnDiv.textContent = totalEnergySpent;

  let currentEnergyLevel =
    parseFloat(document.getElementById("currentEnergyLevel").value) || 0;
  currentEnergyLevel += energyUndidValue;
  const currentEnergyLevelField = document.getElementById("currentEnergyLevel");
  currentEnergyLevelField.value = currentEnergyLevel;

  displayOutput(
    `Undo energy spend: ${energyUndidValue}<br>
    Remaining Energy: ${currentEnergyLevel}`,
    "spendEnergyOutput"
  );

  calculateStrainedEnergy();
}
