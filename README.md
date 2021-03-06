# Taybl [![Build Status](https://travis-ci.com/gabrielbarker/Taybl.svg?branch=master)](https://travis-ci.com/gabrielbarker/Taybl)

A tool to simplify displaying data in table form in the console.

## Installation

Install Taybl using

```
npm install Taybl
```

Import Taybl using

```
const Taybl = require("Taybl");
```

Typescript is also supported:

```
import Taybl from "Taybl";
```

## Usage

To use Taybl, import the module. Then construct a Taybl object, passing in the data in object form. The Taybl can then be printed to the console by, first adding any desired styling using the 'with...' methods, and then calling the 'print' method.

The given object must follow the correct format, detailed below.

A 'taybl-object' is any object that has at most one field whose value is an array. Any other fields must be primitives. The field that is an array may only contain other taybl-objects. This is because each field with a primitive value relates to a column and a value in that column. Each field whose value is an array of taybl-objects represents the next section of the table, with finer granularity. The lowest level of the taybl is the level that contains no further taybl-objects.

The following is an example of a valid taybl-object:

```
const object = {
  files: [
    {
      fileName: "file name1",
      invalid: [
        { type: "type name1", count: 6, "line numbers": "7, 18" },
        { type: "type name2", count: 2, "line numbers": "17, 9" }
      ]
    },
    {
      fileName: "file name2",
      invalid: [
        { type: "type name3", count: 0, "line numbers": "28" },
        { type: "type name4", count: 3, "line numbers": "1, 9, 12" }
      ]
    }
  ]
};
```

This object can then be used to construct a Taybl:

```const Taybl = require("Taybl");
const taybl = new Taybl(object);
taybl
  .withHorizontalLineStyle("-")
  .withVerticalLineStyle("|")
  .withNumberOfSpacesAtStartOfColumns(1)
  .withNumberOfSpacesAtEndOfColumns(1)
  .print();
```

The above code would output the following:

```
|------------|------------|-------|--------------|
| fileName   | type       | count | line numbers |
|------------|------------|-------|--------------|
| file name1 | type name1 | 6     | 7,18         |
|            | type name2 | 2     | 17,9         |
| file name2 | type name3 | 0     | 28           |
|            | type name4 | 3     | 1,9,12       |
|------------|------------|-------|--------------|
```

The following styling options are currently available:

- `withHorizontalLineStyle(character)` where character can be any of `"-"`, `"="`, `"_"`, `" "`. This determines what character will form the horizontal lines.
- `withVerticalLineStyle(character)` where character can be any of `"|"`, `"||"`, `":"`, `" "`. This determines what character will form the vertical lines.
- `withNumberOfSpacesAtStartOfColumns(number)` This determies how many spaces there are between the data and the prevous vertical line.
- `withNumberOfSpacesAtEndOfColumns(number)` This determies the minimum number of spaces there are between the data and the next vertical line.

## Contributing

Any contribution such as new features or documentaion is very welcome!

Any issues, be it feature requests or bug fixes, are also welcome!
