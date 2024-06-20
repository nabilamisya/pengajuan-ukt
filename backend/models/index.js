import sequelize from "../config/Database.js";
import PermohonanUkt from "../models/PermohonanUktModel.js";

// sequelize
//   .sync()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// sequelize.define("PermohonanUkt", PermohonanUkt, {
//   tableName: "permohonan_ukts",
// });
sequelize.sync();

export default sequelize;
