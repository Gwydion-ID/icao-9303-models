// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { VDS_MAGIC } from '../../src/utilities/vds-magic.js';
import { VDS_SIGNATURE_MARKER } from '../../src/utilities/vds-signature-marker.js';
import { VDS_VERSION_3 } from '../../src/utilities/vds-version-3.js';
import { VDS_VERSION_4 } from '../../src/utilities/vds-version-4.js';

describe('ICAO Doc 9303 Specification Constants', () => {

  describe('VDS_MAGIC - Identify a byte stream as a VDS [REF ICAO Doc 9303 Part 13 SS 2.2, Page 3]', () => {
    it('should equal fixed value 0xDC.', () => {
      assert.deepStrictEqual(VDS_MAGIC, 0xdc);
    });
  });
  describe('VDS_VERSION_3 - Identify a byte stream as VDS version 3 [REF ICAO Doc 9303 Part 13 SS 2.2, Page 3]', () => {
    it('should equal fixed value 0x02.', () => {
      assert.deepStrictEqual(VDS_VERSION_3, 0x02);
    });
  });
  describe('VDS_VERSION_4 - Identify a byte stream as VDS version 4 [REF ICAO Doc 9303 Part 13 SS 2.2, Page 3]', () => {
    it('should equal fixed value 0x03.', () => {
      assert.deepStrictEqual(VDS_VERSION_4, 0x03);
    });
  });
  describe('VDS_SIGNATURE_MARKER - Identify the beginning of a VDS signature zone [REF ICAO Doc 9303 Part 13 SS 2.4, Page 6]', () => {
    it('should equal fixed value 0xFF.', () => {
      assert.deepStrictEqual(VDS_SIGNATURE_MARKER, 0xff);
    });
  });

});

