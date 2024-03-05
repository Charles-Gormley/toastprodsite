# [Tokenized Toast](https://tokenizedtoast.com)

## Getting Started

This project uses [`pnpm`](https://pnpm.io), a *fast* and **strict** package manager instead of `npm`. It does not allow you to use modules that aren't specified in the [`package.json`](https://github.com/Charles-Gormley/toastprodsite/blob/master/package.json) which "[helps to avoid silly bugs](https://www.kochan.io/nodejs/pnpms-strictness-helps-to-avoid-silly-bugs.html)".

First, [install `pnpm`](https://pnpm.io/installation).

```sh
# If you use Homebrew...
brew install pnpm
# Or if you already have npm installed...
npm install -g pnpm
```

Then, install project dependencies.

```sh
pnpm install
```

Finally, you can start the dev server and see it at [http://localhost:4321](http://localhost:4321).

```sh
pnpm start
```

## More Commands

| Command                 | Action                                           |
| :---------------------  | :----------------------------------------------- |
| `pnpm install`          | Installs dependencies                            |
| `pnpm run dev`          | Starts local dev server at `localhost:4321`      |
| `pnpm run build`        | Build your production site to `./dist/`          |
| `pnpm run preview`      | Preview your build locally, before deploying     |
| `pnpm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro --help` | Get help using the Astro CLI                     |

