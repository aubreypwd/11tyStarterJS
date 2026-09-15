# Custom Flex system

This project uses a small, custom flexbox system in [`scss/Flex.scss`](../scss/Flex.scss). It exists to make the layout work that happens repeatedly throughout the site easier to express:

- Turn an element into a flex container.
- Decide whether its children are arranged in a row or column.
- Change that direction at a known viewport width.
- Align the contents or individual items.
- Give row items predictable twelve-column spans.
- Reorder or hide items at particular breakpoints.
- Leave visual styling, spacing, and component-specific decisions to the component stylesheet.

The system intentionally uses ordinary CSS flexbox underneath. It is not a new layout engine and it does not try to hide flexbox behind a large set of shortcuts.

The project-wide conversion replaces both raw flexbox declarations and previously implicit structural Flex inheritance. Active structural component classes with nested block content explicitly extend `.Flex` and a base direction in component Sass. Leaf and content elements remain normal elements, and Flex children do not need item classes unless they need special item behavior.

## Project-wide structural conversion

The active site uses semantic component classes as the source of its structural Flex behavior. A component becomes a Flex container when it contains multiple block-level children or controls their direction, alignment, or distribution. Its child elements are already Flex items, so they do not need `Flex__item` extensions unless they need a span, growth, order, shrink, or individual alignment rule.

`.Container` and `.Container__content` are default column Flex containers. Other structural components, including `.SiteFooter`, `.Address`, `.Address__contact`, `.Partials`, and `.PostList`, explicitly extend `.Flex` and `.Flex--0-column` in their Sass. Components with responsive changes use the breakpoint-oriented classes directly; for example, `.SiteHeader` changes from a base column to a row at `768px`.

Component Sass keeps its own gaps, margins, padding, colors, typography, and exceptional sizing. The bounded `789px–924px` column range in `BusinessHours` and the custom `flex-basis` used by `PostList__link` are intentional component-specific exceptions. `Starter.scss` is inactive legacy CSS and is excluded from the active conversion.

## Why this exists

The original layout style in this project is heavily based on flexbox. A typical component starts with a few direct declarations:

```scss
.Component {
	display: flex;
	flex-direction: row;
	gap: $space--l;
}

@media ( max-width: 800px ) {
	.Component {
		flex-direction: column;
	}
}
```

That approach is powerful and gives complete control. The recurring problem is the amount of manual work. Every time a layout changes from a column to a row, or a row needs to reverse, wrap, center, or change item widths, the same flexbox properties and breakpoint rules have to be written again.

The goal was not to replace CSS or remove control. The goal was to keep the control while making the repeated layout decisions faster and more readable.

### Foundation XY

Foundation XY was investigated because it provides a responsive layout system with familiar grid concepts. It was close to what was needed, but its grid-container model introduced concerns around max-widths, padding, gutters, and nested layout boxes. Those defaults made it too easy for the layout width to become difficult to reason about.

The project also prefers flexbox as the underlying layout model. Foundation XY could provide useful layout behavior, but it brought a different mental model and additional container rules that were not a good fit for the way this project is designed.

### Bulma

Bulma was also considered because its columns provide convenient proportional sizing. The sizing idea was useful, but its naming convention did not communicate the layout decisions clearly enough for this project. The distinction between its row-like parent classes, child classes, and responsive modifiers felt harder to remember than writing the underlying CSS.

### FrowCSS

FrowCSS was the closest conceptual match. It provided responsive flexbox classes, item sizing, visibility helpers, and breakpoint behavior. However, several issues appeared during investigation:

- Its breakpoint names such as `sm`, `md`, and `lg` were less readable than the actual pixel values.
- Its shortcut classes combined several declarations, so the result was not always obvious from the class name.
- Renaming every Frow class through Sass aliases introduced a large amount of generated CSS.
- Loops and generated combinations made the source harder to audit.
- Sass `@extend` created compilation and output concerns.
- The project would still be carrying a framework’s complete vocabulary even when only a small portion was useful.

The conclusion was that the useful part of FrowCSS was its responsive flexbox idea, not its complete implementation.

