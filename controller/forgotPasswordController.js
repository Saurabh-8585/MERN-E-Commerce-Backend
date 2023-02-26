const User = require('../models/User');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
dotenv.config()
let userMail;
let success = false;
const   sendEmailLink = async (req, res) => {
  const { email } = req.body;
  userMail = email;
  const findUser = await User.findOne({ email: email })
  try {
    if (findUser) {
      const secretKey = findUser._id + process.env.JWT_SECRET;
      const token = jwt.sign({ userID: findUser._id }, secretKey, { expiresIn: '5m' });
      const link = `${process.env.FORGOT_PASSWORD}/${findUser._id}/${token}`;

      const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.email",
        port: 465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        },
      })
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset Request",
        html: `
<!doctype html>
<html lang="en-US">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>
<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                   
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            This link is valid for only 5 minutes
                                        </p>   
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            Click below Link and Verify your E-Mail..
                                        </p>
                                        <a href="${link}"
                                            style="background:#1976d2;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Verify Email</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                   
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>
</html>`
      }
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.send({ msg: error });
        }
        else {
          return res.send({ success, msg: "Email Sent Please Check Your Email" })
        }
      })
    }
    else {
      res.send({ msg: "User not found" })
    }

  } catch (error) {
    return res.send({ msg: error })
  }


}

const forgotPasswordEmail = async (req, res) => {
  const { newPassword } = req.body;
  const { id, token } = req.params;
  try {
    if (newPassword && id && token) {
      const findUser = await User.findById(id)
      const secretKey = findUser._id + process.env.JWT_SECRET;
      const isValid = await jwt.verify(token, secretKey);
      if (isValid) {
        const isUser = await User.findById(id);
        // password hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(newPassword, salt)
        const isSuccess = await User.findByIdAndUpdate(isUser._id, {
          $set: {
            password: hashedPass
          }
        })
        if (isSuccess) {
          success = true
          const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.email",
            port: 465,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            },
          })
          const mailOptions = {
            from: process.env.EMAIL,
            to: isUser.email,
            subject: "Password Change Confirmation",
            html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } @media (max-width: 480px) { #u_content_image_1 .v-container-padding-padding { padding: 40px 0px 0px !important; } #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 55% !important; } #u_content_heading_3 .v-font-size { font-size: 18px !important; } #u_content_heading_2 .v-container-padding-padding { padding: 5px 10px 40px !important; } #u_content_heading_4 .v-container-padding-padding { padding: 40px 10px 0px !important; } #u_content_heading_4 .v-text-align { text-align: center !important; } #u_content_divider_1 .v-container-padding-padding { padding: 10px 10px 10px 125px !important; } #u_content_text_2 .v-container-padding-padding { padding: 10px 10px 40px !important; } #u_content_text_2 .v-text-align { text-align: center !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: #ffffff">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table id="u_content_image_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 0px 0px;font-family:'Raleway',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_3" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Raleway',sans-serif;" align="left">
        
  <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 22px; "><strong>Your Password has been Changed</strong></h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 50px;font-family:'Raleway',sans-serif;" align="left">
        
  <h1 class="v-text-align v-font-size" style="margin: 0px; color: #5c5c5c; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 14px; ">Please login to your email account again</h1>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #f0f5f6;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #f0f5f6;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_4" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 60px 0px;font-family:'Raleway',sans-serif;" align="left">
        
  <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 20px; "><strong>Subject: Password Change Confirmation</strong></h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_divider_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 60px;font-family:'Raleway',sans-serif;" align="left">
        
  <table height="0px" align="left" border="0" cellpadding="0" cellspacing="0" width="38%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px 50px;font-family:'Raleway',sans-serif;" align="left">
        
  <div class="v-text-align v-font-size" style="line-height: 140%; text-align: justify; word-wrap: break-word;">
    <p style="line-height: 140%;">Dear ${isUser.firstName} ${isUser.lastName},</p>
<p style="line-height: 140%;"> </p>
<p style="line-height: 140%;">This is to confirm that the password for your account has been successfully changed. Your account is now secured with the new password that you have set.</p>
<p style="line-height: 140%;"> </p>
<p style="line-height: 140%;">If you did not change your password, please contact us immediately to report any unauthorized access to your account.</p>
<p style="line-height: 140%;"> </p>
<p style="line-height: 140%;">If you have any issues or concerns regarding your account, please do not hesitate to contact our customer support team for further assistance.</p>
<p style="line-height: 140%;"> </p>
<p style="line-height: 140%;">Thank you for using our service.</p>
<p style="line-height: 140%;"> </p>
<p style="line-height: 140%;">Best regards,</p>
<p style="line-height: 140%;">ShopIt.com</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`

          }
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.send({ msg: error });
            }
            else {
              return res.send({ success, msg: "Password Changed Successfully" })
            }
          })
        }
        else {
          return res.send({ msg: "some thing went wrong" });
        }
      }
      else {
        res.send({ msg: "Link has been expired" });
      }

    }
    else {
      return res.send({ msg: "All fields are required" });;
    }
  } catch (error) {
    console.log(error);
    return res.send({ msg: error })
  }
}

module.exports = { sendEmailLink, forgotPasswordEmail }