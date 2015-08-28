# gitbook-summary-to-path

Parse [SUMMARY.md](https://github.com/GitbookIO/gitbook#book-format "SUMMARY.md") of GitBook and print file path list.

## Installation

    npm install gitbook-summary-to-path

## Usage

### Command Line

```sh
$ summary-to-path SUMMARY.md
/Users/azu/gitbook-summary-to-path/test/fixtures/README.md
/Users/azu/gitbook-summary-to-path/test/fixtures/jQuery.md
```

### Use case

Use gitbook-summary-to-path with [textlint](https://github.com/azu/textlint "textlint").

Example) Lint all files in SUMMARY.md with textlint.

```sh
npm install -D textlint textlint-rule-no-todo gitbook-summary-to-path
$(npm bin)/summary-to-path SUMMARY.md | xargs $(npm bin)/textlint --rule no-todo
```

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT