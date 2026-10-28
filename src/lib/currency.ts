/**
 * Currency utilities for South African Rand (ZAR)
 * ZAInnovate Technologies - QuoteForge
 */

export function formatZAR(amount: number | null | undefined): string {
  const value = typeof amount === "number" && !isNaN(amount) ? amount : 0;
  
  // Format with standard SA Rand prefix: R 1,250.00
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("ZAR", "R")
    .trim();
}

/**
 * Format compact for charts and quick stats (e.g. R 45.2k)
 */
export function formatZARCompact(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `R ${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `R ${(amount / 1_000).toFixed(1)}k`;
  }
  return formatZAR(amount);
}

/**
 * Converts a numeric rand amount to English words (e.g. for tax invoice receipts)
 */
export function amountInWords(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const rands = Math.floor(rounded);
  const cents = Math.round((rounded - rands) * 100);

  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convertGroup(n: number): string {
    let groupStr = "";
    if (n >= 100) {
      groupStr += units[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 20) {
      groupStr += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    } else if (n >= 10) {
      groupStr += teens[n - 10] + " ";
      n = 0;
    }
    if (n > 0) {
      groupStr += units[n] + " ";
    }
    return groupStr.trim();
  }

  if (rands === 0 && cents === 0) return "Zero Rand Only";

  let result = "";
  if (rands >= 1_000_000) {
    result += convertGroup(Math.floor(rands / 1_000_000)) + " Million ";
  }
  const thousands = Math.floor((rands % 1_000_000) / 1_000);
  if (thousands > 0) {
    result += convertGroup(thousands) + " Thousand ";
  }
  const remainder = rands % 1_000;
  if (remainder > 0 || result === "") {
    result += convertGroup(remainder) + " ";
  }

  result = result.trim() + " Rand";

  if (cents > 0) {
    result += ` and ${convertGroup(cents)} Cents`;
  }

  return result + " Only";
}
