// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { TD3Document } from '../../src/td3document.js';

describe('TD3-sized Machine Readable Travel Document', () => {

  describe('Use properties to reconstruct exemplary MRZ from documentation [REF ICAO 9303 Part 4 Appendix A]', () => {
    it('should equal the exemplary TD3 MRTD MRZ in Appendix A-1 and A-2.', () => {
      const document = new TD3Document({
        typeCode: 'PP',
        authorityCode: 'UTO',
        number: 'L898902C3',
        birthDate: '1974-08-12',
        genderMarker: 'F',
	expirationDate: '2034-04-15',
	nationalityCode: 'UTO',
	primaryIdentifier: 'Eriksson',
	secondaryIdentifier: 'Anna-Maria',
	optionalData: 'ZE184226B'
      });
      assert.deepStrictEqual(document.mrzLine1, 'PPUTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<');
      assert.deepStrictEqual(document.mrzLine2, 'L898902C36UTO7408122F3404159ZE184226B<<<<<16');
      assert.deepStrictEqual(document.machineReadableZone, 'PPUTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<L898902C36UTO7408122F3404159ZE184226B<<<<<16');
    });
  });

  describe('Import exemplary MRZ data from documentation [REF ICAO 9303 Part 4 Appendix A]', () => {
    it('document properties should equal the values from the exemplary TD3 MRTD in Appendix A-1 and A-2', () => {
      const document = new TD3Document({
        machineReadableZone: 'PPUTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<L898902C36UTO7408122F3404159ZE184226B<<<<<16'
      });
      assert.deepStrictEqual(document.typeCode, 'PP');
      assert.deepStrictEqual(document.authorityCode, 'UTO');
      assert.deepStrictEqual(document.number, 'L898902C3');
      assert.deepStrictEqual(document.birthDate, new Date('1974-08-12T00:00:00'));
      assert.deepStrictEqual(document.genderMarker, 'F');
      assert.deepStrictEqual(document.expirationDate, new Date('2034-04-15T00:00:00'));
      assert.deepStrictEqual(document.nationalityCode, 'UTO');
      assert.deepStrictEqual(document.primaryIdentifier, 'ERIKSSON');
      assert.deepStrictEqual(document.secondaryIdentifier, 'ANNA MARIA');
      assert.deepStrictEqual(document.optionalData, 'ZE184226B');
    });
  });

  describe('Use properties to reconstruct a MRZ from the additional exemplary TD3 for "Anna Ivanova" [REF ICAO 9303 Part 4 Appendix A]', () => {
    // The MRZ is 90 characters long, 45 characters each line, in the exemplary TD3. The specifications require 88 characters long, 44 characters per line.
    it('should equal the MRZ in the exemplary TD3 MRTD MRZ for "Anna Ivanova" in Appendix A-1', () => {
      const document = new TD3Document({
        typeCode: 'PP',
	authorityCode: 'UTO',
	primaryIdentifier: 'Ivanova',
	secondaryIdentifier: 'Anna',
	number: 'L898902C3',
	nationalityCode: 'UTO',
	birthDate: '1974-08-12',
	genderMarker: 'F',
	expirationDate: '2025-04-15',
	optionalData: '184226'
      });
      assert.deepStrictEqual(document.mrzLine1, 'PPUTOIVANOVA<<ANNA<<<<<<<<<<<<<<<<<<<<<<<<<<');
      assert.deepStrictEqual(document.mrzLine2, 'L898902C36UTO7408122F2504155184226<<<<<<<<18');
      assert.deepStrictEqual(document.machineReadableZone, 'PPUTOIVANOVA<<ANNA<<<<<<<<<<<<<<<<<<<<<<<<<<L898902C36UTO7408122F2504155184226<<<<<<<<18');
    });
  });

  describe('Import MRZ data of the additional exemplary TD3 for "Anna Ivanova" [REF ICAO 9303 Part 4 Appendix A]', () => {
    it('document properties should equal the values from the exemplary TD3 MRTD for "Anna Ivanova" in Appendix A-1.', () => {
      const document = new TD3Document({
        machineReadableZone: 'PPUTOIVANOVA<<ANNA<<<<<<<<<<<<<<<<<<<<<<<<<<L898902C36UTO7408122F2504155184226<<<<<<<<18'
      });
      assert.deepStrictEqual(document.typeCode, 'PP');
      assert.deepStrictEqual(document.authorityCode, 'UTO');
      assert.deepStrictEqual(document.primaryIdentifier, 'IVANOVA');
      assert.deepStrictEqual(document.secondaryIdentifier, 'ANNA');
      assert.deepStrictEqual(document.number, 'L898902C3');
      assert.deepStrictEqual(document.nationalityCode, 'UTO');
      assert.deepStrictEqual(document.birthDate, new Date('1974-08-12T00:00:00'));
      assert.deepStrictEqual(document.genderMarker, 'F');
      assert.deepStrictEqual(document.expirationDate, new Date('2025-04-15T00:00:00'));
      assert.deepStrictEqual(document.optionalData, '184226');
    });
  });

});

