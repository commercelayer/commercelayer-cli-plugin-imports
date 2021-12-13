cli-plugin-imports

Commerce Layer CLI Imports plugin

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@commercelayer/cli-plugin-imports.svg)](https://npmjs.org/package/@commercelayer/cli-plugin-imports)
[![Downloads/week](https://img.shields.io/npm/dw/@commercelayer/cli-plugin-imports.svg)](https://npmjs.org/package/@commercelayer/cli-plugin-imports)
[![License](https://img.shields.io/npm/l/@commercelayer/cli-plugin-imports.svg)](https://github.com/commercelayer/cli-plugin-imports/blob/master/package.json)


<!-- toc -->


<!-- tocstop -->
# Usage
<!-- usage -->


<!-- usagestop -->
# Commands
<!-- commands -->

* [`cl-imports imports`](#cl-imports-imports)
* [`cl-imports imports:create`](#cl-imports-importscreate)
* [`cl-imports imports:delete ID`](#cl-imports-importsdelete-id)
* [`cl-imports imports:details ID`](#cl-imports-importsdetails-id)
* [`cl-imports imports:group GROUP_ID`](#cl-imports-importsgroup-group_id)
* [`cl-imports imports:list`](#cl-imports-importslist)
* [`cl-imports imports:types`](#cl-imports-importstypes)

### `cl-imports imports`

List all the created imports.

```
USAGE
  $ cl-imports imports

OPTIONS
  -A, --all
      show all imports instead of first 25 only

  -e, --errors
      show only imports with errors

  -g, --group=group
      the group ID associated to the import in case of multi-chunk imports

  -l, --limit=limit
      limit number of imports in output

  -o, --organization=organization
      (required) the slug of your organization

  -s, --status=in_progress|pending|completed|interrupted
      the import job status

  -t, --type=orders|coupons|skus|sku_lists|sku_list_items|prices|stock_items|gift_cards|customers|customer_subscriptions
  |tax_categories
      the type of resource imported

  -w, --warnings
      show only import with warnings
```

_See code: [src/commands/imports/index.ts](https://github.com/commercelayer/commercelayer-cli-plugin-imports/blob/main/src/commands/imports/index.ts)_

### `cl-imports imports:create`

Create a new import.

```
USAGE
  $ cl-imports imports:create

OPTIONS
  -C, --csv                                     accept input file in CSV format
  -b, --blind                                   execute in blind mode without showing the progress monitor
  -i, --inputs=inputs                           (required) the path of the file containing the data to import
  -o, --organization=organization               (required) the slug of your organization
  -p, --parent=parent                           the id of the parent resource to be associated with imported data
  -q, --quiet                                   execute command without showing warning messages
  -t, --type=orders|coupons|skus|sku_lists|...  (required) the type of resource being imported

EXAMPLES
  $ commercelayer imports:create -t stock_items -p <stock_location-id> -i <input-file-path>
  $ cl imp:create skus -c -i <input-file-path>
```

_See code: [src/commands/imports/create.ts](https://github.com/commercelayer/commercelayer-cli-plugin-imports/blob/main/src/commands/imports/create.ts)_

### `cl-imports imports:delete ID`

Delete an existing import.

```
USAGE
  $ cl-imports imports:delete ID

ARGUMENTS
  ID  unique id of the import

OPTIONS
  -o, --organization=organization  (required) the slug of your organization

ALIASES
  $ cl-imports imp:delete

EXAMPLES
  $ commercelayer imports:delete <import-id>>
  $ cl imp:delete <import-id>>
```

_See code: [src/commands/imports/delete.ts](https://github.com/commercelayer/commercelayer-cli-plugin-imports/blob/main/src/commands/imports/delete.ts)_

### `cl-imports imports:details ID`

Show the details of an existing import.

```
USAGE
  $ cl-imports imports:details ID

ARGUMENTS
  ID  unique id of the import

OPTIONS
  -i, --inputs                     show input items associated with the import
  -l, --logs                       show warning and error logs related to the import process
  -o, --organization=organization  (required) the slug of your organization

ALIASES
  $ cl-imports import
  $ cl-imports imp:details

EXAMPLES
  $ commercelayer imports:details <import-id>
  $ cl import <import-id> -i
  $ cl imp:details <import-id> -i -l
```

_See code: [src/commands/imports/details.ts](https://github.com/commercelayer/commercelayer-cli-plugin-imports/blob/main/src/commands/imports/details.ts)_

### `cl-imports imports:group GROUP_ID`

List all the imports related to an import group.

```
USAGE
  $ cl-imports imports:group GROUP_ID

ARGUMENTS
  GROUP_ID  unique id of the group import

OPTIONS
  -o, --organization=organization  (required) the slug of your organization

ALIASES
  $ cl-imports imp:group

EXAMPLES
  $ commercelayer imports:group <group-id>
  $ cl imports:ghroup <group-id>
```

_See code: [src/commands/imports/group.ts](https://github.com/commercelayer/commercelayer-cli-plugin-imports/blob/main/src/commands/imports/group.ts)_

### `cl-imports imports:list`

List all the created imports.

```
USAGE
  $ cl-imports imports:list

OPTIONS
  -A, --all
      show all imports instead of first 25 only

  -e, --errors
      show only imports with errors

  -g, --group=group
      the group ID associated to the import in case of multi-chunk imports

  -l, --limit=limit
      limit number of imports in output

  -o, --organization=organization
      (required) the slug of your organization

  -s, --status=in_progress|pending|completed|interrupted
      the import job status

  -t, --type=orders|coupons|skus|sku_lists|sku_list_items|prices|stock_items|gift_cards|customers|customer_subscriptions
  |tax_categories
      the type of resource imported

  -w, --warnings
      show only import with warnings

ALIASES
  $ cl-imports imp:list

EXAMPLES
  $ commercelayer imports
  $ cl imports:list -A
  $ cl imp:list
```

_See code: [src/commands/imports/list.ts](https://github.com/commercelayer/commercelayer-cli-plugin-imports/blob/main/src/commands/imports/list.ts)_

### `cl-imports imports:types`

Show online documentation for supported resources.

```
USAGE
  $ cl-imports imports:types
```

_See code: [src/commands/imports/types.ts](https://github.com/commercelayer/commercelayer-cli-plugin-imports/blob/main/src/commands/imports/types.ts)_
<!-- commandsstop -->
