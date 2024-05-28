# Contributing to def-gen

Thank you for your interest in contributing to def-gen! We welcome contributions from the community and are grateful for your help in improving the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Building the Project](#building-the-project)
- [Running Tests](#running-tests)
- [Submitting Changes](#submitting-changes)
- [License](#license)

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the expectations for all contributors.

## How to Contribute

1. **Fork the repository** on GitHub.
2. **Clone your forked repository** to your local machine:
    ```sh
    git clone https://github.com/veloii/def-gen.git
    cd def-gen
    ```
3. **Create a new branch** for your feature or bugfix:
    ```sh
    git checkout -b my-feature-branch
    ```

## Development Setup

To set up your development environment, follow these steps:

1. **Install the dependencies** using [pnpm](https://pnpm.io/):
    ```sh
    pnpm install
    ```

2. **Build the project**:
    ```sh
    pnpm build
    ```

## Building the Project

To build the project, use the following command:
```sh
pnpm build
```
This will compile the TypeScript files and generate the output in the `dist` directory.

## Running Tests

To run the tests, use the following command:
```sh
pnpm test
```
We use [Vitest](https://vitest.dev/) for testing. Make sure all tests pass before submitting your changes.

## Submitting Changes

1. **Commit your changes** using a descriptive commit message:
    ```sh
    git commit -m "Add feature X"
    ```
2. **Push your changes** to your forked repository:
    ```sh
    git push origin my-feature-branch
    ```
3. **Open a pull request** on GitHub and describe the changes you have made.

## License

By contributing to def-gen, you agree that your contributions will be licensed under the [MIT License](LICENSE).