### The custom system

The project now keeps only the useful ideas:

- Flexbox remains the foundation.
- Breakpoint names are actual pixel values.
- Every responsive choice is explicit.
- The class names use the project’s BEM-style naming convention.
- There are no framework dependencies.
- There are no Sass loops or generated class combinations.
- Every supported class is written directly and documented in `Flex.scss`.

## The core language

The system has three parts:

```text
Flex                       the flex container
Flex--{breakpoint}-...     the container's responsive behavior
Flex__item--{breakpoint}-...  the item's responsive behavior
```

For example:

```html
<div class="Flex Flex--0-column Flex--768-row">
	<div class="Flex__item--0-12 Flex__item--768-6">
		Item A
	</div>

	<div class="Flex__item--0-12 Flex__item--768-6">
		Item B
	</div>
</div>
```

This means:

- The element is a flex container.
- From `0px` upward, its children are in a column.
- From `768px` upward, its children are in a row.
- Each item is full-width at the base breakpoint.
- Each item spans six of twelve columns from `768px` upward.

The `0` class does not mean “only at zero pixels.” It means “starting at zero pixels and continuing upward until another breakpoint rule overrides it.”

## Breakpoints

The available breakpoint values are:

| Class value | Applies at | Meaning |
| --- | ---: | --- |
| `0` | `0px` and wider | Base layout |
| `768` | `768px` and wider | First responsive change |
| `992` | `992px` and wider | Second responsive change |
| `1200` | `1200px` and wider | Large-screen change |

The stylesheet is ordered from smallest to largest breakpoint. This makes the following pattern work without any max-width rules:

```html
<div class="Flex Flex--0-column Flex--768-row Flex--1200-row-reverse">
	Content
</div>
```

The result is:

- Below `768px`: column.
- From `768px` through `1199px`: row.
- From `1200px` upward: reversed row.

Only add a breakpoint class when something changes. If the direction stays the same from `768px` to `992px`, there is no reason to repeat the direction class at `992px`.

## Base classes

### `.Flex`

`.Flex` creates a block-level flex container:

```html
<div class="Flex Flex--0-row">
	Content
</div>
```

It provides:

- `display: flex`.
- `flex-wrap: nowrap`.

It intentionally does not provide:

- A direction.
- A gap.
- Margin.
- Padding.
- Color or typography.

The direction should be stated with `.Flex--0-row`, `.Flex--0-column`, or one of the direction-aware alignment classes.

### `.Flex--inline`

`.Flex--inline` changes a `.Flex` container to `inline-flex`:

```html
<span class="Flex Flex--inline Flex--0-row">
	Inline flex content
</span>
```

It is a non-responsive display choice. It still expects `.Flex` to be present.

### `.Flex__item`

`.Flex__item` is an optional base item class. It provides:

- `box-sizing: border-box`.
- `min-width: 0`.

It is useful for a generic item that does not need a span or another item modifier. Span classes include these safety rules themselves, so this is not required when using `.Flex__item--{breakpoint}-{span}`.

## Direction classes

These classes control the order in which children are laid out:

```text
.Flex--{bp}-row
.Flex--{bp}-row-reverse
.Flex--{bp}-column
.Flex--{bp}-column-reverse
```

Examples:

```html
<div class="Flex Flex--0-row">
	Horizontal from the base breakpoint upward.
</div>

<div class="Flex Flex--0-column Flex--768-row">
	Vertical on small screens, horizontal at 768px and wider.
</div>

<div class="Flex Flex--0-row Flex--992-row-reverse">
	Normal row until 992px, then reversed row.
</div>
```

The direction classes only set `flex-direction`. They do not set alignment or spacing.

## Wrapping classes

```text
.Flex--{bp}-wrap
.Flex--{bp}-nowrap
.Flex--{bp}-wrap-reverse
```

`.Flex` defaults to `nowrap`, which is important for the shrinkable span behavior described below.

Use `wrap` only when multiple flex lines are actually wanted:

