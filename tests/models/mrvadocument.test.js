// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MRVADocument } from '../../src/mrvadocument.js';

describe('TD3-sized Machine Readable Visa', () => {

  describe('Use properties to reconstruct exemplary MRZ from documentation [REF ICAO 9303 Part 7 Appendix A]', () => {
    it('should equal the exemplary MRVA in Appendix A-1 and A-2.', () => {
      const document = new MRVADocument({
	typeCode: 'V',
	authorityCode: 'UTO',
	passportNumber: 'L8988901C',
	birthDate: '1974-08-12',
	genderMarker: 'F',
	validThru: '1996-12-10',
	nationalityCode: 'XXX',
	primaryIdentifier: 'Eriksson',
	secondaryIdentifier: 'Anna-Maria',
	optionalData: '6ZE184226B',
        usePassportInMRZ: true
      });
      assert.deepStrictEqual(document.mrzLine1, 'V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<');
      assert.deepStrictEqual(document.mrzLine2, 'L8988901C4XXX7408122F96121096ZE184226B<<<<<<');
      assert.deepStrictEqual(document.machineReadableZone, 'V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<L8988901C4XXX7408122F96121096ZE184226B<<<<<<');
    });
  });

  describe('Import exemplary MRZ data from documentation [REF ICO 9303 Part 6 Appendix A]', () => {
    it('document properties should equal the values from exemplary MRVA in Appendix A-1 and A-2.', () => {
      const document = new MRVADocument({
        machineReadableZone: 'V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<L8988901C4XXX7408122F96121096ZE184226B<<<<<<',
	usePassportInMRZ: true
      });
      assert.deepStrictEqual(document.typeCode, 'V');
      assert.deepStrictEqual(document.authorityCode, 'UTO');
      assert.deepStrictEqual(document.passportNumber, 'L8988901C');
      assert.deepStrictEqual(document.birthDate, new Date('1974-08-12T00:00:00'));
      assert.deepStrictEqual(document.genderMarker, 'F');
      assert.deepStrictEqual(document.validThru, new Date('1996-12-10T00:00:00'));
      assert.deepStrictEqual(document.nationalityCode, 'XXX');
      assert.deepStrictEqual(document.primaryIdentifier, 'ERIKSSON');
      assert.deepStrictEqual(document.secondaryIdentifier, 'ANNA MARIA');
      assert.deepStrictEqual(document.optionalData, '6ZE184226B');
    });
  });

  describe('Import MRZ data from previous test with visa number in MRZ', () => {
    it('should have "L8988901C" as the document number instead of the passport number.', () => {
      const document = new MRVADocument({
        machineReadableZone: 'V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<L8988901C4XXX7408122F96121096ZE184226B<<<<<<',
        usePassportInMRZ: false
      });
      assert.deepStrictEqual(document.number, 'L8988901C');
    });
  });

});

