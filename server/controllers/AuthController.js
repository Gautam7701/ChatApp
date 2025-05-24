
import getPrismaInstance from "../utils/PrismaClient.js";

export const checkuser = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("Request body:", req.body);
    console.log("Email:", email);

    if (!email) {
      return res.json({ message: "Email is required", status: false });
    }

    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.json({ message: "User not found", status: false });
    } else {
      return res.json({
        message: "User found",
        status: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture, // ✅ fixed name
          status: user.about || "",           // ✅ consistent with frontend
        },
      });
    }
  } catch (error) {
    console.error("Error in checkuser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const onboardUser = async (req, res, next) => {
  try {
    const { email, name, about, profilePicture } = req.body;
    console.log("Request body:", req.body);
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("About:", about);
    console.log("Profile Image:", profilePicture);

    if (!email || !name || !about || !profilePicture) {
      return res.send({ message: "All fields are required", status: false });
    }

    const prisma = getPrismaInstance();
    const user = await prisma.user.create({
      data: {
        email,
        name,
        about,
        profilePicture, // ✅ consistent with checkuser
      },
    });

    return res.json({
      message: "User onboarded successfully",
      status: true,
      data: user,
    });
  } catch (error) {
    console.error("Error in onboardUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllUsers = async(req, res, next)=>{
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy:{name:"asc"},
      select:{
        id:true,
        name:true,
        email:true,
        profilePicture:true,
        about:true
      },
    });
    const usersGroupedByInitializer = {

    };
    users.forEach((user)=>{
      const initialLetter = user.name.charAt(0).toUpperCase();
      if(!usersGroupedByInitializer[initialLetter]){
        usersGroupedByInitializer[initialLetter] = [];
      }
      usersGroupedByInitializer[initialLetter].push(user);
    })
    return res.status(200).send({users:usersGroupedByInitializer})
  } catch (error) {
    next(error)
  }
}