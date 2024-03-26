const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const sendToken = require("../utils/sendToken");
const crypto = require("crypto");

// kayıt olma işlemi
exports.register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, drone_owner } = req.body;

    // isim , soyisim , email ve şifre girilip girilmediğini kontrol et
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        error: "This field cannot be empty",
      });
    }

    const _user = await User.findOne({where: {email} });
    // email kontrolu
    if (_user) {
      res.status(400).json({
        success: false,
        error: "This email already taken. Try again please!",
      });
    }
    // kullanici oluşturma
    const user = await User.create({
      name,
      email,
      password,
      drone_owner
    });

    // token oluşturma 
    sendToken(user, 201, res, "Account created successfully");

  } catch (error) {
    console.error(error); // Hatanın consola yazdırılması
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
});

// giriş yapma controller
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // email ve şifreyi null olup olmadığını kontrol et
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please enter the email and password fields",
    });
  }

  // kullanici bulma işlemi 
  const user = await User.findOne({where: {email} });

  if (!user) {
    return res.status(400).json({
      success: false,
      error: "Invalid email or password",
    });
  }

  // şifreyi doğru olup olmadığını kontrol etme işlemi 
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      error: "Invalid password",
    });
  }

  // token oluşturma ve cevap gönderme 
  sendToken(user, 201, res, { message: "Login successful" }); // Yanıtı JSON formatında gönder

  // Alternatif olarak, sadece "OK" metni gönderebilirsiniz:
  // res.status(200).json("OK");
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({where: {email} });

    if (!user) {
      res.status(404).json({
        success: false,
        error: "Email not found!",
      });
    }

    const resetToken = user.getResetPasswordToken();

    const resetUrl = `https://auth-controller/password/reset/${resetToken}`;

    const message = `
          <p>Merhaba ${user.name},</p>
          <p>Şifre yenileme talebini aldık. Alttaki linke tıklayarak şifreni yenileyebilirsin.</p>
          
          <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
          `;
    
    try {
      await sendEmail({
        to: user.email,
        subject: "Şifre Yenileme isteği",
        text: message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent successfully ${user.email}`,
      });
    } catch (error) {
      console.log(error);
      user.reset_password_token = undefined;
      user.reset_password_expire = undefined;

      await user.save();

      res.status(500).json({
        error: "Email not sent",
      });
    } 
  } catch (error) {
    next(error);
  }
});


exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken, "utf-8")
    .digest("hex");

    console.log("Reset Token from Request:", req.params.resetToken);
    console.log("Hashed Reset Token:", resetPasswordToken);

  try {
    const user = await User.findOne({
      where: {
        reset_password_token: resetPasswordToken,
        reset_password_expire: { $gt: Date.now() }
      }
    });
    
    console.log("User from Database:", user);
    
    console.log("\n\nCalculated Expire Time:", new Date(user.reset_password_expire));

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz reset Token , lütfen tekrar mail hesabinizi girin",
      });
    }

    // yeni şifre bi önceki şifreyle aynı olmamalı

    if (req.body.password !== req.body.confirm_password) {
      return res.status(400).json({
        success: false,
        error: "Şifreler uyuşmuyor",
      });
    }

    user.password = req.body.password;
    user.reset_password_token = undefined;
    user.reset_password_expire = undefined;

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Şifreniz Başariyla güncellendi ",
    });
  } catch (error) {
    next(error);
  }
}); 