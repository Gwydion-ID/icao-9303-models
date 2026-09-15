// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { lengthToDERLength } from '../../src/utilities/length-to-der-length.js';
import { derLengthToLength } from '../../src/utilities/der-length-to-length.js';

describe('DER-TLV Length Conversion', () => {

  describe('lengthToDERLength - Convert a length into the shortest DER definite form for a number', () => {
    it('should output [0x00] from 0.', () => {
      assert.deepStrictEqual(lengthToDERLength(0), [0x00]);
    });
    it('should output [0x01] from 1.', () => {
      assert.deepStrictEqual(lengthToDERLength(1), [0x01]);
    });
    it('should output [0x7F] from 127.', () => {
      assert.deepStrictEqual(lengthToDERLength(127), [0x7f]);
    });
    it('should output [0x81, 0x80] from 128.', () => {
      assert.deepStrictEqual(lengthToDERLength(128), [0x81, 0x80]);
    });
    it('should output [0x81, 0xFF] from 255.', () => {
      assert.deepStrictEqual(lengthToDERLength(255), [0x81, 0xFF]);
    });
    it('should output [0x82, 0x01, 0x00] from 256.', () => {
      assert.deepStrictEqual(lengthToDERLength(256), [0x82, 0x01, 0x00]);
    });
    it('should output [0x82, 0xFF, 0xFF] from 65535.', () => {
      assert.deepStrictEqual(lengthToDERLength(65535), [0x82, 0xff, 0xff]);
    });
    it('should output [0x83, 0x01, 0x00, 0x00] from 65536.', () => {
      assert.deepStrictEqual(lengthToDERLength(65536), [0x83, 0x01, 0x00, 0x00]);
    });
    it('should output [0x83, 0xFF, 0xFF, 0xFF] from 16777215.', () => {
      assert.deepStrictEqual(lengthToDERLength(16777215), [0x83, 0xff, 0xff, 0xff]);
    });
    it('should output [0x84, 0x01, 0x00, 0x00, 0x00] from 16777216.', () => {
      assert.deepStrictEqual(lengthToDERLength(16777216), [0x84, 0x01, 0x00, 0x00, 0x00]);
    });
    it('should output [0x84, 0xFF, 0xFF, 0xFF, 0xFF] from 4294967295.', () => {
      assert.deepStrictEqual(lengthToDERLength(4294967295), [0x84, 0xff, 0xff, 0xff, 0xff]);
    });
    it('should throw a RangeError if, in the context of VDS, the length value is larger than five bytes.', () => {
      assert.throws( () => {
        lengthToDERLength(4294967296);
      }, RangeError);
    });
  });

  describe('derLengthToLength - Convert a DER definite form for a number into a length', () => {
    it('should output 0 from [0x00].', () => {
      assert.deepStrictEqual(derLengthToLength([0x00]), 0);
    });
    it('should output 1 from [0x01].', () => {
      assert.deepStrictEqual(derLengthToLength([0x01]), 1);
    });
    it('should output 127 from [0x7F].', () => {
      assert.deepStrictEqual(derLengthToLength([0x7f]), 127);
    });
    it('should output 128 from [0x81, 0x80].', () => {
      assert.deepStrictEqual(derLengthToLength([0x81, 0x80]), 128);
    });
    it('should output 255 from [0x81, 0xFF].', () => {
      assert.deepStrictEqual(derLengthToLength([0x81, 0xff]), 255);
    });
    it('should output 256 from [0x82, 0x01, 0x00].', () => {
      assert.deepStrictEqual(derLengthToLength([0x82, 0x01, 0x00]), 256);
    });
    it('should output 65535 from [0x82, 0xFF, 0xFF].', () => {
      assert.deepStrictEqual(derLengthToLength([0x82, 0xff, 0xff]), 65535);
    });
    it('should output 65536 from [0x83, 0x01, 0x00, 0x00].', () => {
      assert.deepStrictEqual(derLengthToLength([0x83, 0x01, 0x00, 0x00]), 65536);
    });
    it('should output 16777215 from [0x83, 0xFF, 0xFF, 0xFF].', () => {
      assert.deepStrictEqual(derLengthToLength([0x83, 0xff, 0xff, 0xff]), 16777215);
    });
    it('should output 16777216 from [0x84, 0x01, 0x00, 0x00, 0x00].', () => {
      assert.deepStrictEqual(derLengthToLength([0x84, 0x01, 0x00, 0x00, 0x00]), 16777216);
    });
    it('should output 4294967295 from [0x84, 0xFF, 0xFF, 0xFF, 0xFF].', () => {
      assert.deepStrictEqual(derLengthToLength([0x84, 0xff, 0xff, 0xff, 0xff]), 4294967295);
    });
    it('should throw a RangeError if, in the context of VDS, the DER definite form is larger than five bytes.', () => {
      assert.throws( () => {
        derLengthToLength([0x85, 0x01, 0x00, 0x00, 0x00, 0x00]);
      }, RangeError);
    });
    it('should throw a RangeError if the initial length byte is set to indefinite length (0x80).', () => {
      assert.throws( () => {
        derLengthToLength([0x80]);
      }, RangeError);
    });
  });

});

