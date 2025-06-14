# Angular 17 + Tauri 2 + Tailwind CSS Application

This project is a desktop application built with Angular 17, Tauri 2, and Tailwind CSS. It demonstrates how to integrate these technologies to create a modern, responsive desktop application.

## Features

- **Angular 17**: The latest version of Angular with standalone components
- **Tauri 2**: A lightweight framework for building desktop applications with web technologies
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development

## Development server

### Angular Only

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Tauri + Angular

Run `npm run tauri:dev` to start both the Angular development server and the Tauri application. This will open a desktop window with your Angular application running inside it.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

### Angular Only

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Tauri + Angular

Run `npm run tauri:build` to build the Tauri application with the Angular frontend. This will create a distributable package in the `src-tauri/target/release` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Project Structure

- `src/`: Angular application source code
- `src-tauri/`: Tauri application source code
- `dist/`: Built Angular application (generated when building)

## Customization

### Angular

The Angular application is located in the `src/` directory. You can modify it like any standard Angular application.

### Tauri

The Tauri configuration is located in the `src-tauri/tauri.conf.json` file. You can modify it to customize the application window, permissions, and other Tauri-specific settings.

### Tailwind CSS

The Tailwind CSS configuration is located in the `tailwind.config.js` file. You can modify it to customize the design system, add plugins, or extend the default configuration.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

For Tauri documentation, visit the [Tauri website](https://tauri.app/).

For Tailwind CSS documentation, visit the [Tailwind CSS website](https://tailwindcss.com/).
