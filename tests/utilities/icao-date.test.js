// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { IcaoDate } from '../../src/utilities/icao-date.js';

describe('IcaoDate - Custom date object for ICAO 9303 MRTDs', () => {

  describe('Pass 1957-03-25 through constructor', () => {
    const date = new IcaoDate('1957-03-25');
    it('.toISOString() should equal "1957-03-25".', () => {
      assert.deepStrictEqual(date.toISOString(), '1957-03-25');
    });
    it('.toMRZString() should equal "570325".', () => {
      assert.deepStrictEqual(date.toMRZString(), '570325');
    });
    it('.toVDSArray() should equal [0x31, 0x9E, 0xF5].', () => {
      assert.deepStrictEqual(date.toVDSArray(), [0x31, 0x9e, 0xf5]);
    });
  });

  describe('Pass 570325 through constructor', () => {
    const date = new IcaoDate('570325', 2046);
    it('.toISOString() should equal "1957-03-25".', () => {
      assert.deepStrictEqual(date.toISOString(), '1957-03-25');
    });
    it('.toMRZString() should equal "570325".', () => {
      assert.deepStrictEqual(date.toMRZString(), '570325');
    });     
    it('.toVDSArray() should equal [0x31, 0x9E, 0xF5].', () => {
      assert.deepStrictEqual(date.toVDSArray(), [0x31, 0x9e, 0xf5]);
    });
  });

  describe('Pass new Date("1957-03-25T00:00:00") through constructor', () => {
    const date = new IcaoDate(new Date('1957-03-25T00:00:00'));
    it('.toISOString() should equal "1957-03-25".', () => {
      assert.deepStrictEqual(date.toISOString(), '1957-03-25');
    });
    it('.toMRZString() should equal "570325".', () => {
      assert.deepStrictEqual(date.toMRZString(), '570325');
    });     
    it('.toVDSArray() should equal [0x31, 0x9E, 0xF5].', () => {
      assert.deepStrictEqual(date.toVDSArray(), [0x31, 0x9e, 0xf5]);
    });
  });

  describe('Pass [0x31, 0x9E, 0xF5] through constructor', () => {
    const date = new IcaoDate([0x31, 0x9e, 0xf5]);
    it('.toISOString() should equal "1957-03-25".', () => {
      assert.deepStrictEqual(date.toISOString(), '1957-03-25');
    });
    it('.toMRZString() should equal "570325".', () => {
      assert.deepStrictEqual(date.toMRZString(), '570325');
    });     
    it('.toVDSArray() should equal [0x31, 0x9E, 0xF5].', () => {
      assert.deepStrictEqual(date.toVDSArray(), [0x31, 0x9e, 0xf5]);
    });
  });

  describe('Pass XXXX-03-25 through constructor', () => {
    const date = new IcaoDate('XXXX-03-25');
    it('.toISOString() should equal "XXXX-03-25".', () => {
      assert.deepStrictEqual(date.toISOString(), 'XXXX-03-25');
    });
    it('.toMRZString() should equal "<<0325".', () => {
      assert.deepStrictEqual(date.toMRZString(), '<<0325');
    });     
    it('.toVDSArray() should throw a RangeError.', () => {
      assert.throws( () => {
        date.toVDSArray();
      }, RangeError);
    });     
  });

  describe('Pass 57<<25 through constructor', () => {
    const date = new IcaoDate('57<<25', 2046);
    it('.toISOString() should equal "1957-XX-25".', () => {
      assert.deepStrictEqual(date.toISOString(), '1957-XX-25');
    });
    it('.toMRZString() should equal "57<<25".', () => {
      assert.deepStrictEqual(date.toMRZString(), '57<<25');
    });
    it('.toVDSArray() should throw a RangeError.', () => {
      assert.throws( () => {
        date.toVDSArray();
      }, RangeError);
    });
  });

  describe('Pass 1957-03-XX through constructor', () => {
    const date = new IcaoDate('1957-03-XX');
    it('.toISOString() should equal "1957-03-XX".', () => {
      assert.deepStrictEqual(date.toISOString(), '1957-03-XX');
    });
    it('.toMRZString() should equal "5703<<".', () => {
      assert.deepStrictEqual(date.toMRZString(), '5703<<');
    });
    it('.toVDSArray() should throw a RangeError.', () => {
      assert.throws( () => {
        date.toVDSArray();
      }, RangeError);
    });
  });

  describe('Pass invalid values through constructor', () => {
    it('should throw a TypeError on passing "Not a date".', () => {
      assert.throws( () => {
        const date = new IcaoDate('Not a date');
      }, TypeError);
    });
    it('should throw a TypeError on passing "1957-03-<<".', () => {
      assert.throws( () => {
        const date = new IcaoDate('1957-03-<<');
      }, TypeError);
    });
    it('should throw a TypeError on passing "57XX25".', () => {
      assert.throws( () => {
        const date = new IcaoDate('57XX25', 2046);
      }, TypeError);
    });
    it('should throw a RangeError on passing "1957-02-31".', () => {
      assert.throws( () => {
        const date = new IcaoDate('1957-02-31');
      }, RangeError);
    });
    it('should throw a TypeError on passing new Date("1957-99-31T00:00:00").', () => {
      assert.throws( () => {
        const date = new IcaoDate(new Date('1957-99-31'));
      }, TypeError);
    });
    it('should throw a TypeError on passing [0x31, 0x9E, 0xF5, 0x34].', () => {
      assert.throws( () => {
        const date = new IcaoDate([0x31, 0x9e, 0xf5, 0x34]);
      }, TypeError);
    });
  });

});