```html
<div class="Flex Flex--0-row Flex--0-wrap">
	Items may form additional rows.
</div>
```

`wrap-reverse` creates multiple lines in the reverse cross-axis direction. `nowrap` can be applied at a later breakpoint to turn wrapping off again.

## Alignment classes

The alignment names describe what the layout looks like on the screen rather than exposing the confusing `justify` and `align` terminology directly.

The direction-aware alignment classes also set the direction named in the class. For example, `.Flex--0-row-horizontal-between` establishes a row and distributes its contents horizontally. Therefore, a separate `.Flex--0-row` is not required in that case.

### Row horizontal

These classes use a row and map to `justify-content`:

```text
.Flex--{bp}-row-horizontal-start
.Flex--{bp}-row-horizontal-center
.Flex--{bp}-row-horizontal-end
.Flex--{bp}-row-horizontal-between
.Flex--{bp}-row-horizontal-around
.Flex--{bp}-row-horizontal-evenly
```

Example:

```html
<div class="Flex Flex--0-row-horizontal-between">
	<div>Left</div>
	<div>Right</div>
</div>
```

### Row vertical

These classes use a row and map to `align-content`:

```text
.Flex--{bp}-row-vertical-start
.Flex--{bp}-row-vertical-center
.Flex--{bp}-row-vertical-end
.Flex--{bp}-row-vertical-between
.Flex--{bp}-row-vertical-around
.Flex--{bp}-row-vertical-evenly
.Flex--{bp}-row-vertical-stretch
```

These align flex lines vertically. They are mainly useful with `.Flex--{bp}-wrap`, because a nowrap container has only one line.

### Row items

These classes use a row and map to `align-items`:

```text
.Flex--{bp}-row-items-start
.Flex--{bp}-row-items-center
.Flex--{bp}-row-items-end
.Flex--{bp}-row-items-stretch
.Flex--{bp}-row-items-baseline
```

These align the individual children within the row’s cross axis.

Example:

```html
<div class="Flex Flex--0-row-horizontal-between Flex--0-row-items-center">
	<div>Short content</div>
	<div>Taller content</div>
</div>
```

### Column vertical

These classes use a column and map to `justify-content`:

```text
.Flex--{bp}-column-vertical-start
.Flex--{bp}-column-vertical-center
.Flex--{bp}-column-vertical-end
.Flex--{bp}-column-vertical-between
.Flex--{bp}-column-vertical-around
.Flex--{bp}-column-vertical-evenly
```

These distribute the contents vertically inside a column.

### Column horizontal

These classes use a column and map to `align-content`:

```text
.Flex--{bp}-column-horizontal-start
.Flex--{bp}-column-horizontal-center
.Flex--{bp}-column-horizontal-end
.Flex--{bp}-column-horizontal-between
.Flex--{bp}-column-horizontal-around
.Flex--{bp}-column-horizontal-evenly
.Flex--{bp}-column-horizontal-stretch
```

These align wrapped flex lines horizontally in a column. Like the row-vertical classes, they generally require wrapping to produce multiple lines.

### Column items

These classes use a column and map to `align-items`:

```text
.Flex--{bp}-column-items-start
.Flex--{bp}-column-items-center
.Flex--{bp}-column-items-end
.Flex--{bp}-column-items-stretch
.Flex--{bp}-column-items-baseline
```

These align the individual children horizontally within the column.

### Alignment values

The words map consistently to native flexbox values:

| Name | Native value |
| --- | --- |
| `start` | `flex-start` |
| `center` | `center` |
| `end` | `flex-end` |
| `between` | `space-between` |
| `around` | `space-around` |
| `evenly` | `space-evenly` |
| `stretch` | `stretch` |
| `baseline` | `baseline` |

## Twelve-column spans

Item sizing uses a twelve-column span system. The number in the class is the number of columns the item occupies:

```text
.Flex__item--{bp}-1
.Flex__item--{bp}-2
.Flex__item--{bp}-3
.Flex__item--{bp}-4
.Flex__item--{bp}-5
.Flex__item--{bp}-6
.Flex__item--{bp}-7
.Flex__item--{bp}-8
.Flex__item--{bp}-9
.Flex__item--{bp}-10
.Flex__item--{bp}-11
.Flex__item--{bp}-12
```

