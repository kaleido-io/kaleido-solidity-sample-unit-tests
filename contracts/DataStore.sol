pragma solidity ^0.5.0;

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

contract DataStore {

    struct Entry {
        address author;
        string description;
    }

    event EntryAdded (
        bytes32 key,
        address author,
        string description
    );

    mapping(bytes32 => Entry) private entries;

    function addEntry(bytes32 key, string memory description) public {
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(entries[key].description).length == 0, "Entry already existed");
        entries[key] = Entry(msg.sender, description);
        emit EntryAdded(key, msg.sender, description);
    }

    function getEntry(bytes32 key) public view returns (string memory description, address author) {
        require(bytes(entries[key].description).length > 0, "Entry does not exist");
        return (entries[key].description, entries[key].author);
    }
    
}