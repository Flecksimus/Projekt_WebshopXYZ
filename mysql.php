<?php
// Definition der Verbindungsdaten für die MySQL-Datenbank
$host = 'localhost'; // Hostname des Datenbankservers
$dbname = 'mflk31_1'; // Name der Datenbank (kann auch 'mflk31_2' oder 'mflk31_3' sein, je nach Bedarf)
$username = 'mflk31'; // Benutzername für die Datenbankverbindung
$password = '5fEIXC8hO-cOjMjJ'; // Passwort für die Datenbankverbindung (ersetzen Sie dies durch Ihr tatsächliches Passwort)

// Data Source Name (DSN) für die PDO-Verbindung, inklusive Zeichensatz
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";

try {
    // Erstellen einer neuen PDO-Instanz für die MySQL-Verbindung
    $mysql = new PDO($dsn, $username, $password);

    // Setzen des Fehlermodus auf Exception, um Fehler besser behandeln zu können
    $mysql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Fehlerbehandlung: Ausgabe der Fehlermeldung, falls eine Ausnahme auftritt
    echo "SQL Error: " . $e->getMessage();
    
    // Setzen der MySQL-Verbindung auf null, falls ein Fehler auftritt
    $mysql = null;
}
?>