# Contributing

Entries are plain CSV rows. Add or edit a row, keep the file in sorted order, and run the validator before submitting.

## Column formats

**`data/film_labs.csv`** — sorted case-insensitively by `country` → `state` → `city` → `lab_name`
```
lab_name,city,state,country,website,status
```
- `state` — 2-letter code for US labs (`CA`, `NY`); full region name elsewhere. Empty if N/A.
- `website` — full URL (a homepage or Instagram is fine).
- `status` — one of `active`, `closed`, `unverified`. Use `unverified` if you can't confirm it's currently operating.

**`data/film_stocks.csv`** — sorted case-insensitively by `manufacturer` → `film_name`
```
manufacturer,film_name,iso,format
```
- `manufacturer` + `film_name` — e.g. `Kodak`, `Portra 400` (no format in the name).
- `format` — e.g. `35mm`, `120`, `4x5`.

**`data/camera_bodies.csv`** — sorted case-insensitively by `manufacturer` → `model`
```
manufacturer,model,format,camera_type,mount,lens_type,fixed_lens_name
```
- `mount` — empty for fixed-lens cameras.
- `lens_type` — `interchangeable` or `fixed`.
- `fixed_lens_name` — only for fixed-lens cameras; empty otherwise.

## Rules

- One entry per row. No duplicates (uniqueness keys: labs `lab_name+city+country`, stocks `manufacturer+film_name+format`, cameras `manufacturer+model`).
- Empty/unknown fields = empty string, never `null` or `N/A`.
- Keep the file in case-insensitive sorted order. `npm run validate` (and CI) will point to any misplaced row.

## Validate

```bash
npm run validate
```
CI runs this on every PR. Green check = good to merge.

## Don't have time to format it?

Open an [issue](../../issues/new/choose) instead — give us the details and we'll add the row.
