<?php

    $email= $_GET['email'];
    $fullname= $_GET['fullname'];
    $phone= $_GET['phone'];
    $message= $_GET['message'];

    mail(
        'petitbenoit3@gmail.com',   // TO (email)
        $fullname.' '.$email.' '.$phone,    // SUBJECT
        $message,    // MESSAGE
        "From: ".$email."\r\n"
    );

?>