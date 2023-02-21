import refs from "./refs.js";
import {
  calculateBackblazeCost,
  calculateBunnyCost,
  calculateScalewayCost,
  calculateVultrCost,
} from "./calculator.js";

let BACKBAZLE_COST = 0;
let BUNNY_COST = 0;
let SCALEWAY_COST = 0;
let VULTR_COST = 0;
let IS_SSD = true;
let IS_SINGLE = true;

refs.storageSlider.addEventListener("input", handleChangeOnSlider);
refs.transferSlider.addEventListener("input", handleChangeOnSlider);

const radioButtonsBunny = document.querySelectorAll(
  'input[type="radio"][name="bunny"]'
);
const radioButtonsScaleway = document.querySelectorAll(
  'input[type="radio"][name="scaleway"]'
);

radioButtonsScaleway.forEach((radioButton) => {
  radioButton.addEventListener("change", (e) => {
    e.target.value === "single" ? (IS_SINGLE = true) : (IS_SINGLE = false);
    calculateCost();
    changeScalesValue();
  });
});
radioButtonsBunny.forEach((radioButton) => {
  radioButton.addEventListener("change", (e) => {
    e.target.value === "ssd" ? (IS_SSD = true) : (IS_SSD = false);
    calculateCost();
    changeScalesValue();
  });
});
function handleChangeOnSlider(e) {
  e.currentTarget.id === "storage-slider"
    ? (refs.storageValue.textContent = e.currentTarget.value)
    : (refs.transferValue.textContent = e.currentTarget.value);
  calculateCost();
  changeScalesValue();
}

function calculateCost() {
  const storage = Number(refs.storageValue.textContent);
  const transfer = Number(refs.transferValue.textContent);

  BACKBAZLE_COST = calculateBackblazeCost(storage, transfer);
  BUNNY_COST = calculateBunnyCost(storage, transfer, IS_SSD);
  SCALEWAY_COST = calculateScalewayCost(storage, transfer, IS_SINGLE);
  VULTR_COST = calculateVultrCost(storage, transfer);
}

function changeScalesValue() {
  let maxCost = Math.max(BACKBAZLE_COST, BUNNY_COST, SCALEWAY_COST, VULTR_COST);
  let minCost = Math.min(BACKBAZLE_COST, BUNNY_COST, SCALEWAY_COST, VULTR_COST);

  //-------------------------------------------------------------------
  refs.backblazePriceValue.textContent = `${BACKBAZLE_COST}$`;
  BACKBAZLE_COST !== 0
    ? (refs.backblazePriceScale.style.width =
        (BACKBAZLE_COST / maxCost) * 100 + "%")
    : (refs.backblazePriceScale.style.width = "0");

  BACKBAZLE_COST === minCost
    ? refs.backblazePriceScale.classList.add("minCost")
    : refs.backblazePriceScale.classList.remove("minCost");
  //-----------------------------------------------------------------------
  refs.bunnyPriceValue.textContent = `${BUNNY_COST}$`;
  BUNNY_COST !== 0
    ? (refs.bunnyPriceScale.style.width = (BUNNY_COST / maxCost) * 100 + "%")
    : (refs.bunnyPriceScale.style.width = "0");
  BUNNY_COST === minCost
    ? refs.bunnyPriceScale.classList.add("minCost")
    : refs.bunnyPriceScale.classList.remove("minCost");
  //-------------------------------------------------------------
  refs.scalewayPriceValue.textContent = `${SCALEWAY_COST}$`;
  SCALEWAY_COST !== 0
    ? (refs.scalewayPriceScale.style.width =
        (SCALEWAY_COST / maxCost) * 100 + "%")
    : (refs.scalewayPriceScale.style.width = "0");

  SCALEWAY_COST === minCost
    ? refs.scalewayPriceScale.classList.add("minCost")
    : refs.scalewayPriceScale.classList.remove("minCost");
  //-----------------------------------------------------------------------------
  refs.vultrPriceValue.textContent = `${VULTR_COST}$`;
  VULTR_COST !== 0
    ? (refs.vultrPriceScale.style.width = (VULTR_COST / maxCost) * 100 + "%")
    : (refs.vultrPriceScale.style.width = "0");
  VULTR_COST === minCost
    ? refs.vultrPriceScale.classList.add("minCost")
    : refs.vultrPriceScale.classList.remove("minCost");
}
