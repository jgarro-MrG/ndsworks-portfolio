const MONTHS = { January:1, February:2, March:3, April:4, May:5, June:6, July:7, August:8, September:9, October:10, November:11, December:12 };

function periodStartValue(period) {
  if (!period) return 0;
  const m = period.match(/^(\w+)\s+(\d{4})/);
  if (!m) return 0;
  return parseInt(m[2]) * 100 + (MONTHS[m[1]] || 0);
}

function sortExperienceDesc(experience) {
  return (experience || []).slice().sort((a, b) => periodStartValue(b.period) - periodStartValue(a.period));
}

module.exports = { sortExperienceDesc };
