import bcript from 'bcrypt';

export async function encryptPassword(password) {
  return await bcript.hash(password, 10);
}

export function checkHash(password, hashedpassword) {
  return  bcript.compareSync(password, hashedpassword);
}
