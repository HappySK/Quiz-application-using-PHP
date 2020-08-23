<?php
    class validate
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

        function register($data)
        {
            $sql="INSERT INTO reg_table(`firstname`,`lastname`,`email`,`password`)VALUES(?,?,?,?)";
            $stmt=$this->conn->prepare($sql);
            if($stmt->execute([$data->fname,$data->lname,$data->email,md5($data->pwd)]))
            {
                $user=$this->getUserDetails($data->email);
                session_start();
                $_SESSION['id']=$user->id;
                echo json_encode($user);
            }
            else
            {
                echo "Something Went Wrong";
            }

        }

        function getUserDetails($email)
        {
            $sql="SELECT * FROM reg_table WHERE `email`=?";
            $stmt=$this->conn->prepare($sql);
            if($stmt->execute([$email]) && $stmt->rowCount()==1)
            {
                $row=$stmt->fetchObject();
                $record['id']=$row->id;
                $record['firstname']=$row->firstname;
                $record['lastname']=$row->lastname;
                $record['email']=$row->email;
                $record['result']='success';
                return $record;
            }
            else
            {
                $record['result']='failure';
                $record['message']='Query Failure';
                return $record;
            }

        }

        function isRegistered($email,$pwd)
        {
            $sql="SELECT * FROM reg_table WHERE `email`=? AND `password`=?";
            $stmt=$this->conn->prepare($sql);
            if($stmt->execute([$email,md5($pwd)]) && $stmt->rowCount()>0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    $validate=new validate();
    if(isset($_POST['action']))
    {
        if(!empty($_POST['action']))
        {
            switch($_POST['action'])
            {
                case 'reg':if(isset($_POST['user']) && !empty($_POST['user']))
                            {
                                $data=json_decode($_POST['user']);
                                if($validate->isRegistered($data->email,$data->pwd))
                                {
                                    $record['result']='failure';
                                    $record['message']='User already exists';
                                    echo json_encode($record);
                                }
                                else
                                {
                                    $validate->register($data);
                                }
                            }
                case 'log':if(isset($_POST['user']) && !empty($_POST['user']))
                            {
                                $data=json_decode($_POST['user']);
                                if($validate->isRegistered($data->email,$data->pwd))
                                {
                                    $data=$validate->getUserDetails($data->email,$data->pwd);
                                    session_start();
                                    $_SESSION['id']=$data['id'];
                                    echo json_encode($data);
                                }
                                else
                                {
                                    $record['result']='failure';
                                    $record['message']='Invalid Email/Password or Try Signing Up at first';
                                    echo json_encode($record);
                                }
                            }
            }
        }
    }
?>