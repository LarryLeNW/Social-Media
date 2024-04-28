import dotenv from "dotenv";
dotenv.config();
export const WHITELIST_DOMAINS = [process.env.IP_CLIENT];
console.log("🚀 ~ process.env.IP_CLIENT:", process.env.IP_CLIENT);
