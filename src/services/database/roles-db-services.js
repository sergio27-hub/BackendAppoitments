import role from "../../models/role.js";

export async function getAllRoles() {
  const roles = await role.find();
  return roles;
}
