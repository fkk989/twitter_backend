import bcrypt from "bcrypt";
const salt = bcrypt.genSalt(8);

export default salt;
