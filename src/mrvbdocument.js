// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { TravelDocument } from "./traveldocument.js";
import { VisaDocument } from "./visadocument.js";
import { expandYear } from "./utilities/expand-year.js";
import { generateMRZCheckDigit } from "./utilities/generate-mrz-check-digit.js";
import { fullNameMRZ } from "./utilities/full-name-mrz.js";
import { optionalDataMRZ } from "./utilities/optional-data-mrz.js";
import { padMRZString } from "./utilities/pad-mrz-string.js";
import { dateToMRZ } from "./utilities/date-to-mrz.js";
import { genderMarkerToMRZ } from "./utilities/gender-marker-to-mrz.js";

/**
 * Stores properties and methods for smaller machine-redable visas (MRV-B) with
 *     machine-readable zones. These visas are used for when a clear zone is
 *     needed along the visa sticker to keep a perforated or printed document
 *     number visible on a passport page, or when a seal will be placed in a way
 *     that will overlap on the visa sticker and the passport page.
 * 
 * `MRVBDocument` may be used on its own or may be used to compose different
 *     kinds of MRTDs.
 */
export class MRVBDocument {
  /**
   * Create a `MRVBDocument`.
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
   * @param { string } [opt.fullName] - A ', ' separates the visa holder's
   *     primary identifier from their secondary identifiers. A '/' separates
   *     the full name in a non-Latin national language from a
   *     transcription/transliteration into the Latin characters A-Z.
   * @param { string } [opt.nationalityCode] - A 3-character string consisting
   *     of the characters A-Z, 0-9, ' ', or <. A code from ISO-3166-1,
   *     ICAO 9303-3, or these user-assigned ranges are recommended: AAA-AAZ,
   *     QMA-QZZ, XAA-XZZ, or ZZA-ZZZ.
   * @param { string | Date } [opt.birthDate] - A calendar date string in
   *     YYYY-MM-DD format or a `Date` object.
   * @param { string } [opt.genderMarker] - The character 'F', 'M', or 'X'.
   * @param { string | Date } [opt.validThru] - A calendar date string in
   *     YYYY-MM-DD format or a `Date` object.
   * @param { string } [opt.optionalData] - Up to 8 characters. Valid characters
   *     are from the ranges A-Z, 0-9, ' ', or <.
   * @param { string } [opt.mrzLine1] - A MRZ line string of a 36-character
   *     length.
   * @param { string } [opt.mrzLine2] - A MRZ line string of a 36-character
   *     length.
   * @param { string } [opt.machineReadableZone] - A MRZ string of a
   *     72-character length.
   * @param { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas |
   *     VideoFrame } [opt.photo] - A path/URL to an image, or an image object,
   *     representing a photo of the visa holder or an image from the issuing
   *     authority.
   * @param { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas |
   *     VideoFrame } [opt.signatureImage] - A path/URL to an image, or an image
   *     object, representing the signature or usual mark of the visa issuer.
   * @param { string } [opt.placeOfIssue] - Location where the visa was issued.
   * @param { string | Date } [opt.validFrom] - A calendar date string in
   *     YYYY-MM-DD format or a `Date` object.
   * @param { string | number } [opt.numberOfEntries] - 0 or any string denotes
   *     an unlimited number of entries.
   * @param { string } [opt.visaType] - A type/name/description for this visa.
   * @param { string } [opt.additionalInfo] - Additional textual information.
   * @param { string } [opt.passportNumber] - A string no longer than 9
   *     characters consisting of the characters A-Z, 0-9, ' ', or <.
   * @param { boolean } [opt.usePassportInMRZ] - Use 'passportNumber' instead of
   *     'number' in the Machine-Readable Zone (MRZ).
   */
  constructor(opt) {
    this.#document = new TravelDocument();
    this.#visa = new VisaDocument();

    this.typeCode = opt?.typeCode ?? "V";
    this.authorityCode = opt?.authorityCode ?? "UTO";
    this.number = opt?.number ?? "M12388954";
    this.fullName = opt?.fullName ?? "Eriksson, Anna-Maria";
    this.nationalityCode = opt?.nationalityCode ?? "XXX";
    this.birthDate = opt?.birthDate ?? "1974-08-12";
    this.genderMarker = opt?.genderMarker ?? "F";
    this.validThru = opt?.validThru ?? "1996-12-10";
    this.optionalData = opt?.optionalData ?? "";
    this.placeOfIssue = opt?.placeOfIssue ?? "Zenith";
    this.validFrom = opt?.validFrom ?? "1991-12-10";
    this.numberOfEntries = opt?.numberOfEntries ?? "Multiple";
    this.visaType = opt?.visaType ?? "Business Multiple";
    this.additionalInfo = opt?.additionalInfo ?? "";
    this.passportNumber = opt?.passportNumber ?? "L8988901C";
    this.usePassportInMRZ = opt?.usePassportInMRZ ?? true;

    if (opt?.photo) { this.photo = opt.photo; }
    if (opt?.signatureImage) { this.signatureImage = opt.signatureImage; }
    if (opt?.mrzLine1) { this.mrzLine1 = opt.mrzLine1; }
    if (opt?.mrzLine2) { this.mrzLine2 = opt.mrzLine2; }
    if (opt?.machineReadableZone) {
      this.machineReadableZone = opt.machineReadableZone;
    }
  }

