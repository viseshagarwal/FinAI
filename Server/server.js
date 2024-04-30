const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

const db = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  port: "",
  database: "defaultdb",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/signup", (req, res) => {
  const { name, phone, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ error: "Error signing up" });
      return;
    }

    // Insert the user into the database with hashed password
    db.query(
      `INSERT INTO users (name, phone_no, email, password) VALUES (?, ?, ?, ?)`,
      [name, phone, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error signing up:", err);
          res.status(500).json({ error: "Error signing up" });
          return;
        }
        console.log("Signed up successfully");
        // send the inserted id to the frontend
        res.status(200).json({
          insertId: result.insertId,
          message: "Signed up successfully",
        });
      }
    );
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // Check if user exists with the provided email
  db.query(
    `SELECT id, password FROM users WHERE email = ?`,
    [email],
    (err, result) => {
      if (err) {
        console.error("Error signing in:", err);
        res.status(500).json({ error: "Error signing in" });
        return;
      }

      if (result.length > 0) {
        // User found, verify password
        const hashedPassword = result[0].password;
        bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            res.status(500).json({ error: "Error signing in" });
            return;
          }

          if (passwordMatch) {
            // Passwords match, sign-in successful
            const userId = result[0].id; // Extract user ID
            res
              .status(200)
              .json({ id: userId, message: "Signed in successfully" });
          } else {
            // Passwords don't match
            res.status(401).json({ error: "Invalid email or password" });
          }
        });
      } else {
        // No user found with the provided email
        res.status(401).json({ error: "Invalid email or password" });
      }
    }
  );
});

app.get("/profile", (req, res) => {
  const { id } = req.query;

  db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      res.status(500).json({ error: "Error fetching user profile" });
      return;
    }

    if (result.length > 0) {
      const userProfile = result[0];
      // Return the user profile data
      res.status(200).json(userProfile);
    } else {
      res.status(404).json({ error: "User profile not found" });
    }
  });
});

app.post("/profile/update", (req, res) => {
  try {
    //const { id, ...updatedInfo } = req.body;
    const { params } = req.body;
    // Construct the SQL query to update user details
    const sql =
      "UPDATE users SET `name` = ?, `phone_no` = ?, `email` = ? WHERE `id` = ?";

    db.query(
      sql,
      [params.name, params.phone_no, params.email, params.id],
      (error, result) => {
        if (error) {
          console.error("Error updating profile information:", error);
          return res
            .status(500)
            .json({ error: "Failed to update profile information" });
        }

        // Check if any rows were affected by the update operation
        if (result.affectedRows === 0) {
          // If no rows were affected, it means the user with the provided ID does not exist
          return res.status(404).json({ error: "User not found" });
        }

        // Send a response indicating success
        res
          .status(200)
          .json({ message: "Profile information updated successfully" });
      }
    );
  } catch (error) {
    // If an error occurs, send a response with an error message
    console.error("Error updating profile information:", error);
    res.status(500).json({ error: "Failed to update profile information" });
  }
});

app.post("/addExpense", (req, res) => {
  try {
    const { user_id, category, amount, description, transactionDate } =
      req.body;
    //console.log(res.body);
    //console.log(user_id);
    const sql =
      "INSERT INTO transactions1 (users_id, type, category, amount, description, `DateTime`) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [user_id, "Expense", category, amount, description, transactionDate],
      (error, result) => {
        if (error) {
          console.error("Error adding expense transaction:", error);
          return res
            .status(500)
            .json({ error: "Failed to add expense transaction" });
        }
        res
          .status(201)
          .json({ message: "Expense transaction added successfully" });
      }
    );
  } catch (error) {
    console.error("Error adding expense transaction:", error);
    res.status(500).json({ error: "Failed to add expense transaction" });
  }
});

app.post("/addIncome", (req, res) => {
  try {
    const { user_id, category, amount, description, transactionDate } =
      req.body;
    //console.log(user_id);
    const sql =
      "INSERT INTO transactions1 (users_id, category, amount, description, DateTime, type) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [user_id, category, amount, description, transactionDate, "Income"],
      (error, result) => {
        if (error) {
          console.error("Error adding income transaction:", error);
          return res
            .status(500)
            .json({ error: "Failed to add income transaction" });
        }
        res
          .status(201)
          .json({ message: "Income transaction added successfully" });
      }
    );
  } catch (error) {
    console.error("Error adding income transaction:", error);
    res.status(500).json({ error: "Failed to add income transaction" });
  }
});

app.post("/transactions", (req, res) => {
  const { users_id } = req.body; // Corrected from const { userId } = req.body;
  //console.log(users_id);
  const sql = `SELECT * FROM transactions1 WHERE users_id = ? ORDER BY DateTime DESC`;

  db.query(sql, [users_id], (err, result) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ error: "Failed to fetch transactions" });
    }
    //console.log("Transactions fetched:", result);
    res.status(200).json(result);
  });
});

