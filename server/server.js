import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running successfully on port ${PORT}.`)
    )
  )
  .catch((error) => {
    console.log("Failed to start server:", error);
    process.exit(1);
  });
