// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: CC0-1.0

// Constants
export { NATIONALITY_CODES } from './utilities/nationality-codes.js';

// Utility objects and functions
export { dateToBytes } from './utilities/dates-to-bytes.js';
export { bytesToDate } from './utilities/bytes-to-date.js';
export { c40Decode } from './utilities/c40-decode.js';
export { c40Encode } from './utilities/c40-encode.js';
export { derLengthToLength } from './utilities/der-length-to-length.js';
export { lengthToDERLength } from './utilities/length-to-der-length.js';
export { IcaoDate } from './utilities/icao-date.js';

// Abstract models
export { DigitalSeal } from './digitalseal.js'; // TODO: Test Suite
export { TravelDocument } from './traveldocument.js'; // TODO: Test Suite
export { VisaDocument } from './visadocument.js'; // TODO: Test Suite

// Document components
export { DigitalSealV3 } from './digitalsealv3.js'; // TODO: Test Suite
export { DigitalSealV4 } from './digitalsealv4.js';

// Base document models
export { TD1Document } from './td1document.js';
export { TD2Document } from './td2document.js';
export { TD3Document } from './td3document.js';
export { MRVADocument } from './mrvadocument.js';
export { MRVBDocument } from './mrvbdocument.js';

