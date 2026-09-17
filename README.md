<!--
  SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
  SPDX-License-Identifier: CC0-1.0
-->

# ICAO Document 9303 machine-readable travel document models

> A collection of exports to represent and use [ICAO Document 9303 machine-readable travel documents (MRTDs)][icao9303].

## Provided exports

### Abstract models

These abstract models store common properties and methods for their respective documents. They are intended to be extended or used to compose other documents and are not intended to be instantiated directly:

* **DigitalSeal** - Common properties and methods for all visible digital seals (VDS)
* **TravelDocument** - Common properties and methods for all MRTDs with machine-readable zones (MRZ)
* **VisaDocument** - Common properties and methods specific to machine-readable visa (MRV) documents

### Digital seals

Visible digital seals (VDS) are cryptographically signed data structures that prove the authenticity and integrity of a document. The structures are encoded into a 2D barcode. Two models are provided that follow the specifications:

* **DigitalSealV3** - A version 3 VDS which provide smaller data structures at the cost of smaller document features
* **DigitalSealV4** - A version 4 VDS which allows larger document features and data payloads

### Base document models

Five base document models are available, each based on a specific MRTD and with a specific size in mind:

* **TD1Document** - A document in an ISO/IEC 7810 ID-1 (TD1) size like a payment card
* **TD2Document** - A document in an ISO/IEC 7810 ID-2 (TD2) size, previously used for Icelandic IDs
* **TD3Document** - A document in an ISO/IEC 7810 ID-3 (TD3) size like a passport booklet
* **MRVADocument** - A visa document that nearly fills a page of a passport booklet
* **MRVBDocument** - A smaller visa document used when a clear zone is needed on a passport page

### Composed document models

Each base document model is composed with each VDS to create 10 composed document models. These models have the properties and methods of both a MRTD and a VDS:

* **TD1DocumentWithVDS3** - A `TD1Document` with a version 3 VDS (`DigitalSealV3`)
* **TD1DocumentWithVDS4** - A `TD1Document` with a version 4 VDS (`DigitalSealV4`)
* **TD2DocumentWithVDS3** - A `TD2Document` with a version 3 VDS (`DigitalSealV3`)
* **TD2DocumentWithVDS4** - A `TD2Document` with a version 4 VDS (`DigitalSealV4`)
* **TD3DocumentWithVDS3** - A `TD3Document` with a version 3 VDS (`DigitalSealV3`)
* **TD3DocumentWithVDS4** - A `TD3Document` with a version 4 VDS (`DigitalSealV4`)
* **MRVADocumentWithVDS3** - A `MRVADocument` with a version 3 VDS (`DigitalSealV3`)
* **MRVADocumentWithVDS4** - A `MRVADocument` with a version 4 VDS (`DigitalSealV4`)
* **MRVBDocumentWithVDS3** - A `MRVBDocument` with a version 3 VDS (`DigitalSealV3`)
* **MRVBDocumentWithVDS4** - A `MRVBDocument` with a version 4 VDS (`DigitalSealV4`)

### Utility exports

* **NATIONALITY_CODES** - A list of 3-digit nationality codes available in ISO 3166-1 and ICAO 9303-3
* **dateToBytes** and **bytesToDate** - Convert dates to/from a three-byte array for use in VDS
* **c40Encode** and **c40Decode** - Encode/decode strings for use in VDS
* **derLengthToLength** and **lengthToDERLength** - Convert lengths to/from a DER length encoding

#### IcaoDate

Dates in the ICAO Document 9303 specifications only deal with year, month, and day and additionally can have blank values for unknown fields, which the native `Date` object cannot support. `IcaoDate` mimicks some of the methods and properties of the native `Date` object and provides additional methods to present dates in the various formats in the specification. In certain instances it may be used as a drop-in replacement for the native `Date` object.

## License

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but **without any warranty**; without even the implied warranty of **merchantability** or **fitness for a particular purpose**.  See the [GNU Lesser General Public License][lgpl] for more details.

You should have received a copy of the GNU Lesser General Public License along with this program.  If not, see [https://gnu.org/licenses/][lgplweb].

Additionally, the program is [REUSE-compliant][reuse] and all files contain its licensing information, either directly in the file or in a `.license` file.

[icao9303]: https://www.icao.int/publications/doc-series/doc-9303
[lgpl]: ./LICENSES/LGPL-3.0-or-later.txt
[lgplweb]: https://gnu.org/licenses/
[reuse]: https://reuse.software/

