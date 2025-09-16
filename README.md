# Hashira Polynomial Decoder
````markdown

This project is a Node.js implementation for decoding polynomial points and computing the **constant term (c)** of the polynomial.

---

📌 How It Works
- Given encoded points in different bases, the program:
  1. Decodes them into `(x, y)` coordinates.
  2. Uses these points to determine the constant term `c`.

---

⚡ Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Pranay9392/hashira_2203a51533.git
   cd hashira_2203a51533
````

2. Run the project:

   ```sh
   node index.js
   ```

---

🧪 Example Output

When running `node index.js`, you should see results like below:

```
--- Test 1 ---
Decoded Point -> x: 1, y: 4
Decoded Point -> x: 2, y: 7
Decoded Point -> x: 3, y: 12
Decoded Point -> x: 6, y: 39
✅ Computed constant term (c): 3

--- Test 2 ---
Decoded Point -> x: 1, y: 995085094601491
Decoded Point -> x: 2, y: 320923294898495900
Decoded Point -> x: 3, y: 196563650089608567
Decoded Point -> x: 4, y: 1016509518118225951
Decoded Point -> x: 5, y: 3711974121218449851
Decoded Point -> x: 6, y: 10788619898233492461
Decoded Point -> x: 7, y: 26709394976508342463
Decoded Point -> x: 8, y: 58725075613853308713
Decoded Point -> x: 9, y: 117852986202006511971
Decoded Point -> x: 10, y: 220003896831595324801
✅ Computed constant term (c): -6290016743746469796
```

---

 🛠 Tech Stack

* **Node.js** (JavaScript runtime)
* **BigInt** for handling very large numbers

---

✨ Author

👤 **Pranay Aletti**
[GitHub Profile](https://github.com/Pranay9392)

```

Do you also want me to add a **"Usage" section** showing how others can plug in their own test cases to compute constants?
```


