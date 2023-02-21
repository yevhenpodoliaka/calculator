// backblaze.com
export function calculateBackblazeCost(storage, transfer) {
  if (storage === 0 && transfer === 0) {
    return 0;
  }
  const minPayment = 7;
  const storageCost = storage * 0.005;
  const transferCost = transfer * 0.01;
  const totalCost = Math.max(minPayment, storageCost + transferCost);
  return +totalCost.toFixed(2);
}

// bunny.net
export function calculateBunnyCost(storage, transfer, isSSD) {
  const maxPayment = 10;
  let storageCost;
  if (isSSD) {
    storageCost = storage * 0.02;
  } else {
    storageCost = storage * 0.01;
  }
  const transferCost = transfer * 0.01;
  const totalCost = Math.min(maxPayment, storageCost + transferCost);
  return +totalCost.toFixed(2);
}

// scaleway.com
export function calculateScalewayCost(storage, transfer, isSingle) {
  const storageFreeLimit = 75;
  let storageCost;
  if (storage <= storageFreeLimit) {
    storageCost = 0;
  } else if (isSingle) {
    storageCost = (storage - storageFreeLimit) * 0.03;
  } else {
    storageCost = (storage - storageFreeLimit) * 0.06;
  }
  const transferFreeLimit = 75;
  const transferCost = Math.max(0, transfer - transferFreeLimit) * 0.02;
  const totalCost = storageCost + transferCost;
  return +totalCost.toFixed(2);
}

// vultr.com
export function calculateVultrCost(storage, transfer) {
  if (storage === 0 && transfer === 0) {
    return 0;
  }
  const minPayment = 5;
  const storageCost = storage * 0.01;
  const transferCost = transfer * 0.01;
  const totalCost = Math.max(minPayment, storageCost + transferCost);
  return +totalCost.toFixed(2);
}
