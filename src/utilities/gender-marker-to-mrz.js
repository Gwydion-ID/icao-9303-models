// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

/**
 * If the gender marker is 'X', convert to a '<' in the Machine-Readable Zone.
 * @param { string } gender
 * @example
 * // Returns '<'
 * genderMarkerToMRZ('X');
 */
export function genderMarkerToMRZ(gender) {
  return gender === "X" ? "<" : gender;
}

