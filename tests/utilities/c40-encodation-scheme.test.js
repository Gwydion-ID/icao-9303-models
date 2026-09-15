// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { c40Encode } from '../../src/utilities/c40-encode.js';
import { c40Decode } from '../../src/utilities/c40-decode.js';

describe('C40 Encodation Scheme', () => {

  describe('c40Encode - Encode a string using the C40 encoding scheme [REF ICAO Doc 9303 Part 13, Appendix C]', () => {
    it('should encode "XK<CD" into [0xEB, 0x04, 0x66, 0xA9].', () => {
      assert.deepStrictEqual(c40Encode('XK<CD'), [0xeb, 0x04, 0x66, 0xa9]);
    });
    it('should encode "XKCD" into [0xEB, 0x11, 0xFE, 0x45].', () => {
      // Note that there is an error in the document as it states Byte 2 should be 11 (decimal), 0x11 (hexadecimal).
      // 0x11 (hexidecimal) equals 17 (decimal)
      assert.deepStrictEqual(c40Encode('XKCD'), [0xeb, 0x11, 0xfe, 0x45]);
    });
  });

  describe('c40Decode - Decode a byte array using the C40 decoding scheme [REF ICAO Doc 9303 Part 13, Appendix C]', () => {
    it('should decode [0xEB, 0x04, 0x66, 0xA9] into "XK CD".', () => {
      assert.deepStrictEqual(c40Decode([0xeb, 0x04, 0x66, 0xa9]), 'XK CD');
    });
    it('should decode [0xEB, 0x11, 0xFE, 0x45] into "XKCD".', () => {
      // Note that there is an error in the document as it states Byte 2 should be 11 (decimal), 0x11 (hexadecimal).
      // 0x11 (hexidecimal) equals 17 (decimal)
      assert.deepStrictEqual(c40Decode([0xeb, 0x11, 0xfe, 0x45]), 'XKCD');
    });
  });

});