| Class suffix | Span | Approximate width |
| --- | ---: | ---: |
| `1` | 1/12 | 8.333333% |
| `2` | 2/12 | 16.666667% |
| `3` | 3/12 | 25% |
| `4` | 4/12 | 33.333333% |
| `5` | 5/12 | 41.666667% |
| `6` | 6/12 | 50% |
| `7` | 7/12 | 58.333333% |
| `8` | 8/12 | 66.666667% |
| `9` | 9/12 | 75% |
| `10` | 10/12 | 83.333333% |
| `11` | 11/12 | 91.666667% |
| `12` | 12/12 | 100% |

For example:

- `.Flex__item--0-6` means six columns from the base breakpoint upward.
- `.Flex__item--768-3` means three columns from `768px` upward.
- `.Flex__item--992-12` means twelve columns from `992px` upward.

### Why the names are numeric

The earlier fraction names such as `1-2`, `1-3`, and `1-4` were removed. The `col-1` through `col-12` names were also removed.

Those naming systems described the same widths in different ways. They also made “column” ambiguous because `column` already describes a flex direction.

The numeric name is a span, not a fraction:

```text
.Flex--0-column       the parent stacks children vertically
.Flex--768-row        the parent arranges children horizontally
.Flex__item--768-6    the item spans six of twelve columns
```

There are no column-direction span variants. A column-direction container already stacks its children. The span classes describe the width of items when using a horizontal twelve-column row. They can technically set an item width inside a column, but they do not represent a separate column layout system.

## Gap and shrinking

Gaps are deliberately not part of `Flex.scss`. A component owns its own spacing:

```scss
.PricingCards {
	gap: 3rem;
}
```

This is valid:

```html
<div class="Flex Flex--0-row-horizontal-between PricingCards">
	<div class="Flex__item--0-6">
		Item A
	</div>

	<div class="Flex__item--0-6">
		Item B
	</div>
</div>
```

Each span class uses shrinkable sizing. A six-column item has a preferred width of 50%, but it is not rigidly fixed at 50%. When the two preferred widths plus the component gap require more space than the container has, flexbox distributes the negative free space by shrinking the items.

That is why the parent defaults to `nowrap`: the items remain on the same line and negotiate their widths around the gap.

This behavior is based on the normal flexbox algorithm. The gap consumes available space, and `flex-shrink` resolves the remaining negative free space. See:

