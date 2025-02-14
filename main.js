import { displayOutput } from "./utils.js";
import {
  calculateAndUpdateStressLimit,
  updateEnergySpentTurn,
  calculateStrainedEnergy,
  addToEnergySpentHistory,
  getEnergySpentHistory,
  updateStrainedEnergyLevel,
  calculateMaxStressLimit,
} from "./helpers/helper.js";

document.addEventListener("DOMContentLoaded", () => {
  const resetStressLimitButton = document.getElementById(
    "resetStressLimitButton"
  );
  resetStressLimitButton.addEventListener("click", resetStressLimit);

  const spendEnergyButton = document.getElementById("spendEnergyButton");
  spendEnergyButton.addEventListener("click", spendEnergy);

  const nextTurnButton = document.getElementById("nextTurn");
  nextTurnButton.addEventListener("click", doEndOfTurn);
});

function resetStressLimit() {
  const stressLimitModDiv = document.getElementById("stressLimitModDiv");
  stressLimitModDiv.textContent = 0;

  let maxStressLimit = calculateMaxStressLimit();
  const stressLimitMaxDiv = document.getElementById("stressLimitMaxDiv");
  stressLimitMaxDiv.textContent = maxStressLimit;

  const stressLimitCurrentDiv = document.getElementById(
    "stressLimitCurrentDiv"
  );
  stressLimitCurrentDiv.textContent = maxStressLimit;
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

    const stressLimitCurrentDiv = document.getElementById(
      "stressLimitCurrentDiv"
    );
    let currentStressLimit = parseInt(stressLimitCurrentDiv.textContent);
    if (currentStressLimit !== currentStressLimit) {
      // Only recalc on energy spend if currentStressLimit is NaN
      calculateAndUpdateStressLimit();
    }

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

  // remove undo button if nothing to undo
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

function doEndOfTurn() {
  const energySpentHistory = getEnergySpentHistory();
  const totalEnergySpent = energySpentHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const stressLimitCurrentDiv = document.getElementById(
    "stressLimitCurrentDiv"
  );
  const currentStressLimit = stressLimitCurrentDiv.textContent;
  const strainedEnergyDiv = document.getElementById("strainedEnergyDiv");
  const strainedEnergy = strainedEnergyDiv.textContent;

  // Updating Previous turn stats
  const prevStressLimitDiv = document.getElementById("prevStressLimitDiv");
  prevStressLimitDiv.textContent = currentStressLimit;
  const prevEnergySpentTurnDiv = document.getElementById(
    "prevEnergySpentTurnDiv"
  );
  prevEnergySpentTurnDiv.textContent = totalEnergySpent;

  const prevEnergySpentHistoryDiv = document.getElementById(
    "prevEnergySpentHistoryDiv"
  );
  prevEnergySpentHistoryDiv.textContent = JSON.stringify(energySpentHistory);

  const prevStrainedEnergyDiv = document.getElementById(
    "prevStrainedEnergyDiv"
  );
  prevStrainedEnergyDiv.textContent = strainedEnergy;

  // Calculate stress limit mod
  const proficiencyBonus =
    parseFloat(document.getElementById("proficiencyBonus").value) || 0;

  const decreaseStressLimit =
    totalEnergySpent > Math.ceil(proficiencyBonus / 2);

  const stressLimitModDiv = document.getElementById("stressLimitModDiv");
  stressLimitModDiv.textContent = decreaseStressLimit ? -1 : 0;

  // Zeroing out current stats
  energySpentHistory.length = 0;
  energySpentHistoryDiv.textContent = JSON.stringify(energySpentHistory);

  displayOutput(``, "spendEnergyOutput");
  const undoEnergySpendButton = document.getElementById("undoEnergySpend");
  undoEnergySpendButton.remove();

  updateEnergySpentTurn();
  updateStrainedEnergyLevel(0);
  calculateAndUpdateStressLimit();
}
