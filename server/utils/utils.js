import { hash, genSalt, compare } from "bcrypt";
export const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const uniqueId = timestamp % 100000;
  return uniqueId;
};

export async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}

export async function verifyPassword(password, storedHashedPassword) {
  try {
    const match = await compare(password, storedHashedPassword);
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
}

export function convertMonthsToArrayWithNames(data) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return data.map((item) => {
    return {
      month: monthNames[item.month - 1],
      income: item.income,
      expense: item.expense,
    };
  });
}
