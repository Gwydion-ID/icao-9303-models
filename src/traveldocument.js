// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { validateMRZString } from "./utilities/validate-mrz-string.js";
import { normalizeMRZString } from "./utilities/normalize-mrz-string.js";
import { IcaoDate } from "./utilities/icao-date.js";

/**
 * Stores common properties and methods for all ICAO 9303 machine-readable
 *     travel documents (MRTDs) with machine-readable zones.
 * 
 * `TravelDocument` is intended to be used to compose different kinds of MRTDs.
 *     It is not intended to be instantiated directly.
 * @abstract
 */
export class TravelDocument {
  /**
   * Create a `TravelDocument`.
   * @param { Object } [opt] - An options object.
   * @param { string } [opt.typeCode] - A 1-2 character string consisting of the
   *     characters A-Z, 0-9, ' ', or <. 'A', 'I', 'P', or 'V' are recommended
   *     for the first character.
   * @param { string } [opt.authorityCode] - A 3-character string consisting of
   *     the characters A-Z, 0-9, ' ', or <. A code from ISO-3166-1,
   *     ICAO 9303-3, or these user-assigned ranges are recommended: AAA-AAZ,
   *     QMA-QZZ, XAA-XZZ, or ZZA-ZZZ.
   * @param { string } [opt.number] - A string no longer than 9 characters
   *     consisting of the characters A-Z, 0-9, ' ', or <.
   * @param { string | Date } [opt.birthDate] - A calendar date string in
   *     YYYY-MM-DD format or a `Date` object.
   * @param { 'F' | 'M' | 'X' } [opt.genderMarker] - The character 'F', 'M', or 'X'.
   * @param { string | Date } [opt.expirationDate] - A calendar date string in
   *     YYYY-MM-DD format or a `Date` object.
   * @param { string } [opt.nationalityCode] - A 3-character string consisting
   *     of the characters A-Z, 0-9, ' ', or <. A code from ISO-3166-1,
   *     ICAO 9303-3, or these user-assigned ranges are recommended: AAA-AAZ,
   *     QMA-QZZ, XAA-XZZ, or ZZA-ZZZ.
   * @param { string } [opt.primaryIdentifier] - The document holder's primary
   *     identifier.
   * @param { string | null } [opt.primaryIdentifierNative] - The document
   *     holder's primary identifier in their native language.
   * @param { string | null } [opt.secondaryIdentifer] - The document holder's
   *     secondary identifier.
   * @param { string | null } [opt.secondaryIdentifierNative] - The document
   *     holder's secondary identifier in their native language.
   * @param { string } [opt.optionalData] - Valid characters are from the ranges
   *     A-Z, 0-9, ' ', or <.
   * @param { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas |
   *     VideoFrame } [opt.photo] - A path/URL to an image, or an image object,
   *     representing a photo of the document holder.
   * @param { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas |
   *     VideoFrame } [opt.signatureImage] - A path/URL to an image, or an image
   *     object, representing the signature or usual mark of the document
   *     holder.
   */
  constructor(opt) {
    this.typecode = opt?.typeCode ?? "I";
    this.authorityCode = opt?.authorityCode ?? "UTO";
    this.number = opt?.number ?? "D23145890";
    this.birthDate = opt?.birthDate ?? "1974-08-12";
    this.genderMarker = opt?.genderMarker ?? "F";
    this.expirationDate = opt?.expirationDate ?? "2012-04-15";
    this.nationalityCode = opt?.nationalityCode ?? "UTO";
    this.primaryIdentifier = opt?.primaryIdentifier ?? "";
    this.primaryIdentifierNative = opt?.primaryIdentifierNative ?? null;
    this.secondaryIdentifier = opt?.secondaryIdentifier ?? null;
    this.secondaryIdentifierNative = opt?.secondaryIdentifierNative ?? null;
    this.optionalData = opt?.optionalData ?? "";

    if (opt?.photo) { this.photo = opt.photo; }
    if (opt?.signatureImage) { this.signatureImage = opt.signatureImage; }
  }
  
