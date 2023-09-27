<template>
  <router-view></router-view>
</template>

<style>
* {
  box-sizing: border-box;
}

:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: rgba(0, 0, 0, 0.87);
  background-color: #f1f1f1;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  --color-error-primary: rgb(214, 0, 0);
  --color-error-secondary: rgb(255, 210, 210);

  --color-gray-100: #f4f3f1;
  --color-gray-200: #dddbd8;
  --color-gray-300: #ccc9c6;
  --color-gray-400: #aeaba7;
  --color-gray-500: #8a8784;
  --color-gray-600: #656360;
  --color-gray-700: #4b4a47;
  --color-gray-800: #31302e;
  --color-gray-900: #1f1d1b;

  --color-edit-primary: rgb(115, 255, 97);
  --color-edit-secondary: rgb(61, 214, 41);

  --color-delete-primary: rgb(255, 132, 132);
  --color-delete-secondary: rgb(255, 95, 95);

  --color-primary-100: #fcf3e1;
  --color-primary-200: #fceccd;
  --color-primary-300: #fae1af;
  --color-primary-400: #fbd997;
  --color-primary-500: #ffd37c;
  --color-primary-600: #f9c762;
  --color-primary-700: #fbc14d;
  --color-primary-800: #fab833;
  --color-primary-900: #f6ad1b;
}

body {
  margin: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
