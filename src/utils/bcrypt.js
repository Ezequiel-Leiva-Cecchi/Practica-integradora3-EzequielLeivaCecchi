import bcrypt from 'bcrypt';
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    console.log('Password in database:', user.password);
    console.log('Password provided:', password);
    const isValid = bcrypt.compareSync(password, user.password);
    console.log('Is password valid?', isValid);
    return isValid;
};