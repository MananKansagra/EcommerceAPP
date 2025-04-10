<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $empname = $_POST['empname'] ?? 'Not Provided';
    $mobile = $_POST['mobile'] ?? 'Not Provided';

    echo "<h1>Employee Details</h1>";
    echo "<p>Employee Name: " . htmlspecialchars($empname) . "</p>";
    echo "<p>Mobile Number: " . htmlspecialchars($mobile) . "</p>";
} else {
    echo "<h2>Please submit the form first.</h2>";
}
?>
