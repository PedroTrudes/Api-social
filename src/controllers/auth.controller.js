import bcrypt from 'bcrypt';
import { loginService } from '../services/auth.service.js'

const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await loginService(email);
        if(!user){
            return res.status(404).send({message: "Email invalidos"})
        }
        
        const passwordValid = bcrypt.compareSync(password, user.password) //poderia usar o AWAIT mas usamos o compareSync do bcrypt
        
        if(!passwordValid || !user){
            return res.status(400).send({message: "Usuario ou senhas estão errados!"})
        }

        res.send("Logado com sucesso!")

    }catch(err) {
        res.status(500).send(err.message)
    }
};

export { login };