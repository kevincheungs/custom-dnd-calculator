export function calculateAndUpdateStressLimit() {
  let stressLimit = calculateStressLimit();
  updateStressLimit(stressLimit);
}

export function calculateStressLimit() {
  const spellcastingModifier =
    parseInt(document.getElementById("spellcastingModifier").value) || 0;
  const proficiencyBonus =
    parseInt(document.getElementById("proficiencyBonus").value) || 0;
  const constitutionModifier =
    parseInt(document.getElementById("constitutionModifier").value) || 0;

  let stressLimit =
    1 + spellcastingModifier + constitutionModifier + proficiencyBonus;

  return stressLimit;
}

function updateStressLimit(stressLimit) {
  const stressLimitModDiv = document.getElementById("stressLimitModDiv");
  const stressLimitMod = parseInt(stressLimitModDiv.textContent);

  const stressLimitDiv = document.getElementById("stressLimitDiv");
  stressLimitDiv.textContent = stressLimit + stressLimitMod;
}

export function updateEnergySpentTurn() {
  const energySpentHistory = getEnergySpentHistory();
  const totalEnergySpent = energySpentHistory.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const energySpentTurnDiv = document.getElementById("energySpentTurnDiv");
  energySpentTurnDiv.textContent = totalEnergySpent;
}

export function calculateStrainedEnergy() {
  const stressLimitDiv = document.getElementById("stressLimitDiv");
  let stressLimit = parseInt(stressLimitDiv.textContent);
  const energySpentTurnDiv = document.getElementById("energySpentTurnDiv");
  let currentEnergySpent = parseInt(energySpentTurnDiv.textContent);
  const strainedEnergyLevel = currentEnergySpent - stressLimit;
  updateStrainedEnergyLevel(strainedEnergyLevel);
}

export function updateStrainedEnergyLevel(strainedEnergy) {
  const strainedEnergyDiv = document.getElementById("strainedEnergyDiv");
  strainedEnergyDiv.textContent = strainedEnergy;
}

export function addToEnergySpentHistory(energySpent) {
  const energySpentHistory = getEnergySpentHistory();
  energySpentHistory.push(energySpent);

  energySpentHistoryDiv.textContent = JSON.stringify(energySpentHistory);
}

export function getEnergySpentHistory() {
  const energySpentHistoryDiv = document.getElementById(
    "energySpentHistoryDiv"
  );
  const energySpentHistory = JSON.parse(energySpentHistoryDiv.textContent);
  return energySpentHistory;
}
