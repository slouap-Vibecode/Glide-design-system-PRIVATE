L2 semantic color aliases. These map raw palette values (L1) to named roles. Always prefer L3 contextual tokens (`--nck-surface-*`, `--nck-text-*`, etc.) in component code — use L2 only when no L3 token fits.

```jsx
<TokenColorGrid :groups="L2_COLOR_TOKENS" />
```

#### Primary (bright-blue)
- `--nck-color-p100`: var(--bright-blue-100) — #ECF6FF
- `--nck-color-p200`: var(--bright-blue-150) — #DCF0FF
- `--nck-color-p300`: var(--bright-blue-200) — #7DC3FF
- `--nck-color-p400`: var(--bright-blue-300) — #006FCF (brand)
- `--nck-color-p500`: var(--bright-blue-400) — #0056A0
- `--nck-color-p400-transparent`: #006fcf66 — brand at 40% opacity

#### Secondary (deep-blue)
- `--nck-color-s100`: var(--deep-blue-100) — #EAEFFF
- `--nck-color-s600`: var(--deep-blue-300) — #00175A
- `--nck-color-s700`: var(--deep-blue-400) — #001245

#### Neutral (blue-grey)
- `--nck-color-n100`: var(--blue-grey-100) — #F8F9FB
- `--nck-color-n200`: var(--blue-grey-200) — #F0F1F4
- `--nck-color-n300`: var(--blue-grey-300) — #E7E8EE
- `--nck-color-n400`: var(--blue-grey-400) — #C6C8D2
- `--nck-color-n500`: var(--blue-grey-500) — #848996
- `--nck-color-n600`: var(--blue-grey-600) — #444B61
- `--nck-color-n700`: var(--blue-grey-700) — #1A233E
- `--nck-color-n700-transparent`: #1a233eb2 — dark overlay at 70% opacity

#### Text (ink)
- `--nck-color-ikp100`: var(--ink-100) — #282D3A (full opacity)
- `--nck-color-iks200`: var(--ink-70) — #282D3AB2 (70% opacity)
- `--nck-color-ikt300`: var(--ink-40) — #282D3A66 (40% opacity)

#### Success (green)
- `--nck-color-su100`: var(--green-100) — #ECFBF4
- `--nck-color-su300`: var(--green-200) — #94D8C5
- `--nck-color-su600`: var(--green-300) — #00825F
- `--nck-color-su700`: var(--green-400) — #005F45
- `--nck-color-su600-transparent`: #00825f66 — success at 40% opacity

#### Warning (orange)
- `--nck-color-w100`: var(--orange-100) — #FFEFE9
- `--nck-color-w300`: var(--orange-200) — #FFB69A
- `--nck-color-w500`: var(--orange-300) — #F85D22
- `--nck-color-w600`: var(--orange-400) — #C43D0A

#### Negative (red)
- `--nck-color-e100`: var(--red-100) — #FAE5E7
- `--nck-color-e300`: var(--red-200) — #FE9D9D
- `--nck-color-e600`: var(--red-300) — #CF0000
- `--nck-color-e700`: var(--red-400) — #9E0000
- `--nck-color-e600-transparent`: #cf000066 — negative at 40% opacity

#### Gain (yellow)
- `--nck-color-g100`: var(--yellow-50) — #FFFCF3
- `--nck-color-g600`: var(--yellow-300) — #FFBA00
- `--nck-color-g700`: var(--yellow-400) — #916400

#### White
- `--nck-color-white`: var(--white) — #FFFFFF
