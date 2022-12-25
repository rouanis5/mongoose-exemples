const mongoose = require("mongoose");
const User = require("./User");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://localhost/mytest",
  () => {
    console.log("connected");
  },
  (error) => console.error(error)
);

async function run() {
  try {
    // method 1
    const user1 = new User({
      name: "wanis",
      age: 20,
      email: "Email@gm.com",
      hobbies: ["hobby2", "hobby1"],
      address: {
        street: "nowhere",
        city: "nowhere",
      },
    });

    // method 2
    await user1.save();
    user1.sayHi();
    console.log(user1);

    const user2 = await User.create({
      name: "ryan",
      age: 20,
      email: "haha@gm.com",
    });
    user2.sayHi();

    // .where("name").equals("ryan") is replaced by where().ByName("ryan")
    // which is created by using userSchema.query.byName method
    const getUser2 = await User.where()
      .byName("ryan")
      .where("age")
      .gte(15)
      .lt(22)
      .select(["id", "age", "createdAt"])
      .limit(1);
    getUser2[0].name = "rayane";
    getUser2[0].age = 17;
    await getUser2[0].save();
    console.log(getUser2);

    //testing some schema methods
    const users3 = await User.findByName("wanis");
    console.log(users3);
    users3.forEach((user) => {
      user.sayHi();
    });

    const deleteUsers = await User.deleteMany({
      name: { $in: ["rayane", "ryan", "wanis", "ouanis"] },
    });
    console.log(deleteUsers);
  } catch (e) {
    console.log(e.message);
  }
}

run();
