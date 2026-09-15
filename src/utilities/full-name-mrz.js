// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { normalizeMRZString } from "./normalize-mrz-string.js";
import { padMRZString } from "./pad-mrz-string.js";

/**
 * Normalize and pad a document holder's name for the name area of a
 *     Machine-Readable Zone (MRZ) of a given character length.
 * @param { string } name - The document holder's full name in the Latin
 *     characters A-Z, or a transcription/transliteration of their full name
 *     in Latin characters. A ', ' separates the document holder's primary
 *     identifier from their secondary identifiers.
 * @param { number } length - The number of characters available for the
 *     document holder's name in a Machine-Readable Zone (MRZ).
 * @example
 * // Returns "MILLEFEUILLE<<ALFALFA<<<<<<<<<"
 * fullNameMRZ("Millefeuille, Alfalfa", 30);
 */
export function fullNameMRZ(name, length) {
  const splitName = name.split("/ ");
  const NORMALIZED_NAME =
      normalizeMRZString(splitName[splitName.length - 1].replace(", ","<<"));
  return padMRZString(
    NORMALIZED_NAME.substring(0,length), length
  );
}

