import Role from "../models/role.js";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Role.insertMany([
      { name: "user" },
      { name: "provider" },
      { name: "admin" },
      { name: "superuser" }
    ]);

    console.log(values);
    return values;
  } catch (error) {
    console.error(error);
  }
}

export default createRoles;
