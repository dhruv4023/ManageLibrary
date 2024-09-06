import Validator from 'validatorjs';

const isValidData = async (dataToBeValidate, constraints) => {
    let validation = new Validator(dataToBeValidate, constraints);
    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return validation.errors.first(firstMessage);
    }
    return false;
};
export default isValidData;