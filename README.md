This repository is just a sandbox for exploring spacing concepts within a design system.

The spacing "tokens" are currently defined a CSS variables in spacing.css and are defined as a non-linear scale set in REM.
At the moment only "small" and "medium" sizes are being used.

The Parcel build isn't working properly at the moment, so the best way to play with this is using Storybook (`yarn storybook`) and look at the Page -> Card story.

All the primitive components are ultimately based on an `AbstractBox` component, and `Box`, `Stack`, `Inline` and even `Pressable` is an instance of `AbstractBox`.

The idea is to try and make it possible to compose interfaces easily. There are also "recipes" of combinations of primitive components (so `Button` is just a `Pressable` wrapping a `Text` component).

So a composed "recipe" could be used but the alternative would be to allow recomposition of the primitives for the most flexibility.
