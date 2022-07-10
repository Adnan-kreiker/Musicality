// import upperFirst from 'lodash/upperFirst';
// import camelCase from 'lodash/camelCase';


// export default {
//   install(app) {
//     const baseComponents = require.context(
//       '../components/base/', false, /[A-Za-z-0-9,\s]+\.vue$/i,
//     );
//     baseComponents.keys().forEach((fileName) => {
//       const componentConfig = baseComponents(fileName);
//       const componentName = upperFirst(
//         camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
//       );
//       app.component(
//         `Base${componentName}`, componentConfig.default || componentConfig,
//       );
//     });
//   },
// };
