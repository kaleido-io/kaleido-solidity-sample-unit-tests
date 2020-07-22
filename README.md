# Truffle unit test example

## Introduction

This repository contains a Solidity smart contract that implements a data store with the following rules:
 - Each entry key must be unique
 - Each entry must have a non-empty description

Unit tests verify that:
 - An error is raised when attempting to get an entry that does not exist
 - An error is raised when attempting to add an entry with an empty description
 - An entry can be added and its corresponding event is emitted
 - An entry can be retrieved
 - An error is raised when attempting add an entry with a repeated key

## Running the tests

 - Install dependencies `npm i` 
 - Download and run [Truffle Ganache](https://www.trufflesuite.com/ganache)
 - Run `npm test`

## Debugging the tests

If you are using VSCode, set a breakpoint in `test/dataStore.js` and launch the `Debug tests` configuration.
