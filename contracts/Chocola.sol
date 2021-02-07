// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.7.0 <0.9.0;

import "openzeppelin-solidity/contracts/utils/EnumerableSet.sol";

// A smart contract to send a chocolate to your friend. You can send a 256-bit
// hash value of your chocolate (or whatever) while indicating it is Giri Choco
// or not.
//
// See https://github.com/xharaken/chocola to learn more.
contract Chocola {
  using EnumerableSet for EnumerableSet.AddressSet;

  // A struct to represent a chocolate.
  struct Item {
    uint256 hash;  // A 256-bit hash that represents the chocolate.
    bool giri;  // Whether it is Giri Choco or not.
  }
  // A mapping from a recipient to a set of senders.
  mapping (address => EnumerableSet.AddressSet) internal _senders;
  // A mapping from a recipient to items.
  mapping (address => mapping (address => Item)) internal _items;

  constructor() { }

  // Send the |hash| to the |recipient|. |giri| indicates whether this is Giri
  // Choco or not.
  function send(address recipient, uint256 hash, bool giri) public {
    _items[recipient][msg.sender] = Item(hash, giri);
    _senders[recipient].add(msg.sender);
  }

  // Return the number of items sent to |recipient|.
  function numberOfItems(address recipient) public view returns (uint) {
    return _senders[recipient].length();
  }

  // Return the |index|-th item sent to |recipient|.
  function getItem(address recipient, uint index)
      public view returns (address, uint256, bool) {
    address sender = _senders[recipient].at(index);
    Item memory item = _items[recipient][sender];
    return (sender, item.hash, item.giri);
  }
}
