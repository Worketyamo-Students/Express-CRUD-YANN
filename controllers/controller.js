import { error } from "console";
import fs from "fs";

function database() {
  const bd = JSON.parse(fs.readFileSync("./database.json", "utf8"));
  return bd;
}

function writedatabase(dog) {
  fs.writeFileSync("./database.json", JSON.stringify(dog, null, 2));
}

database();

const controller = {
  getdog: (req, res) => {
    res.status(200).json(database());
  },

  newdog: (req, res) => {
    const { nom, race, age } = req.body;
    if (!nom || !race || !age) {
      return res
        .status(400)
        .json({ message: "les informations sont incomplètes" });
    }
    const Dog = database();

    const samedog = Dog.some(
      (d) => d.nom === nom && d.race === race && d.age === age
    );
    if (samedog) {
      return res
        .status(409) // 409 Conflict
        .json({ message: "Ce chien existe déjà dans la base de données" });
    }

    const newdog = {
      id: Dog.length > 0 ? Dog[Dog.length - 1].id + 1 : 1,
      nom,
      race,
      age,
    };

    Dog.push(newdog);
    writedatabase(Dog);

    res.status(201).json(Dog);
  },

  updatedog: (req, res) => {
    const { nom, race, age } = req.body;
    const { id } = req.params;

    if (!id || !nom || !race || !age) {
      return res.status(400).json({ msg: { error: "No Data" } });
    }


    const updog = JSON.parse(fs.readFileSync("./database.json", "utf8"))

    const dogIndex = updog.findIndex((item) => item.id === parseInt(id));

    if (dogIndex === -1) {
      return res.status(404).json({ msg: { error: "Dog not found" } });
    }

    updog[dogIndex] = { ...updog[dogIndex], nom, race, age };

    fs.writeFileSync("./database.json", JSON.stringify(updog, null, 2));

    return res.status(200).json(database());
  },

  deletedog: (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: { error: "No Data" } });
    }

    const deldog = JSON.parse(fs.readFileSync("./database.json", "utf8"));

    const dogIndex = deldog.findIndex((item) => item.id === parseInt(id));

    if (dogIndex === -1) {
      return res.status(404).json({ msg: { error: "Dog not found" } });
    }

    deldog.splice(dogIndex, 1);

    fs.writeFileSync("./database.json", JSON.stringify(deldog, null, 2));

    return res.status(200).json(database());
  }
};

export default controller;