  #typeCode;
  /**
   * A code identifying the document type.
   * @type { string }
   */
  get typeCode() { return this.#typeCode; }
  /**
   * @param { string } value - A 1-2 character string consisting of the
   *     characters A-Z, 0-9, ' ', or <. 'A', 'I', 'P', or 'V' are recommended
   *     for the first character.
   */
  set typeCode(value) {
    const isInvalid = validateMRZString(value, {
      minimum: 1,
      maximum: 2
    });
    if (isInvalid) {
      throw new RangeError(`Value set on 'typeCode' has errors: ${isInvalid}`);
    }
    this.#typeCode = value.toUpperCase();
  }

  #authorityCode;
  /**
   * A code identifying the authority who issued this document.
   * @type { string }
   */
  get authorityCode() { return this.#authorityCode; }
  /**
   * @param { string } value - A 3-character string consisting of the characters
   *     A-Z, 0-9, ' ', or <. A code from ISO-3166-1, ICAO 9303-3, or these
   *     user-assigned ranges are recommended: AAA-AAZ, QMA-QZZ, XAA-XZZ, or
   *     ZZA-ZZZ.
   */
  set authorityCode(value) {
    const isInvalid = validateMRZString(value, {
      minimum: 1,
      maximum: 3
    });
    if (isInvalid) {
      throw new RangeError(
        `Value set on 'authorityCode' has errors: ${isInvalid}`
      );
    }
    this.#authorityCode = value.toUpperCase();
  }

  #number;
  /**
   * An identity document number unique for this document.
   * @type { string }
   */
  get number() { return this.#number; }
  /**
   * @param { string } value - A string no longer than 9 characters consisting
   *     of the characters A-Z, 0-9, ' ', or <.
   */
  set number(value) {
    const isInvalid = validateMRZString(value, {
      minimum: 1,
      maximum: 9
    });
    if (isInvalid) {
      throw new RangeError(`Value set on 'number' has errors: ${isInvalid}`);
    }
    this.#number = value.toUpperCase();
  }

  #birthDate;
  /**
   * The document holder's date of birth.
   * @type { IcaoDate }
   */
  get birthDate() { return this.#birthDate; }
  /**
   * @param { string | Date } value - A calendar date string in YYYY-MM-DD
   *     format or a `Date` string.
   */
  set birthDate(value) {
    this.#birthDate = new IcaoDate(value);
  }

  #genderMarker;
  /**
   * A marker representing the document holder's gender.
   * @type { 'F' | 'M' | 'X' }
   */
  get genderMarker() { return this.#genderMarker; }
  /**
   * @param { 'F' | 'M' | 'X' } value - The character 'F', 'M', or 'X'.
   */
  set genderMarker(value) {
    if (!["F", "M", "X"].includes(value.toUpperCase())) {
      throw new RangeError(
        "Gender marker (genderMarker) must be [F]emale, [M]ale, " +
            "or Other/Unspecified [X]."
      );
    }
    this.#genderMarker = value.toUpperCase();
  }

  #expirationDate;
  /**
   * The last date on which this document is valid.
   * @type { IcaoDate }
   */
  get expirationDate() { return this.#expirationDate; }
  /**
   * @param { string | Date } value - A calendar date string in YYYY-MM-DD
   *     format or a `Date` string.
   */
  set expirationDate(value) {
    this.#expirationDate = new IcaoDate(value);
  }

  #nationalityCode;
  /**
   * A code identifying the document holder's nationality (or lack thereof).
   * @type { string }
   */
  get nationalityCode() { return this.#nationalityCode; }
  /**
   * @param { string } value - A 3-character string consisting of the characters
   *     A-Z, 0-9, ' ', or <. A code from ISO-3166-1, ICAO 9303-3, or these
   *     user-assigned ranges are recommended: AAA-AAZ, QMA-QZZ, XAA-XZZ, or
   *     ZZA-ZZZ.
   */
  set nationalityCode(value) {
    const isInvalid = validateMRZString(value, {
      minimum: 1,
      maximum: 3
    });
    if (isInvalid) {
      throw new TypeError(
        `Value set on 'nationalityCode has errors: ${isInvalid}`
      );
    }
    this.#nationalityCode = value.toUpperCase();
  }

  /**
   * The document holder's primary identifier
   * @type { string }
   */
  primaryIdentifier

  #primaryIdentifierNative
  /**
   * The document holder's primary identifier in their native language
   * @type { string | null }
   */
  get primaryIdentifierNative() { return this.#primaryIdentifierNative; }
  /**
   * @param { string | null }
   */
  set primaryIdentifierNative(value) { this.#primaryIdentifierNative = typeof value === 'string' ? value.trim() : null; }

  #secondaryIdentifier
  /**
   * The document holder's secondary identifier
   * @type { string | null }
   */
  get secondaryIdentifier() { return this.#secondaryIdentifier; }
  /**
   * @param { string | null }
   */
  set secondaryIdentifier(value) { this.#secondaryIdentifier = typeof value === 'string' ? value.trim() : null; }

  #secondaryIdentifierNative
  /**
   * The document holder's secondary identifier in their native language
   * @type { string | null }
   */
  get secondaryIdentifierNative() { return this.#secondaryIdentifierNative; }
  /**
   * @param { string | null }
   */
  set secondaryIdentifierNative(value) { this.#secondaryIdentifierNative = typeof value === 'string' ? value.trim() : null; }

  #optionalData;
  /**
   * Optional data to include in the Machine-Readable Zone (MRZ).
   * @type { string }
   */
  get optionalData() { return this.#optionalData; }
  /**
   * @param { string } value - Valid characters are from the ranges A-Z, 0-9,
   *     ' ', or <.
   */
  set optionalData(value) {
    const isInvalid = validateMRZString(value);
    if (isInvalid) {
      throw new RangeError(
        `Value set on 'optionalData' has errors: ${isInvalid}`
      );
    }
    this.#optionalData = value;
  }

  /**
   * A path/URL to an image, or an image object, representing a photo of the
   *     document holder or image chosen by the issuer.
   * @type { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame }
   */
  photo;

  /**
   * A path/URL to an image, or an image object, representing the signature or
   *     usual mark of the document holder or issuer.
   * @type { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame }
   */
  signatureImage;

  /**
   * The full Machine-Readable Zone (MRZ)
   * @abstract
   * @type { string }
   */
  get machineReadableZone() {
    throw new TypeError("An inherited or composed class must implement abstract property 'machineReadableZone'.");
  }
  /**
   * @param { string } value - a MRZ string of appropriate length for the document.
   */
  set machineReadableZone(value) {
    throw new TypeError("An inherited or composed class must implement abstract property 'machineReadableZone'.");
  }
}

