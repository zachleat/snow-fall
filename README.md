# `<snow-fall>`

A web component to add snow to your web site (or to an element on your web site). Based off of [this Codepen](https://codepen.io/alphardex/pen/dyPorwJ) from [`alphardex`](https://codepen.io/alphardex).

## Usage

```html
<script type="module" src="snow-fall.js"></script>

<!-- Add snow to the page -->
<snow-fall></snow-fall>

<!-- Add snow to the first child element -->
<snow-fall>
	<div style="width: 300px; height: 300px">
</snow-fall>
```

Installable from npm:

```
npm install @zachleat/snow-fall
```

### Use with `<is-land>`

This is best used with [`<is-land>`](https://www.zachleat.com/web/is-land/) to respect user preferences for reduced motion:

```html
<is-land on:media="(prefers-reduced-motion: no-preference)">
	<snow-fall></snow-fall>
</is-land>
```

### Change the snow color

```html
<!-- Change snow color -->
<snow-fall style="--snow-fall-color: rebeccapurple"></snow-fall>
```

### Change the number of snowflakes

```html
<!-- Change number of snowflakes (default: 100) -->
<snow-fall count="200"></snow-fall>
```

### Force the rendering mode (page/element)

You probably don’t need this.

```html
<!-- Force mode -->
<snow-fall mode="page"></snow-fall>
<snow-fall mode="element"></snow-fall>
```