  // The objects `MRVBDocument` uses to compose itself.
  #document;
  #visa;
  
  /**
   * A code identifying the visa type.
   * @type { string }
   */
  get typeCode() { return this.#document.typeCode; }
  /**
   * @param { string } value - A 1-2 character string consisting of the
   *     characters A-Z, 0-9, ' ', or <. 'A', 'I', 'P', or 'V' are recommended
   *     for the first character.
   */
  set typeCode(value) { this.#document.typeCode = value; }

  /**
   * A code identifying the authority who issued this visa.
   * @type { string }
   */
  get authorityCode() { return this.#document.authorityCode; }
  /**
   * @param { string } value - A 3-character string consisting of the characters
   *     A-Z, 0-9, ' ', or <. A code from ISO-3166-1, ICAO 9303-3, or these
   *     user-assigned ranges are recommended: AAA-AAZ, QMA-QZZ, XAA-XZZ, or
   *     ZZA-ZZZ.
   */
  set authorityCode(value) { this.#document.authorityCode = value; }

  /**
   * An identity document number unique for this visa.
   * @type { string }
   */
  get number() { return this.#document.number; }
  /**
   * @param { string } value - A string no longer than 9 characters consisting
   *     of the characters A-Z, 0-9, ' ', or <.
   */
  set number(value) { this.#document.number = value; }

  /**
   * The visa holder's full name.
   * @type { string }
   */
  get fullName() { return this.#document.fullName; }
  /**
   * @param { string } value - A ', ' separates the document holder's primary
   *     identifier from their secondary identifiers. A '/' separates the full
   *     name in a non-Latin national language from a
   *     transcription/transliteration into the Latin characters A-Z.
   */
  set fullName(value) { this.#document.fullName = value; }

  /**
   * The visa holder's primary identifier
   * @type { string }
   */
  get primaryIdentifier() { return this.#document.primaryIdentifier; }
  /**
   * @param { string }
   */
  set primaryIdentifier(value) { this.#document.primaryIdentifier; }

  /**
   * The visa holder's primary identifier in their native language
   * @type { string | null }
   */
  get primaryIdentifierNative() { return this.#document.primaryIdentifierNative; }
  /**
   * @param { string | null }
   */
  set primaryIdentifierNative(value) { this.#document.primaryIdentifierNative = value?.trim() || null; }

  /**
   * The visa holder's secondary identifier
   * @type { string | null }
   */
  get secondaryIdentifier() { return this.#document.secondaryIdentifier; }
  /**
   * @param { string | null }
   */
  set secondaryIdentifier(value) { this.#document.secondaryIdentifier = value?.trim() || null; }

  /**
   * The visa holder's secondary identifier in their native language
   * @type { string | null }
   */
  get secondaryIdentifierNative() { return this.#document.secondaryIdentifierNative; }
  /**
   * @param { string | null }
   */
  set secondaryIdentifierNative(value) { this.#document.secondaryIdentifierNative = value?.trim() || null; }

  /**
   * A code identifying the visa holder's nationality (or lack thereof).
   * @type { string }
   */
  get nationalityCode() { return this.#document.nationalityCode; }
  /**
   * @param { string } value - A 3-character string consisting of the characters
   *     A-Z, 0-9, ' ', or <. A code from ISO-3166-1, ICAO 9303-3, or these
   *     user-assigned ranges are recommended: AAA-AAZ, QMA-QZZ, XAA-XZZ, or
   *     ZZA-ZZZ.
   */
  set nationalityCode(value) { this.#document.nationalityCode = value; }

  /**
   * The visa holder's date of birth.
   * @type { Date }
   */
  get birthDate() { return this.#document.birthDate; }
  /**
   * @param { string | Date } value - A calendar date string in YYYY-MM-DD
   *     format or a `Date` object.
   */
  set birthDate(value) { this.#document.birthDate = value; }

  /**
   * A marker representing the visa holder's gender.
   * @type { string }
   */
  get genderMarker() { return this.#document.genderMarker; }
  /**
   * @param { string } value - The character 'F', 'M', or 'X'.
   */
  set genderMarker(value) { this.#document.genderMarker = value; }

  /**
   * The last date on which this visa is valid.
   * @type { Date }
   */
  get validThru() { return this.#document.expirationDate; }
  /**
   * @param { string | Date } value - A calendar date string in YYYY-MM-DD
   *     format or a `Date` object.
   */
  set validThru(value) { this.#document.expirationDate = value; }

  /**
   * Optional data to include in the Machine-Readable Zone (MRZ).
   * @type { string }
   */
  get optionalData() { return this.#document.optionalData; }
  /**
   * @param { string } value - Up to 8 characters. Valid characters are from the
   *     ranges A-Z, 0-9, ' ', or <.
   */
  set optionalData(value) { this.#document.optionalData = value; }

  /**
   * A path/URL to an image, or an image object, representing a photo of the
   *     visa holder or an image from the issuing authority.
   * @type { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame }
   */
  get photo() { return this.#document.photo; }
  /**
   * @param { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame } value
   */
  set photo(value) { this.#document.photo = value; }

  /**
   * A path/URL to an image, or an image object, representing the signature or
   *     usual mark of the visa issuer.
   * @type { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame }
   */
  get signatureImage() { return this.#document.signatureImage; }
  /**
   * @param { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame } value
   */
  set signatureImage(value) { this.#document.signatureImage = value; }

  /**
   * Location where the visa was issued.
   * @type { string }
   */
  get placeOfIssue() { return this.#visa.placeOfIssue; }
  /**
   * @param { string } value
   */
  set placeOfIssue(value) { this.#visa.placeOfIssue = value; }

  /**
   * Starting date on which the visa is valid.
   * @type { Date }
   */
  get validFrom() { return this.#visa.validFrom; }
  /**
   * @param { string | Date } value - A calendar date string in YYYY-MM-DD
   *     format or a `Date` object.
   */
  set validFrom(value) { this.#visa.validFrom = value; }

  /**
   * Maximum number of entries this visa allows.
   * @type { string }
   */
  get numberOfEntries() { return this.#visa.numberOfEntries; }
  /**
   * @param { string | number } value - 0 or any string denotes an unlimited
   *     number of entries.
   */
  set numberOfEntries(value) { this.#visa.numberOfEntries = value; }

  /**
   * The textual type/name/description for this visa.
   * @type { string }
   */
  get visaType() { return this.#visa.visaType; }
  /**
   * @param { string } value
   */
  set visaType(value) { this.#visa.visaType = value; }

  /**
   * Additional textual information to include with this visa.
   * @type { string }
   */
  get additionalInfo() { return this.#visa.additionalInfo; }
  /**
   * @param { string } value
   */
  set additionalInfo(value) { this.#visa.additionalInfo = value; }

  /**
   * The identity document number for which this visa is issued.
   * @type { string }
   */
  get passportNumber() { return this.#visa.passportNumber; }
  /**
   * @param { string } value - A string no longer than 9 characters consisting
   *     of the characters A-Z, 0-9, ' ', or <.
   */
  set passportNumber(value) { this.#visa.passportNumber = value; }

  /**
   * Use 'passportNumber' instead of 'number' in the Machine-Readable Zone
   *     (MRZ).
   * @type { boolean }
   */
  get usePassportInMRZ() { return this.#visa.usePassportInMRZ; }
  /**
   * @param { boolean } value
   */
  set usePassportInMRZ(value) { this.#visa.usePassportInMRZ = value; }

  /**
   * The first line of the Machine-Readable Zone (MRZ).
   * @type { string }
   */
  get mrzLine1() {
    return padMRZString(this.typeCode.replace(/\s/gi, "<"), 2) +
        padMRZString(this.authorityCode.replace(/\s/gi, "<"), 3) +
        fullNameMRZ(this.fullName, 31);    
  }
  /**
   * @param { string } value - A MRZ line string of a 36-character length.
   */
  set mrzLine1(value) {
    if (value.length !== 36) {
      throw new RangeError(
        `Length '${value.length}' does not match the length of a MRV-B ` +
            `Machine Readable Zone (MRZ) line.`
      );
    }
    this.typeCode = value.slice(0, 2).replace(/</gi, "");
    this.authorityCode = value.slice(2, 5).replace(/</gi, "");
    this.fullName =
        value.slice(5).replace("<<", ", ").replace(/</gi, " ").trimEnd();
  }

  /**
   * The second line of the Machine-Readable Zone (MRZ).
   * @type { string }
   */
  get mrzLine2() {
    const MRZ_NUMBER = this.usePassportInMRZ ? padMRZString(
      this.passportNumber.replace(/\s/gi, "<"), 9
    ) : padMRZString(this.number.replace(/\s/gi, "<"), 9);
    return MRZ_NUMBER +
      generateMRZCheckDigit(MRZ_NUMBER) +
      padMRZString(this.nationalityCode.replace(/\s/gi, "<"), 3) +
      dateToMRZ(this.birthDate) +
      generateMRZCheckDigit(dateToMRZ(this.birthDate)) +
      genderMarkerToMRZ(this.genderMarker) +
      dateToMRZ(this.validThru) +
      generateMRZCheckDigit(dateToMRZ(this.validThru)) +
      optionalDataMRZ(this.optionalData, 8);
  }
  /**
   * @param { string } value - A MRZ line string of a 36-character length.
   */
  set mrzLine2(value) {
    if (value.length !== 36) {
      throw new RangeError(
        `Length '${value.length}' does not match the length of a MRV-B ` +
            `Machine Readable Zone (MRZ) line.`
      );
    }
    if (value[9] !== generateMRZCheckDigit(
      value.slice(0, 9)
    )) {
      throw new EvalError(
        `Check digit '${value[9]}' does not match for the check digit on the ` +
            `document number.`
      );
    }
    if (value[19] !== generateMRZCheckDigit(
      value.slice(13, 19)
    )) {
      throw new EvalError(
        `Check digit '${value[19]}' does not match for the check digit on the` +
            ` date of birth.`
      );
    }
    if (value[27] !== generateMRZCheckDigit(
      value.slice(21, 27)
    )) {
      throw new EvalError(
        `Check digit '${value[27]}' does not match for the check digit on the` +
            ` valid thru date.`
      );
    }
    if (this.usePassportInMRZ) {
      this.passportNumber = value.slice(0, 9).replace(/</gi, "");
    } else {
      this.number = value.slice(0, 9).replace(/</gi, "");
    }
    this.nationalityCode = value.slice(10, 13).replace(/</gi, "");
    this.birthDate = `${expandYear(value.slice(13, 15), new Date().getFullYear()).toString()}-` +
        `${value.slice(15, 17)}-${value.slice(17, 19)}`;
    this.genderMarker = value[20] === "<" ? "X" : value[20];
    this.validThru = `${expandYear(value.slice(21, 23), new Date().getFullYear() + 20).toString()}-` +
        `${value.slice(23, 25)}-${value.slice(25, 27)}`;
    this.optionalData = value.slice(28).replace(/</gi, " ").trimEnd();
  }

  /**
   * The full Machine-Readable Zone (MRZ).
   * @type { string }
   */
  get machineReadableZone() {
    return this.mrzLine1 + this.mrzLine2;
  }
  /**
   * @param { string } value - A MRZ string of a 72-character length.
   */
  set machineReadableZone(value) {
    if (value.length !== 72) {
      throw new RangeError(
        `Length '${value.length}' does not match the length of a MRV-B ` +
            `Machine-Readable Zone (MRZ).`
      );
    }
    this.mrzLine1 = value.slice(0, 36);
    this.mrzLine2 = value.slice(36);
  }
}

