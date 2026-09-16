// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dateToMRZ } from '../../src/utilities/date-to-mrz.js';
import { expandYear } from "../../src/utilities/expand-year.js";
import { genderMarkerToMRZ } from '../../src/utilities/gender-marker-to-mrz.js';
import { generateMRZCheckDigit } from '../../src/utilities/generate-mrz-check-digit.js';
import { normalizeMRZString } from '../../src/utilities/normalize-mrz-string.js';
import { optionalDataMRZ } from '../../src/utilities/optional-data-mrz.js';
import { padMRZString } from '../../src/utilities/pad-mrz-string.js';
import { setSignatureZone } from '../../src/utilities/set-signature-zone.js';
import { validateHexString } from '../../src/utilities/validate-hex-string.js';
import { validateIdentifierCode } from '../../src/utilities/validate-identifier-code.js';
import { validateMRZString } from '../../src/utilities/validate-mrz-string.js';

describe('Document Utility Functions', () => {

  describe('dateToMRZ - Convert a JavaScript Date object to a MRZ YYMMDD date string', () => {
    it('should output "570325" from new Date("1957-03-25T00:00:00").', () => {
      assert.deepStrictEqual(dateToMRZ(new Date('1957-03-25T00:00:00')), "570325");
    });
  });

  describe('expandYear - Expands a two-digit year into a four-digit year within the window (maxYear - 100, maxYear]', () => {
    it('should expand birth dates correctly. (maxYear = 2026)', () => {
      const maxYear = 2026;
      assert.equal(expandYear('26', maxYear), 2026);
      assert.equal(expandYear(26, maxYear), 2026);
      assert.equal(expandYear('99', maxYear), 1999);
      assert.equal(expandYear('55', maxYear), 1955);
      assert.equal(expandYear('27', maxYear), 1927);
    });
    it('should expand expiration dates correctly. (maxYear = 2046)', () => {
      const maxYear = 2046;
      assert.equal(expandYear('30', maxYear), 2030);
      assert.equal(expandYear('46', maxYear), 2046);
      assert.equal(expandYear('90', maxYear), 1990);
      assert.equal(expandYear('50', maxYear), 1950);
      assert.equal(expandYear('47', maxYear), 1947);
    });
    it('should handle zero-padded string and numeric inputs identically.', () => {
      const maxYear = 2026;
      assert.equal(expandYear('00', maxYear), 2000);
      assert.equal(expandYear(0, maxYear), 2000);
      assert.equal(expandYear('05', maxYear), 2005);
      assert.equal(expandYear(5, maxYear), 2005);
    });
    it('should handle multi-century century boundaries.', () => {
      const maxYear = 2105;
      assert.equal(expandYear('05', maxYear), 2105);
      assert.equal(expandYear('06', maxYear), 2006);
      assert.equal(expandYear('99', maxYear), 2099);
    });
    it('should throw errors for invalid two-digit year values.', () => {
      const maxYear = 2026;
      assert.throws( () => { expandYear(-1, maxYear) }, RangeError);
      assert.throws( () => { expandYear(100, maxYear) }, RangeError);
      assert.throws( () => { expandYear('abc', maxYear) }, RangeError);
      assert.throws( () => { expandYear(NaN, maxYear) }, RangeError);
    });
  });

  describe('genderMarkerToMRZ - If the gender marker is X convert to a < in the MRZ', () => {
    it('should output "M" for "M".', () => {
      assert.deepStrictEqual(genderMarkerToMRZ('M'), 'M');
    });
    it('should output "F" for "F".', () => {
      assert.deepStrictEqual(genderMarkerToMRZ('F'), 'F');
    });
    it('should output "<" for "X".', () => {
      assert.deepStrictEqual(genderMarkerToMRZ('X'), '<');
    });
  });

  describe('generateMRZCheckDigit - Generate a check digit for a MRZ string [REF ICAO Doc 9303 Part 3 SS 4.9, Page 19]', () => {
    it('should output "3" for "520727".', () => {
      assert.deepStrictEqual(generateMRZCheckDigit('520727'), '3');
    });
    it('should output "5" for "AB2134<<<".', () => {
      assert.deepStrictEqual(generateMRZCheckDigit('AB2134<<<'), '5');
    });
    it('should output "8" for composite check digit of exemplary TD3 MRZ in Appendix A-2.', () => {
      assert.deepStrictEqual(generateMRZCheckDigit(
        'HA672242<6' + '5802254' + '9601086<<<<<<<<<<<<<<0'
      ), '8');
    });
    it('should output "2" for composite check digit of exemplary TD1 MRZ in Appendix A-3.', () => {
      assert.deepStrictEqual(generateMRZCheckDigit(
        'D231458907<<<<<<<<<<<<<<<' + '3407127' + '9507122' + '<<<<<<<<<<<'
      ), '2');
    });
    it('should output "8" for composite check digit of exemplary TD2 MRZ in Appendix A-4.', () => {
      assert.deepStrictEqual(generateMRZCheckDigit(
        'HA672242<6' + '5802254' + '9601086<<<<<<<'
      ), '8');
    });
  });

  describe('normalizeMRZString - Remove diacritics and punctuation from a MRZ string', () => {
    it('should return "ADRIAN<CLAUDE<DEVELEAU" from "ADRIAN-CLAUDE D\'EVELEAU".', () => {
      assert.deepStrictEqual(normalizeMRZString('ADRIAN-CLAUDE D\'EVELEAU'), 'ADRIAN<CLAUDE<DEVELEAU');
    });
  });

  describe('optionalDataMRZ - Normalize and pad additional data for the optional data area of the MRZ', () => {
    it('should return "EXAMPLE<<<<<<<" from "EXAMPLE" with a length 14.', () => {
      assert.deepStrictEqual(optionalDataMRZ("EXAMPLE", 14), 'EXAMPLE<<<<<<<');
    });
  });

  describe('padMRZString - Pad the end of a MRZ string to the desired length with the filler character', () => {
    it('should return "ALFALFA<<" from "ALFALFA" with length 9.', () => {
      assert.deepStrictEqual(padMRZString('ALFALFA', 9), 'ALFALFA<<');
    });
  });

  describe('setSignatureZone - Given a starting point in a byte array extract the raw signature data', () => {
    const validSignatureZone = [ 0xFF, 0x40, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88 ];
    const invalidLength = [ 0xFF, 0x40, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99 ];
    const invalidMarker = [ 0xFE, 0x40, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88 ];

    it('should return the raw signature data from a valid signature zone.', () => {
      assert.deepStrictEqual(setSignatureZone(0, validSignatureZone), [ 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0xFF, 0xEE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88 ]);
    });
    it('should throw a RangeError if the length is invalid.', () => {
      assert.throws( () => {
        setSignatureZone(0, invalidLength);
      }, RangeError);
    });
    it('should throw a TypeError if the first byte is not the signature marker.', () => {
      assert.throws( () => {
        setSignatureZone(0, invalidMarker);
      }, TypeError);
    });
  });

  describe('validateHexString - Check to see if a string is a hexidecimal string and optionally meets a min/max length', () => {
    it('should return an empty string if all checks validate.', () => {
      assert.ok(validateHexString('123456789ABCDEF', {
        minimum: 1,
	maximum: 15
      }).length === 0);
    });
    it('should not return an empty string if minimum characters not met.', () => {
      assert.ok(validateHexString('123456789ABCDEF', {
        minimum: 16,
	maximum: 32
      }).length > 0);
    });
    it('should not return an empty string if maximum characters not met.', () => {
      assert.ok(validateHexString('123456789ABCDEF', {
        minimum: 1,
	maximum: 14
      }).length > 0);
    });
    it('should not return an empty string if using characters other than 0-9 or A-F.', () => {
      assert.ok(validateHexString('123456789ABCDEG', {
        minimum: 1,
	maximum: 15
      }).length > 0);
    });
  });

  describe('validateIdentifierCode - Check to see if a string meets the requirements of a VDS identifier code [REF ICAO 9303 Part 13 SS 2.2.1, Page 4]', () => {
    it('should return an empty string if all checks validate.', () => {
      assert.ok(validateIdentifierCode('UT01').length === 0);
    });
    it('should not return an empty string if using characters other than A-Z in the country code.', () => {
      assert.ok(validateIdentifierCode('U9T1').length > 0);
    });
    it('should not return an empty string if using characters other than 0-9 or A-Z in the signer code.', () => {
      assert.ok(validateIdentifierCode('UT0!').length > 0);
    });
  });

  describe('validateMRZString - Check to see if a string meets the requirements to be used in a document\'s MRZ', () => {
    it('should return an empty string if all checks validate.', () => {
      assert.ok(validateMRZString('UTOPIOPOLIS<UTOPIA', {
        minimum: 1,
	maximum: 18
      }).length === 0);
    });
    it('should not return an empty string if minimum characters not met.', () => {
      assert.ok(validateMRZString('UTOPIOPOLIS<UTOPIA', {
        minimum: 19,
	maximum: 36
      }).length > 0);
    });
    it('should not return an empty string if maximum characters not met.', () => {
      assert.ok(validateMRZString('UTOPIOPOLIS<UTOPIA', {
        minimum: 1,
	maximum: 17
      }).length > 0);
    });
    it('should not return an empty string if using characters other than 0-9, A-Z, SPACE, or <', () => {
      assert.ok(validateMRZString('UTOP!OPOLIS<UTOPIA', {
        minimum: 1,
	maximum: 18
      }).length > 0);
    });
  });

});

