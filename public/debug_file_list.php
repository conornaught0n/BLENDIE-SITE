<?php
echo "<h1>Server File Listing</h1>";
echo "<p>Current Directory: " . getcwd() . "</p>";

$files = scandir('.');
echo "<ul>";
foreach($files as $file) {
    if(is_dir($file)) {
        echo "<li><strong>[DIR] $file</strong></li>";
    } else {
        echo "<li>$file (" . filesize($file) . " bytes)</li>";
    }
}
echo "</ul>";
?>
