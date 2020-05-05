# Pandora Security Driver for NodeJS

[![GitHub Release](https://img.shields.io/github/release/pandora-security/pandora-node.svg)](https://github.com/pandora-security/pandora-node/releases)
[![NPM Version](https://img.shields.io/npm/v/pandora-security.svg)](https://www.npmjs.com/package/pandora-security?activeTab=versions)
[![License](https://img.shields.io/npm/l/pandora-security.svg)](#license)
[![Monthly Downloads](https://img.shields.io/npm/dm/pandora-security.svg)](https://www.npmjs.com/package/pandora-security)

An official NodeJS library which will help any NodeJS application to communicate with Pandora Security Box APIs.

## List of Contents

* [Pandora Security Driver for NodeJS](#pandora-security-driver-for-nodejs)
  * [List of Contents](#list-of-contents)
  * [Getting Started](#getting-started)
    * [Requirements](#requirements)
    * [Installation](#installation)
  * [Documentation](#documentation)
    * [Pandora Class](#pandora-class)
  * [Built With](#built-with)
  * [Contribution](#contribution)
  * [Version Management](#version-management)
  * [Authors](#authors)
  * [License](#license)
  * [Acknowledgments](#acknowledgments)

## Getting Started

This library is available through a package manager of your choice ([npm](https://www.npmjs.org/) or [yarn](https://www.yarnpkg.com/)).

### Requirements

For this library to be functional, you shall:

 1. have your application registered with Pandora's Author and get your application GUID; and
 2. have Pandora installed on your system.
 
For more information about registering an application and installing Pandora, please visit [Pandora official page](https://pandora-security.github.io/Pandora).

### Installation

To get Pandora included on your project, use a package manager to add the library.

```bash
# If you're using NPM
npm install pandora-security --save

# If you're using Yarn
yarn add pandora-security
```

Then, include **_Pandora_** your project. If you are using the new ECMAScript 6 (ECMAScript 2015) and later, you may use the `import` statement. However, if you are using ECMAScript 5 and older, you may use the `require` statement.

```javascript
// ES6 and later
import {Pandora} from "pandora-security";

// ES5 and older
var Pandora = require("pandora-security").Pandora;
```

Note: Pandora already comes with TypeScript and type definition support.

## Documentation

`Pandora` class provide representation of Pandora APIs that bound specifically to your application by the provided application GUID.

### Pandora Class

Documentation about the `Pandora` class will be available soon. For now, please look into the type definition provided within the library.

## Built With

Written in [TypeScript](https://typscriptlang.org/), built into ECMAScript 5 using the TypeScript compiler.

## Contribution

To contribute, simply fork this project, and issue a pull request.

## Version Management

We use [Semantic Versioning](http://semver.org/) for version management. For the versions available, see the [tags on this repository](https://github.com/pandora-security/pandora-node/tags).

## Authors

* **Danang Galuh Tegar Prasetyo** - _Initial work_ - [danang-id](https://github.com/danang-id)

## License

Pandora Security Driver for NodeJS is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details