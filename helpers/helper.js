export function getAndUpdateStressLimit() {
  const spellcastingModifier =
    parseFloat(document.getElementById("spellcastingModifier").value) || 0;
  const proficiencyBonus =
    parseFloat(document.getElementById("proficiencyBonus").value) || 0;
  const constitutionModifier =
    parseFloat(document.getElementById("constitutionModifier").value) || 0;

  let stressLimit =
    1 + spellcastingModifier + constitutionModifier + proficiencyBonus;

  updateStressLimit(stressLimit);
  return stressLimit;
}

function updateStressLimit(stressLimit) {
  const stressLimitDiv = document.getElementById("stressLimitDiv");
  stressLimitDiv.textContent = stressLimit;
}

export function updateEnergySpentTurn() {
  const energySpentHistory = getEnergySpentHistory();
  const totalEnergySpent = energySpentHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const stressLimitDiv = document.getElementById("energySpentTurnDiv");
  stressLimitDiv.textContent = totalEnergySpent;
}

export function calculateStrainedEnergy() {
  const stressLimitDiv = document.getElementById("stressLimitDiv");
  let stressLimit = parseInt(stressLimitDiv.textContent);
  const energySpentTurnDiv = document.getElementById("energySpentTurnDiv");
  let currentEnergySpent = parseInt(energySpentTurnDiv.textContent);
  const strainedEnergyLevel = currentEnergySpent - stressLimit;
  updateStrainedEnergyLevel(strainedEnergyLevel);
}

function updateStrainedEnergyLevel(newValue) {
  const stressLimitDiv = document.getElementById("strainedEnergyDiv");
  stressLimitDiv.textContent = newValue;
}

export function addToEnergySpentHistory(energySpent) {
  const energySpentHistory = getEnergySpentHistory();
  energySpentHistory.push(energySpent);

  energySpentHistoryDiv.textContent = JSON.stringify(energySpentHistory);
}

function getEnergySpentHistory() {
  const energySpentHistoryDiv = document.getElementById(
    "energySpentHistoryDiv"
  );
  const energySpentHistory = JSON.parse(energySpentHistoryDiv.textContent);
  return energySpentHistory;
}
