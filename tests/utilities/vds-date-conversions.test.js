// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { bytesToDate } from '../../src/utilities/bytes-to-date.js';
import { dateToBytes } from '../../src/utilities/date-to-bytes.js';

describe('Digital Seal Date Encodation Scheme', () => {

  describe('dateToBytes - JavaScript Date object or date string into date byte sequence [REF ICAO 9303 Part 13 SS 2.3.1, Page 5]', () => {
    it('should output [0x31, 0x9E, 0xF5] from a JavaScript Date object with date "1957-03-25".', () => {
      assert.deepStrictEqual(dateToBytes(new Date('1957-03-25T00:00:00')), [0x31, 0x9e, 0xf5]);
    });

    it('should output [0x31, 0x9E, 0xF5] from date string "1957-03-25".', () => {
      assert.deepStrictEqual(dateToBytes('1957-03-25'), [0x31, 0x9e, 0xf5]);
    });
  });

  describe('bytesToDate - Date byte sequence into JavaScript Date object REF [ICAO 9303 Part 13 SS 2.3.1, Page 5]', () => {
    it('should create a Date object with date 1957-03-25 from [0x31, 0x9E, 0xF5].', () => {
      assert.deepStrictEqual(bytesToDate([0x31, 0x9e, 0xf5]), new Date('1957-03-25T00:00:00'));
    });
  });

});

