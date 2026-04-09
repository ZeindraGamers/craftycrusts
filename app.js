const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fs = require("fs");
const path = require("path");

const { initDB } = require("./config/db");
const catalogRoutes = require("./routes/catalog");

const app = express();
initDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// 🔥 AUTO SCAN PAGES
const pagesDir = path.join(__dirname, "views/pages");

fs.readdirSync(pagesDir).forEach((file) => {
    const page = file.replace(".ejs", "");
    const route = page === "home" ? "/" : `/${page}`;

    app.get(route, (req, res) => {
        const hasCSS = fs.existsSync(`./public/css/pages/${page}.css`);
        const hasJS = fs.existsSync(`./public/js/${page}.js`);

        res.render(`pages/${page}`, {
            title: page.charAt(0).toUpperCase() + page.slice(1),
            pageCSS: hasCSS ? page : null, // CUMA KIRIM NAMA (Misal: 'home')
            pageJS: hasJS ? page : null
        });
    });
});

app.use("/api/catalog", catalogRoutes);
app.listen(PORT, () => console.log(`🚀 Server Ready at http://localhost:${PORT}`));