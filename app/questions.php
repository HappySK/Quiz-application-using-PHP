<?php
    class question
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

        function getQuestions()
        {
            $sql="SELECT * FROM questions";
            $stmt=$this->conn->prepare($sql);
            if($stmt->execute() && $stmt->rowCount()>0)
            {
                $row=array();
                while($data=$stmt->fetchObject())
                {
                    $record['id']=$data->id;
                    $record['questions']=$data->questions;
                    $record['option1']=$data->option1;
                    $record['option2']=$data->option2;
                    $record['option3']=$data->option3;    
                    $record['option4']=$data->option4;
                    $record['result']=$data->result;
                    array_push($row,$record);
                }
                echo json_encode($row);
            }
            else
            {
                echo "Query Failed";
            }
        }
    }
    $qn=new question();
    if(isset($_POST['action']) && !empty($_POST['action']))
    {
        if($_POST['action']=='getQuestions')
        {
            $qn->getQuestions();
        }
    }
?>