app.post("/add-budget", (req, res) => {
  const { user_id, category, amount, description, budget_name } = req.body;
  //console.log(user_id);
  const sql = `INSERT INTO Budgets (user_id, category, budget_amount, description, budget_name) VALUES (?, ?, ?, ?, ?)`;
  const values = [user_id, category, amount, description, budget_name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding budget:", err);
      return res.status(500).json({ error: "Failed to add budget" });
    }

    res.status(200).json({ message: "Budget added successfully" });
  });
});

app.post("/get-budgets", (req, res) => {
  const { userId } = req.body;
  //console.log(userId);
  const query = "SELECT * FROM Budgets WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching budgets:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.post("/accounts", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
    console.log("User ID is required");
  }

  const sql = "SELECT * FROM Accounts WHERE user_id = ?";
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching transactions:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      res.json(results);
      //console.log("Transactions fetched:", results);
    } else {
      res.status(404).json({ error: "Transactions not found" });
    }
  });
});

app.post("/add-accounts", (req, res) => {
  const {
    user_id,
    accountNumber,
    accountName,
    balance,
    cc_number,
    cc_cvv,
    cc_expiry_date,
    dc_number,
    dc_cvv,
    dc_expiry_date,
  } = req.body;

  if (!user_id || !accountNumber || !accountName || !balance) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let sql, values;
  if (cc_number && cc_cvv && cc_expiry_date) {
    // Credit card
    sql = `INSERT INTO Accounts (user_id, account_number, account_name, account_balance, credit_card_number, cc_cvv, cc_exp) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    values = [
      user_id,
      accountNumber,
      accountName,
      balance,
      cc_number,
      cc_cvv,
      cc_expiry_date,
    ];
  } else if (dc_number && dc_cvv && dc_expiry_date) {
    // Debit card
    sql = `INSERT INTO Accounts (user_id, account_number, account_name, account_balance, debit_card_number, dc_cvv, dc_exp) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    values = [
      user_id,
      accountNumber,
      accountName,
      balance,
      dc_number,
      dc_cvv,
      dc_expiry_date,
    ];
  } else {
    return res.status(400).json({ error: "Missing card information" });
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding account:", err);
      return res.status(500).json({ error: "Failed to add account" });
    }

    res.status(201).json({ message: "Account added successfully" });
  });
});

app.post("/addFeedback", (req, res) => {
  const { name, email, comments } = req.body;

  // Validate required fields
  if (!name || !email || !comments) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Prepare SQL query to insert feedback
  const sql = `INSERT INTO Feedbacks (name, email, comments) VALUES (?, ?, ?)`;
  const values = [name, email, comments];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding feedback:", err);
      return res.status(500).json({ error: "Failed to add feedback" });
    }

    res.status(201).json({ message: "Feedback added successfully" });
  });
});

app.post("/addDebt", (req, res) => {
  const { user_id, creditor, amount, interestRate, dueDate } = req.body;

  // Validate required fields
  if (!user_id || !creditor || !amount || !interestRate || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Prepare SQL query to insert debt
  const sql = `INSERT INTO Debts (user_id, creditor, amount, interestRate, dueDate) 
               VALUES (?, ?, ?, ?, ?)`;
  const values = [user_id, creditor, amount, interestRate, dueDate];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding debt:", err);
      return res.status(500).json({ error: "Failed to add debt" });
    }

    console.log("Debt added successfully");
    res
      .status(201)
      .json({ message: "Debt added successfully", debtId: result.insertId });
  });
});

app.post("/getDebts", (req, res) => {
  const { user_id } = req.body;

  // Validate required fields
  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }

  // Assuming you have a database connection named db
  db.query("SELECT * FROM Debts WHERE user_id = ?", user_id, (err, results) => {
    if (err) {
      console.error("Error fetching debts:", err);
      return res.status(500).json({ error: "Failed to fetch debts" });
    }

    // Calculate total debt amount
    const totalDebtAmount = results.reduce(
      (total, debt) => total + parseFloat(debt.amount),
      0
    );

    // Send the debts array along with the total debt amount
    res.json({ debts: results, totalDebtAmount });
  });
});

app.post("/addGoal", (req, res) => {
  const { user_id, title, amount, targetDate, description } = req.body;

  // Validate required fields
  if (!user_id || !title || !amount || !targetDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Prepare SQL query to insert a new goal
  const sql = `INSERT INTO Goals (user_id, title, amount, targetDate, description) VALUES (?, ?, ?, ?, ?)`;
  const values = [user_id, title, amount, targetDate, description];

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding goal:", err);
      return res.status(500).json({ error: "Failed to add goal" });
    }
    console.log("Goal added successfully");
    res
      .status(201)
      .json({ message: "Goal added successfully", goalId: result.insertId });
  });
});

app.get("/goals/:user_id", (req, res) => {
  const userId = req.params.user_id;

  // Query goals from the database based on user ID
  const sql = `SELECT * FROM Goals WHERE user_id = ?`;
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching goals:", err);
      return res.status(500).json({ error: "Failed to fetch goals" });
    }

    res.status(200).json(result);
  });
});

app.get("/*", (req, res) => {
  res.status(404);
  res.end("<h1>404 Error</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
