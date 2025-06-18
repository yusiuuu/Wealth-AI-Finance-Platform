// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "./prisma";

// export const checkUser = async() => 
// {
//     const user = await currentUser();
//     if (!user) {
//         return null; // If no user is logged in, return null
//     }

//     try{
//         const loggedInUser = await db.user.findUnique({
//             where: {
//                 clerkUserId: user.id
//             }
//         });

//         if (loggedInUser) {
//             return loggedInUser;
//         }

//         const name = `${user.firstName} ${user.lastName}`;

//         const newUser = await db.user.create({
//             data: {
//                 clerkUserId: user.id,
//                 email: user.emailAddresses[0].emailAddress,
//                 name: name,
//                 imageUrl: user.imageUrl,
//             }
//         });
//         return newUser;
//     } catch (error) {
//         console.log(error.message);
//     }
// };
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id, // ✅ correct field name
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id, // ✅ fixed
        email: user.emailAddresses[0]?.emailAddress || "",
        name,
        imageurl: user.imageUrl, // ✅ fixed
      },
    });

    return newUser;
  } catch (error) {
    console.error("❌ Error in checkUser:", error);
    return null;
  }
};
