export const validate={
    email:{
        // required:[A-Za-z]{3},
        emailPattern:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        patternError:"must be valid email address"
    },
    password:{
        minimum:5,
        maximun:20,
        lengthError:"should be between 5-8 chars"
    },
    requiredError:"Field Required"
}

 