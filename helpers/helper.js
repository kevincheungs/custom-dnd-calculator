export function formatText(text) {
  return text.toUpperCase();
}

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

function updateStressLimit(newValue) {
  const stressLimitDiv = document.getElementById("stressLimitDiv");
  stressLimitDiv.setAttribute("data-value", newValue);
  stressLimitDiv.textContent = newValue;
}

export function addToEnergySpentTurn(energySpent) {
  const energySpentTurnDiv = document.getElementById("energySpentTurnDiv");
  let currentEnergySpent = parseInt(
    energySpentTurnDiv.getAttribute("data-value")
  );
  currentEnergySpent += energySpent;
  updateEnergySpentTurn(currentEnergySpent);
}

function updateEnergySpentTurn(newValue) {
  const stressLimitDiv = document.getElementById("energySpentTurnDiv");
  stressLimitDiv.setAttribute("data-value", newValue);
  stressLimitDiv.textContent = newValue;
}

export function calculateStrainedEnergy() {
  const stressLimitDiv = document.getElementById("stressLimitDiv");
  let stressLimit = parseInt(stressLimitDiv.getAttribute("data-value"));
  const energySpentTurnDiv = document.getElementById("energySpentTurnDiv");
  let currentEnergySpent = parseInt(
    energySpentTurnDiv.getAttribute("data-value")
  );
  const strainedEnergyLevel = currentEnergySpent - stressLimit;
  updateStrainedEnergyLevel(strainedEnergyLevel);
}

function updateStrainedEnergyLevel(newValue) {
  const stressLimitDiv = document.getElementById("strainedEnergyDiv");
  stressLimitDiv.setAttribute("data-value", newValue);
  stressLimitDiv.textContent = newValue;
}
