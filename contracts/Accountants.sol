// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./AccessControl.sol";

contract Accountants is AccessControl{

    event deletedAccountant(address indexed accountantAddress);

    struct Accountant {
        address accountantAddress;
        string name;
        string email;
        string phoneNumber;
        string password;
        bool isRegistered;
        bool isLogin;
        bool isDeleted;
    }

    mapping(address => Accountant) public accountants;

    address[] private accountantAddressArray;

    function registerAccountant(address _accountantAddress, string memory _name, string memory _email, string memory _phoneNumber, string memory _password) public {
        accountants[_accountantAddress] = Accountant({
            accountantAddress: _accountantAddress,
            name: _name,
            email: _email,
            phoneNumber: _phoneNumber,
            password: _password,
            isRegistered: true,
            isLogin: false,
            isDeleted: false
        });
        accountantAddressArray.push(_accountantAddress);
    }

    function deleteAccountant(address _accountantAddress) external {
        require(!accountants[_accountantAddress].isDeleted, "Teacher does not exist");
        Accountant storage accountant = accountants[_accountantAddress];
        accountant.isDeleted = true;
        delete(accountant.accountantAddress);
        // accountants[_accountantAddress] = accountant;
        emit deletedAccountant(_accountantAddress);
    }

    function  accountantLogin(address _accountantAddress, string memory _password) external {
        require(accountants[_accountantAddress].isRegistered == true, "Your not registered yet!");
        // require(accountants[_accountantAddress].isLogin == false, "Your Already login");
        require(compareString(accountants[_accountantAddress].password, _password), "Invalid address or password");
        
        accountants[_accountantAddress].isLogin = true;
    }

    function getAccountantArray() external view returns(address[] memory) {
        return accountantAddressArray;
    }

    function getAccountant(address _accountantAddress) external view returns(
        address accountantAddress,
        string memory name,
        string memory email,
        string memory phoneNumber,
        bool isDeleted
    ) {
        Accountant memory accountant = accountants[_accountantAddress];
        accountantAddress = accountant.accountantAddress;
        name = accountant.name;
        email = accountant.email;
        phoneNumber = accountant.phoneNumber;
        isDeleted = accountant.isDeleted;
    }
}