- [MDN: `flex-wrap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/flex-wrap)
- [MDN: wrapping flex items](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Wrapping_items)
- [W3C: CSS Flexible Box Layout](https://www.w3.org/TR/css-flexbox-1/)

### When wrapping can still happen

If `.Flex--{bp}-wrap` is added, items are allowed to form new lines. Fractional spans may then wrap instead of shrinking onto one line.

Also, no CSS system can solve impossible geometry. An unbreakable word, a rigid child, or a gap larger than the available container can still cause overflow.

### Explicit growth and shrinking

The following item classes are available when the normal span behavior needs to be changed:

```text
.Flex__item--{bp}-grow-allow
.Flex__item--{bp}-grow-prevent
.Flex__item--{bp}-shrink-allow
.Flex__item--{bp}-shrink-prevent
```

Span classes already allow shrinking and prevent growing by default. Most layouts should not need to add these classes.

Use `shrink-prevent` only when an item must retain its preferred size. With a sufficiently large gap, that can cause overflow because the item is no longer allowed to negotiate its width.

## Item order

Order classes are available from zero through twelve:

```text
.Flex__item--{bp}-order-0
.Flex__item--{bp}-order-1
.Flex__item--{bp}-order-2
.Flex__item--{bp}-order-3
.Flex__item--{bp}-order-4
.Flex__item--{bp}-order-5
.Flex__item--{bp}-order-6
.Flex__item--{bp}-order-7
.Flex__item--{bp}-order-8
.Flex__item--{bp}-order-9
.Flex__item--{bp}-order-10
.Flex__item--{bp}-order-11
.Flex__item--{bp}-order-12
```

`order-0` is useful when an item needs to return to its normal position at a later breakpoint:

```html
<div class="Flex Flex--0-column Flex--768-row">
	<div class="Flex__item--0-order-2 Flex__item--768-order-0">
		Item
	</div>
</div>
```

Values below zero and above twelve are intentionally not included. A one-off custom order can use component CSS instead.

## Individual item alignment

These classes affect one item rather than the entire container:

```text
.Flex__item--{bp}-self-auto
.Flex__item--{bp}-self-start
.Flex__item--{bp}-self-center
.Flex__item--{bp}-self-end
.Flex__item--{bp}-self-stretch
.Flex__item--{bp}-self-baseline
```

Example:

```html
<div class="Flex Flex--0-row-items-center">
	<div class="Flex__item--0-self-start">
		This item overrides the container's item alignment.
	</div>
</div>
```

There are no horizontal or vertical suffixes on these classes. The container’s direction determines which physical axis is the cross axis.

## Visibility classes

Only hidden classes are provided:

```text
.Visibility--0-hidden
.Visibility--768-hidden
.Visibility--992-hidden
.Visibility--1200-hidden
```

Each class applies from its named breakpoint upward, using the same
min-width cascade as the layout classes:

| Class | Hidden from |
| --- | --- |
| `.Visibility--0-hidden` | `0px` and wider |
| `.Visibility--768-hidden` | `768px` and wider |
| `.Visibility--992-hidden` | `992px` and wider |
| `.Visibility--1200-hidden` | `1200px` and wider |

There are no visible/show classes because normal visibility is the default.

The `0px` class is unwrapped, and later classes use `min-width` media queries. They use `display: none`, so hidden content is removed from layout and is not keyboard-focusable while hidden.

## Complete layout examples

### Mobile column, desktop row

```html
<section class="FeatureList Flex Flex--0-column Flex--768-row">
	<article class="Flex__item--0-12 Flex__item--768-4">
		Feature one
	</article>

	<article class="Flex__item--0-12 Flex__item--768-4">
		Feature two
	</article>

	<article class="Flex__item--0-12 Flex__item--768-4">
		Feature three
	</article>
</section>
```

Component spacing stays in component CSS:

```scss
.FeatureList {
	gap: 2rem;
}
```

### Two half-width cards with a gap

```html
<section class="PricingCards Flex Flex--0-row-horizontal-between PricingCards">
	<article class="Flex__item--0-6">
		Card A
	</article>

	<article class="Flex__item--0-6">
		Card B
	</article>
</section>
```

```scss
.PricingCards {
	gap: 3rem;
}
```

The items have 50% preferred widths, but they can shrink around the 3rem gap while the parent remains on one line.

### Multiple breakpoint decisions

```html
<section class="Feature Flex Flex--0-column Flex--768-row-horizontal-between Flex--1200-row-reverse">
	<div class="Flex__item--0-12 Flex__item--768-8 Flex__item--1200-7">
		Main content
	</div>

	<aside class="Flex__item--0-12 Flex__item--768-4 Flex__item--1200-5">
		Supporting content
	</aside>
</section>
```

This layout is:

- A vertical stack below `768px`.
- A horizontal row from `768px` upward.
- A reversed horizontal row from `1200px` upward.
- Full-width items at the base breakpoint.
- An eight/twelve and four/twelve split at `768px`.
- A seven/twelve and five/twelve split at `1200px`.

Because `.Flex--768-row-horizontal-between` is direction-aware, a separate `.Flex--768-row` is unnecessary.

## Choosing the smallest useful class set

Use only the decisions that are necessary:

```html
<div class="Flex Flex--0-column Flex--768-row">
	Content
</div>
```

Do not add alignment classes if the browser’s native defaults already produce the desired layout.

Do not add `.Flex__item` when an item already has a span class. Span classes already include their required box-sizing and minimum-width behavior.

Do not add `.Flex--0-row` when using a direction-aware row class such as `.Flex--0-row-horizontal-between`.

Do not repeat a class at a breakpoint when its behavior has not changed.

Keep the component class separate from the layout classes:

```html
<section class="PricingCards Flex Flex--0-row-horizontal-between">
	...
</section>
```

`PricingCards` owns the component’s appearance and gap. `Flex` owns the layout behavior.

## What is intentionally not included

`Flex.scss` does not provide:

- Gap classes.
- Margin or padding classes.
- Container or max-width rules.
- Grid CSS.
- Typography.
- Colors.
- Borders, shadows, or other visual styling.
- FrowCSS shortcuts.
- FrowCSS class names.
- Fraction names such as `1-2`, `1-3`, or `1-4`.
- `col-*` item names.
- Visible/show utility classes.
- Order values below zero or above twelve.
- Automatically generated combinations.

If a layout needs behavior outside this vocabulary, use component CSS. The system is intentionally small enough that adding a custom rule remains straightforward.

## Implementation details

`scss/Flex.scss` is intentionally standalone. It does not import `Globals.scss`, FrowCSS, Foundation, or another Sass file. This keeps the compiled output limited to the project’s own flex classes.

The file is loaded globally by [`_includes/layouts/Base.11ty.js`](../_includes/layouts/Base.11ty.js), alongside the other shared styles. The existing Eleventy Sass extension watches the `scss/` directory and renders the file as part of the page’s shared styles.

The source is deliberately written as explicit CSS rather than generated with Sass loops. That makes the available vocabulary visible in one file and prevents unused framework classes from entering the output.

Every public selector in `Flex.scss` has a nearby block comment describing its effect and linking to the relevant native CSS property documentation.

## Applying Flex behavior in component Sass

The preferred component pattern is to keep Flex classes out of the HTML when the component stylesheet already owns the component class. The component stylesheet can load the shared Globals module and extend the documented classes:

```scss
@use '../Globals' as *;

.Component {

	@extend .Flex;

	@extend .Flex--0-column;
	@extend .Flex--768-row;
}
```

The resulting HTML can remain semantic and component-oriented:

```html
<section class="Component">
	Content
</section>
```

When a component changes layout at a breakpoint, extend the matching breakpoint class directly. The breakpoint class already carries its own media-query scope in `Flex.scss`:

```scss
.Component {
	@extend .Flex--768-column;
}
```

Only put component-owned declarations such as gaps, colors, padding, or width resets inside the component's media query:

```scss
.Component {
	gap: 1rem;

	@media ( min-width: 768px ) {
		gap: 2rem;
	}
}
```

Use only classes that already exist in `Flex.scss`. Do not recreate their declarations in the component stylesheet.

The current Eleventy setup compiles component Sass files independently. Loading `Globals.scss`, which loads `Flex.scss`, to make its selectors available to `@extend` can therefore include the Flex module's CSS in that component's compiled style as well as in the global Flex style. This is the intentional cost of the Sass-side `@extend` pattern used by the active components. If the output becomes too large, the compilation architecture should be revisited rather than adding aliases, loops, or a second Flex vocabulary.

## Maintenance rules

When changing this system:

1. Keep the four breakpoint values as `0`, `768`, `992`, and `1200` unless the project intentionally changes its responsive model.
2. Add new responsive behavior in the appropriate breakpoint section.
3. Use pixel breakpoint names in class names.
4. Keep item sizing numeric and span-based.
5. Do not add `col-*` or fraction aliases.
6. Do not add gap, margin, padding, or visual styling utilities.
7. Do not add Sass loops, maps, mixins, or new public Flex aliases. Use `@extend` only in component stylesheets to apply existing Flex classes.
8. Document every new public class directly beside its selector.
9. Update this document whenever the public class vocabulary changes.
10. Prefer a component-specific CSS rule when a behavior is a one-off rather than expanding the global system.

The point of the system is not to eliminate CSS. It is to make the repeated flexbox decisions in this project explicit, reusable, responsive, and easy to understand.
