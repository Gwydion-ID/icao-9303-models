// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { TD2Document } from '../../src/td2document.js';

describe('TD2-sized Machine Readable Travel Document', () => {

  describe('Use properties to reconstruct exemplary MRZ from documentation [REF ICAO 9303 Part 6 Appendix A]', () => {
    it('should equal the exemplary TD2 MRTD MRZ in Appendix A-1 and A-2.', () => {
      const document = new TD2Document();
      assert.deepStrictEqual(document.mrzLine1, 'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<');
      assert.deepStrictEqual(document.mrzLine2, 'D231458907UTO7408122F1204159<<<<<<<6');
      assert.deepStrictEqual(document.machineReadableZone, 'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<D231458907UTO7408122F1204159<<<<<<<6');
    });
  });

  describe('Import exemplary MRZ data from documentation [REF ICO 9303 Part 6 Appendix A]', () => {
    it('document properties should equal the values from the exemplary TD2 MRTD in Appendix A-1 and A-2', () => {
      const document = new TD2Document({
        machineReadableZone: 'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<D231458907UTO7408122F1204159<<<<<<<6'
      });
      assert.deepStrictEqual(document.typeCode, 'I');
      assert.deepStrictEqual(document.authorityCode, 'UTO');
      assert.deepStrictEqual(document.number, 'D23145890');
      assert.deepStrictEqual(document.birthDate, new Date('1974-08-12T00:00:00'));
      assert.deepStrictEqual(document.genderMarker, 'F');
      assert.deepStrictEqual(document.expirationDate, new Date('2012-04-15T00:00:00'));
      assert.deepStrictEqual(document.nationalityCode, 'UTO');
      assert.deepStrictEqual(document.fullName, 'ERIKSSON, ANNA MARIA');
      assert.deepStrictEqual(document.optionalData, '');
    });
  });

});

