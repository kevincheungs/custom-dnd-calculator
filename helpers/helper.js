export function calculateAndUpdateStressLimit() {
  let maxStressLimit = calculateMaxStressLimit();
  const stressLimitMaxDiv = document.getElementById("stressLimitMaxDiv");
  stressLimitMaxDiv.textContent = maxStressLimit;

  updateCurrentStressLimit(maxStressLimit);
}

export function calculateMaxStressLimit() {
  const spellcastingModifier =
    parseInt(document.getElementById("spellcastingModifier").value) || 0;
  const proficiencyBonus =
    parseInt(document.getElementById("proficiencyBonus").value) || 0;
  const constitutionModifier =
    parseInt(document.getElementById("constitutionModifier").value) || 0;

  let maxStressLimit =
    1 + spellcastingModifier + constitutionModifier + proficiencyBonus;

  return maxStressLimit;
}

function updateCurrentStressLimit(maxStressLimit) {
  const stressLimitModDiv = document.getElementById("stressLimitModDiv");
  const stressLimitMod = parseInt(stressLimitModDiv.textContent);

  const stressLimitCurrentDiv = document.getElementById(
    "stressLimitCurrentDiv"
  );
  let currentStressLimit = parseInt(stressLimitCurrentDiv.textContent);
  stressLimitCurrentDiv.textContent = !!currentStressLimit
    ? currentStressLimit + stressLimitMod
    : maxStressLimit;
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
  const stressLimitCurrentDiv = document.getElementById(
    "stressLimitCurrentDiv"
  );
  let currentStressLimit = parseInt(stressLimitCurrentDiv.textContent);
  const energySpentTurnDiv = document.getElementById("energySpentTurnDiv");
  let currentEnergySpent = parseInt(energySpentTurnDiv.textContent);
  const strainedEnergyLevel = currentEnergySpent - currentStressLimit;
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
