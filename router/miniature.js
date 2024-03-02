const express = require("express");
const Miniature = require("../models/miniature");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const minis = await Miniature.find({});
    res.render("Miniatura", { arrayMini: minis });
  } catch (error) {
    console.log("Error al obtener las miniaturas:", error);
    res.status(500).send("Hubo un error al obtener las miniaturas");
  }
});

router.post("/crear", async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const miniDB = new Miniature(body);
    await miniDB.save();
    res.json({
      estado: true,
      mensaje: "Miniatura creada correctamente",
      miniature: miniDB,
    });
  } catch (error) {
    res.json({
      estado: false,
      mensaje: "No se puede crear la miniatura",
    });
    console.log("error", error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const miniDB = await Miniature.findOne({ _id: id });
    res.render("detalle", {
      miniature: miniDB,
      error: false,
    });
  } catch (error) {
    console.log("Se ha producido un error ", error);
    res.render("detalle", {
      error: true,
      mensaje: "Miniatura no encontrada",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("_id desde backend", id);
  try {
    const miniDB = await Miniature.findByIdAndDelete({ _id: id });
    console.log(miniDB);
    if (!miniDB) {
      res.json({
        estado: false,
        mensaje: "No se puede eliminar la miniatura",
      });
    } else {
      res.json({
        estado: true,
        mensaje: "Miniatura eliminada correctamente",
      });
    }
  } catch (error) {
    console.log("Se ha producido un error ", error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(id);
  console.log(body);
  try {
    const miniDB = await Miniature.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });
    console.log(miniDB);
    res.json({
      estado: true,
      mensaje: "Miniatura editada",
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      estado: false,
      mensaje: "Problema al editar la miniatura",
    });
  }
});

module.exports = router;
