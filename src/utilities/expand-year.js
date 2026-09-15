// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

/**
 * Expands a two-digit year into a four-digit year within the window (maxYear - 100, maxYear].
 *
 * @param { number | string } twoDigitYear - Two-digit year (e.g., 26, "26", 99).
 * @param { number } maxYear - Upper bound of the 100-year window (inclusive).
 * @returns { number } The expanded four-digit year.
 */
export function expandYear(twoDigitYear, maxYear) {
  const yy = Number(twoDigitYear);
  if (isNaN(yy) || yy < 0 || yy > 99) {
    throw new RangeError('Invalid two-digit year supplied.');
  }

  const century = Math.floor(maxYear / 100) * 100;
  let fullYear = century + yy;

  if (fullYear > maxYear) {
    fullYear -= 100;
  }

  return fullYear;
}

