# A mostly reasonable approach to a react app structure

> **Note**: this guide assumes you are using typescript.

## Table of Contents


1. General folder structure
2. Naming general rules
3. Naming inside a feature folder
4. Naming
5. 

## Folder structure


- common // keeps all the things that are being used in more than one feature
  - assets // images, icons
  - components // the most basic components
  - constants // global magic values
  - hooks // consider using react-use library
  - models //
  - services
    - util-service.ts
  - store // connects all the other stores

- features
  - feature-name

- layout // components that are used in the entire app, e.g., navigation, footer

- pages // all the pages that you have

- styles // global styles
  - variables.css

### common

#### assets

## Naming general rules

- `CamelCase` for component name.
- `kebab-case` for folder and file names.
- `CAPS_LOOK` for constants
- `IPerson` for custom interfaces
- `IPersonTemperament` for custom types

## Naming inside a feature folder

Let's image we have a feature that named `todo`.

All the component folders will be prefixed with `todo`
e.g. , `todo-item` or `todo-item-lite`


All the files from `todo` feature will be prefixed with `todo`.
- component example `todo-item.tsx` or `todo-item-lite.tsx`
- in constants folder: `todo-constants.ts`
- in models folder : `todo-models.ts`
- in services folder: `todo-api-service.ts` and `todo-util-service.ts`
- in store folder: `todo-store`

> Why? It's easier to search and keeps things consistent.

All the component names will be prefixed with `Todo`
e.g. `TodoItem` or `TodoItemLite`

> Why? For consistency it's better to prefix them with the feature name.




> Why ?


## Useful visual code extensions
- https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables



- 