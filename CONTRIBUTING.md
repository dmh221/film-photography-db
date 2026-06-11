# Contributing

Entries are plain CSV rows. Add or edit a row, place it within the existing group, and run the validator before submitting.

## Column formats

**`data/film_labs.csv`** — grouped by `country`
```
lab_name,city,state,country,website,status
```
- `state` — 2-letter code for US labs (`CA`, `NY`); full region name elsewhere. Empty if N/A.
- `website` — full URL (a homepage or Instagram is fine).
- `status` — one of `active`, `closed`, `unverified`. Use `unverified` if you can't confirm it's currently operating.

**`data/film_stocks.csv`** — grouped by `manufacturer`
```
manufacturer,film_name,iso,format
```
- `manufacturer` + `film_name` — e.g. `Kodak`, `Portra 400` (no format in the name).
- `format` — e.g. `35mm`, `120`, `4x5`.

**`data/camera_bodies.csv`** — grouped by `manufacturer`
```
manufacturer,model,format,camera_type,mount,lens_type,fixed_lens_name
```
- `mount` — empty for fixed-lens cameras.
- `lens_type` — `interchangeable` or `fixed`.
- `fixed_lens_name` — only for fixed-lens cameras; empty otherwise.

## Rules

- One entry per row. No duplicates (uniqueness keys: labs `lab_name+city+country`, stocks `manufacturer+film_name+format`, cameras `manufacturer+model`).
- Empty/unknown fields = empty string, never `null` or `N/A`.
- Add new rows within the existing manufacturer or country group.

## Validate

```bash
npm run validate
```
CI runs this on every PR. Green check = good to merge.

## Don't have time to format it?

Open an [issue](../../issues/new/choose) instead — give us the details and we'll add the row.
