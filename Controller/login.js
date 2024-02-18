const User = require('../Db/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.Login = async (req,res) => { 
    const { email ,password } = req.body;

    try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Users not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // JWT oluştur ve kullanıcıya geri gönder
    const token = jwt.sign({ userId: user._id, email: user.email }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports.Register = async (req,res) =>{
    const { email, name ,password } = req.body;

    try {
    // E-posta adresine sahip başka bir kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ email });

    // Eğer varsa hata döndür
    if (existingUser) {
      return res.status(400).json({ error: 'Email already using' });
    }

    // Şifreyi hash'le (güvenlik için)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı oluştur
    const newUser = new User({ email, name ,password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Resister Succesfull' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}