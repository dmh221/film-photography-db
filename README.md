# Film Photography Data

[![validate](https://github.com/dmh221/film-photography-db/actions/workflows/validate.yml/badge.svg)](https://github.com/dmh221/film-photography-db/actions/workflows/validate.yml)

Reference data for film photography: development labs, film stocks, and camera bodies. This is the open dataset behind [Phaos](https://phaos.app).

| File | Rows | Contents |
|------|-----:|----------|
| [`data/film_labs.csv`](data/film_labs.csv) | 756 | Film development labs worldwide |
| [`data/film_stocks.csv`](data/film_stocks.csv) | 510 | Film stocks (manufacturer, ISO, format) |
| [`data/camera_bodies.csv`](data/camera_bodies.csv) | 1140 | Film camera bodies |

Every file is UTF-8 CSV, grouped by manufacturer (or by country, for labs).

## Contributing

Corrections and additions are welcome. Open an [issue](../../issues/new/choose) with the details, or send a pull request that edits the relevant CSV. Run `npm run validate` before opening a PR; CI runs the same check on every change.

[CONTRIBUTING.md](CONTRIBUTING.md) documents the columns for each file.

## License

Data in `data/` is licensed [CC BY 4.0](LICENSE-DATA) — credit *Phaos (phaos.app)*. The tooling in `scripts/` is [MIT](LICENSE).

The canonical dataset is maintained by Phaos; this repository is its public mirror and takes community contributions.
