// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: CC0-1.0

// Utility exports
export { NATIONALITY_CODES } from './utilities/nationality-codes.js';
export { IcaoDate } from './utilities/icao-date.js';
export { dateToBytes } from './utilities/date-to-bytes.js';
export { bytesToDate } from './utilities/bytes-to-date.js';
export { c40Decode } from './utilities/c40-decode.js';
export { c40Encode } from './utilities/c40-encode.js';
export { derLengthToLength } from './utilities/der-length-to-length.js';
export { lengthToDERLength } from './utilities/length-to-der-length.js';

// Abstract models
export { DigitalSeal } from './digitalseal.js'; // TODO: Test Suite
export { TravelDocument } from './traveldocument.js'; // TODO: Test Suite
export { VisaDocument } from './visadocument.js'; // TODO: Test Suite

// Digital seals
export { DigitalSealV3 } from './digitalsealv3.js'; // TODO: Test Suite
export { DigitalSealV4 } from './digitalsealv4.js';

// Base document models
export { TD1Document } from './td1document.js';
export { TD2Document } from './td2document.js';
export { TD3Document } from './td3document.js';
export { MRVADocument } from './mrvadocument.js';
export { MRVBDocument } from './mrvbdocument.js';

// Composed document models
export { TD1DocumentWithVDS3 } from './td1documentwithvds3.js'; // TODO: Test Suite
export { TD1DocumentWithVDS4 } from './td1documentwithvds4.js'; // TODO: Test Suite
export { TD2DocumentWithVDS3 } from './td2documentwithvds3.js'; // TODO: Test Suite
export { TD2DocumentWithVDS4 } from './td2documentwithvds4.js'; // TODO: Test Suite
export { TD3DocumentWithVDS3 } from './td3documentwithvds3.js'; // TODO: Test Suite
export { TD3DocumentWithVDS4 } from './td3documentwithvds4.js'; // TODO: Test Suite
export { MRVADocumentWithVDS3 } from './mrvadocumentwithvds3.js'; // TODO: Test Suite
export { MRVADocumentWithVDS4 } from './mrvadocumentwithvds4.js'; // TODO: Test Suite
export { MRVBDocumentWithVDS3 } from './mrvbdocumentwithvds3.js'; // TODO: Test Suite
export { MRVBDocumentWithVDS4 } from './mrvbdocumentwithvds4.js'; // TODO: Test Suite

