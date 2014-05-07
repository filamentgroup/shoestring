# Contributing to Shoestring

Contributions are appreciated. In order for us to consider including a contribution, it does have to meet a few **criteria**:

* Code is specific to one issue (eg. feature, extension or bug)
* Code is formatted according to JavaScript Style Guide.
* Code has full test coverage and all tests pass.

## Code relates to issue

Use a separate git branch for each contribution. Give the branch a meaningful name.
When you are contributing a new extensions use the name of this extension, like `dom.toggleClass`.
Otherwise give it a descriptive name like `doc-generator` or reference a specific issue like `issues/12`.
When the issue is resolved create a pull request to allow us to review and accept your contribution.

## JavaScript Style Guide

Code should be formatted according to the [jQuery JavaScript Style Guide](http://contribute.jquery.org/style-guide/).

## Test coverage

Code should be covered by unit tests. The tests are located in `test/unit/` and written in [QUnit](http://qunitjs.com/).
When you add a new feature like an extension. Make sure to also add tests for your new code, for this case in `test/unit/extensions.js`.
To check if all tests pass run `grunt qunit`. You can use `grunt watch` to continuously run the tests while you develop.