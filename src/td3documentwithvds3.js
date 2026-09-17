// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { TD3Document } from './td3document.js';
import { DigitalSealV3 } from './digitalsealv3.js';

/**
 * Stores properties and methods for TD3-sized machine-readable travel documents
 *     (MRTDs) with a machine-readable zone and a version 3 visible digital seal
 *     (VDS). A machine-readable passport (MRP) is an example of a document
 *     that is the size of a TD3.
 */
export class TD3DocumentWithVDS3 {
  /**
   * Create a `TD3DocumentWithVDS3`.
   * @param { Object } [opt] - An options object.
   * @param { string } [opt.typeCode] - A 1-2 character string consisting of the
   *     characters A-Z, 0-9, ' ', or <. 'A', 'I', 'P', or 'V' are recommended
   *     for the first character.
   * @param { string } [opt.authorityCode] - A 3-character string consisting of
   *     the characters A-Z, 0-9, ' ', or <. A code from ISO-3166-1, ICAO
   *     9303-3, or these user-assigned ranges are recommended: AAA-AAZ,
   *     QMA-QZZ, XAA-XZZ, or ZZA-ZZZ.
   * @param { string } [opt.primaryIdentifier] - The document holder's primary
   *     identifier.
   * @param { string | null } [opt.primaryIdentifierNative] - The document
   *     holder's primary identifier in their native language.
   * @param { string | null } [opt.secondaryIdentifer] - The document holder's
   *     secondary identifier.
   * @param { string | null } [opt.secondaryIdentifierNative] - The document
   *     holder's secondary identifier in their native language.
   * @param { string } [opt.number] - A string no longer than 9 characters
   *     consisting of the characters A-Z, 0-9, ' ', or <.
   * @param { string } [opt.nationalityCode] - A 3-character string consisting
   *     of the characters A-Z, 0-9, ' ', or <. A code from ISO-3166-1,
   *     ICAO 9303-3, or these user-assigned ranges are recommended: AAA-AAZ,
   *     QMA-QZZ, XAA-XZZ, or ZZA-ZZZ.
   * @param { string | Date | IcaoDate } [opt.birthDate] - A calendar date string in
   *     YYYY-MM-DD format, a `Date` object, or an `IcaoDate` object.
   * @param { 'F' | 'M' | 'X' } [opt.genderMarker] - The character 'F', 'M', or 'X'.
   * @param { string | Date | IcaoDate } [opt.expirationDate] - A calendar date string in
   *     YYYY-MM-DD format, a `Date` object, or an `IcaoDate` object.
   * @param { string } [opt.optionalData] - Up to 14 characters. Valid
   *     characters are from the ranges A-Z, 0-9, ' ', or <.
   * @param { string } [opt.mrzLine1] - A MRZ line string of a 44-character
   *     length.
   * @param { string } [opt.mrzLine2] - A MRZ line string of a 44-character
   *     length.
   * @param { string } [opt.machineReadableZone] - A MRZ string of a
   *     88-character length.
   * @param { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas |
   *     VideoFrame } [opt.photo] - A path/URL to an image, or an image object,
   *     representing a photo of the document holder.
   * @param { string | HTMLImageElement | SVGImageElement | HTMLVideoElement |
   *     HTMLCanvasElement | ImageBitmap | OffscreenCanvas |
   *     VideoFrame } [opt.signatureImage] - A path/URL to an image, or an image
   *     object, representing the signature or usual mark of the document
   *     holder.
   * @param { string } [opt.identifierCode] - A 4-character string consisting of
   *     the characters 0-9 and A-Z.
   * @param { string } [opt.certReference] - A hex-string that uniquely
   *     identifies a certificate for a given signer.
   * @param { string | Date | IcaoDate } [opt.issueDate] - A calendar date string in
   *     YYYY-MM-DD format, a `Date` object, or an `IcaoDate` object.
   * @param { string | Date | IcaoDate } [opt.signatureDate] - A calendar date string in
   *     YYYY-MM-DD format, a `Date` object, or an `IcaoDate` object.
   * @param { number } [opt.featureDefinition] - A number in the range of
   *     0x01-0xFE.
   * @param { number } [opt.typeCategory] - A number in the range of 0x01-0xFE.
   *     Odd numbers in the range between 0x01 and 0xFD shall be used for
   *     ICAO-specified document type categories.
   * @param { Map<number, number[]> } [opt.features] - A store of
   *     digitally-encoded document features used to create the message zone.
   * @param { number[] } [opt.signatureData] - The raw signature data generated
   *     by concatenating the header and message zone, hashing the result, and
   *     signing the hash with a cryptographic key.
   * @param { number[] } [opt.headerZone] - The header zone of the VDS as
   *     defined by ICAO 9303 part 13.
   * @param { number[] } [opt.messageZone] - The message zone of the VDS as
   *     defined by ICAO 9303 part 13.
   * @param { number[] } [opt.signatureZone] - The signature zone of the VDS as
   *     a TLV of the signature marker, its length in BER/DER definite length
   *     form, and the raw signature data.
   * @param { number[] } [opt.unsignedSeal] - A concatenation of the header zone
   *     and the message zone of the VDS.
   * @param { number[] } [opt.signedSeal] - A concatenation of the header zone,
   *     the message zone, and the signature zone of the VDS.
   */
  constructor(opt) {
    this.#document = new TD3Document();
    this.#digitalseal = new DigitalSealV3();

    this.typeCode = opt?.typeCode ?? "PP";
    this.authorityCode = opt?.authorityCode ?? "UTO";
    this.primaryIdentifier = opt?.primaryIdentifier ?? "Eriksson";
    this.primaryIdentifierNative = opt?.primaryIdentifierNative ?? null;
    this.secondaryIdentifier = opt?.secondaryIdentifier ?? null;
    this.secondaryIdentifierNative = opt?.secondaryIdentifierNative ?? null;
    this.number = opt?.number ?? "L898902C3";
    this.nationalityCode = opt?.nationalityCode ?? "UTO";
    this.birthDate = opt?.birthDate ?? "1974-08-12";
    this.genderMarker = opt?.genderMarker ?? "F";
    this.expirationDate = opt?.expirationDate ?? "2034-04-15";
    this.optionalData = opt?.optionalData ?? "ZE184226B";
    this.identifierCode = opt?.identifierCode ?? "UTSS";
    this.certReference = opt?.certReference ?? "00000";
    this.issueDate = opt?.issueDate ?? "2007-04-15";
    this.signatureDate = opt?.signatureDate ?? "2007-04-15";
    this.featureDefinition = opt?.featureDefinition ?? 0x01;
    this.typeCategory = opt?.typeCategory ?? 0x01;
    this.features = opt?.features ?? new Map();
    this.signatureData = opt?.signatureData ?? Array(64).fill(0);
  
    if (opt?.photo) { this.photo = opt.photo; }
    if (opt?.signatureImage) { this.signatureImage = opt.signatureImage; }
    if (opt?.mrzLine1) { this.mrzLine1 = opt.mrzLine1; }
    if (opt?.mrzLine2) { this.mrzLine2 = opt.mrzLine2; }
    if (opt?.machineReadableZone) {
      this.machineReadableZone = opt.machineReadableZone;
    }
    if (opt?.headerZone) { this.headerZone = opt.headerZone; }
    if (opt?.messageZone) { this.messageZone = opt.messageZone; }
    if (opt?.signatureZone) { this.signatureZone = opt.signatureZone; }
    if (opt?.unsignedSeal) { this.unsignedSeal = opt.unsignedSeal; }
    if (opt?.signedSeal) { this.signedSeal = opt.signedSeal; }
  }

