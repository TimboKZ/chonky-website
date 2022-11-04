# This repository is discontinued, Chonky website now lives in the main Chonky repo: https://github.com/TimboKZ/Chonky

# Chonky website

This repo contains the source code for the landing page, documentation and storybooks
for Chonky - A File Browser for React.

The website is available at: https://chonky.io

If you have an issue, please report it in the main Chonky repository:
https://github.com/TimboKZ/Chonky

## Repository structure

-   `landing/` - CRA landing page project shared by all versions, available at
    `chonky.io/`.
-   `2.x_docz/` - Docz project for Chonky v2.x, available at `chonky.io/docs/2.x/`.
-   `2.x_storybook/` - Storybook project for Chonky v2.x, available at
    `chonky.io/storybook/2.x/`.

*Notes:* Docs for v0.x and v1.x are available at `chonky.io/docs/0.x/` and
`chonky.io/docs/1.x/` respectively. They are deployed separately.

## Building & uploading

To install recursively install dependencies, build all projects, and deploy them, run
the following commands:

```
npm run install:all
npm run build:all
npm run deploy:all
```

The last step requires the correct AWS credentials to be setup in the deployment
environment. These credentials are only available to project maintainers.
