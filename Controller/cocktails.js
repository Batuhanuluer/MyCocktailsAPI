
const jwt = require('jsonwebtoken');
const Cocktails = require('../Db/cocktails')

module.exports.GetAllCocktails = async (req,res)=>{
    const token = req.headers.authorization;

    if(!token){
        res.status(400).json({message: 'Login as user'});
    }  

    try {
        const decoded = jwt.verify(token, 'secretKey'); // Replace 'your-secret-key' with your actual secret key
   
        const allCocktails = await Cocktails.find({ userId: decoded.userId });

        res.status(200).json(allCocktails)

    } catch (error) {
        res.status(500).json({message : "Server Error"})
    }

}

module.exports.AddNewCoctail = async (req,res)=>{
    const token = req.headers.authorization;

    if(!token){
        res.status(400).json({message: 'Login as user'});
    }  

    try {
        // Verify the token and extract user information
        const decoded = jwt.verify(token, 'secretKey'); // Replace 'your-secret-key' with your actual secret key


        // Now, you can access the user ID from the decoded token
        const userId = decoded.userId;

        const {name, description, ingredient} = req.body;

        const newCocktail = new Cocktails({name, description, ingredient, userId});

        await newCocktail.save()

        res.status(200).json({ message: 'Coctail added successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
}

module.exports.DeleteCocktail = async (req,res)=>{

    const token = req.headers.authorization
    const cocktailid = req.params.id

    if(!token){
        res.status(400).json({message:'Login as user'})
    }

    try {
        const decoded = jwt.verify(token, 'secretKey');
        console.log(decoded.userId);
        console.log(cocktailid);
        if (decoded && cocktailid) {

            // Silme işlemini gerçekleştir
            const result = await Cocktails.findOneAndDelete({ _id: cocktailid, userId: decoded.userId });

            res.status(204).json({ message: 'Delete successful' });
            // Eğer result null dönmüşse, belirtilen cocktailId'ye sahip bir kayıt bulunamamıştır
            if (!result) {
                return res.status(404).json({ message: 'Cocktail not found' });
            }

            
        } else {
            res.status(400).json({ message: 'Invalid request' });
        }
        
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports.UpdateCocktail = async (req,res)=>{
    const token = req.headers.authorization
    const cocktailid = req.params.id

    if(!token){
        res.status(400).json({message : "Kullanici girisi yapiniz"})
    }

    try {
        const decoded = jwt.verify(token , "secretKey");

        const {name, description, ingredient} = req.body

        const result = await Cocktails.findByIdAndUpdate(
            { _id: cocktailid, userId: decoded.userId },
            { name, description, ingredient, userId: decoded.userId },
            { new: true }
          );

        if(!result){
            res.status(400).json({message: "Cocktail not found"})
        }
        res.status(200).json({message: 'Update succesful'})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}