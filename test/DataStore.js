/*
 * Copyright 2020 Kaleido
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const DataStore = artifacts.require('./DataStore.sol');

contract('Datastore.sol', accounts => {
  let dataStore;

  before(async () => {
    dataStore = await DataStore.new();
  });

  describe('Adding and retrieving dataStore entries', () => {

    it('getEntry should raise an error when attempting get an entry that does not exist', async () => {
      let message;
      try {
        await dataStore.getEntry('0x2e99b185e9dd2194c17abb87450c7eb81b1b87668d342cdb7811493a9e6714b6');
      } catch (err) {
        message = err.message;
      }
      assert(message.endsWith('Entry does not exist'));
    });
  
    it('addEntry should raise an error when attempting add an entry with an empty description', async () => {
      let reason;
      try {
        await dataStore.addEntry('0x2e99b185e9dd2194c17abb87450c7eb81b1b87668d342cdb7811493a9e6714b6', '');
      } catch (err) {
        reason = err.reason;
      }
      assert.equal(reason, 'Description cannot be empty');
    });

    it('addEntry should add an entry when a description is supplied', async () => {
      const transaction = await dataStore.addEntry('0xba199554a147469b18ee328ee8e4e2b49f28dc4790a81fc5bc4e7fef7f5b898c', 'This is the description');
      const logArgs = transaction.logs[0].args;
      assert.equal(logArgs.key, '0xba199554a147469b18ee328ee8e4e2b49f28dc4790a81fc5bc4e7fef7f5b898c');
      assert.equal(logArgs.author, accounts[0]);
      assert.equal(logArgs.description, 'This is the description');
    });

    it('getEntry should return the description', async () => {
      const entry = await dataStore.getEntry('0xba199554a147469b18ee328ee8e4e2b49f28dc4790a81fc5bc4e7fef7f5b898c');
      assert.deepEqual(entry.description, 'This is the description');
      assert.deepEqual(entry.author, accounts[0]);
    });

    it('addEntry should raise an error when attempting to get an entry that does not exist', async () => {
      let reason;
      try {
        await dataStore.addEntry('0xba199554a147469b18ee328ee8e4e2b49f28dc4790a81fc5bc4e7fef7f5b898c', 'This is the description');
      } catch (err) {
        reason = err.reason;
      }
      assert.equal(reason, 'Entry already existed');
    });

  });

});
