

<?
$data = json_decode(file_get_contents("php://input"));
$fname = mysql_real_escape_string($data->fname);
$lname = mysql_real_escape_string($data->lname);
$uname = mysql_real_escape_string($data->uname);
$email = mysql_real_escape_string($data->email);
$pword = mysql_real_escape_string($data->pword);
mysqli_connect("localhost","root","xbox0929","fundacion");
mysql_select_db("fundacion");
msql_query("INSERT INTO userdata('first_name', 'last_name', 'user_name', 'e_mail', 'password')VALUES('".$fname"','".$lname"','".$uname"','".$email"','".$pword"')");

?>