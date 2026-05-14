import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  await prisma.user.upsert({
    where: { email: "admin@kspmulia.com" },
    update: {},
    create: {
      email: "admin@kspmulia.com",
      name: "Administrator",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Seed completed: Admin user created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });