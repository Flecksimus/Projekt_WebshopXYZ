<!DOCTYPE html>
<html lang="de" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Login</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
<header>
    <h1>Login</h1>
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="products.html">Produkte</a></li>
            <li><a href="cart.html">Warenkorb</a></li>
            <li><a href="register.php">Registrieren</a></li>
            <li><a href="login.php">Login</a></li>
        </ul>
    </nav>
</header>

<!-- Meldungsbereich für Erfolg oder Fehler -->
<div class="message-container">
    <?php
    session_start(); // Session starten

    if(isset($_POST["submit"])){
        require("mysql.php");
        $stmt = $mysql->prepare("SELECT * FROM accounts WHERE USERNAME = :user"); //Username überprüfen
        $stmt->bindParam(":user", $_POST["username"]);
        $stmt->execute();
        $count = $stmt->rowCount();

        if($count == 1){
            // Benutzer gefunden
            $row = $stmt->fetch();
            if(password_verify($_POST["pw"], $row["PASSWORD"])){
                $_SESSION["loggedin"] = true; // Session-Variable setzen
                $_SESSION["username"] = $row["USERNAME"];
                // Erfolgsmeldung anzeigen
                echo '<div class="success-message">Erfolgreich eingeloggt! Sie werden weitergeleitet...</div>';
                header("refresh:2;url=index.html"); // Automatische Weiterleitung nach 2 Sekunden
                exit;
            } else {
                echo '<div class="error-message">Der Login ist fehlgeschlagen</div>';
            }
        } else {
            echo '<div class="error-message">Der Login ist fehlgeschlagen</div>';
        }
    }
    ?>
</div>

<div class="form-container">
    <div class="login-form">
        <h1>Anmelden</h1>
        <form action="login.php" method="post"> <!-- Anmeldeformular mit POST-Methode -->
            <input type="text" name="username" placeholder="Benutzername" required><br>
            <input type="password" name="pw" placeholder="Passwort" required><br>
            <button type="submit" name="submit">Einloggen</button>
        </form>
        <br>
        <a href="register.php" class="link">Noch keinen Account?</a><br>
        <a href="passwordreset.php" class="link">Hast du dein Passwort vergessen?</a>
    </div>
</div>

</body>
</html>
