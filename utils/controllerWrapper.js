// const controllerWrapper = (controller) => {
//   return async (req, res, next) => {
//     try {
//       await controller(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };

const controllerWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

module.exports = controllerWrapper;
