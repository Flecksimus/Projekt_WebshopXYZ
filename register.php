<!DOCTYPE html>
<html lang="de" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Registrieren</title> 
    <link rel="stylesheet" href="css/styles.css"> 
    <link rel="stylesheet" href="css/register.css">
</head>
<body>
    <header>
        <h1>Registrierung</h1>
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

    <div class="register-container">
        <div class="register-form">
            <?php
            // Überprüft, ob das Formular abgeschickt wurde
            if (isset($_POST['submit'])) {
                require('mysql.php'); // Einbindung der Datenbankverbindung

                $username = $_POST['username']; 
                $email = $_POST['email']; 
                $password = $_POST['pw']; 
                $passwordConfirm = $_POST['pw2']; 

                // Überprüft, ob der Benutzername bereits existiert
                $stmt = $mysql->prepare('SELECT * FROM accounts WHERE USERNAME = :username');
                $stmt->bindParam(':username', $username);
                $stmt->execute();
                $userCount = $stmt->rowCount();

                if ($userCount == 0) {
                    // Überprüft, ob die E-Mail bereits existiert
                    $stmt = $mysql->prepare('SELECT * FROM accounts WHERE EMAIL = :email');
                    $stmt->bindParam(':email', $email);
                    $stmt->execute();
                    $emailCount = $stmt->rowCount();

                    if ($emailCount == 0) {
                        // Überprüft, ob die Passwörter übereinstimmen
                        if ($password == $passwordConfirm) {
                            // Erstellt einen neuen Benutzer
                            $stmt = $mysql->prepare('INSERT INTO accounts (USERNAME, PASSWORD, EMAIL, TOKEN) VALUES (:username, :password, :email, null)');
                            $hashedPassword = password_hash($password, PASSWORD_BCRYPT); // Hash das Passwort
                            $stmt->bindParam(':username', $username);
                            $stmt->bindParam(':password', $hashedPassword);
                            $stmt->bindParam(':email', $email);
                            $stmt->execute();
                            echo '<h1>Dein Account wurde erfolgreich erstellt.</h1>'; // Erfolgreiche Registrierung
                        } else {
                            echo '<p>Die eingegebenen Passwörter stimmen nicht überein.</p>'; // Fehlermeldung bei nicht übereinstimmenden Passwörtern
                        }
                    } else {
                        echo '<p>Diese E-Mail-Adresse ist bereits registriert.</p>'; // Fehlermeldung bei bereits registrierter E-Mail
                    }
                } else {
                    echo '<p>Dieser Benutzername ist bereits vergeben.</p>'; // Fehlermeldung bei bereits vergebenem Benutzernamen
                }
            }
            ?>

            <h1>Registrieren</h1>
            <form action="register.php" method="post">
                <!-- Eingabefelder -->
                <input type="text" name="username" placeholder="Benutzername" required><br> 
                <input type="email" name="email" placeholder="E-Mail" required><br> 
                <input type="password" name="pw" placeholder="Passwort" required><br> 
                <input type="password" name="pw2" placeholder="Passwort bestätigen" required><br> 
                <button type="submit" name="submit">Registrieren</button> 
            </form>
            <br>
            <a href="login.php">Hast du bereits ein Konto?</a> <!-- Weiterleitung zur Loginseite -->
        </div>
    </div>

</body>
</html>
