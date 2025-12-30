import db from "../../../server/config/db.js";

// ✅ Get all products
export const getProduits = async (req, res) => {
  
    console.log("get produits")
  try {
    const sql = "SELECT * FROM produit";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Erreur serveur" });
      }
      if (result.length === 0) {
        return res.status(200).json({ success: true, message: "Aucun produit trouvé" });
      }
      return res.status(200).json({ success: true, produits: result });
    });
  } catch (error) {
    console.log(error);
  }
};

// ✅ Add a new product
export const addProduit = async (req, res) => {
  try {
    const { nameProduct, prix, type } = req.body;
    console.log(req.body)
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ success: false, message: "Image manquante" });
    }

    let prixProduit;
    if(prix==""){
      prixProduit = 0
    }else{
      prixProduit = prix
    }
    

    const sql = `
      INSERT INTO produit (nameProduct, prix, image, type, statut)
      VALUES (?, ?, ?, ?, '1')
    `;

    db.execute(sql, [nameProduct, prixProduit, image, type]);

    return res.status(201).json({ success: true, message: "Produit ajouté" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Erreur serveur" });
  }
};


// ✅ Update a product
export const updateProduit = async (req, res) => {
  console.log("update produit")
  try {
    const { _id, nameProduct, prix, type } = req.body;

    console.log(req.body)
    // 1. Handle price fallback
    const prixProduit = prix === "" ? 0 : prix;
    console.log("prix est correct : " , prixProduit)

    // 2. Handle image case:
    let imagePath;

    if (req.file) {
      // If there's a new file, use multer's path
      imagePath = req.file.filename;
    } else {
      // Else keep the old one from body (string)
      imagePath = req.body.image;
    }

    console.log(imagePath)

    // 3. Update SQL
    const sql = `UPDATE produit SET nameProduct = ?, prix = ?, type = ?, image = ? WHERE _id=?`;
    console.log(nameProduct, prixProduit, type, imagePath, _id)


    db.execute(sql, [nameProduct, prixProduit, type, imagePath, _id]);

    return res.status(200).json({ success: true, message: "Produit modifié" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};


// ✅ Delete a product
export const deleteProduit = async (req, res) => {
  try {
    const { _id } = req.body;

    const sql = `DELETE FROM produit WHERE _id = ?`;
    db.execute(sql, [_id]);

    return res.status(200).json({ success: true, message: "Produit supprimé" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// ✅ Toggle product status
export const toggleStatutProduit = async (req, res) => {

  console.log("toggle statut produit")
  try {
    const { _id, statut } = req.body;
    const newStatut = statut === "active" ? "active" : "inactive";

    const sql = `UPDATE produit SET statut = ? WHERE _id = ?`;
    db.execute(sql, [newStatut, _id]);

    return res.status(200).json({ success: true, message: "Statut mis à jour" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
