<?php
    session_start();
    class results
    {
        private $conn=null;
        function __construct()
        {
            try
            {
                $this->conn=new PDO('mysql:host=localhost;dbname=quiz;charset=utf8','root','');
            }
            catch(PDOException $e)
            {
                $e->getMessage();
            }
        }
        function isParticipantAvailable($uid)
        {
            $sql="SELECT * FROM leaderboard WHERE `uid`=?";
            $stmt=$this->conn->prepare($sql);
            if($stmt->execute([$uid]) && $stmt->rowCount()==1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        function appendResults($id,$name,$score)
        {
            $sql="INSERT INTO `leaderboard`(`uid`,`name`,`score`)VALUES(?,?,?)";
            $stmt=$this->conn->prepare($sql);
            $stmt->execute([$id,$name,$score]);
        }
        function updateResults($id,$name,$score)
        {
            $sql="UPDATE `leaderboard` SET `name`=:name,`score`=:score WHERE `uid`=:uid";
            $stmt=$this->conn->prepare($sql);
            $stmt->bindParam(':uid',$_SESSION['id']);
            $stmt->bindParam(':score',$score);
            $stmt->bindParam(':name',$name);
            $stmt->execute();
        }
        function getLeaderBoard()
        {
            $sql="SELECT * FROM leaderboard ORDER BY `score` DESC";
            $stmt=$this->conn->prepare($sql);
            if($stmt->execute())
            {
                $data=array();
                while($record=$stmt->fetchObject())
                {
                    $row['name']=$record->name;
                    $row['score']=$record->score;
                    array_push($data,$row);
                }
                echo json_encode($data);
            }
        }
    }
    $res=new results();
    if(isset($_POST['action']) && isset($_POST['name']) && isset($_POST['score']))
    {
        if(!empty($_POST['action']) && !empty($_POST['name']) && !empty($_POST['score']))
        {
            if($_POST['action']=='result')
            {
                if($res->isParticipantAvailable($_SESSION['id']))
                {
                    $res->updateResults($_SESSION['id'],$_POST['name'],$_POST['score']);
                }
                else
                {
                    $res->appendResults($_SESSION['id'],$_POST['name'],$_POST['score']);
                }
            }
        }
    }
    if(isset($_GET['action']) && !empty($_GET['action']))
    {
        if($_GET['action']=='getLeaderBoard')
        {
            $res->getLeaderBoard();
        }
    }
?>