  // The objects `TD3DocumentWithVDS3` uses to compose itself.
  #document;
  #digitalseal;

  /**
   * A code identifying the document type.
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
   * A code identifying the authority who issued this document.
   * @type { string }
   */
  get authorityCode() { return this.#document.authorityCode; }
  /** 
   * @param { string } value - A 3-character string consisting of the characters
   *     A-Z, 0-9, ' ', or <. A code from ISO-3166-1, ICAO 9303-3, or these
   *     user-assigned ranges are recommended: AAA-AAZ, QMA-QZZ, XAA-XZZ, or
   *     ZZA-ZZZ.
   */
  set authorityCode(value) {
    this.#document.authorityCode = value;
    this.#digitalseal.authorityCode = value;
  }

  /**
   * The document holder's primary identifier
   * @type { string }
   */
  get primaryIdentifier() { return this.#document.primaryIdentifier; }
  /**
   * @param { string }
   */
  set primaryIdentifier(value) { this.#document.primaryIdentifier = value; }

  /**
   * The document holder's primary identifier in their native language
   * @type { string | null }
   */
  get primaryIdentifierNative() { return this.#document.primaryIdentifierNative; }
  /**
   * @param { string | null }
   */
  set primaryIdentifierNative(value) { this.#document.primaryIdentifierNative = value; }

  /**
   * The document holder's secondary identifier
   * @type { string | null }
   */
  get secondaryIdentifier() { return this.#document.secondaryIdentifier; }
  /**
   * @param { string | null }
   */
  set secondaryIdentifier(value) { this.#document.secondaryIdentifier = value; }

  /**
   * The document holder's secondary identifier in their native language
   * @type { string | null }
   */
  get secondaryIdentifierNative() { return this.#document.secondaryIdentifierNative; }
  /**
   * @param { string | null }
   */
  set secondaryIdentifierNative(value) { this.#document.secondaryIdentifierNative = value; }

  /**
   * An identity document number unique for this document.
   * @type { string }
   */
  get number() { return this.#document.number; }
  /**
   * @param { string } value - A string no longer than 9 characters consisting
   *     of the characters A-Z, 0-9, ' ', or <.
   */
  set number(value) { this.#document.number = value; }

  /**
   * A code identifying the document holder's nationality (or lack thereof).
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
   * The document holder's date of birth.
   * @type { IcaoDate }
   */
  get birthDate() { return this.#document.birthDate; }
  /**
   * @param { string | Date | IcaoDate } value - A calendar date string in YYYY-MM-DD
   *     format, a `Date` object, or an `IcaoDate` object.
   */
  set birthDate(value) { this.#document.birthDate = value; }

  /**
   * A marker representing the document holder's gender.
   * @type { 'F' | 'M' | 'X' }
   */
  get genderMarker() { return this.#document.genderMarker; }
  /**
   * @param { 'F' | 'M' | 'X' } value - The character 'F', 'M', or 'X'.
   */
  set genderMarker(value) { this.#document.genderMarker = value; }

  /**
   * The last date on which this document is valid.
   * @type { IcaoDate }
   */
  get expirationDate() { return this.#document.expirationDate; }
  /**
   * @param { string | Date | IcaoDate } value - A calendar date string in YYYY-MM-DD
   *     format, a `Date` object, or an `IcaoDate` object.
   */
  set expirationDate(value) { this.#document.expirationDate = value; }

  /**
   * Optional data to include in the Machine-Readable Zone (MRZ).
   * @type { string }
   */
  get optionalData() { return this.#document.optionalData; }
  /**
   * @param { string } value - Up to 14 characters. Valid characters are from
   *     the ranges A-Z, 0-9, ' ', or <.
   */
  set optionalData(value) { this.#document.optionalData = value; }

  /**
   * A path/URL to an image, or an image object, representing a photo of the
   *     document holder.
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
   *     usual mark of the document holder.
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
   * The first line of the Machine-Readable Zone (MRZ).
   * @type { string }
   */
  get mrzLine1() { return this.#document.mrzLine1; }
  /**
   * @param { string } value - A MRZ line string of a 44-character length.
   */
  set mrzLine1(value) { this.#document.mrzLine1 = value; }

  /**
   * The second line of the Machine-Readable Zone (MRZ).
   * @type { string }
   */
  get mrzLine2() { return this.#document.mrzLine2; }
  /**
   * @param { string } value - A MRZ line string of a 44-character length.
   */
  set mrzLine2(value) { this.#document.mrzLine2 = value; }

  /**
   * The full Machine-Readable Zone (MRZ).
   * @type { string }
   */
  get machineReadableZone() { return this.#document.machineReadableZone; }
  /**
   * @param { string } value - A MRZ string of a 88-character length.
   */
  set machineReadableZone(value) { this.#document.machineReadableZone = value; }

  /**
   * A combination of a two-letter authority code and of two alphanumeric
   *     characters to identify a signer within the issuing authority.
   * @type { string }
   */
  get identifierCode() { return this.#digitalseal.identifierCode; }
  /**
   * @param { string } value - A 4-character string consisting of the characters
   *     0-9 and A-Z.
   */
  set identifierCode(value) { this.#digitalseal.identifierCode = value; }

  /**
   * A hex-string that uniquely identifies a certificate for a given signer.
   * @type { string }
   */
  get certReference() { return this.#digitalseal.certReference; }
  /**
   * @param { string } value - A hex string of exactly 5 characters.
   */
  set certReference(value) { this.#digitalseal.certReference = value; }

  /**
   * A date string on which the document was issued.
   * @type { IcaoDate }
   */
  get issueDate() { return this.#digitalseal.issueDate; }
  /**
   * @param { string | Date | IcaoDate } value - A calendar date string in YYYY-MM-DD
   *     format, a `Date` object, or an `IcaoDate` object.
   */
  set issueDate(value) { this.#digitalseal.issueDate = value; }

  /**
   * A date string on which the seal was signed.
   * @type { IcaoDate }
   */
  get signatureDate() { return this.#digitalseal.signatureDate; }
  /**
   * @param { string | Date | IcaoDate } value - A calendar date string in YYYY-MM-DD
   *     format, a `Date` object, or an `IcaoDate` object.
   */
  set signatureDate(value) { this.#digitalseal.signatureDate = value; }

  /**
   * A reference code to a document that defines the number and encoding of VDS
   *     features.
   * @type { number }
   */
  get featureDefinition() { return this.#digitalseal.featureDefinition; }
  /**
   * @param { number } value - A number in the range of 0x01-0xFE.
   */
  set featureDefinition(value) { this.#digitalseal.featureDefinition = value; }

  /**
   * A code defining the document type category to which the seal is attached.
   * @type { number }
   */
  get typeCategory() { return this.#digitalseal.typeCategory; }
  /**
   * @param { number } value - A number in the range of 0x01-0xFE. Odd numbers
   *     in the range between 0x01 and 0xFD shall be used for ICAO-specified
   *     document type categories.
   */
  set typeCategory(value) { this.#digitalseal.typeCategory = value; }

  /**
   * A store of digitally-encoded document features used to create the message
   *     zone.
   * @type { Map<number, number[]>}
   */
  get features() { return this.#digitalseal.features; }
  /**
   * @param { Map<number, number[]> } value
   */
  set features(value) { this.#digitalseal.features = value; }

  /**
   * The raw signature data generated by concatenating the header and message
   *     zone, hashing the result, and signing the hash with a cryptographic
   *     key.
   * @type { number[] }
   */
  get signatureData() { return this.#digitalseal.signatureData; }
  /**
   * @param { number[] } value
   */
  set signatureData(value) { this.#digitalseal.signatureData = value; }

  /**
   * The header zone of the VDS as defined by ICAO 9303 part 13.
   * @type { number[] }
   */
  get headerZone() { return this.#digitalseal.headerZone; }
  /**
   * @param { number[] } value
   */
  set headerZone(value) { this.#digitalseal.headerZone = value; }

  /**
   * The message zone of the VDS as defined by ICAO 9303 part 13.
   * @type { number[] }
   */
  get messageZone() { return this.#digitalseal.messageZone; }
  /**
   * @param { number[] } value
   */
  set messageZone(value) { this.#digitalseal.messageZone = value; }

  /**
   * The signature zone of the VDS as a TLV of the signature marker, its length
   *     in BER/DER definite length form, and the raw signature data.
   * @type { number[] }
   */
  get signatureZone() { return this.#digitalseal.signatureZone; }
  /**
   * @param { number[] } value
   */
  set signatureZone(value) { this.#digitalseal.signatureZone = value; }

  /**
   * A concatenation of the header zone and the message zone of the VDS.
   * @type { number[] }
   */
  get unsignedSeal() { return this.#digitalseal.unsignedSeal; }
  /**
   * @param { number[] } value
   */
  set unsignedSeal(value) { this.#digitalseal.unsignedSeal = value; }

  /**
   * A concatenation of the header zone, the message zone, and the signature
   *     zone of the VDS.
   * @type { number[] }
   */
  get signedSeal() { return this.#digitalseal.signedSeal; }
  /**
   * @param { number[] } value
   */
  set signedSeal(value) { this.#digitalseal.signedSeal = value; }

  /**
   * Get a hash of the VDS for use in signing and verification operations.
   * @param { 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512' } [algorithm = 'SHA-256'] - A
   *     Web Crypto API supported hash function string.
   * @returns { Promise<number[]> }
   */
  async getHash(algorithm = 'SHA-256') {
    const output = await this.#digitalseal.getHash(algorithm);
    return output;
  }
}

